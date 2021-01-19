package repositories;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Apartman;
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
			ulazni = apartmani;
		}
		ArrayList<Apartman> a = new ArrayList<Apartman>();
		for(int i = 0; i < ulazni.size(); i++) {
			if(AdresaRepository.getAdresaById(LokacijaRepository.getLokacijaById(ulazni.get(i).getLokacijaId()).getAdresa()).getGrad().equalsIgnoreCase(grad)) {
				a.add(ulazni.get(i));
			}
		}
		return a;
	}
	public static ArrayList<Apartman> getApartmanByCena(double cenaOd, double cenaDo, ArrayList<Apartman> ulazni){
		if(ulazni == null || ulazni.isEmpty()) {
			ulazni = apartmani;
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
			ulazni = apartmani;
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
			ulazni = apartmani;
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
	public static ArrayList<Apartman> getApartmaniBySadrzaj(ArrayList<Sadrzaj> sadrzaji){
		int potrebanBroj = sadrzaji.size();
		ArrayList<Apartman> ret = new ArrayList<Apartman>();
		for(int i = 0; i < apartmani.size(); i++) {
			int broj = 0;
			for(int j = 0; j < sadrzaji.size(); j++) {
				for(int k = 0; k < apartmani.get(i).getSadrzajiId().size(); k++) {
					if(sadrzaji.get(j).getId() == apartmani.get(i).getSadrzajiId().get(k)) {
						broj++;
					}
				}
			}
			if(broj == potrebanBroj)
				ret.add(apartmani.get(i));
		}
		return ret;
	}
	public static ArrayList<Apartman> getApartmaniByTip(boolean tip){
		ArrayList<Apartman> ret = new ArrayList<Apartman>();
		for(int i = 0; i < apartmani.size(); i++) {
			if(apartmani.get(i).isTip() == tip) {
				ret.add(apartmani.get(i));
			}
		}
		return ret;
	}
	

}
