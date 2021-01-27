package dto;

import beans.Komentar;

public class KomentarDTO {

	private int id;
	private int apartmanId;
	private UserDTO user;
	private String tekst;
	private int ocena;
	private boolean objavljen;
	
	public KomentarDTO() {
		
	}
	public KomentarDTO(Komentar k, UserDTO u) {
		id = k.getId();
		apartmanId = k.getApartmanId();
		user = u;
		tekst = k.getTekst();
		ocena = k.getOcena();
		objavljen = k.isObjavljen();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getApartmanId() {
		return apartmanId;
	}
	public void setApartmanId(int apartmanId) {
		this.apartmanId = apartmanId;
	}
	public UserDTO getUser() {
		return user;
	}
	public void setUser(UserDTO user) {
		this.user = user;
	}
	public String getTekst() {
		return tekst;
	}
	public void setTekst(String tekst) {
		this.tekst = tekst;
	}
	public int getOcena() {
		return ocena;
	}
	public void setOcena(int ocena) {
		this.ocena = ocena;
	}
	public boolean isObjavljen() {
		return objavljen;
	}
	public void setObjavljen(boolean objavljen) {
		this.objavljen = objavljen;
	}
	
	

}
