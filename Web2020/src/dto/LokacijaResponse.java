package dto;

import beans.Adresa;
import beans.Lokacija;

public class LokacijaResponse {

	private int id;
	private double duzina;
	private double sirina;
	private Adresa adresa;
	
	public LokacijaResponse(Lokacija l, Adresa a) {
		super();
		this.id = l.getId();
		this.duzina = l.getDuzina();
		this.sirina = l.getSirina();
		this.adresa = a;
	}
	
	
}
