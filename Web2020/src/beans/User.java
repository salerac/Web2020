package beans;

import java.util.ArrayList;

public class User {
	private int id;
	private String username;
	private String lozinka;
	private String ime;
	private String prezime;
	private boolean pol;
	private Uloga uloga;
	ArrayList<Integer> rezervacijeId;
	ArrayList<Integer> apartmaniId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getLozinka() {
		return lozinka;
	}
	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}
	
	public ArrayList<Integer> getApartmaniId() {
		return apartmaniId;
	}
	public void setApartmaniId(ArrayList<Integer> apartmaniId) {
		this.apartmaniId = apartmaniId;
	}
	public String getIme() {
		return ime;
	}
	public void setIme(String ime) {
		this.ime = ime;
	}
	public String getPrezime() {
		return prezime;
	}
	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}
	public boolean isPol() {
		return pol;
	}
	public void setPol(boolean pol) {
		this.pol = pol;
	}
	public Uloga getUloga() {
		return uloga;
	}
	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}
	public ArrayList<Integer> getRezervacijeId() {
		return rezervacijeId;
	}
	public void setRezervacijeId(ArrayList<Integer> rezervacijeId) {
		this.rezervacijeId = rezervacijeId;
	}
	
	
	
}
