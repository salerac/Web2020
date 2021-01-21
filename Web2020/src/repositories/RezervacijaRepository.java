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
import beans.Rezervacija;
import beans.Status;

public class RezervacijaRepository {
	
	private static ArrayList<Rezervacija> rezervacije;
	private final static String PATH = "database/rezervacije.json";
	private static Gson gson = new Gson();
	private static int globalId = 0;
	
	public static void loadRezervacije() throws IOException {
		Reader reader = Files.newBufferedReader(Paths.get(PATH));
		Type collectionType = new TypeToken<ArrayList<Rezervacija>>(){}.getType();
		rezervacije = gson.fromJson(reader, collectionType);
		if(rezervacije == null) {
			rezervacije = new ArrayList<Rezervacija>();
			globalId = 0;
		}
		else {
		globalId = rezervacije.get(rezervacije.size() - 1).getId() + 1;
		}
		reader.close();
	}
	public static void saveRezervacije() throws IOException {
		Writer writer = Files.newBufferedWriter(Paths.get(PATH));
		String s = gson.toJson(rezervacije);
		writer.write(s);
		writer.close();
	}
	public static void addRezervacija(Rezervacija r) throws IOException {
		r.setId(globalId);
		r.setStatus(Status.KREIRANA);
		globalId++;
		rezervacije.add(r);
		saveRezervacije();
	}
	
	public static ArrayList<Rezervacija> getRezervacije(){
		return rezervacije;
	}
	
	public static Rezervacija getRezervacijaById(int id) {
		for(int i = 0; i < rezervacije.size(); i++) {
			if(rezervacije.get(i).getId() == id) {
				return rezervacije.get(i);
			}
		}
		return null;
	}

}
