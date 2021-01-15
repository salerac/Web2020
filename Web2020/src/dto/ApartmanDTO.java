package dto;

import java.util.ArrayList;
import java.util.Date;

import beans.Lokacija;

public class ApartmanDTO {
	private int tip;
    private int brojSoba;
    private int brojGostiju;
    private double cena;
    private ArrayList<String> slike;
    private ArrayList<Integer> sadrzaj;
    private String ulica;
    private int broj;
    private String grad;
    private int postanskiBroj;
    private Lokacija lokacija;
    private int vremePrijave;
    private int vremeOdjave;
    private ArrayList<Long> datumi;
    
	public boolean getTip() {
		return tip > 0;
	}
	public void setTip(int tip) {
		this.tip = tip;
	}
	public int getBrojSoba() {
		return brojSoba;
	}
	public void setBrojSoba(int brojSoba) {
		this.brojSoba = brojSoba;
	}
	public int getBrojGostiju() {
		return brojGostiju;
	}
	public void setBrojGostiju(int brojGostiju) {
		this.brojGostiju = brojGostiju;
	}
	public double getCena() {
		return cena;
	}
	public void setCena(double cena) {
		this.cena = cena;
	}
	public ArrayList<String> getSlike() {
		return slike;
	}
	public void setSlike(ArrayList<String> slike) {
		this.slike = slike;
	}
	public ArrayList<Integer> getSadrzaj() {
		return sadrzaj;
	}
	public void setSadrzaj(ArrayList<Integer> sadrzaj) {
		this.sadrzaj = sadrzaj;
	}
	public String getUlica() {
		return ulica;
	}
	public void setUlica(String ulica) {
		this.ulica = ulica;
	}
	public int getBroj() {
		return broj;
	}
	public void setBroj(int broj) {
		this.broj = broj;
	}
	public String getGrad() {
		return grad;
	}
	public void setGrad(String grad) {
		this.grad = grad;
	}
	public int getPostanskiBroj() {
		return postanskiBroj;
	}
	public void setPostanskiBroj(int postanskiBroj) {
		this.postanskiBroj = postanskiBroj;
	}
	public Lokacija getLokacija() {
		return lokacija;
	}
	public void setLokacija(Lokacija lokacija) {
		this.lokacija = lokacija;
	}
	public int getVremePrijave() {
		return vremePrijave;
	}
	public void setVremePrijave(int vremePrijave) {
		this.vremePrijave = vremePrijave;
	}
	public int getVremeOdjave() {
		return vremeOdjave;
	}
	public void setVremeOdjave(int vremeOdjave) {
		this.vremeOdjave = vremeOdjave;
	}
	public ArrayList<Long> getDatumi() {
		return datumi;
	}
	public void setDatumi(ArrayList<Long> datumi) {
		this.datumi = datumi;
	}
    
    
}
