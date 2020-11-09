package beans;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public class Apartman {
	
	private int id;
	private boolean tip;
	private int brojSoba;
	private int brojGostiju;
	private int lokacijaId;
	private ArrayList<LocalDate> datumi = new ArrayList<LocalDate>();
	private HashMap<Date, Boolean> dostupnost = new HashMap<Date, Boolean>();
	private String domacinUsername;
	private ArrayList<String> komentariId;
	private String imagePath;
	private double cenaPoNoci;
	private LocalTime vremePrijave;
	private LocalTime vremeOdjave;
	private boolean status;
	private ArrayList<Integer> sadrzajiId;
	private ArrayList<Integer> rezervacijeId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isTip() {
		return tip;
	}
	public void setTip(boolean tip) {
		this.tip = tip;
	}
	public int getBrojSoba() {
		return brojSoba;
	}
	public void setBrojSoba(int brojSoba) {
		this.brojSoba = brojSoba;
	}
	public int getBrojGostiju() {
		return brojGostiju;
	}
	public void setBrojGostiju(int brojGostiju) {
		this.brojGostiju = brojGostiju;
	}
	public int getLokacijaId() {
		return lokacijaId;
	}
	public void setLokacijaId(int lokacijaId) {
		this.lokacijaId = lokacijaId;
	}
	public ArrayList<LocalDate> getDatumi() {
		return datumi;
	}
	public void setDatumi(ArrayList<LocalDate> datumi) {
		this.datumi = datumi;
	}
	public HashMap<Date, Boolean> getDostupnost() {
		return dostupnost;
	}
	public void setDostupnost(HashMap<Date, Boolean> dostupnost) {
		this.dostupnost = dostupnost;
	}
	public String getDomacinUsername() {
		return domacinUsername;
	}
	public void setDomacinUsername(String domacinUsername) {
		this.domacinUsername = domacinUsername;
	}
	public ArrayList<String> getKomentariId() {
		return komentariId;
	}
	public void setKomentariId(ArrayList<String> komentariId) {
		this.komentariId = komentariId;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public double getCenaPoNoci() {
		return cenaPoNoci;
	}
	public void setCenaPoNoci(double cenaPoNoci) {
		this.cenaPoNoci = cenaPoNoci;
	}
	public LocalTime getVremePrijave() {
		return vremePrijave;
	}
	public void setVremePrijave(LocalTime vremePrijave) {
		this.vremePrijave = vremePrijave;
	}
	public LocalTime getVremeOdjave() {
		return vremeOdjave;
	}
	public void setVremeOdjave(LocalTime vremeOdjave) {
		this.vremeOdjave = vremeOdjave;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public ArrayList<Integer> getSadrzajiId() {
		return sadrzajiId;
	}
	public void setSadrzajiId(ArrayList<Integer> sadrzajiId) {
		this.sadrzajiId = sadrzajiId;
	}
	public ArrayList<Integer> getRezervacijeId() {
		return rezervacijeId;
	}
	public void setRezervacijeId(ArrayList<Integer> rezervacijeId) {
		this.rezervacijeId = rezervacijeId;
	}
	
	

}
