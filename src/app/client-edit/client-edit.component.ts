import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { Utilisateurs } from '../models/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { Client } from '../models/client';
import { NotificationService } from '../services/notifications.service';
import { Source } from '../models/source';
import { Option } from '../models/option';
import { OptionClient } from '../models/option_client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent {
  
  referent: boolean = false;

  regions : any[]=[]
  departements : any[]=[];
  communes : any[]=[];

  code_postals :any[]=[];

  clientForm! : FormGroup;
  clients !: Client[];

  sources !: Source[];

  user !: Utilisateurs;

  constructor(private formBuilder:FormBuilder,
    private _utilisateurService : UtilisateurService,
    private routes:ActivatedRoute,
    private router:Router, 
    private _notificationService : NotificationService) { }
    
  id_client !:number;
  nom_client !:string;
  adresse_client !:string;
  telephone_1 !:string;
  telephone_2 !:string;
  email_client !:string;
  code_acces_1 !:string;
  code_acces_2  !:string;
	type_client !:string;
  id_source !:number;
  code_postal !: string;
  id_utilisateur !:number;
  ville_client !:string;

  region !:any;
  departement !:any;
  commune !:any;

  titreFenetre : string="Modification du Client"
  titreButton : string="Enregistrer"
  
  nombreOption !:number ;
  options : Option[]=[]
  
  code_postaux :any[]=[]
  villes :any[]=[]
  
  id_option_client !:number;

  montant_option_1 :number=0;
  montant_option_2 :number=0;
  montant_option_3 :number=0;
  montant_option_4 :number=0;

  option_1 !:number;
  option_2 !:number;
  option_3 !:number;
  option_4 !:number;
  
  nom_referent !:string;
  commentaire !:string;
  
  frequence_client !:number;

   ngOnInit(): void {

    this.listeDesSources()

    this.createClientForm()
    
    this.getOptions();
    
    this.getVilles();

    this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    if (this.routes.snapshot.params['id_client']){

      this.id_client = this.routes.snapshot.params['id_client'];

      if(this.id_client > 0) {
        this.infoClient(this.id_client);
      }

    }

    //this.regionDeFrance();

    //this.uploaddepartementsDeFrance(this.region);
    
  }

  listeDesSources(){

    this._utilisateurService.getSources().subscribe((data:any[]) => {

      this.sources = data;

    });
  }

 getClientOptions(id_client:number){

  this._utilisateurService.getClientOptions(id_client).subscribe((data:any) => {
    
    if (data != null){
      
      this.nombreOption = data.nombre_option
    
      this.id_option_client=data.id_option_client
  
      this.option_1 = data.id_option_1
      this.option_2 = data.id_option_2
      this.option_3 = data.id_option_3
      this.option_4 = data.id_option_4
  
      this.montant_option_1 = data.montant_option_1 
      this.montant_option_2 = data.montant_option_2
      this.montant_option_3 = data.montant_option_3 
      this.montant_option_4 = data.montant_option_4 

    }
    

  });
}

  createClientForm() {

    this.clientForm = this.formBuilder.group({
     
      'id_client' :[''],
      'id_option_client':[''],
       'id_source' :['',Validators.compose([Validators.required])],
       'nom_client' :['',Validators.compose([Validators.required, Validators.minLength(3)])],

       'email_client' :[''],
        
        'code_acces_2' :[''],
    
        'code_acces_1' :[''],
                
        'type_client' :['',Validators.compose([Validators.required])],
        
        'telephone_2' :[''],

        'telephone_1' :[''],

        'code_postal' :[''],
        'commune' :[''],     
        'adresse_client' :[''], // RUE

        'region':[''],
        'departement':[''],
        
        'nom_referent':[''],
        'commentaire':[],
        'ville_client':[''],
        'frequence_client':['',Validators.compose([Validators.required,])],
        'nombreOption':[],
        'montant_option_1':[],
        'option_1':[''],
        'montant_option_2':[],
        'option_2':[''],
        'montant_option_3':[],
        'option_3':[''],
        'montant_option_4':[],
        'option_4':['']


    });
  }
  
infoClient(id_client : any){
  
  this._utilisateurService.getClientById(id_client).subscribe((data:any) => {
    
    if(data != null){
      
      this.id_client = data.id_client;
      this.nom_client = data.nom_client;
      this.adresse_client = data.adresse_client;
      this.telephone_1 = data.telephone_1;
      this.telephone_2 = data.telephone_2;
      this.email_client = data.email_client;
      this.code_acces_1 = data.code_acces_1;
      this.code_acces_2  = data.code_acces_2;
  		this.type_client = data.type_client;
      this.id_source = data.id_source;
      this.code_postal = data.code_postal;
      this.ville_client = data.ville_client;
      this.commune = data.commune;
      this.region = data.region;
      this.departement = data.departement;
      
      this.commentaire=data.commentaire
      this.nom_referent =data.nom_referent
      this.frequence_client = data.frequence_client
  
      if( this.type_client == "Entreprise"){
        this.referent = true;
      }else{
        this.referent = false;
      }
      
      this.getClientOptions(this.id_client)
      
      this._utilisateurService.getCodePostalByVilleName(this.ville_client).subscribe((data_:any[]) =>{
        
        this.code_postaux = data_;
  
      });

    }else{

    }

  });

}

