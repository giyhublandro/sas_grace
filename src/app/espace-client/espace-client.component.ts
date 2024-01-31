import { Component,} from '@angular/core';
import { ActivatedRoute, Route, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UtilisateurService } from '../services/utilisateur.service';
import { Facture } from '../models/facture';
import { NotificationService } from '../services/notifications.service';
import { Affectation } from '../models/affectation';
import { Source } from '../models/source';

@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.css']
})

export class EspaceClientComponent {
  
  factures : Facture[]=[];
  affectations : Affectation[]=[];
  etat : number = 0;
  assignForm! : FormGroup;

  attestationView : boolean =false
  profilView : boolean =false
  reservationsView : boolean =false
  factureView : boolean =false
  homeView : boolean =true

  referent: boolean = false;
  attestations : string ="";
  profil : string ="";
  reservations : string ="";
  facture : string ="";
  home : string ="active";

  titre : string = 'Tableau de bord'
  
  route :any =''
  
  clientForm! : FormGroup;

  id_option_client !:number;

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
  mot_de_passe !:string;
  ville_client !:string;
  nombreOption :number = 0;

  region !:any;
  departement !:any;
  commune !:any;
  nom_referent !:string;
  commentaire !:string;
  code_postaux :any[]=[]
  villes :any[]=[]
  sources : Source[]=[]
  frequence_client !:number;

  queryParamsStatus ='';
  rows :any;

  online : boolean =false;

  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private routes: ActivatedRoute,
    private _utilisateurService:UtilisateurService,
    private _notificationService : NotificationService){
  }

  ngOnInit() {
    this.routes.queryParams.subscribe(queryParams => {
      // do something with the query params
    });

    this.routes.params.subscribe(routeParams => {
      //console.log(routeParams)
      this.paramsValue(routeParams['menu'])
      this.id_client = routeParams['id_client']
      
      this.createClientForm()

      this.listeDesSources()

      this.getVilles()

      this.infoClient(this.id_client)

    });  
     
  }

  ngDoCheck(){
    //this.paramsValue()
  }

  paramsValue(menu :string){

    if(this.routes.snapshot.params['menu'] == 'mon-profil'){
      this.profil ="active"
      this.attestations ="";
      this.profil ="";
      this.reservations ="";
      this.facture ="";
      this.home=""

      this.titre = "Mon profil"
      this.attestationView =false
      this.profilView =true
      this.reservationsView =false
      this.factureView =false
      this.homeView =false

    }else if(this.routes.snapshot.params['menu'] == 'reservations'){
      this.reservations="active"
      this.profil =""
      this.attestations ="";
      this.profil ="";
      this.facture ="";
      this.home=""

      this.titre = "Mes Réservations"
      this.attestationView =false
      this.profilView =false
      this.reservationsView =true
      this.factureView =false
      this.homeView =false

    }else if(this.routes.snapshot.params['menu'] == 'facturation-list'){
      this.facture="active"
      this.profil =""
      this.attestations ="";
      this.profil ="";
      this.reservations ="";
      this.home=""

      this.titre = "Mes Factures"
      this.attestationView =false
      this.profilView =false
      this.reservationsView =false
      this.factureView =true
      this.homeView =false

    }else if(this.routes.snapshot.params['menu'] == 'attestations'){
      this.attestations="active"
      this.profil =""
      this.profil ="";
      this.reservations ="";
      this.facture ="";
      this.home=""
      
      this.titre = "Attestations Fiscales"
      this.attestationView =true
      this.profilView =false
      this.reservationsView =false
      this.factureView =false
      this.homeView =false

    }else{
      
      this.home="active"
      this.attestations=""
      this.profil =""
      this.profil ="";
      this.reservations ="";
      this.facture ="";

      this.attestationView =false
      this.profilView =false
      this.reservationsView =false
      this.factureView =false
      this.homeView =true

    }

    //console.log(this.routes.snapshot.params['menu'])

  }

  onChange(){

    //this.h1Title = "Factures Produites Réglées"

    this.listeDesFactures()
  }

  regler(facture:any, regle:any){

    let title : string = "";

    if (regle == 1){
      title = "Facture réglée avec succès";
    }else if(regle == 0){
      title = "Annulation de règlement avec succès";
    }

    this._utilisateurService.updateFactureEtat(facture, regle).subscribe((data) => {

        this._notificationService.createNotification(2, title);
  
        //this.router.navigate(['/facturation-list',this.id_utilisateur]);

        this.listeDesFactures()
  
    });

  }

  listeDesFactures(){

    this._utilisateurService.getFactures().subscribe((data:Facture[]) => {
      this.factures = data;

    });

  }

  imprimer(data:any){

    //let rapport : number = parseInt(data.rapports)
    
    let rapport : number = 1

    let nom_rapport : string =""

    let baseUrlOnline:string="https://coup-de-balai.hotelsoft.cm";
    let baseUrlOffline:string="http://localhost/angular/coup_de_balai";
    
    if(this.online){
       baseUrlOnline ="https://coup-de-balai.hotelsoft.cm";
    }

    let urlString : string = ""

    if(rapport == 1){
      nom_rapport ="facture_client"
      urlString  = baseUrlOffline + "/html2pdf/rapports/"+nom_rapport+".php?id_facturation="+data.id_facturation+"&date_facturation="+data.date_facturation+"&numero_facture="+data.numero_facture+"&nom_client="+data.nom_client+"&adresse_client="+data.adresse_client+"&telephone_1="+data.telephone_1+"&telephone_2="+data.telephone_2+"&email_client="+data.email_client+"&numero_siret="+data.numero_siret+"&type_client="+data.type_client;
    }else if(rapport == 2){
      nom_rapport ="entrees"
    }else if(rapport == 3){
      
    }else if(rapport == 5){
      
    }

    if (rapport > 0){
      window.open(urlString, "_blank")
    }else{

    }
    
  }

  listeDesAffectations(){

    this._utilisateurService.getAffectations().subscribe((data:Affectation[]) => {
      this.affectations = data;

    });

  }

  validerAnnuler(affectation:any, etat:number){

    let title : string = "";

    if (etat == -1)  {
      title = "Service Annulée avec succès";
    }else if (etat == 1)  {
      title = "Service Validée avec succès";
    }

    this._utilisateurService.updateEtat(affectation, etat).subscribe((data) => {
      
        this._notificationService.createNotification(2, title);
  
        this.router.navigate(['/espace-client', this.id_client]);

        this.listeDesAffectations()
  
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
        'mot_de_passe':['',Validators.compose([Validators.required,])],
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
      this.mot_de_passe = data.mot_de_passe
  
      if( this.type_client == "Entreprise"){
        this.referent = true;
      }else{
        this.referent = false;
      }
      
      //this.getClientOptions(this.id_client)
      
      this._utilisateurService.getCodePostalByVilleName(this.ville_client).subscribe((data_:any[]) =>{
        
        this.code_postaux = data_;
  
      });
  
  
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

  onOptionsNumberChange(e:Event){
    this.nombreOption = Number((<HTMLInputElement>e.target).value)
  }

  updateClient(data:any){
  
    console.log(data)
    this._utilisateurService.updateClient(data).subscribe((data) => {

     let title : string = "Profil mise à jours avec succès";

      this._notificationService.createNotification(2, title)

   });

  }

  listeDesSources(){

    this._utilisateurService.getSources().subscribe((data:any[]) => {

      this.sources = data;

    });
  }
  
  
  getVilles(){
        
    this._utilisateurService.getVilles().subscribe((data:any[]) =>{
      this.villes = data;
  
    });
  
  }

  

}
