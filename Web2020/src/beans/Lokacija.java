package beans;

public class Lokacija {
	
	private int id;
	private double duzina;
	private double sirina;
	private int adresaId;
	
	public Lokacija() {
		
	}
	public Lokacija(int adresaId, double duzina, double sirina) {
		setAdresa(adresaId);
		setDuzina(duzina);
		setSirina(sirina);
	}
	public Lokacija(Lokacija l) {
		setAdresa(l.getAdresa());
		setDuzina(l.getDuzina());
		setSirina(l.getSirina());
	}
	public double getDuzina() {
		return duzina;
	}
	public void setDuzina(double duzinka) {
		this.duzina = duzinka;
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
