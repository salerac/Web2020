package dto;

public class SearchDTO {
	
	private String lokacija;
	private long datumPrijave;
	private long datumOdjave;
	private double cenaOd;
	private double cenaDo;
	private int sobeOd;
	private int sobeDo;
	private int brojGostiju;
	public String getLokacija() {
		return lokacija;
	}
	public void setLokacija(String lokacija) {
		this.lokacija = lokacija;
	}
	public long getDatumPrijave() {
		return datumPrijave;
	}
	public void setDatumPrijave(long datumPrijave) {
		this.datumPrijave = datumPrijave;
	}
	public long getDatumOdjave() {
		return datumOdjave;
	}
	public void setDatumOdjave(long datumOdjave) {
		this.datumOdjave = datumOdjave;
	}
	public double getCenaOd() {
		return cenaOd;
	}
	public void setCenaOd(double cenaOd) {
		this.cenaOd = cenaOd;
	}
	public double getCenaDo() {
		return cenaDo;
	}
	public void setCenaDo(double cenaDo) {
		this.cenaDo = cenaDo;
	}
	public int getSobeOd() {
		return sobeOd;
	}
	public void setSobeOd(int sobeOd) {
		this.sobeOd = sobeOd;
	}
	public int getSobeDo() {
		return sobeDo;
	}
	public void setSobeDo(int sobeDo) {
		this.sobeDo = sobeDo;
	}
	public int getBrojGostiju() {
		return brojGostiju;
	}
	public void setBrojGostiju(int brojGostiju) {
		this.brojGostiju = brojGostiju;
	}
	
	

}
