package beans;

public class Lokacija {
	
	private int id;
	private double duzinka;
	private double sirina;
	private int adresaId;
	
	public double getDuzinka() {
		return duzinka;
	}
	public void setDuzinka(double duzinka) {
		this.duzinka = duzinka;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public double getSirina() {
		return sirina;
	}
	public void setSirina(double sirina) {
		this.sirina = sirina;
	}
	public int getAdresa() {
		return adresaId;
	}
	public void setAdresa(int adresa) {
		this.adresaId = adresa;
	}
	
}
