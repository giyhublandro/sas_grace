
export class Affectation{
	
	public id_mission: number;
	public id_affectation : number;
	public id_utilisateur : number;
	public id_client : number;
	public duree: number;
	public montant: number;
	public commisions:number;
	public frequence: number;
	public date_mission: Date;
	public heure_mission: string;
	public mission :string;
	public nom_utilisateur :string;
	public prenom_utilisateur :string;
	public nom_client :string;
	public statut :number;
	public description:string;
	public adresse_client:string;
	public telephone_1:string;
	public telephone_2:string;
	public email_client:string;
	public code_acces_1:string;
	public code_acces_2:string;
	public type_client:string;

	public tarif_horaire_client : number;
	public tarif_horaire_personnel : number;
	
	public total_facture :number;
	public montant_option :number;
	public tarif_horaire_option :number;
	
	public source_id :number;

	constructor(id_mission:number,id_affectation:number , montant:number, duree:number, frequence:number,source_id:number,
		id_client:number,commisions:number,heure_mission:string , date_mission:Date, id_utilisateur:number,mission:string, 
		tarif_horaire_personnel : number, tarif_horaire_client : number, nom_utilisateur:string,prenom_utilisateur:string,
		nom_client:string,statut:number,description:string, adresse_client:string, telephone_1:string,  telephone_2:string, email_client:string, 
		code_acces_1:string,  code_acces_2:string, type_client:string, total_facture:number,montant_option:number,tarif_horaire_option:number
		){

		this.id_mission=id_mission;
		this.duree=duree;
		this.montant=montant;
		this.id_affectation=id_affectation;
		this.date_mission=date_mission;
		this.frequence=frequence;
		this.heure_mission=heure_mission;
		this.commisions=commisions;
		this.id_utilisateur = id_utilisateur;
		this.mission=mission;
		this.nom_utilisateur=nom_utilisateur;
		this.prenom_utilisateur=prenom_utilisateur;
		this.nom_client=nom_client;

		this.id_client= id_client
		this.statut=statut;
		this.description=description;

		this.nom_client=nom_client;
		this.adresse_client=adresse_client;
		
		this.telephone_1=telephone_1;
		this.telephone_2=telephone_2;
		this.email_client=email_client;
		this.code_acces_2=code_acces_2;
		this.code_acces_1=code_acces_1;
		this.type_client=type_client;

		this.tarif_horaire_client=tarif_horaire_client;
		this.tarif_horaire_personnel=tarif_horaire_personnel;

		this.total_facture=total_facture;
		this.montant_option=montant_option;
		this.tarif_horaire_option=tarif_horaire_option;

		this.source_id = source_id;

	}

}