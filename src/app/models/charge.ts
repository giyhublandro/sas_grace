export class Charge {
	
	public id_charge: number;
	public nom_charge: string;
	public lie_membre: string;

	constructor(id_charge:number, nom_charge:string, lie_membre:string){
		
		this.id_charge=id_charge;
		this.lie_membre=lie_membre;
		this.nom_charge=nom_charge;
		
	}

}