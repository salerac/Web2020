package services;

import com.google.gson.Gson;

import beans.Apartman;
import beans.Komentar;
import repositories.ApartmanRepository;
import repositories.KomentarRepository;
import spark.Request;
import spark.Response;
import spark.Route;

public class KomentarService {
	private static Gson g = new Gson();
	
	public static Route addKomentar = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Komentar k = g.fromJson(payload, Komentar.class);
		Apartman a = ApartmanRepository.getApartmanById(k.getApartmanId());
		KomentarRepository.addKomentar(k);
		a.getKomentariId().add(k.getId());
		ApartmanRepository.saveApartmani();
		return request;
		
	};
}
