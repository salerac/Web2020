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
	private final static String PATH = "database/sadrzaji.json";
	private static Gson gson = new Gson();
	private static int globalId = 0;
	
	public static void loadSadrzaji() throws IOException {
		Reader reader = Files.newBufferedReader(Paths.get(PATH));
		Type collectionType = new TypeToken<ArrayList<Sadrzaj>>(){}.getType();
		sadrzaji = gson.fromJson(reader, collectionType);
		if(sadrzaji == null) {
			sadrzaji = new ArrayList<Sadrzaj>();
			globalId = 0;
		}
		else {
		globalId = sadrzaji.get(sadrzaji.size() - 1).getId() + 1;
		}
		reader.close();
	}
	public static void saveSadrzaji() throws IOException {
		Writer writer = Files.newBufferedWriter(Paths.get(PATH));
		String s = gson.toJson(sadrzaji);
		writer.write(s);
		writer.close();
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
}
