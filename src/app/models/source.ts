
export class Source{
	
	public id_source: number;
	public source: string;
	public description: string;
	public default_source :number;
	
	constructor(id_source:number,source:string, description:string, default_source:number){
		this.id_source=id_source;
		this.source=source;
		this.description=description;
		this.default_source=default_source;
		
	}

}