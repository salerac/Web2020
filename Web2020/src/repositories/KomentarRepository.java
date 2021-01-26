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

import beans.Komentar;

public class KomentarRepository {
	private static ArrayList<Komentar> komentari;
	private final static String PATH = "database/komentari.json";
	private static Gson gson = new Gson();
	private static int globalId = 0;
	
	public static void loadKomentari() throws IOException {
		Reader reader = Files.newBufferedReader(Paths.get(PATH));
		Type collectionType = new TypeToken<ArrayList<Komentar>>(){}.getType();
		komentari = gson.fromJson(reader, collectionType);
		if(komentari == null || komentari.isEmpty()) {
			komentari = new ArrayList<Komentar>();
			globalId = 0;
		}
		else {
		globalId = komentari.get(komentari.size() - 1).getId() + 1;
		}
		reader.close();
	}
	public static void saveKomentari() throws IOException {
		Writer writer = Files.newBufferedWriter(Paths.get(PATH));
		String s = gson.toJson(komentari);
		writer.write(s);
		writer.close();
	}
	public static void addKomentar(Komentar k) throws IOException {
		k.setId(globalId);
		globalId++;
		komentari.add(k);
		saveKomentari();
	}
	
	public static ArrayList<Komentar> getKomentari(){
		return komentari;
	}
	
	public static Komentar getKomentariById(int id) {
		for(int i = 0; i < komentari.size(); i++) {
			if(komentari.get(i).getId() == id) {
				return komentari.get(i);
			}
		}
		return null;
	}
}
