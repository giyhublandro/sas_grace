import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UtilisateurService } from '../services/utilisateur.service';
import { NotificationService } from '../services/notifications.service';
import { Source } from '../models/source';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-creer-compte',
  templateUrl: './creer-compte.component.html',
  styleUrls: ['./creer-compte.component.css']
})
export class CreerCompteComponent {
  
  nom !: string;
  email !: string;
  logo !: string;
  
  clientForm! : FormGroup;
  
  type_client : string=""
  placeHolderValue : string= "Nom"
  
  sources : Source[]=[];
  
  villes : any[] = [];
  code_postaux : any[] = [];
  
  referent : boolean =false;

  constructor(private _utilisateurService:UtilisateurService,
    private formBuilder:FormBuilder,
    private _notificationService:NotificationService,
    private router:Router){

  }
  
  ngOnInit():void {

    let id_agence :number = 1

    this.infoAgence(id_agence)
    
    this.createClientForm();

    this.listeDesSources();

    this.getVilles();

  }
  
  createClientForm() {

    this.clientForm = this.formBuilder.group({
     
     'id_client' :[''],
     'nom_client' :['',Validators.compose([Validators.required, Validators.minLength(10)])],

     'email_client':['',Validators.compose([Validators.required])],
      'type_client' :['',Validators.compose([Validators.required])],
      'terms':['',Validators.compose([Validators.required])],
      'telephone_1':['',Validators.compose([Validators.required])],

      'code_postal':['',Validators.compose([Validators.required])],
      'ville_client':['',Validators.compose([Validators.required])],
      'adresse_client':['',Validators.compose([Validators.required])],

      'commentaire':[],
      'mot_de_passe':['',Validators.compose([Validators.required])],
      'confirmer_mot_de_passe':['',Validators.compose([Validators.required])],
      'frequence_client':['',Validators.compose([Validators.required])]

    });

  }

  infoAgence(id_agence : any){

    this._utilisateurService.getAgenceById(id_agence).subscribe((data:any) => {

      this.nom = data.nom
      this.email = data.email
      this.logo = data.logo
      
    });

  }

  onChangetype(e:Event){

      if(this.type_client == "Particulier"){
        this.placeHolderValue ="Nom Complet"
      }else{
        this.placeHolderValue ="Raison Sociale"
      }

      let type_client_value = (<HTMLInputElement>e.target).value

      if (type_client_value === "Particulier"){
        this.referent = false
      }else if(type_client_value === "Entreprise"){
        this.referent = true
      }

  }

  listeDesSources(){

    this._utilisateurService.getSources().subscribe((data:any[]) => {

      this.sources = data;

      console.log(data)

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

  creerCompte(values:any){
    
    this.router.navigate(['/checkout'])
  
    //if(values.confirmer_mot_de_passe === values.mot_de_passe){
      //this._utilisateurService.createCompte(values).subscribe((data:any)=>{
        //let title : string = "Compte crée avec succès";
        //this._notificationService.createNotification(2, title)

        //this.router.navigate(['/home']);

      //})
    //}else{
      //let title : string = "Les mots de passes ne correspondent pas";
      //this._notificationService.createNotification(1, title)
    //}

  }

}
