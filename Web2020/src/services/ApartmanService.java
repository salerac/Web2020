package services;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Random;
import java.util.Set;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import beans.Adresa;
import beans.Apartman;
import beans.Lokacija;
import beans.Rezervacija;
import beans.Sadrzaj;
import beans.Status;
import beans.Uloga;
import beans.User;
import dto.ApartmanDTO;
import dto.SearchDTO;
import dto.UserDTO;
import dto.ApartmanResponse;
import dto.ApartmanRezDTO;
import dto.LokacijaResponse;
import dto.SadrzajiDTO;
import repositories.AdresaRepository;
import repositories.ApartmanRepository;
import repositories.LokacijaRepository;
import repositories.RezervacijaRepository;
import repositories.SadrzajRepository;
import repositories.UserRepository;
import spark.Request;
import spark.Response;
import spark.Route;

public class ApartmanService{
	private static Gson g = new Gson();
	
	public static Route getApartman = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.queryParams("id");
		Apartman apartman = ApartmanRepository.getApartmanById(g.fromJson(payload, Integer.class));
		ArrayList<Apartman> a = new ArrayList<Apartman>();
		a.add(apartman);
		ArrayList<ApartmanResponse> dto = convertToDTO(a);
		return g.toJson(dto.get(0));
	};
	public static Route getDomacinApartmani = (Request request, Response response) -> {
		User u = UserRepository.getTrenutniUser();
		ArrayList<Integer> apartmaniId = u.getApartmaniId();
		ArrayList<Apartman> apartmani = ApartmanRepository.getDomacinAktivniApartmani(u.getUsername());
		ArrayList<ApartmanResponse> ret = convertToDTO(apartmani);
		return g.toJson(ret);
		
	};
	public static Route getDomacinNeaktivni = (Request request, Response response) -> {
		User u = UserRepository.getTrenutniUser();
		ArrayList<Integer> apartmaniId = u.getApartmaniId();
		ArrayList<Apartman> apartmani = ApartmanRepository.getDomacinNeaktivniApartmani(u.getUsername());
		ArrayList<ApartmanResponse> ret = convertToDTO(apartmani);
		System.out.println(ret);
		return g.toJson(ret);
		
	};
	public static Route getAdminApartmani = (Request request, Response response) -> {
		User u = UserRepository.getTrenutniUser();
		ArrayList<Integer> apartmaniId = u.getApartmaniId();
		ArrayList<Apartman> apartmani = ApartmanRepository.getApartmani();
		ArrayList<ApartmanResponse> ret = convertToDTO(apartmani);
		return g.toJson(ret);
	};
	public static Route getApartmanRezervacije = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.queryParams("id");
		int id = Integer.parseInt(payload);
		User u = UserRepository.getTrenutniUser();
		if(!u.getApartmaniId().contains(id)) {
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Domaćin nema taj apartman u ponudi.");
			return message ;
		}
		ArrayList<Integer> rezId = ApartmanRepository.getApartmanById(id).getRezervacijeId();
		ArrayList<ApartmanRezDTO> ret = new ArrayList<ApartmanRezDTO>();
		for(int i : rezId) {
			User gost = UserRepository.getUserById(RezervacijaRepository.getRezervacijaById(i).getGostId());
			UserDTO gostDTO = new UserDTO(gost, null);
			ret.add(new ApartmanRezDTO(RezervacijaRepository.getRezervacijaById(i), gostDTO));
		}
		System.out.println(ret);
		return g.toJson(ret);
	};
	public static Route aktivirajApartman = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Apartman a = g.fromJson(payload, Apartman.class);
		Apartman ret = ApartmanRepository.getApartmanById(a.getId());
		ret.setStatus(false);
		ApartmanRepository.saveApartmani();
		return g.toJson(ret);
	};
	public static Route addApartman = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		ApartmanDTO a = g.fromJson(payload, ApartmanDTO.class);
		
		ArrayList<String> slike = saveImages(a.getSlike());
		try {
		Adresa adresa = new Adresa(a.getUlica(), a.getBroj(), a.getGrad(), a.getPostanskiBroj());
		AdresaRepository.addAdresa(adresa);
		
		Lokacija lokacija = new Lokacija(a.getLokacija());
		LokacijaRepository.addLokacija(lokacija);
		lokacija.setAdresa(adresa.getId());
		
		Apartman apartman = new Apartman(a.getTip(), a.getBrojSoba(), a.getBrojGostiju(), lokacija.getId(),
				a.getDatumi(), slike, a.getCena(), a.getVremePrijave(), a.getVremeOdjave(), a.getSadrzaj());
		apartman.setDomacinUsername(UserRepository.getTrenutniUser().getUsername());
		apartman.setStatus(true);
		apartman.setRezervacijeId(new ArrayList<Integer>());
		ApartmanRepository.addApartman(apartman);
		UserRepository.getTrenutniUser().getApartmaniId().add(apartman.getId());
		UserRepository.saveUsers();
		}
		catch(Exception e) {
			e.printStackTrace();
			response.status(400);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Apartman nije dodat.");
			return message ;
		}
		response.status(200);
		JsonObject message = new JsonObject();
		message.addProperty("message", "Apartman uspešno dodat.");
		return message ;
		
	};
	public static Route obrisiApartman = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Apartman a = g.fromJson(payload, Apartman.class);
		Apartman apartman = ApartmanRepository.getApartmanById(a.getId());
		User domacin = UserRepository.getTrenutniUser();
		domacin.getApartmaniId().remove(Integer.valueOf(apartman.getId()));
		apartman.setObrisan(true);
		ArrayList<Integer> rezervacije = apartman.getRezervacijeId();
		for(Integer i : rezervacije) {
			System.out.println("stavljam " + i);
			Rezervacija r = RezervacijaRepository.getRezervacijaById(i);
			if(r.getStatus().equals(Status.KREIRANA) || r.getStatus().equals(Status.PRIHVACENA))
			r.setStatus(Status.ODBIJENA);
		};
		UserRepository.saveUsers();
		ApartmanRepository.saveApartmani();
		RezervacijaRepository.saveRezervacije();
		
		response.status(200);
		JsonObject message = new JsonObject();
		message.addProperty("message", "Apartman obrisan.");
		return message ;
		
	};
	public static Route obrisiApartmanAdmin = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Apartman a = g.fromJson(payload, Apartman.class);
		Apartman apartman = ApartmanRepository.getApartmanById(a.getId());
		User domacin = UserRepository.findOne(apartman.getDomacinUsername());
		domacin.getApartmaniId().remove(Integer.valueOf(apartman.getId()));
		apartman.setObrisan(true);
		ArrayList<Integer> rezervacije = apartman.getRezervacijeId();
		for(Integer i : rezervacije) {
			System.out.println("stavljam " + i);
			Rezervacija r = RezervacijaRepository.getRezervacijaById(i);
			if(r.getStatus().equals(Status.KREIRANA) || r.getStatus().equals(Status.PRIHVACENA))
			r.setStatus(Status.ODBIJENA);
		};
		UserRepository.saveUsers();
		ApartmanRepository.saveApartmani();
		RezervacijaRepository.saveRezervacije();
		
		response.status(200);
		JsonObject message = new JsonObject();
		message.addProperty("message", "Apartman obrisan.");
		return message ;
		
	};
	public static Route searchApartman = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		SearchDTO search = g.fromJson(payload, SearchDTO.class);
		ArrayList<Apartman> pronadjeni = new ArrayList<Apartman>();
		ArrayList<ApartmanResponse> povratni = new ArrayList<ApartmanResponse>();
		ArrayList<Apartman> svi = ApartmanRepository.getAktivniApartmani();
		
		String grad = search.getLokacija();
		ArrayList<Apartman> apartmaniPoGradu = new ArrayList<Apartman>();
		if(grad != null) {
			if(!grad.equals("")) {
			apartmaniPoGradu = ApartmanRepository.getApartmanByGrad(grad, svi);
			}
			else {
				apartmaniPoGradu = svi;
			}
		}
		else {
			apartmaniPoGradu = svi;
		}
		System.out.println(apartmaniPoGradu);
		
		long datumPrijave = search.getDatumPrijave();
		long datumOdjave = search.getDatumOdjave();
		
		System.out.println(datumPrijave);
		System.out.println(datumOdjave);
		ArrayList<Apartman> apartmaniPoPeriodu = new ArrayList<Apartman>();
		if(!(datumPrijave == 0 || datumOdjave == 0)) {
			apartmaniPoPeriodu = ApartmanRepository.getApartmanByDatumi(datumPrijave, datumOdjave, apartmaniPoGradu);
		}
		else {
			apartmaniPoPeriodu = apartmaniPoGradu;
		}
		System.out.println(apartmaniPoPeriodu);
		ArrayList<Apartman> apartmaniPoCeni = new ArrayList<Apartman>();
		double cenaOd = search.getCenaOd();
		double cenaDo = search.getCenaDo();
		if(!(cenaOd == 0 && cenaDo == 0)) {
			apartmaniPoCeni = ApartmanRepository.getApartmanByCena(cenaOd, cenaDo, apartmaniPoPeriodu);
		}
		else {
			apartmaniPoCeni = apartmaniPoPeriodu;
		}
		
		int sobeOd = search.getSobeOd();
		int sobeDo = search.getSobeDo();
		ArrayList<Apartman> apartmaniPoBrojuSoba = new ArrayList<Apartman>();
		if(!(sobeOd == 0 && sobeDo == 0)) {
			apartmaniPoBrojuSoba = ApartmanRepository.getApartmanByBrojSoba(sobeOd, sobeDo, apartmaniPoCeni);
		}
		else {
			apartmaniPoBrojuSoba = apartmaniPoCeni;
		}

		
		int brojGostiju = search.getBrojGostiju();
		ArrayList<Apartman> apartmaniPoBrojuGostiju = new ArrayList<Apartman>();
		if(!(brojGostiju == 0)) {
			apartmaniPoBrojuGostiju = ApartmanRepository.getApartmanByBrojGostiju(brojGostiju, apartmaniPoBrojuSoba);
		}
		else {
			apartmaniPoBrojuGostiju = apartmaniPoBrojuSoba;
		}
		
		pronadjeni.addAll(apartmaniPoBrojuGostiju);
		
		for(int i = 0; i < pronadjeni.size(); i++) {
			Lokacija l = LokacijaRepository.getLokacijaById(pronadjeni.get(i).getLokacijaId());
			Adresa a = AdresaRepository.getAdresaById(l.getAdresa());
			LokacijaResponse lr = new LokacijaResponse(l,a);
			ArrayList<Sadrzaj> sadrzaji = ApartmanRepository.getSadrzajiByApartmanId(pronadjeni.get(i).getId());
			ApartmanResponse ar = new ApartmanResponse(pronadjeni.get(i), lr, sadrzaji);
			povratni.add(ar);
		}
		
		
		return g.toJson(povratni);
	};
	public static Route postRezervacija = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Rezervacija rez = g.fromJson(payload, Rezervacija.class);
		User u = UserRepository.getUserById(rez.getGostId());
		Apartman apartman = ApartmanRepository.getApartmanById(rez.getApartmanId());
		try {
		ApartmanRepository.proveriDostupnost(apartman.getId(), rez);
		}
		catch(Exception e) {
			e.printStackTrace();
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Zadati datumi su zauzeti.");
			return message ;
		}
		rez.setSlika(apartman.getSlike().get(0));
		RezervacijaRepository.addRezervacija(rez);
		u.getRezervacijeId().add(rez.getId());
		apartman.getRezervacijeId().add(rez.getId());
		ApartmanRepository.saveApartmani();
		UserRepository.saveUsers();
		JsonObject message = new JsonObject();
		message.addProperty("message", "Rezervacija je uspešno dodata.");	
		return message;
		
	};
	public static Route filtrirajApartmane = ((Request request, Response response) -> {
		response.type("application/json");
		String payloadSadrzaj = request.queryParams("sadrzaj");
		User u = UserRepository.getTrenutniUser();
		SadrzajiDTO sadrzajDTO = g.fromJson(payloadSadrzaj, SadrzajiDTO.class);
		ArrayList<Integer> sadrzajiId = sadrzajDTO.getSadrzaji();
		ArrayList<Sadrzaj> sadrzaji = new ArrayList<Sadrzaj>();
		for (int i : sadrzajiId) {
			Sadrzaj s = SadrzajRepository.getSadrzajById(i);
			sadrzaji.add(s);
		}
		String payloadTip = request.queryParams("tip");
		boolean tipPostoji = true;
		boolean tip = false;
		try {
			tip = g.fromJson(payloadTip, Boolean.class);
		}
		catch(Exception e) {
			tipPostoji = false;
		}
		ArrayList<Apartman> apartmaniPoSadrzaju = new ArrayList<Apartman>();
		if(u.getUloga().equals(Uloga.GOST)) {
			apartmaniPoSadrzaju = ApartmanRepository.getAktivniApartmani();
		}
		else {
			apartmaniPoSadrzaju = ApartmanRepository.getApartmani();
		}
		if(!(sadrzaji == null || sadrzaji.isEmpty())) {
			apartmaniPoSadrzaju = ApartmanRepository.getApartmaniBySadrzaj(sadrzaji,null);
		}
		ArrayList<Apartman> apartmaniPoTipu = new ArrayList<Apartman>();
		if(!tipPostoji == false) {
			apartmaniPoTipu = ApartmanRepository.getApartmaniByTip(tip, apartmaniPoSadrzaju);
		}
		else {
			apartmaniPoTipu = apartmaniPoSadrzaju;
		}
		ArrayList<ApartmanResponse> ret = convertToDTO(apartmaniPoTipu);
		return g.toJson(ret);
	});
	
	public static Route filtrirajDomacinApartmane = (Request request, Response response) -> {
		response.type("application/json");
		String payloadSadrzaj = request.queryParams("sadrzaj");
		SadrzajiDTO sadrzajDTO = g.fromJson(payloadSadrzaj, SadrzajiDTO.class);
		ArrayList<Integer> sadrzajiId = sadrzajDTO.getSadrzaji();
		ArrayList<Sadrzaj> sadrzaji = new ArrayList<Sadrzaj>();
		for (int i : sadrzajiId) {
			Sadrzaj s = SadrzajRepository.getSadrzajById(i);
			sadrzaji.add(s);
		}
		String payloadTip = request.queryParams("tip");
		boolean tipPostoji = true;
		boolean tip = false;
		try {
			tip = g.fromJson(payloadTip, Boolean.class);
		}
		catch(Exception e) {
			tipPostoji = false;
		}
		ArrayList<Apartman> pocetni = new ArrayList<Apartman>();
		for(int i : UserRepository.getTrenutniUser().getApartmaniId()) {
			if(ApartmanRepository.getApartmanById(i).isStatus() == false)
			pocetni.add(ApartmanRepository.getApartmanById(i));
		}
		ArrayList<ApartmanResponse> ret = convertToDTO(filter(pocetni,sadrzaji,tip,tipPostoji));
		return g.toJson(ret);
	};
	public static ArrayList<Apartman> filter(ArrayList<Apartman> pocetni, ArrayList<Sadrzaj> sadrzaji, boolean tip, boolean tipPostoji){
		if(!(sadrzaji == null || sadrzaji.isEmpty())) {
			pocetni = ApartmanRepository.getApartmaniBySadrzaj(sadrzaji,null);
		}
		ArrayList<Apartman> apartmaniPoTipu = new ArrayList<Apartman>();
		if(!tipPostoji == false) {
			apartmaniPoTipu = ApartmanRepository.getApartmaniByTip(tip, pocetni);
		}
		else {
			apartmaniPoTipu = pocetni;
		}
		return apartmaniPoTipu;
	}
	/*public static Route getApartmaniBySadrzaj = (Request request, Response response) -> {
		response.type("application/json");
		Set<String> payload = request.queryParams();
		ArrayList<Sadrzaj> sadrzaji = new ArrayList<Sadrzaj>();
		for (String temp : payload) {
			String sadrzaj =  request.queryParams(temp);
			sadrzaji.add(g.fromJson(sadrzaj, Sadrzaj.class));
		}
		ArrayList<Apartman> apartmani = ApartmanRepository.getApartmaniBySadrzaj(sadrzaji);
		ArrayList<ApartmanResponse> ret = convertToDTO(apartmani);
		return g.toJson(ret);
		
	};
	public static Route getApartmaniByTip = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.queryParams("value");
		boolean tip = g.fromJson(payload, Boolean.class);
		ArrayList<Apartman> apartmani = ApartmanRepository.getApartmaniByTip(tip);
		ArrayList<ApartmanResponse> ret = convertToDTO(apartmani);
		return g.toJson(ret);
	};*/
	public static ArrayList<Apartman> filterDown (ArrayList<Apartman> niz1, ArrayList<Apartman> niz2){
		if(niz2 == null || niz2.isEmpty()) {
			return niz1;
		}
		if(niz1 == null || niz1.isEmpty()) {
			return niz2;
		}
		ArrayList<Apartman> ret = new ArrayList<Apartman>();
		for(int i = 0; i < niz1.size(); i++) {
			for(int j = 0; j < niz2.size(); j++) {
				if(niz1.get(i).equals(niz2.get(i))) {
					ret.add(niz1.get(i));
				}
			}
		}
		return ret;
	}
	public static ArrayList<ApartmanResponse> convertToDTO(ArrayList<Apartman> pronadjeni){
		ArrayList<ApartmanResponse> povratni = new ArrayList<ApartmanResponse>();
		for(int i = 0; i < pronadjeni.size(); i++) {
			Lokacija l = LokacijaRepository.getLokacijaById(pronadjeni.get(i).getLokacijaId());
			Adresa a = AdresaRepository.getAdresaById(l.getAdresa());
			LokacijaResponse lr = new LokacijaResponse(l,a);
			ArrayList<Sadrzaj> sadrzaji = ApartmanRepository.getSadrzajiByApartmanId(pronadjeni.get(i).getId());
			ApartmanResponse ar = new ApartmanResponse(pronadjeni.get(i), lr, sadrzaji);
			povratni.add(ar);
		}
		return povratni;
	}
	
	public static ArrayList<String> saveImages(ArrayList<String> slike){
		ArrayList<String> slike1 = new ArrayList<String>();
		for(int i = 0; i < slike.size(); i++) {
			String base64String = slike.get(i);
	        String[] strings = base64String.split(",");
	        String extension;
	        switch (strings[0]) {//check image's extension
	            case "data:image/jpeg;base64":
	                extension = "jpeg";
	                break;
	            case "data:image/png;base64":
	                extension = "png";
	                break;
	            default://should write cases for more images types
	                extension = "jpg";
	                break;
	        }
	        //convert base64 string to binary data
	        byte[] data = Base64.getDecoder().decode(strings[1]);
	        String s = randomString();
	        String path = System.getProperty("user.dir") + "/static/images/"+ s + "." + extension;
	        File file = new File(path);
	        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
	            outputStream.write(data);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
			
			slike1.add("/images/"+ s + "." + extension);
		}
		return slike1;
	}
	public static String randomString() {
	    int leftLimit = 48; // numeral '0'
	    int rightLimit = 122; // letter 'z'
	    int targetStringLength = 10;
	    Random random = new Random();

	    String generatedString = random.ints(leftLimit, rightLimit + 1)
	      .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
	      .limit(targetStringLength)
	      .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
	      .toString();

	   return generatedString;
	}

	
}
