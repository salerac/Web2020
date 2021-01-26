package beans;

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
	private ArrayList<Long> datumi = new ArrayList<Long>();
	private String domacinUsername;
	private ArrayList<Integer> komentariId;
	private ArrayList<String> slike;
	private double cenaPoNoci;
	private int vremePrijave;
	private int vremeOdjave;
	private boolean status;
	private ArrayList<Integer> sadrzajiId;
	private ArrayList<Integer> rezervacijeId;
	private boolean obrisan;
	
	public Apartman(boolean tip, int brojSoba, int brojGostiju, int lokacijaId, ArrayList<Long> datumi,
			ArrayList<String> slike, double cenaPoNoci, int vremePrijave, int vremeOdjave, 
			ArrayList<Integer> sadrzajiId) {
		super();
		this.tip = tip;
		this.brojSoba = brojSoba;
		this.brojGostiju = brojGostiju;
		this.lokacijaId = lokacijaId;
		this.datumi = datumi;
		this.slike = slike;
		this.cenaPoNoci = cenaPoNoci;
		this.vremePrijave = vremePrijave;
		this.vremeOdjave = vremeOdjave;
		this.sadrzajiId = sadrzajiId;
	}

	public Apartman() {
		rezervacijeId = new ArrayList<Integer>();
		komentariId = new ArrayList<Integer>();
		obrisan = false;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isObrisan() {
		return obrisan;
	}

	public void setObrisan(boolean obrisan) {
		this.obrisan = obrisan;
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
	public ArrayList<Long> getDatumi() {
		return datumi;
	}
	public void setDatumi(ArrayList<Long> datumi) {
		this.datumi = datumi;
	}
	public String getDomacinUsername() {
		return domacinUsername;
	}
	public void setDomacinUsername(String domacinUsername) {
		this.domacinUsername = domacinUsername;
	}
	public ArrayList<Integer> getKomentariId() {
		return komentariId;
	}
	public void setKomentariId(ArrayList<Integer> komentariId) {
		this.komentariId = komentariId;
	}
	public ArrayList<String> getSlike() {
		return slike;
	}
	public void setSlike(ArrayList<String> slike) {
		this.slike = slike;
	}
	public double getCenaPoNoci() {
		return cenaPoNoci;
	}
	public void setCenaPoNoci(double cenaPoNoci) {
		this.cenaPoNoci = cenaPoNoci;
	}
	public int getVremePrijave() {
		return vremePrijave;
	}
	public void setVremePrijave(int vremePrijave) {
		this.vremePrijave = vremePrijave;
	}
	public int getVremeOdjave() {
		return vremeOdjave;
	}
	public void setVremeOdjave(int vremeOdjave) {
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
