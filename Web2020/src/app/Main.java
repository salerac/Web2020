package app;

import static spark.Spark.post;
import static spark.Spark.put;
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
import repositories.KomentarRepository;
import repositories.LokacijaRepository;
import repositories.RezervacijaRepository;
import repositories.SadrzajRepository;
import repositories.UserRepository;
import services.ApartmanService;
import services.KomentarService;
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
		SadrzajRepository.loadSadrzaji();
		KomentarRepository.loadKomentari();


		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		post("/login", LoginService.handleLogin);
		post("/registerGost", LoginService.registerGost);
		post("/addSadrzaj", SadrzajService.addSadrzaj);
		post("/searchApartmani",ApartmanService.searchApartman);
		get("/getKomentari", KomentarService.getObjavljeniKomentari);
		get("/getSadrzaji", SadrzajService.getSadrzaji);
		get("/filtrirajApartmane", ApartmanService.filtrirajApartmane);
		//get("/getApartmaniByTip", ApartmanService.getApartmaniByTip);
		get("/getApartmanById", ApartmanService.getApartman);
		path("/gost", () -> {
			before("/*", LoginService.authenticateGost);
			post("/postRezervacija",  ApartmanService.postRezervacija);
			post("/editGost", LoginService.editUser);
			post("/addKomentar", KomentarService.addKomentar);
			get("/getGostRezervacije", LoginService.getGostRezervacije);
			delete("/odustaniOdRezervacije", LoginService.odustaniOdRezervacije);
		});
		path("/domacin", () -> {
			before("/*", LoginService.authenticateDomacin);
			post("/odbijRezervaciju", RezervacijaService.odbijRezervaciju);
			post("/prihvatiRezervaciju", RezervacijaService.prihvatiRezervaciju);
			post("/zavrsiRezervaciju", RezervacijaService.zavrsiRezervaciju);
			post("/aktivirajApartman", ApartmanService.aktivirajApartman);
			post("/editDomacin", LoginService.editDomacin);
			post("/pretragaRezervacija", RezervacijaService.pretraziPoKorisniku);
			post("/pretraziDomacinKorisnike", LoginService.pretraziDomacinKorisnike);
			post("/objaviKomentar", KomentarService.objaviKomentar);
			post("/sakrijKomentar", KomentarService.sakrijKomentar);
			get("/getKomentari", KomentarService.getKomentariByApartmanIdDomacin);
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
			post("/pretraziRezervacije", RezervacijaService.pretraziSvePoKorisniku);
			post("/pretraziKorisnike", LoginService.pretraziAdminKorisnike);
			post("/dodajSadrzaj", SadrzajService.dodajSadrzaj);
			post("/registerDomacin", LoginService.registerDomacin);
			get("/getAdminKorisnici", LoginService.getAdminKorisnici);
			get("/filtrirajApartmane", ApartmanService.filtrirajApartmane);
			get("/getAdminApartmani", ApartmanService.getAdminApartmani);
			get("/getRezervacije", RezervacijaService.getRezervacije);
			get("/getKomentari", KomentarService.getKomentariByApartmanId);
			put("/editSadrzaj", SadrzajService.editSadrzaj);
			delete("/obrisiApartmanAdmin", ApartmanService.obrisiApartmanAdmin);
			delete("/obrisiSadrzaj", SadrzajService.deleteSadrzaj);
		});
	}

}
