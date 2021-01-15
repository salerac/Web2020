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
		apartmani = new ArrayList<Apartman>();
		Type collectionType = new TypeToken<ArrayList<Apartman>>(){}.getType();
		if(gson.fromJson(reader, collectionType) != null) {
			apartmani = gson.fromJson(reader, collectionType);
		}
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

}
