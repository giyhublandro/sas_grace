import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { Utilisateurs } from '../models/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { Profiles } from '../models/profils';
import { NotificationService } from '../services/notifications.service';

import { Client } from '../models/client';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Source } from '../models/source';
import { Option } from '../models/option';
import { Ville } from '../models/ville';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  isUpdate : boolean = false;
  referent: boolean = false;
  showOptions : boolean =false;

  clientForm! : FormGroup;

  id_utilisateur : number = 0 ;

  clients !: Client[];
  sources !: Source[];

  regions : any[]=[]
  departements : any[]=[];
  communes : any[]=[];

  code_postals :any[]=[];
  
  nombreOption !:number ;
  options : Option[]=[];
  montant_option_1 :number=0;
  montant_option_2 :number=0;
  montant_option_3 :number=0;
  montant_option_4 :number=0;
  
  villes : any[] = [];
  code_postaux : any[] = [];

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
    private router:Router,
    private _notificationService : NotificationService) { }

    ngOnInit(): void {
      
      this.nombreOption = 0;

      this.createClientForm();

      this.listeDesSources();

      this.regionDeFrance();
      
      this.getOptions();

      this.getVilles();

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    }

    createClientForm() {

      this.clientForm = this.formBuilder.group({
       
       'id_client' :[''],
       'id_source' :['',Validators.compose([Validators.required])],
       'nom_client' :['',Validators.compose([Validators.required, Validators.minLength(3)])],

       'email_client' :[''],
        
        'code_acces_2' :[''],
    
        'code_acces_1' :[''],
                
        'type_client' :['',Validators.compose([Validators.required])],
        
        'telephone_2' :[''],

        'telephone_1' :[''],

        'code_postal' :[''],
        'ville_client' :[''],     
        'adresse_client' :[''], // RUE

        'region':[''],
        'departement':[''],

        'nom_referent':[''],
        'commentaire':[],
        
        'nombreOption':[],
        'montant_option_1':[],
        'option_1':[''],
        'montant_option_2':[],
        'option_2':[''],
        'montant_option_3':[],
        'option_3':[''],
        'montant_option_4':[],
        'option_4':[''],
    
        'frequence_client':['',Validators.compose([Validators.required])]

      });

    }

    titreFenetre  : string ="Création de Clients"
    titreButton : string = "Créer"
    
    listeDesSources(){

      this._utilisateurService.getSources().subscribe((data:any[]) => {
 
        this.sources = data;
  
      });
     }

    createClient(values :any, isUpdate:any){

      if (! isUpdate) {
 
        this._utilisateurService.createClient(values).subscribe((data) => {
          
          this.sources =[];

          this.regions =[];

          let title : string = "Client crée avec succès";
          this.nombreOption = 0;
          this._notificationService.createNotification(2, title)
          
          this.listClient()

        });

      }else{

        this.isUpdate = false;

        this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];
        
      }
     
    }

    listClient(){
      //permet de visualiser la liste des clients
      this.router.navigate(['/client-list',this.id_utilisateur]);
    }

    creerClient(){
      //permet de visualiser la liste des clients
      this.router.navigate(['/client',this.id_utilisateur]);
    }


    regionDeFrance(){

      this._utilisateurService.getRegionsDeFrance().subscribe((data:any[]) =>{
        this.regions = data;

      });
  
    }

    departementsDeFrance(code_region:any){

      this._utilisateurService.getDepartementsDeFrance(code_region).subscribe((data:any[]) =>{
        this.departements = data;
      });
  
    }

    communesDeFrance(code_departement:any){

      this._utilisateurService.getCommunesDeFrance(code_departement).subscribe((data:any[]) =>{
        this.communes = data;
        
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

    onCodePostalChange(e:Event){

    }

    onTypeClientChange(e:Event){
      
      let type_client_value = (<HTMLInputElement>e.target).value

      if (type_client_value === "Particulier"){
        this.referent = false
      }else if(type_client_value === "Entreprise"){
        this.referent = true
      }

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
    
    getVilles(){
      
      this._utilisateurService.getVilles().subscribe((data:any[]) =>{
        
        this.villes = data;

      });

    }

    onVilleChange(e:Event){
      
      let ville_nom = (<HTMLInputElement>e.target).value
      
      this._utilisateurService.getCodePostalByVilleName(ville_nom).subscribe((data:any[]) =>{

        this.code_postaux = data;

      });

    }

}
