package services;

import com.google.gson.Gson;

import beans.Adresa;
import beans.Apartman;
import beans.Lokacija;
import dto.ApartmanDTO;
import repositories.AdresaRepository;
import repositories.ApartmanRepository;
import repositories.LokacijaRepository;
import spark.Request;
import spark.Response;
import spark.Route;

public class ApartmanService{
	private static Gson g = new Gson();
	
	public static Route addApartman = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		ApartmanDTO a = g.fromJson(payload, ApartmanDTO.class);
		
		Adresa adresa = new Adresa(a.getUlica(), a.getBroj(), a.getGrad(), a.getPostanskiBroj());
		AdresaRepository.addAdresa(adresa);
		
		Lokacija lokacija = new Lokacija(a.getLokacija());
		LokacijaRepository.addLokacija(lokacija);
		
		Apartman apartman = new Apartman(a.getTip(), a.getBrojSoba(), a.getBrojGostiju(), lokacija.getId(),
				a.getDatumi(), a.getSlike(), a.getCena(), a.getVremePrijave(), a.getVremeOdjave(), a.getSadrzaj());
		ApartmanRepository.addApartman(apartman);
		
		return request;
		
	};

	
}
