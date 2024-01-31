
export class Type{
	
	public id_type: number;
	public id_categorie: number;
	public lie_membre: number;
	public nom_type: string;
	public nom_categorie: string;
	
	constructor(id_type:number, nom_type:string , nom_categorie:string, id_categorie:number, lie_membre:number){

		this.id_type=id_type;
		this.id_categorie=id_categorie;
		this.lie_membre=lie_membre;
		this.nom_type=nom_type;
		this.nom_categorie=nom_categorie;
		
	}

}