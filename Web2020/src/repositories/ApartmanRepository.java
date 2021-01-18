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
	public static ArrayList<Apartman> getApartmanByGrad(String grad) {
		ArrayList<Apartman> a = new ArrayList<Apartman>();
		for(int i = 0; i < apartmani.size(); i++) {
			if(AdresaRepository.getAdresaById(LokacijaRepository.getLokacijaById(apartmani.get(i).getLokacijaId()).getAdresa()).getGrad().equals(grad)) {
				a.add(apartmani.get(i));
			}
		}
		return a;
	}
	public static ArrayList<Apartman> getApartmanByCena(double cenaOd, double cenaDo){
		ArrayList<Apartman> pronadjeni = new ArrayList<Apartman>();
		for(int i = 0; i < apartmani.size(); i++) {
			if(cenaOd <= apartmani.get(i).getCenaPoNoci() && apartmani.get(i).getCenaPoNoci() <= cenaDo) {
				pronadjeni.add(apartmani.get(i));
			}
		}
		return pronadjeni;
	}
	public static ArrayList<Apartman> getApartmanByBrojSoba(int minSoba, int maxSoba){
		ArrayList<Apartman> pronadjeni = new ArrayList<Apartman>();
		for(int i = 0; i < apartmani.size(); i++) {
			if(minSoba <= apartmani.get(i).getBrojSoba() && apartmani.get(i).getBrojSoba() <= maxSoba) {
				pronadjeni.add(apartmani.get(i));
			}
		}
		return pronadjeni;
	}
	public static ArrayList<Apartman> getApartmanByBrojGostiju(int brojGostiju){
		ArrayList<Apartman> pronadjeni = new ArrayList<Apartman>();
		for(int i = 0; i < apartmani.size(); i++) {
			if(apartmani.get(i).getBrojGostiju() == brojGostiju) {
				pronadjeni.add(apartmani.get(i));
			}
		}
		return pronadjeni;
	}
	

}
