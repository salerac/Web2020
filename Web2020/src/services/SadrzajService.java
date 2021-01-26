package services;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Apartman;
import beans.Sadrzaj;
import repositories.ApartmanRepository;
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
	
	public static Route dodajSadrzaj = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Sadrzaj s = g.fromJson(payload, Sadrzaj.class);
		SadrzajRepository.addSadrzaj(s);
		return g.toJson(s);
	};
	public static Route editSadrzaj = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Sadrzaj s = g.fromJson(payload, Sadrzaj.class);
		Sadrzaj ret = SadrzajRepository.getSadrzajById(s.getId());
		ret.setNaziv(s.getNaziv());
		SadrzajRepository.saveSadrzaji();
		return g.toJson(ret);
	};
	public static Route deleteSadrzaj = (Request request, Response response) -> {
		response.type("application/json");
		String payload = request.body();
		Sadrzaj s = g.fromJson(payload, Sadrzaj.class);
		Sadrzaj ret = SadrzajRepository.getSadrzajById(s.getId());
		ret.setObrisan(true);
		ArrayList<Apartman> apartmani = ApartmanRepository.getApartmani();
		ArrayList<Integer> toRemove = new ArrayList<Integer>();
		for(Apartman a : apartmani) {
			for(Integer i : a.getSadrzajiId()) {
				if(i == ret.getId()) {
					toRemove.add(i);
				}
			}
			a.getSadrzajiId().removeAll(toRemove);
			toRemove = new ArrayList<Integer>();
		}
		SadrzajRepository.saveSadrzaji();
		ApartmanRepository.saveApartmani();
		return g.toJson(ret);
	};
}
