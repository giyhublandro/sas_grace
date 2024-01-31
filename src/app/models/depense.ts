export class Depense {
	
	public id_depense: number;
	public id_charge: number;
	public nom_charge: string;
	public id_membre: number;
	public nom_membre: string;
	public commentaire: string;
	public montant: number;
	public date_depense: Date;

	constructor(id_depense:number,id_charge:number , nom_charge:string, id_membre:number, nom_membre:string, commentaire:string, montant:number, date_depense:Date){

		this.id_depense=id_depense;
		this.id_charge=id_charge;
		this.nom_charge=nom_charge;
		this.id_membre=id_membre;
		this.nom_membre = nom_membre;
		this.commentaire = commentaire;
		this.montant = montant;
		this.date_depense = date_depense;
		
	}

}