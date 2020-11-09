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

import beans.User;

public class UserRepository {
	private static ArrayList<User> users;
	private final static String PATH = "database/users.json";
	private static Gson gson = new Gson();
	
	public static void loadUsers() throws IOException
	{
		Reader reader = Files.newBufferedReader(Paths.get(PATH));
		users = new ArrayList<User>();
		Type collectionType = new TypeToken<ArrayList<User>>(){}.getType();
		users = gson.fromJson(reader, collectionType);
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
