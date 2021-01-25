package services;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import beans.Uloga;
import beans.User;
import beans.Apartman;
import beans.Rezervacija;
import beans.Status;
import dto.EditUserDTO;
import dto.OdustanakDTO;
import dto.RezervacijaSearchDTO;
import dto.UserDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import repositories.ApartmanRepository;
import repositories.RezervacijaRepository;
import repositories.UserRepository;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Route;
import static spark.Spark.halt;
public class LoginService {
	
	private static Gson g = new Gson();
	private static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
	public static Route handleLogin = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		User u = g.fromJson(payload, User.class);
		User storedUser = UserRepository.findOne(u.getUsername());
		if(storedUser != null && storedUser.getLozinka().equals(u.getLozinka())) {
		Date date = new Date();
		String jws = Jwts.builder().setSubject(u.getUsername()).setExpiration(new Date(date.getTime() + 1000*10000L)).setIssuedAt(date).signWith(key).compact();
		System.out.println("Returned JWT: " + jws);
		UserDTO dto = new UserDTO(storedUser, jws);
		return g.toJson(dto);
		}
		else {
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Uneti podaci nisu ispravni.");
			return message ;
		}
	};
	public static Route registerGost = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		User u = g.fromJson(payload, User.class);
		u.setRezervacijeId(new ArrayList<Integer>());
		u.setUloga(Uloga.GOST);
		try {
			UserRepository.addUser(u);
			return g.toJson(u);
		}
		catch(Exception e) {
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", e.getMessage());	
			return message;
		}
	};
	public static Route editUser = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		EditUserDTO u = g.fromJson(payload, EditUserDTO.class);
		//User user = UserRepository.findOne(u.getUsername());
		User user = UserRepository.getTrenutniUser();
		if(!user.getUloga().equals(Uloga.GOST)) {
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Korisnik nije gost.");	
			return message;
		}
		if(!user.getLozinka().equals(u.getStaraLozinka())) {
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Niste uneli dobru lozinku.");	
			return message;
		}
		else {
			User novi = new User();
			novi.setUsername(u.getUsername());
			novi.setIme(u.getIme());
			novi.setPrezime(u.getPrezime());
			if(u.getLozinka() != null && !u.getLozinka().equals("")) {
			novi.setLozinka(u.getLozinka());
			}
			else {
				novi.setLozinka(user.getLozinka());
			}
			novi.setPol(u.isPol());
			novi.setUloga(u.getUloga());
			User ret = UserRepository.editUser(novi);
			return g.toJson(new UserDTO(ret, u.getJwt()));
		}
		
	};
	public static Route editDomacin = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		EditUserDTO u = g.fromJson(payload, EditUserDTO.class);
		//User user = UserRepository.findOne(u.getUsername());
		User user = UserRepository.getTrenutniUser();
		if(!user.getUloga().equals(Uloga.DOMACIN)) {
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Korisnik nije domacin.");	
			return message;
		}
		if(!user.getLozinka().equals(u.getStaraLozinka())) {
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Niste uneli dobru lozinku.");	
			return message;
		}
		else {
			User novi = new User();
			novi.setUsername(u.getUsername());
			novi.setIme(u.getIme());
			novi.setPrezime(u.getPrezime());
			if(u.getLozinka() != null && !u.getLozinka().equals("")) {
			novi.setLozinka(u.getLozinka());
			}
			else {
				novi.setLozinka(user.getLozinka());
			}
			novi.setPol(u.isPol());
			novi.setUloga(u.getUloga());
			User ret = UserRepository.editUser(novi);
			return g.toJson(new UserDTO(ret, u.getJwt()));
		}
		
	};
	public static Route editAdmin = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		EditUserDTO u = g.fromJson(payload, EditUserDTO.class);
		//User user = UserRepository.findOne(u.getUsername());
		User user = UserRepository.getTrenutniUser();
		if(!user.getUloga().equals(Uloga.ADMINISTRATOR)) {
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Korisnik nije administrator.");	
			return message;
		}
		if(!user.getLozinka().equals(u.getStaraLozinka())) {
			response.status(401);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Niste uneli dobru lozinku.");	
			return message;
		}
		else {
			User novi = new User();
			novi.setUsername(u.getUsername());
			novi.setIme(u.getIme());
			novi.setPrezime(u.getPrezime());
			if(u.getLozinka() != null && !u.getLozinka().equals("")) {
			novi.setLozinka(u.getLozinka());
			}
			else {
				novi.setLozinka(user.getLozinka());
			}
			novi.setPol(u.isPol());
			novi.setUloga(u.getUloga());
			User ret = UserRepository.editUser(novi);
			return g.toJson(new UserDTO(ret, u.getJwt()));
		}
		
	};
	public static Route getGostRezervacije = (Request request, Response response) -> {
		response.type("application/json");
		User u = UserRepository.getTrenutniUser();
		ArrayList<Integer> rezId = u.getRezervacijeId();
		ArrayList<Rezervacija> ret = new ArrayList<Rezervacija>();
		for(int i : rezId) {
			Rezervacija r = RezervacijaRepository.getRezervacijaById(i);
			ret.add(r);
		}
		return g.toJson(ret);
	};
	public static Route pretraziDomacinKorisnike = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		RezervacijaSearchDTO dto = g.fromJson(payload, RezervacijaSearchDTO.class);
		ArrayList<User> ret = new ArrayList<User>();
		try {
		ArrayList<Rezervacija> rezDomacin = RezervacijaRepository.getRezervacijeByDomacinId(UserRepository.getTrenutniUser().getId());
		ArrayList<User> svi = new ArrayList<User>();
		for(Rezervacija r : rezDomacin) {
			svi.add(UserRepository.getUserById(r.getGostId()));
		}
		for(User u : svi) {
			System.out.println(dto.getUser());
			System.out.println(u.getUsername());
			if(u.getUsername().equals(dto.getUser()) && !ret.contains(u)) {
				ret.add(u);
			}
			else if(dto.getUser().equalsIgnoreCase("zensk") && u.isPol() == true && !ret.contains(u)) {
				ret.add(u);
			}
			else if(dto.getUser().equalsIgnoreCase("musk") && u.isPol() == false && !ret.contains(u)) {
				ret.add(u);
			}
		}
		}
		catch(Exception e) {
			return null;
		}
		return g.toJson(ret);
	};
	public static Route odustaniOdRezervacije = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		OdustanakDTO dto = g.fromJson(payload, OdustanakDTO.class);
		int userId = UserRepository.getTrenutniUser().getId();
		int rezervacijaId = dto.getRezervacijaId();
		if(!UserRepository.getTrenutniUser().getRezervacijeId().contains(rezervacijaId)) {
			response.status(400);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Nepostojeća rezervacija.");	
			return message;
		}
		Rezervacija rez = RezervacijaRepository.getRezervacijaById(rezervacijaId);
		System.out.println(rez.getStatus());
		System.out.println(rez.getId());
		if(!rez.getStatus().equals(Status.KREIRANA) && !rez.getStatus().equals(Status.PRIHVACENA)) {
			response.status(400);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Neuspešno otkazivanje.");	
			return message;
		}
		Apartman ap = ApartmanRepository.getApartmanById(rez.getApartmanId());
		if(rez.getStatus() == Status.PRIHVACENA)
			ApartmanRepository.otkaziRezervaciju(ap, rez);
		rez.setStatus(Status.ODUSTANAK);
		RezervacijaRepository.saveRezervacije();
		JsonObject message = new JsonObject();
		message.addProperty("message", "Rezervacija otkazana.");	
		return message;
	};
	public static Filter authenticateGost = (Request request, Response response) -> {
		String auth = request.headers("Authorization");
		System.out.println("Authorization: " + auth);
		if ((auth != null) && (auth.contains("Bearer "))) {
			String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
			try {
			    Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
			    String username = claims.getBody().getSubject();
			    if(UserRepository.findOne(username) == null) {
			    	JsonObject message = new JsonObject();
					message.addProperty("message", "Gost sa datim korisničkim imenom ne postoji.");
					halt(401, message.toString());
			    }
			    else if(!UserRepository.findOne(username).getUloga().equals(Uloga.GOST)) {
			    	JsonObject message = new JsonObject();
					message.addProperty("message", "Korisnik nije gost.");
					halt(401, message.toString());
			    }
			    else {
			    UserRepository.setTrenutniUser(UserRepository.findOne(username));
				System.out.println(claims.getBody().getSubject() + " logged in.");
			    }
			} catch (Exception e) {
				System.out.println(e.getMessage());
				JsonObject message = new JsonObject();
				message.addProperty("message", "Token nije validan.");
				halt(401, message.toString());
			}
		}else {
			JsonObject message = new JsonObject();
			message.addProperty("message", "Token nije poslat.");
			halt(401, message.toString());
		};
	};
	
	public static Filter authenticateDomacin = (Request request, Response response) -> {
		String auth = request.headers("Authorization");
		System.out.println("Authorization: " + auth);
		if ((auth != null) && (auth.contains("Bearer "))) {
			String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
			try {
			    Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
			    String username = claims.getBody().getSubject();
			    if(UserRepository.findOne(username) == null) {
			    	JsonObject message = new JsonObject();
					message.addProperty("message", "Domaćin sa datim korisničkim imenom ne postoji.");
					halt(401, message.toString());
			    }
			    else if(!UserRepository.findOne(username).getUloga().equals(Uloga.DOMACIN)) {
			    	JsonObject message = new JsonObject();
					message.addProperty("message", "Korisnik nije domaćin.");
					halt(401, message.toString());
			    }
			    else {
			    UserRepository.setTrenutniUser(UserRepository.findOne(username));
				System.out.println(claims.getBody().getSubject() + " logged in.");
			    }
			} catch (Exception e) {
				System.out.println(e.getMessage());
				JsonObject message = new JsonObject();
				message.addProperty("message", "Token nije validan.");
				halt(401, message.toString());
			}
		}else {
			JsonObject message = new JsonObject();
			message.addProperty("message", "Token nije poslat.");
			halt(401, message.toString());
		};
	};
	public static Filter authenticateAdmin = (Request request, Response response) -> {
		String auth = request.headers("Authorization");
		System.out.println("Authorization: " + auth);
		if ((auth != null) && (auth.contains("Bearer "))) {
			String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
			try {
			    Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
			    String username = claims.getBody().getSubject();
			    if(UserRepository.findOne(username) == null) {
			    	JsonObject message = new JsonObject();
					message.addProperty("message", "Administrator sa datim korisničkim imenom ne postoji.");
					halt(401, message.toString());
			    }
			    else if(!UserRepository.findOne(username).getUloga().equals(Uloga.ADMINISTRATOR)) {
			    	JsonObject message = new JsonObject();
					message.addProperty("message", "Korisnik nije administrator.");
					halt(401, message.toString());
			    }
			    else {
			    UserRepository.setTrenutniUser(UserRepository.findOne(username));
				System.out.println(claims.getBody().getSubject() + " logged in.");
			    }
			} catch (Exception e) {
				System.out.println(e.getMessage());
				JsonObject message = new JsonObject();
				message.addProperty("message", "Token nije validan.");
				halt(401, message.toString());
			}
		}else {
			JsonObject message = new JsonObject();
			message.addProperty("message", "Token nije poslat.");
			halt(401, message.toString());
		};
	};
}
