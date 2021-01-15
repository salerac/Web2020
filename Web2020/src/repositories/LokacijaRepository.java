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

import beans.Lokacija;

public class LokacijaRepository {
	private static ArrayList<Lokacija> lokacije;
	private final static String PATH = "database/lokacije.json";
	private static Gson gson = new Gson();
	private static int globalId = 0;
	
	public static void loadLokacije() throws IOException {
		Reader reader = Files.newBufferedReader(Paths.get(PATH));
		lokacije = new ArrayList<Lokacija>();
		Type collectionType = new TypeToken<ArrayList<Lokacija>>(){}.getType();
		lokacije = gson.fromJson(reader, collectionType);
		reader.close();
	}
	public static void saveLokacije() throws IOException {
		Writer writer = Files.newBufferedWriter(Paths.get(PATH));
		String s = gson.toJson(lokacije);
		writer.write(s);
		writer.close();
	}
	public static void addLokacija(Lokacija l) throws IOException {
		l.setId(globalId);
		globalId++;
		lokacije.add(l);
		saveLokacije();
	}
	
	public static ArrayList<Lokacija> getLokacija(){
		return lokacije;
	}
}
