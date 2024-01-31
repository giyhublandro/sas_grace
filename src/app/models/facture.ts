export class Facture {
	
	public id_facturation: number;
	public date_facturation: Date;
	public libelle: string;
	public numero_facture: string;
	public montant: number;
	public id_client: number;
	public etat:number;
	
	constructor(id_facturation:number, libelle:string, numero_facture:string,montant:number, id_client:number, etat:number, date_facturation:Date){

		this.id_facturation=id_facturation;
		this.date_facturation=date_facturation;
		this.libelle = libelle;
		this.montant = montant;
		this.id_client = id_client;
		this.numero_facture = numero_facture
		this.etat = etat
		
	}

}