updateClient(data:any){

    this._utilisateurService.updateClient(data).subscribe((data) => {
      
      this.ListeClients()

      let title : string = "Client mise à jours avec succès";

      this._notificationService.createNotification(2, title)

   });

}

  ListeClients(){
    this.router.navigate(['/client-list', this.id_utilisateur]);
  }

  regionDeFrance(){

    this._utilisateurService.getRegionsDeFrance().subscribe((data:any[]) =>{
      this.regions = data;

      let code_region = this.region;

      this.departementsDeFrance(code_region)

    });

  }

  departementsDeFrance(code_region:any){

    this._utilisateurService.getDepartementsDeFrance(code_region).subscribe((data:any[]) =>{
      this.departements = data;

      let code_departement = this.departement
      this.communesDeFrance(code_departement)

    });

  }

  uploaddepartementsDeFrance(code_region:any){

    this._utilisateurService.getDepartementsDeFrance(code_region).subscribe((data:any[]) =>{
      this.departements = data;

      let code_departement = this.departement
      this.communesDeFrance(code_departement)

    });

  }

  communesDeFrance(code_departement:any){

    this._utilisateurService.getCommunesDeFrance(code_departement).subscribe((data:any[]) =>{
      this.communes = data;

      let code_commune = this.commune;
      this.codePostaleDeLacommune(code_commune)

    });
    
  }

  codePostaleDeLacommune(code_commune:any){

    this._utilisateurService.getCodePostalCommune(code_commune).subscribe((data:any[]) =>{
      this.code_postals = data;

    });
    
  }

  onRegionsChange(e:Event){
      let code_region = (<HTMLInputElement>e.target).value;

      this.departementsDeFrance(code_region);

  }

  onDepartementsChange(e:Event){

    let code_departement = (<HTMLInputElement>e.target).value;
    this.communesDeFrance(code_departement);
    
  }

  onCommunesChange(e:Event){

    let code_commune = (<HTMLInputElement>e.target).value;
    this.codePostaleDeLacommune(code_commune);
  
  }

  onOptionsNumberChange(e:Event){
    this.nombreOption = Number((<HTMLInputElement>e.target).value)
  }

getOptions(){

  this._utilisateurService.getOptions().subscribe((data:any[])=>{
    this.options = data
  });

}

onChangeOption1(e:Event){
  
  let id_option_1 = Number((<HTMLInputElement>e.target).value)
  
  this._utilisateurService.getOptionById(id_option_1).subscribe((data:any) => {

    this.montant_option_1 = data.montant_option

  });

}

onChangeOption2(e:Event){
  
  let id_option_2 = Number((<HTMLInputElement>e.target).value)
  
  this._utilisateurService.getOptionById(id_option_2).subscribe((data:any) => {

    this.montant_option_2 = data.montant_option

  });

}

onChangeOption3(e:Event){
  
  let id_option_3 = Number((<HTMLInputElement>e.target).value)
  
  this._utilisateurService.getOptionById(id_option_3).subscribe((data:any) => {

    this.montant_option_3 = data.montant_option

  });

}

onChangeOption4(e:Event){
  
  let id_option_4 = Number((<HTMLInputElement>e.target).value)
  
  this._utilisateurService.getOptionById(id_option_4).subscribe((data:any) => {

    this.montant_option_4 = data.montant_option

  });

}

onTypeClientChange(e:Event){
      
  let type_client_value = (<HTMLInputElement>e.target).value

  if (type_client_value === "Particulier"){
    this.referent = false
  }else if(type_client_value === "Entreprise"){
    this.referent = true
  }

}

getVilles(){
      
  this._utilisateurService.getVilles().subscribe((data:any[]) =>{
    this.villes = data;

  });

}

onVilleChange(e:Event){
  
  let ville_nom = (<HTMLInputElement>e.target).value
  
  this._utilisateurService.getCodePostalByVilleName(ville_nom).subscribe((data:any[]) =>{
    
    this.code_postal = data[0].ville_code_postal;
    
    for (let index = 0; index < data.length; index++) {
      
      const element = data[index];
       this.code_postal = element.ville_code_postal
      
    }

    //console.log(data)

    this.code_postaux = data;

  });

}

onCodePostalChange(){

  this._utilisateurService.getCodePostalByVilleName(this.ville_client).subscribe((data:any[]) =>{
    
    console.log(data)

    this.code_postaux = data;

  });

}

  
}
