package app;

import static spark.Spark.post;
import static spark.Spark.get;
import static spark.Spark.delete;
import static spark.Spark.port;
import static spark.Spark.path;
import static spark.Spark.before;
import static spark.Spark.staticFiles;
import java.io.File;

import beans.Sadrzaj;
import repositories.AdresaRepository;
import repositories.ApartmanRepository;
import repositories.LokacijaRepository;
import repositories.RezervacijaRepository;
import repositories.SadrzajRepository;
import repositories.UserRepository;
import services.ApartmanService;
import services.LoginService;
import services.RezervacijaService;
import services.SadrzajService;
public class Main {

	public static void main(String[] args) throws Exception {
		UserRepository.loadUsers();
		AdresaRepository.loadAdrese();
		LokacijaRepository.loadLokacije();
		ApartmanRepository.loadApartmani();
		RezervacijaRepository.loadRezervacije();
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
		post("/registerGost", LoginService.registerGost);
		post("/addSadrzaj", SadrzajService.addSadrzaj);
		post("/searchApartmani",ApartmanService.searchApartman);
		get("/getSadrzaji", SadrzajService.getSadrzaji);
		get("/filtrirajApartmane", ApartmanService.filtrirajApartmane);
		//get("/getApartmaniByTip", ApartmanService.getApartmaniByTip);
		get("/getApartmanById", ApartmanService.getApartman);
		path("/gost", () -> {
			before("/*", LoginService.authenticateGost);
			post("/postRezervacija",  ApartmanService.postRezervacija);
			post("/editGost", LoginService.editUser);
			get("/getGostRezervacije", LoginService.getGostRezervacije);
			delete("/odustaniOdRezervacije", LoginService.odustaniOdRezervacije);
		});
		path("/domacin", () -> {
			before("/*", LoginService.authenticateDomacin);
			post("/odbijRezervaciju", RezervacijaService.odbijRezervaciju);
			post("/prihvatiRezervaciju", RezervacijaService.prihvatiRezervaciju);
			post("/aktivirajApartman", ApartmanService.aktivirajApartman);
			post("/editDomacin", LoginService.editDomacin);
			post("/pretragaRezervacija", RezervacijaService.pretraziPoKorisniku);
			post("/pretraziDomacinKorisnike", LoginService.pretraziDomacinKorisnike);
			get("/getDomacinKorisnici", RezervacijaService.getDomacinKorisnici);
			get("/getDomacinApartmani", ApartmanService.getDomacinApartmani);
			get("/getDomacinNeaktivni", ApartmanService.getDomacinNeaktivni);
			post("/addApartman", ApartmanService.addApartman);
			get("/filtrirajDomacinApartmane", ApartmanService.filtrirajDomacinApartmane);
			get("/getApartmanRezervacije", ApartmanService.getApartmanRezervacije);
			delete("/obrisiApartman", ApartmanService.obrisiApartman);
		});
		path("/admin", () -> {
			before("/*", LoginService.authenticateAdmin);
			post("/editAdmin", LoginService.editAdmin);
			get("/getAdminApartmani", ApartmanService.getAdminApartmani);
			delete("/obrisiApartmanAdmin", ApartmanService.obrisiApartmanAdmin);
		});
	}

}
