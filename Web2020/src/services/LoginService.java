package services;

import java.security.Key;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import beans.User;
import dto.UserDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import repositories.UserRepository;
import spark.Request;
import spark.Response;
import spark.Route;

public class LoginService {
	
	private static Gson g = new Gson();
	static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
	public static Route handleLogin = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		User u = g.fromJson(payload, User.class);
		User storedUser = UserRepository.findOne(u.getUsername());
		if(storedUser != null && storedUser.getLozinka().equals(u.getLozinka())) {
		Date date = new Date();
		String jws = Jwts.builder().setSubject(u.getUsername()).setExpiration(new Date(date.getTime() + 1000*10000L)).setIssuedAt(date).signWith(key).compact();
		System.out.println("Returned JWT: " + jws);
		UserDTO dto = new UserDTO(u, jws);
		return g.toJson(dto);
		}
		else {
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Uneti podaci nisu ispravni.");
			return message ;
		}
	};
}
