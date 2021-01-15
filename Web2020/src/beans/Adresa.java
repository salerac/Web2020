package beans;

public class Adresa {
	
	private int id;
	private String ulica;
	private int broj;
	private String grad;
	private int postanskiBroj;
	
	public Adresa() {
		
	}
	public Adresa(String ulica, int broj, String grad, int postanskiBroj) {
		setUlica(ulica);
		setBroj(broj);
		setGrad(grad);
		setPostanskiBroj(postanskiBroj);
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	

}
