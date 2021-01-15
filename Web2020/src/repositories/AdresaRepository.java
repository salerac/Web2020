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

import beans.Adresa;

public class AdresaRepository {
	
	private static ArrayList<Adresa> adrese;
	private final static String PATH = "database/adrese.json";
	private static Gson gson = new Gson();
	private static int globalId = 0;
	
	public static void loadAdrese() throws IOException {
		Reader reader = Files.newBufferedReader(Paths.get(PATH));
		adrese = new ArrayList<Adresa>();
		Type collectionType = new TypeToken<ArrayList<Adresa>>(){}.getType();
		adrese = gson.fromJson(reader, collectionType);
		reader.close();
	}
	public static void saveAdrese() throws IOException {
		Writer writer = Files.newBufferedWriter(Paths.get(PATH));
		String s = gson.toJson(adrese);
		writer.write(s);
		writer.close();
	}
	public static void addAdresa(Adresa a) throws IOException {
		a.setId(globalId);
		globalId++;
		adrese.add(a);
		saveAdrese();
	}
	
	public static ArrayList<Adresa> getAdrese(){
		return adrese;
	}
}
