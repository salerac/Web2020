package beans;

import java.util.Date;

public class Rezervacija {

	private int id;
	private int apartmanId;
	private long pocetniDatum;
	private int brojNocenja;
	private double cena;
	private String poruka;
	private int gostId;
	private Status status;
	private String slika;
	public int getApartmanId() {
		return apartmanId;
	}
	
	public String getSlika() {
		return slika;
	}

	public void setSlika(String slika) {
		this.slika = slika;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setApartmanId(int apartmanId) {
		this.apartmanId = apartmanId;
	}
	public long getPocetniDatum() {
		return pocetniDatum;
	}
	public void setPocetniDatum(long pocetniDatum) {
		this.pocetniDatum = pocetniDatum;
	}
	public int getBrojNocenja() {
		return brojNocenja;
	}
	public void setBrojNocenja(int brojNocenja) {
		this.brojNocenja = brojNocenja;
	}
	public double getCena() {
		return cena;
	}
	public void setCena(double cena) {
		this.cena = cena;
	}
	public String getPoruka() {
		return poruka;
	}
	public void setPoruka(String poruka) {
		this.poruka = poruka;
	}
	public int getGostId() {
		return gostId;
	}
	public void setGostId(int gostId) {
		this.gostId = gostId;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	
	
	
}
