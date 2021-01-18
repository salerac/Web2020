package services;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Random;

import com.google.gson.Gson;

import beans.Adresa;
import beans.Apartman;
import beans.Lokacija;
import dto.ApartmanDTO;
import dto.SearchDTO;
import dto.ApartmanResponse;
import dto.LokacijaResponse;
import repositories.AdresaRepository;
import repositories.ApartmanRepository;
import repositories.LokacijaRepository;
import spark.Request;
import spark.Response;
import spark.Route;

public class ApartmanService{
	private static Gson g = new Gson();
	
	public static Route addApartman = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		ApartmanDTO a = g.fromJson(payload, ApartmanDTO.class);
		
		ArrayList<String> slike = saveImages(a.getSlike());
		
		Adresa adresa = new Adresa(a.getUlica(), a.getBroj(), a.getGrad(), a.getPostanskiBroj());
		AdresaRepository.addAdresa(adresa);
		
		Lokacija lokacija = new Lokacija(a.getLokacija());
		LokacijaRepository.addLokacija(lokacija);
		lokacija.setAdresa(adresa.getId());
		
		Apartman apartman = new Apartman(a.getTip(), a.getBrojSoba(), a.getBrojGostiju(), lokacija.getId(),
				a.getDatumi(), slike, a.getCena(), a.getVremePrijave(), a.getVremeOdjave(), a.getSadrzaj());
		ApartmanRepository.addApartman(apartman);
		
		return request;
		
	};
	
	public static Route searchApartman = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		SearchDTO search = g.fromJson(payload, SearchDTO.class);
		ArrayList<Apartman> pronadjeni = new ArrayList<Apartman>();
		ArrayList<ApartmanResponse> povratni = new ArrayList<ApartmanResponse>();
		
		String grad = search.getLokacija();
		ArrayList<Apartman> apartmaniPoGradu = ApartmanRepository.getApartmanByGrad(grad);
		
		long datumPrijave = search.getDatumPrijave();
		long datumOdjave = search.getDatumOdjave();
		
		double cenaOd = search.getCenaOd();
		double cenaDo = search.getCenaDo();
		ArrayList<Apartman> apartmaniPoCeni = ApartmanRepository.getApartmanByCena(cenaOd, cenaDo);
		
		int sobeOd = search.getSobeOd();
		int sobeDo = search.getSobeDo();
		ArrayList<Apartman> apartmaniPoBrojuSoba = ApartmanRepository.getApartmanByBrojSoba(sobeOd, sobeDo);
		
		int brojGostiju = search.getBrojGostiju();
		ArrayList<Apartman> apartmaniPoBrojuGostiju = ApartmanRepository.getApartmanByBrojGostiju(brojGostiju);
		
		pronadjeni.addAll(apartmaniPoGradu);
		pronadjeni.addAll(apartmaniPoCeni);
		pronadjeni.addAll(apartmaniPoBrojuSoba);
		pronadjeni.addAll(apartmaniPoBrojuGostiju);
		for(int i = 0; i < pronadjeni.size(); i++) {
			Lokacija l = LokacijaRepository.getLokacijaById(pronadjeni.get(i).getLokacijaId());
			Adresa a = AdresaRepository.getAdresaById(l.getAdresa());
			LokacijaResponse lr = new LokacijaResponse(l,a);
			ApartmanResponse ar = new ApartmanResponse(pronadjeni.get(i), lr);
			povratni.add(ar);
		}
		
		
		return g.toJson(povratni);
	};
	
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
