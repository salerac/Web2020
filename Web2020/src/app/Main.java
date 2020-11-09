package app;

import static spark.Spark.post;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;
import java.io.File;

import beans.Sadrzaj;
import repositories.SadrzajRepository;
import repositories.UserRepository;
import services.ApartmanService;
import services.LoginService;
import services.SadrzajService;
public class Main {

	public static void main(String[] args) throws Exception {
		UserRepository.loadUsers();
		Sadrzaj s1 = new Sadrzaj();
		Sadrzaj s2 = new Sadrzaj();
		s1.setNaziv("Parking");
		s2.setNaziv("TV");
		SadrzajRepository.addSadrzaj(s1);
		SadrzajRepository.addSadrzaj(s2);


		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		post("/login", LoginService.handleLogin);
		post("/addApartman", ApartmanService.addApartman);
		post("/addSadrzaj", SadrzajService.addSadrzaj);
		get("/getSadrzaji", SadrzajService.getSadrzaji);
	}

}
