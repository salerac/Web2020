package dto;

import beans.Apartman;
import beans.Rezervacija;

public class RezervacijaSearchDTO {

	private int apartman;
	private String user;
	public int getApartman() {
		return apartman;
	}
	public void setApartman(int apartman) {
		this.apartman = apartman;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	
	
}
