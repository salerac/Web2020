package dto;

import beans.Uloga;
import beans.User;

public class UserDTO {
	
	private String username;
	private String jwt;
	private String ime;
	private String prezime;
	private boolean pol;
	private Uloga uloga;
	
	public UserDTO(User u, String jwt) {
		this.username = u.getUsername();
		this.ime = u.getIme();
		this.prezime = u.getPrezime();
		this.pol = u.isPol();
		this.uloga = u.getUloga();
		this.jwt = jwt;
	}

}
