package repositories;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Apartman;
import beans.Rezervacija;
import beans.Sadrzaj;
import beans.User;


public class ApartmanRepository {
	
	private static ArrayList<Apartman> apartmani;
	private final static String PATH = "database/apartmani.json";
	private static Gson gson = new Gson();
	private static int globalId = 0;
	
	public static void loadApartmani() throws IOException {
		Reader reader = Files.newBufferedReader(Paths.get(PATH));
		Type collectionType = new TypeToken<ArrayList<Apartman>>(){}.getType();
		//if(gson.fromJson(reader, collectionType) != null) {
		apartmani = gson.fromJson(reader, collectionType);
		if(apartmani == null) {
			apartmani = new ArrayList<Apartman>();
			globalId = 0;
		}
		else {
		globalId = apartmani.get(apartmani.size() - 1).getId() + 1;
		}
		//}
		reader.close();
	}
	
	public static ArrayList<Apartman> getApartmani() {
		return apartmani;
	}
	public static ArrayList<Apartman> getAktivniApartmani(){
		ArrayList<Apartman> ret = new ArrayList<Apartman>();
		for(Apartman a : apartmani) {
			if(a.isStatus() == false) {
				ret.add(a);
			}
		}
		return ret;
	}
	public static ArrayList<Apartman> getNeaktivniApartmani(){
		ArrayList<Apartman> ret = new ArrayList<Apartman>();
		for(Apartman a : apartmani) {
			if(a.isStatus() == true) {
				ret.add(a);
			}
		}
		return ret;
	}
	public static ArrayList<Apartman> getDomacinAktivniApartmani(String domacin){
		ArrayList<Apartman> ret = new ArrayList<Apartman>();
		for(Apartman a : apartmani) {
			if(a.getDomacinUsername().equals(domacin) && a.isStatus() == false) {
				ret.add(a);
			}
		}
		return ret;
	}
	public static ArrayList<Apartman> getDomacinNeaktivniApartmani(String domacin){
		ArrayList<Apartman> ret = new ArrayList<Apartman>();
		for(Apartman a : apartmani) {
			if(a.getDomacinUsername().equals(domacin) && a.isStatus() == true) {
				ret.add(a);
			}
		}
		return ret;
	}
	public static void setApartmani(ArrayList<Apartman> apartmani) {
		ApartmanRepository.apartmani = apartmani;
	}

