export class Profiles{
	
    public id_profil:number;
    public nom_profil : string;
    public profil : number;
    public mission : number;
    public agence : number;
    public utilisateurs : number;
    public paiements : number;
    public mes_paiements : number;
    public clients : number;
    public mes_missions : number;
    public mon_planning : number;
    public rapports : number;
    public validations : number;
    public administration : number;

	constructor(id_profil:number, nom_profil :string, profil :number, mission : number, agence : number, utilisateurs : number , paiements : number , mes_paiements : number , clients : number , mes_missions : number , mon_planning : number, rapports : number, validations : number, administration : number){

        this.id_profil=id_profil;
        this.nom_profil=nom_profil;
        this.profil=profil;
        this.mission=mission;
        this.agence=agence;
        this.utilisateurs=utilisateurs;
        this.paiements=paiements;
        this.mes_paiements=mes_paiements;
        this.clients=clients;
        this.mes_missions=mes_missions;
        this.mon_planning=mon_planning;
        this.rapports=rapports;
        this.validations=validations;
        this.administration=administration;

    }

}

	
        
		