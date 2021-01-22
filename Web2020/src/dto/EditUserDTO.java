package dto;

import beans.Uloga;
import beans.User;

public class EditUserDTO {
	private int id;
	private String username;
	private String jwt;
	private String ime;
	private String prezime;
	private boolean pol;
	private Uloga uloga;
	private String lozinka;
	private String staraLozinka;
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
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
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
	public String getLozinka() {
		return lozinka;
	}
	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}
	public String getStaraLozinka() {
		return staraLozinka;
	}
	public void setStaraLozinka(String staraLozinka) {
		this.staraLozinka = staraLozinka;
	}
	
}

