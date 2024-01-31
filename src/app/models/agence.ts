
export class Agence{
	
	public id_agence:number;
	public nom: string;
	public description: string;
	public adresse: string;
	public telephone: string;
	public email: string;
	public logo: string;

	constructor(nom:string,  logo:string,adresse:string,  telephone:string, description:string,  email:string,id_agence:number){

		this.nom=nom;
		this.logo = logo;

		this.description = description;
		this.email = email;
		this.telephone = telephone;
		this.adresse = adresse;
		this.id_agence = id_agence;
		
	}

}