	public static void saveApartmani() throws IOException {
		Writer writer = Files.newBufferedWriter(Paths.get(PATH));
		String s = gson.toJson(apartmani);
		writer.write(s);
		writer.close();
	}
	public static void addApartman(Apartman a) throws IOException {
		a.setId(globalId);
		globalId++;
		apartmani.add(a);
		saveApartmani();
	}
	public static void addRezervacijaToApartman(int apartmanId, Rezervacija rez) throws Exception {
		Apartman a = ApartmanRepository.getApartmanById(apartmanId);
		ArrayList<Integer> rezervacije = a.getRezervacijeId();

		int brojNocenja = rez.getBrojNocenja();
		Date pocetniDatum = new Date(rez.getPocetniDatum());
		ArrayList<Long> datumi = (ArrayList<Long>) a.getDatumi().clone();
		
		int brojac = 0;
		
		for(int i = 0; i < brojNocenja; i++) {
			Calendar c = Calendar.getInstance(); 
			c.setTime(pocetniDatum); 
			c.add(Calendar.DATE, i);
			long datumLong = c.getTime().getTime();
			for(int j = 0; j < a.getDatumi().size(); j++) {
				if(a.getDatumi().get(j) == datumLong) {
					a.getDatumi().remove(j);
					brojac++;
					System.out.println(brojac);
				}
			}
		}
		if(brojac == brojNocenja) {
			rezervacije.add(rez.getId());
			saveApartmani();
		}
		else {
			a.setDatumi(datumi);
			throw new Exception();
		}
	}
	public static boolean proveriDostupnost(int apartmanId, Rezervacija rez) throws Exception {
		Apartman a = ApartmanRepository.getApartmanById(apartmanId);

		int brojNocenja = rez.getBrojNocenja();
		Date pocetniDatum = new Date(rez.getPocetniDatum());
		ArrayList<Long> datumi = (ArrayList<Long>) a.getDatumi().clone();
		
		int brojac = 0;
		
		for(int i = 0; i < brojNocenja; i++) {
			Calendar c = Calendar.getInstance(); 
			c.setTime(pocetniDatum); 
			c.add(Calendar.DATE, i);
			long datumLong = c.getTime().getTime();
			for(int j = 0; j < a.getDatumi().size(); j++) {
				if(a.getDatumi().get(j) == datumLong) {
					brojac++;
				}
			}
		}
		if(brojac == brojNocenja) {
			return true;
		}
		else {
			a.setDatumi(datumi);
			throw new Exception();
		}
	}
	public static void otkaziRezervaciju(Apartman a, Rezervacija r) throws IOException {
		Date pocetniDatum = new Date(r.getPocetniDatum());
		int brojNocenja = r.getBrojNocenja();
		Calendar c = Calendar.getInstance();
		c.setTime(pocetniDatum);
		for(int i = 0; i < brojNocenja; i++) {
			long datumLong = c.getTime().getTime();
			a.getDatumi().add(datumLong);
			c.add(Calendar.DATE, 1);
		}
		saveApartmani();
	}
	public static Apartman getApartmanById(int id) {
		for(int i = 0; i < apartmani.size(); i++) {
			if(apartmani.get(i).getId() == id) {
				return apartmani.get(i);
			}
		}
		return null;
	}
	public static ArrayList<Apartman> getApartmanByGrad(String grad, ArrayList<Apartman> ulazni) {
		if(ulazni == null || ulazni.isEmpty()) {
			ulazni = getAktivniApartmani();
		}
		ArrayList<Apartman> a = new ArrayList<Apartman>();
		for(int i = 0; i < ulazni.size(); i++) {
			if(AdresaRepository.getAdresaById(LokacijaRepository.getLokacijaById(ulazni.get(i).getLokacijaId()).getAdresa()).getGrad().equalsIgnoreCase(grad)) {
				a.add(ulazni.get(i));
			}
		}
		return a;
	}
	public static ArrayList<Apartman> getApartmanByDatumi(long datumOd, long datumDo, ArrayList<Apartman> ulazni){
		if(ulazni == null || ulazni.isEmpty()) {
			ulazni = getAktivniApartmani();
		}
		ArrayList<Apartman> ret = new ArrayList<Apartman>();
		Date startDate = new Date(datumOd);
		Date endDate = new Date(datumDo);
	    List<Date> datesInRange = new ArrayList<>();
	    Calendar calendar = new GregorianCalendar();
	    calendar.setTime(startDate);
	    
	    Calendar endCalendar = new GregorianCalendar();
	    endCalendar.setTime(endDate);

	    while (calendar.before(endCalendar)) {
	        Date result = calendar.getTime();
	        datesInRange.add(result);
	        System.out.println("dodao");
	        calendar.add(Calendar.DATE, 1);
	    }
	    for(int i = 0; i < ulazni.size(); i++) {
	    	Apartman a = ulazni.get(i);
	    	int brojac = 0;
		    for(int j = 0; j < datesInRange.size(); j++) {
		    	long date = datesInRange.get(j).getTime();
		    	if(ulazni.get(i).getDatumi().contains(date)) {
		    		System.out.println(date);
		    		brojac++;
		    		System.out.println(brojac);
		    	}
		    }
		    if(brojac == datesInRange.size()) {
		    	System.out.println(brojac + " brojac");
		    	System.out.println(datesInRange.size() + " velicina");
		    	ret.add(a);
		    }
	    }
	    return ret;
	}
	public static ArrayList<Apartman> getApartmanByCena(double cenaOd, double cenaDo, ArrayList<Apartman> ulazni){
		if(ulazni == null || ulazni.isEmpty()) {
			ulazni = getAktivniApartmani();
		}
		ArrayList<Apartman> pronadjeni = new ArrayList<Apartman>();
		for(int i = 0; i < ulazni.size(); i++) {
			if(cenaOd <= ulazni.get(i).getCenaPoNoci() && ulazni.get(i).getCenaPoNoci() <= cenaDo) {
				pronadjeni.add(ulazni.get(i));
			}
		}
		return pronadjeni;
	}
	public static ArrayList<Apartman> getApartmanByBrojSoba(int minSoba, int maxSoba, ArrayList<Apartman> ulazni){
		if(ulazni == null || ulazni.isEmpty()) {
			ulazni = getAktivniApartmani();
		}
		ArrayList<Apartman> pronadjeni = new ArrayList<Apartman>();
		for(int i = 0; i < ulazni.size(); i++) {
			if(minSoba <= ulazni.get(i).getBrojSoba() && ulazni.get(i).getBrojSoba() <= maxSoba) {
				pronadjeni.add(ulazni.get(i));
			}
		}
		return pronadjeni;
	}
	public static ArrayList<Apartman> getApartmanByBrojGostiju(int brojGostiju, ArrayList<Apartman> ulazni){
		if(ulazni == null || ulazni.isEmpty()) {
			ulazni = getAktivniApartmani();
		}
		ArrayList<Apartman> pronadjeni = new ArrayList<Apartman>();
		for(int i = 0; i < ulazni.size(); i++) {
			if(ulazni.get(i).getBrojGostiju() == brojGostiju) {
				pronadjeni.add(ulazni.get(i));
			}
		}
		return pronadjeni;
	}
	public static ArrayList<Sadrzaj> getSadrzajiByApartmanId(int id){
		Apartman a = getApartmanById(id);
		ArrayList<Sadrzaj> s = new ArrayList<Sadrzaj>();
		for(int i = 0; i < a.getSadrzajiId().size(); i++) {
			s.add(SadrzajRepository.getSadrzajById(a.getSadrzajiId().get(i)));
		}
		return s;
	}
	public static ArrayList<Apartman> getApartmaniBySadrzaj(ArrayList<Sadrzaj> sadrzaji, ArrayList<Apartman> ulazni){
		if(ulazni == null || ulazni.isEmpty()) {
			ulazni = getAktivniApartmani();
		}
		int potrebanBroj = sadrzaji.size();
		ArrayList<Apartman> ret = new ArrayList<Apartman>();
		for(int i = 0; i < ulazni.size(); i++) {
			int broj = 0;
			for(int j = 0; j < sadrzaji.size(); j++) {
				for(int k = 0; k < ulazni.get(i).getSadrzajiId().size(); k++) {
					if(sadrzaji.get(j).getId() == ulazni.get(i).getSadrzajiId().get(k)) {
						broj++;
					}
				}
			}
			if(broj == potrebanBroj)
				ret.add(ulazni.get(i));
		}
		return ret;
	}
	public static ArrayList<Apartman> getApartmaniByTip(boolean tip, ArrayList<Apartman> ulazni){
		if(ulazni == null || ulazni.isEmpty()) {
			ulazni = getAktivniApartmani();
		}
		ArrayList<Apartman> ret = new ArrayList<Apartman>();
		for(int i = 0; i < ulazni.size(); i++) {
			if(ulazni.get(i).isTip() == tip) {
				ret.add(ulazni.get(i));
			}
		}
		return ret;
	}
	

}
