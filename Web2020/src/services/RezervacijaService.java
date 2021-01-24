package services;

import com.google.gson.Gson;

import beans.Rezervacija;
import beans.Status;
import repositories.ApartmanRepository;
import repositories.RezervacijaRepository;
import spark.Request;
import spark.Response;
import spark.Route;

public class RezervacijaService {
	private static Gson g = new Gson();
	
	public static Route odbijRezervaciju = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Rezervacija rez = g.fromJson(payload, Rezervacija.class);
		Rezervacija r = RezervacijaRepository.getRezervacijaById(rez.getId());
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
}
