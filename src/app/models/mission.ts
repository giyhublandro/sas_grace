
export class Mission{
	
	public id_mission: number;
	public mission: string;
	public duree: number;
	public montant: number;
	public commisions:number;
	public frequence: number;
	public date_mission: Date;
	public heure_mission: string;
	public description: string;
	public lien:string;
	
	constructor(id_mission:number,mission:string , montant:number, duree:number, liens:string,
		frequence:number,commisions:number,heure_mission:string , description:string ,date_mission:Date){

		this.id_mission=id_mission;
		this.duree=duree;
		this.montant=montant;
		this.mission=mission;
		this.date_mission=date_mission;
		this.frequence=frequence;
		this.heure_mission=heure_mission;
		this.description=description;
		this.commisions=commisions;
		this.lien = liens;

	}

}