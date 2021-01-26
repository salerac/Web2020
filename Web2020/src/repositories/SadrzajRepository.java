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

public class SadrzajRepository {
	private static ArrayList<Sadrzaj> sadrzaji = new ArrayList<Sadrzaj>();
	private static ArrayList<Sadrzaj> obrisani;
	private final static String PATH = "database/sadrzaji.json";
	private static Gson gson = new Gson();
	private static int globalId = 0;
	
	public static void loadSadrzaji() throws IOException {
		Reader reader = Files.newBufferedReader(Paths.get(PATH));
		Type collectionType = new TypeToken<ArrayList<Sadrzaj>>(){}.getType();
		sadrzaji = gson.fromJson(reader, collectionType);
		if(sadrzaji == null || sadrzaji.isEmpty()) {
			sadrzaji = new ArrayList<Sadrzaj>();
			globalId = 0;
		}
		else {
		globalId = getId(sadrzaji) + 1;
		}
		obrisani = new ArrayList<Sadrzaj>();
		ArrayList<Sadrzaj> toRemove = new ArrayList<Sadrzaj>();
		for(Sadrzaj s : sadrzaji) {
			if(s.isObrisan()) {
				obrisani.add(s);
				toRemove.add(s);
			}
		}
		sadrzaji.removeAll(toRemove);
		reader.close();
	}
	public static void saveSadrzaji() throws IOException {
		Writer writer = Files.newBufferedWriter(Paths.get(PATH));
		sadrzaji.addAll(obrisani);
		String s = gson.toJson(sadrzaji);
		writer.write(s);
		writer.close();
		loadSadrzaji();
	}
	
	public static void addSadrzaj(Sadrzaj s) throws IOException {
		s.setId(globalId);
		globalId++;
		sadrzaji.add(s);
		saveSadrzaji();
	}
	
	public static ArrayList<Sadrzaj> getSadrzaji(){
		return sadrzaji;
	}
	public static Sadrzaj getSadrzajById(int id){
		/*for(Sadrzaj s : sadrzaji) {
			if(s.getId() == id) {
				return sadrzaji.get(sadrzaji.indexOf(s));
			}
		}*/
		for(int i = 0; i < sadrzaji.size(); i++) {
			if(sadrzaji.get(i).getId() == id) {
				return sadrzaji.get(i);
			}
		}
		return null;
	}
	public static int getId(ArrayList<Sadrzaj> sadrzaji) {
		int ret = 0;
		for(Sadrzaj s: sadrzaji) {
			if(s.getId() > ret) {
				ret = s.getId();
			}
		}
		return ret;
	}
}
