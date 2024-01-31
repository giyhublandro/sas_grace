export class Client{
	
	public id_client: number;
	public nom_client: string;
	public adresse_client: string;
	public telephone_1:string;
	public telephone_2:string;
	public email_client:string;
	public code_acces_1:string;
	public code_acces_2:string;
	public type_client:string;
	public source:string;
	public id_source:number;
	public code_postal:string;
	public ville_client :string;
	public region :string;
	public departement :number;
	public commune : number;
	public nom_referent :string;
	public commentaire :string;
	public frequence_client :string;
	public mot_de_passe :string;

	constructor(id_client:number,  adresse_client:string, telephone_1:string, region :string, departement :number, nom_referent:string,
		nom_client:string, commentaire:string, email_client:string, telephone_2:string, source:string, ville_client:string,commune : number,
		code_acces_2:string, code_acces_1:string, type_client:string, id_source:number, code_postal:string, frequence_client :string,
		mot_de_passe:string){

		this.id_client=id_client;
		this.adresse_client=adresse_client;
		this.telephone_1=telephone_1;
		this.nom_client = nom_client;
		this.email_client = email_client;
		this.telephone_2 = telephone_2;
		this.code_acces_1 = code_acces_1;
		this.code_acces_2 = code_acces_2;
		this.type_client = type_client;
		this.id_source = id_source;
		this.source = source;
		this.code_postal = code_postal;
		this.ville_client = ville_client;
		this.commune = commune;
		this.departement =departement;
		this.region =region;
		this.commentaire=commentaire;
		this.nom_referent =nom_referent;
		this.frequence_client = frequence_client;
		this.mot_de_passe = mot_de_passe;

	}

}