package beans;

public class Sadrzaj {
	
	private int id;
	private String naziv;
	private boolean obrisan;
	
	public Sadrzaj() {
		obrisan = false;
	}
	public boolean isObrisan() {
		return obrisan;
	}
	public void setObrisan(boolean obrisan) {
		this.obrisan = obrisan;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	
	

}
