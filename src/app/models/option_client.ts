
export class OptionClient{
	
	public id_option_client :number
	public id_option_1: number;
	public id_option_2: number;
	public id_option_3: number;
	public id_option_4: number;

	public montant_option_1: number;
	public montant_option_2: number;
	public montant_option_3: number;
	public montant_option_4: number;

	public nombre_option: number;
	
	constructor(id_option_1:number, montant_option_1:number,id_option_client:number,
		id_option_2:number, montant_option_2:number,id_option_3:number, montant_option_3:number,
		id_option_4:number, montant_option_4:number, nombre_option:number){

		this.id_option_1=id_option_1;
		this.id_option_2=id_option_2;
		this.id_option_3=id_option_3;
		this.id_option_4=id_option_4;

		this.montant_option_1=montant_option_1;
		this.montant_option_2=montant_option_2;
		this.montant_option_3=montant_option_3;
		this.montant_option_4=montant_option_4;
		this.nombre_option = nombre_option
		this.id_option_client = id_option_client
		
	}

}