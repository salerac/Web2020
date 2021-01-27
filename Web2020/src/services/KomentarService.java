package services;

import static spark.Spark.get;

import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import beans.Apartman;
import beans.Komentar;
import dto.KomentarDTO;
import dto.UserDTO;
import repositories.ApartmanRepository;
import repositories.KomentarRepository;
import repositories.UserRepository;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Redirect;
import static spark.Spark.redirect;

public class KomentarService {
	private static Gson g = new Gson();
	
	public static Route addKomentar = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		try {
		Komentar k = g.fromJson(payload, Komentar.class);
		Apartman a = ApartmanRepository.getApartmanById(k.getApartmanId());
		KomentarRepository.addKomentar(k);
		a.getKomentariId().add(k.getId());
		ApartmanRepository.saveApartmani();
		}
		catch(Exception e) {
			response.status(400);
			JsonObject message = new JsonObject();
			message.addProperty("message", "Komentar neuspešno dodat.");
			return message;
		}
		response.status(200);
		JsonObject message = new JsonObject();
		message.addProperty("message", "Komentar uspešno dodat.");
		return message;
		
	};
	public static Route getKomentariByApartmanId = (Request request, Response response) -> {
		response.type("application/json");
		String id = request.queryParams("id");
		Apartman a = ApartmanRepository.getApartmanById(Integer.parseInt(id));
		ArrayList<Komentar> kom = new ArrayList<Komentar>();
		for(Integer i : a.getKomentariId()) {
			kom.add(KomentarRepository.getKomentariById(i));
		}
		ArrayList<KomentarDTO> ret = new ArrayList<KomentarDTO>();
		for(Komentar k : kom) {
			ret.add(new KomentarDTO(k, new UserDTO(UserRepository.getUserById(k.getGostId()), null)));
		}
		return g.toJson(ret);
	};
	public static Route getKomentariByApartmanIdDomacin = (Request request, Response response) -> {
		response.type("application/json");
		String id = request.queryParams("id");
		Apartman a = ApartmanRepository.getApartmanById(Integer.parseInt(id));
		
		if(!a.getDomacinUsername().equals(UserRepository.getTrenutniUser().getUsername())) {
			ArrayList<Komentar> kom = new ArrayList<Komentar>();
			for(Integer i : a.getKomentariId()) {
				if(KomentarRepository.getKomentariById(i).isObjavljen() == true) {
				kom.add(KomentarRepository.getKomentariById(i));
				}
			}
			ArrayList<KomentarDTO> ret = new ArrayList<KomentarDTO>();
			for(Komentar k : kom) {
				ret.add(new KomentarDTO(k, new UserDTO(UserRepository.getUserById(k.getGostId()), null)));
			}
			return g.toJson(ret);
		}
		ArrayList<Komentar> kom = new ArrayList<Komentar>();
		for(Integer i : a.getKomentariId()) {
			kom.add(KomentarRepository.getKomentariById(i));
		}
		ArrayList<KomentarDTO> ret = new ArrayList<KomentarDTO>();
		for(Komentar k : kom) {
			ret.add(new KomentarDTO(k, new UserDTO(UserRepository.getUserById(k.getGostId()), null)));
		}
		return g.toJson(ret);
	};
	public static Route getObjavljeniKomentari = (Request request, Response response) -> {
		System.out.println("Evo me");
		response.type("application/json");
		String id = request.queryParams("id");
		Apartman a = ApartmanRepository.getApartmanById(Integer.parseInt(id));
		ArrayList<Komentar> kom = new ArrayList<Komentar>();
		for(Integer i : a.getKomentariId()) {
			if(KomentarRepository.getKomentariById(i).isObjavljen() == true) {
			kom.add(KomentarRepository.getKomentariById(i));
			}
		}
		ArrayList<KomentarDTO> ret = new ArrayList<KomentarDTO>();
		for(Komentar k : kom) {
			ret.add(new KomentarDTO(k, new UserDTO(UserRepository.getUserById(k.getGostId()), null)));
		}
		return g.toJson(ret);
	};
	public static Route objaviKomentar = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Komentar k = g.fromJson(payload, Komentar.class);
		Komentar ret = KomentarRepository.getKomentariById(k.getId());
		ret.setObjavljen(true);
		KomentarRepository.saveKomentari();
		return g.toJson(ret);
	};
	public static Route sakrijKomentar = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Komentar k = g.fromJson(payload, Komentar.class);
		Komentar ret = KomentarRepository.getKomentariById(k.getId());
		ret.setObjavljen(false);
		KomentarRepository.saveKomentari();
		return g.toJson(ret);
	};
}
