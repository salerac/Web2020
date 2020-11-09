package services;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Sadrzaj;
import repositories.SadrzajRepository;
import spark.Request;
import spark.Response;
import spark.Route;

public class SadrzajService {
	private static Gson g = new Gson();
	
	public static Route addSadrzaj = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Sadrzaj s = g.fromJson(payload, Sadrzaj.class);
		SadrzajRepository.addSadrzaj(s);
		return request;
		
	};
	
	public static Route getSadrzaji = (Request request, Response response) -> {
		response.type("application/json");
		ArrayList<Sadrzaj> sadrzaji = SadrzajRepository.getSadrzaji();
		return g.toJson(sadrzaji);
	};
}
