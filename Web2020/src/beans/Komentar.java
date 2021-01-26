package beans;

public class Komentar {
	
	private int id;
	private int apartmanId;
	private int gostId;
	private String tekst;
	private int ocena;
	private boolean objavljen;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public boolean isObjavljen() {
		return objavljen;
	}
	public void setObjavljen(boolean objavljen) {
		this.objavljen = objavljen;
	}
	public int getApartmanId() {
		return apartmanId;
	}
	public void setApartmanId(int apartmanId) {
		this.apartmanId = apartmanId;
	}
	public int getGostId() {
		return gostId;
	}
	public void setGostId(int gostId) {
		this.gostId = gostId;
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
	
	

}
