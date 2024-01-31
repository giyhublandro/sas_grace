export class Utilisateurs{
	
	public id_utilisateur: number;
	public mot_de_passe_utilisateur: string;
	public nom_utilisateur: string;
	public prenom_utilisateur:string;
	public email_utilisateur:string;
	public id_profil :number;

	public adresse:string;
	public telephone:string;
	public sex:number;
	public type_identite:string;
	public num_piece_identite:string;
	public date_expiration:Date;
	public actif:number;
	public nom_profil:string
	public avatar:any

	constructor(id_utilisateur:number,nom_utilisateur:string, prenom_utilisateur:string, mot_de_passe_utilisateur:string, email_utilisateur:string, id_profil:number,adresse:string, telephone:string,sex:number,type_identite:string,num_piece_identite:string,date_expiration:Date,actif:number,nom_profil:string, avatar:any){
		
		this.id_utilisateur=id_utilisateur;
		this.nom_utilisateur=nom_utilisateur;
		this.prenom_utilisateur=prenom_utilisateur;
		this.mot_de_passe_utilisateur = mot_de_passe_utilisateur;
		this.email_utilisateur = email_utilisateur;
		this.id_profil = id_profil;
		
		this.adresse = adresse
		this.telephone = telephone
		this.sex = sex
		this.type_identite =type_identite
		this.num_piece_identite = num_piece_identite
		this.date_expiration = date_expiration
		this.actif = actif
		this.nom_profil = nom_profil
		this.avatar = avatar
		
	}

}