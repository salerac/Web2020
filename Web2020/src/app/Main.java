package app;

import static spark.Spark.post;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;
import java.io.File;

import beans.Sadrzaj;
import repositories.AdresaRepository;
import repositories.ApartmanRepository;
import repositories.LokacijaRepository;
import repositories.SadrzajRepository;
import repositories.UserRepository;
import services.ApartmanService;
import services.LoginService;
import services.SadrzajService;
public class Main {

	public static void main(String[] args) throws Exception {
		UserRepository.loadUsers();
		AdresaRepository.loadAdrese();
		LokacijaRepository.loadLokacije();
		ApartmanRepository.loadApartmani();
		Sadrzaj s1 = new Sadrzaj();
		Sadrzaj s2 = new Sadrzaj();
		Sadrzaj s3 = new Sadrzaj();
		Sadrzaj s4 = new Sadrzaj();
		s1.setNaziv("Parking");
		s2.setNaziv("TV");
		s3.setNaziv("Klima");
		s4.setNaziv("Frizider");
		SadrzajRepository.addSadrzaj(s1);
		SadrzajRepository.addSadrzaj(s2);
		SadrzajRepository.addSadrzaj(s3);
		SadrzajRepository.addSadrzaj(s4);


		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		post("/login", LoginService.handleLogin);
		post("/addApartman", ApartmanService.addApartman);
		post("/addSadrzaj", SadrzajService.addSadrzaj);
		post("/searchApartmani",ApartmanService.searchApartman);
		get("/getSadrzaji", SadrzajService.getSadrzaji);
	}

}
