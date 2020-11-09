package services;

import com.google.gson.Gson;

import beans.Apartman;
import repositories.ApartmanRepository;
import spark.Request;
import spark.Response;
import spark.Route;

public class ApartmanService{
	private static Gson g = new Gson();
	
	public static Route addApartman = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Apartman a = g.fromJson(payload, Apartman.class);
		ApartmanRepository.addApartman(a);
		return request;
		
	};

	
}
