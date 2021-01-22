package repositories;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.file.Files;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Adresa;
import beans.User;

public class UserRepository {
	private static ArrayList<User> users;
	private final static String PATH = "database/users.json";
	private static Gson gson = new Gson();
	private static int globalId = 0;
	
	public static void loadUsers() throws IOException
	{
		Reader reader = Files.newBufferedReader(Paths.get(PATH));
		users = new ArrayList<User>();
		Type collectionType = new TypeToken<ArrayList<User>>(){}.getType();
		users = gson.fromJson(reader, collectionType);
		if(users == null) {
			users = new ArrayList<User>();
			globalId = 0;
		}
		else {
		globalId = users.get(users.size() - 1).getId() + 1;
		}
		reader.close();
	}
	public static void saveUsers() throws IOException {
		Writer writer = Files.newBufferedWriter(Paths.get(PATH));
		String s = gson.toJson(users);
		writer.write(s);
		writer.close();
	}
	public static User findOne(String username) {
		for(User u: users) {
			if(u.getUsername().equals(username)) {
				return u;
		}
		}
		return null;
		
	}
	public static User getUserById(Integer id) {
		for(User u: users) {
			if(u.getId() == id) {
				return u;
		}
		}
		return null;
		
	}
	public static User addUser(User user) throws Exception {
		if(findOne(user.getUsername()) != null) {
			throw new Exception("Korisnik sa datim korisničkim imenom već postoji.");
		}
		else {
			user.setId(globalId);
			globalId++;
			users.add(user);
			try {
				saveUsers();
				return user;
			}
			catch(Exception e) {
				throw new Exception("Čuvanje nije uspelo.");
			}
		}
		
	}
	public static User editUser(User user) throws Exception {
		User stari = findOne(user.getUsername());
		stari.setIme(user.getIme());
		stari.setPrezime(user.getPrezime());
		stari.setLozinka(user.getLozinka());
		stari.setPol(user.isPol());
		stari.setUloga(user.getUloga());
		try {
			saveUsers();
			return stari;
		} catch (IOException e) {
			throw new Exception("Čuvanje nije uspelo.");
		}
	}
	public static ArrayList<User> getUsers(){
		return users;
	}
	public static String getPath() {
		return PATH;
	}
	public Gson getGson() {
		return gson;
	}
}
