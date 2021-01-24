package dto;

import java.util.ArrayList;

import beans.Apartman;
import beans.Lokacija;
import beans.Sadrzaj;

public class ApartmanResponse {
	
	private int id;
	private boolean tip;
	private int brojSoba;
	private int brojGostiju;
	private LokacijaResponse lokacija;
	private ArrayList<Long> datumi = new ArrayList<Long>();
	private String domacinUsername;
	private ArrayList<String> komentariId;
	private ArrayList<String> slike;
	private double cenaPoNoci;
	private int vremePrijave;
	private int vremeOdjave;
	private boolean status;
	private ArrayList<Sadrzaj> sadrzaji;
	public ApartmanResponse(Apartman a, LokacijaResponse l, ArrayList<Sadrzaj> sadrzaji) {
		super();
		this.id = a.getId();
		this.tip = a.isTip();
		this.brojSoba = a.getBrojSoba();
		this.brojGostiju = a.getBrojGostiju();
		this.lokacija = l;
		this.datumi = a.getDatumi();
		this.domacinUsername = a.getDomacinUsername();
		this.komentariId = a.getKomentariId();
		this.slike = a.getSlike();
		this.cenaPoNoci = a.getCenaPoNoci();
		this.vremePrijave = a.getVremePrijave();
		this.vremeOdjave = a.getVremeOdjave();
		this.status = a.isStatus();
		this.sadrzaji = sadrzaji;
	}
	
	

}
