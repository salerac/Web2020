package services;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Rezervacija;
import beans.Status;
import beans.User;
import dto.ApartmanRezDTO;
import dto.RezervacijaSearchDTO;
import dto.UserDTO;
import repositories.ApartmanRepository;
import repositories.RezervacijaRepository;
import repositories.UserRepository;
import spark.Request;
import spark.Response;
import spark.Route;

public class RezervacijaService {
	private static Gson g = new Gson();
	
	public static Route getRezervacije = (Request request, Response response) -> {
		response.type("application/json");
		ArrayList<Rezervacija> rez = RezervacijaRepository.getRezervacije();
		ArrayList<ApartmanRezDTO> ret = new ArrayList<ApartmanRezDTO>();
		for(Rezervacija r : rez) {
			UserDTO u = new UserDTO(UserRepository.getUserById(r.getGostId()), null);
			ApartmanRezDTO dto = new ApartmanRezDTO(r, u);
			ret.add(dto);
		}
		return g.toJson(ret);
	};
	public static Route odbijRezervaciju = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Rezervacija rez = g.fromJson(payload, Rezervacija.class);
		Rezervacija r = RezervacijaRepository.getRezervacijaById(rez.getId());
		if(r.getStatus().equals(Status.PRIHVACENA)) {
			ApartmanRepository.otkaziRezervaciju(ApartmanRepository.getApartmanById(r.getApartmanId()), r);
		}
		r.setStatus(Status.ODBIJENA);
		RezervacijaRepository.saveRezervacije();
		return g.toJson(r);
	};
	
	public static Route prihvatiRezervaciju = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Rezervacija rez = g.fromJson(payload, Rezervacija.class);
		Rezervacija r = RezervacijaRepository.getRezervacijaById(rez.getId());
		r.setStatus(Status.PRIHVACENA);
		ApartmanRepository.addRezervacijaToApartman(r.getApartmanId(), r);
		RezervacijaRepository.saveRezervacije();
		return g.toJson(r);
	};
	public static Route zavrsiRezervaciju = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Rezervacija rez = g.fromJson(payload, Rezervacija.class);
		Rezervacija r = RezervacijaRepository.getRezervacijaById(rez.getId());
		r.setStatus(Status.ZAVRSENA);
		RezervacijaRepository.saveRezervacije();
		return g.toJson(r);
	};
	public static Route getDomacinKorisnici = (Request request, Response response) -> {
		response.type("application/json");
		User u = UserRepository.getTrenutniUser();
		ArrayList<Rezervacija> rez = RezervacijaRepository.getRezervacijeByDomacinId(u.getId());
		ArrayList<User> unique = new ArrayList<User>();
		ArrayList<UserDTO> ret = new ArrayList<UserDTO>();
		for(Rezervacija r : rez) {
			User user = UserRepository.getUserById(r.getGostId());
			if(!unique.contains(user)) {
			unique.add(user);
			ret.add(new UserDTO(UserRepository.getUserById(r.getGostId()),null));
			}
		}
		return g.toJson(ret);
	};
	public static Route pretraziPoKorisniku = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		RezervacijaSearchDTO dto = g.fromJson(payload, RezervacijaSearchDTO.class);
		User u = new User();
		ArrayList<Rezervacija> ret = new ArrayList<Rezervacija>();
		try {
		u = UserRepository.findOne(dto.getUser());
		ArrayList<Rezervacija> rezUser = RezervacijaRepository.getRezervacijeByUserId(u.getId());
		for(Rezervacija r : rezUser) {
			if(r.getApartmanId() == dto.getApartman())
				ret.add(r);
		}
		}
		catch(Exception e) {
			return null;
		}
		return g.toJson(ret);
	};
	public static Route pretraziSvePoKorisniku = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		RezervacijaSearchDTO dto = g.fromJson(payload, RezervacijaSearchDTO.class);
		ArrayList<Rezervacija> rezUser = new ArrayList<Rezervacija>();
		try {
			User u = UserRepository.findOne(dto.getUser());
			rezUser = RezervacijaRepository.getRezervacijeByUserId(u.getId());
		}
		catch(Exception e) {
			return null;
		}
		return g.toJson(rezUser);
	};
}
