
export class Option{
	
	public id_option:number;
	public option:string
	public montant_option: number;
	
	constructor(id_option:number, montant_option:number, option:string){

		this.id_option=id_option;
		this.option = option;
		this.montant_option=montant_option;
		
	}

}