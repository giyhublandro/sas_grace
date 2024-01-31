import { Component } from '@angular/core';
import { Affectation } from '../models/affectation';
import { UtilisateurService } from '../services/utilisateur.service';
import { Mission } from '../models/mission';
import { Option } from '../models/option';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Panier } from '../models/panier';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  
  affectations : Affectation[]=[]
  missions :Mission []=[]
  options : Option[]=[]
  panier:Panier[]=[]
  
  id_client !:number
  id_source !:number

  assignForm! : FormGroup;
  
  id_utilisateur : number = 0 ;

  nom_profil !:string;
  nombre :number = 0
  tarif_horaire_personnel :number = 0;
  tarif_horaire_client :number  = 0;
  commisions :number  = 0;
  montant :number  = 0;
  duree :number = 0;
  
  montant_option :number=0;
  tarif_horaire_option :number=0;
  id_mission !:number;
  frais_option : number = 0
  frequence !:number
  total_facture :number= 0
  
  source_id : number = 0
  frequence_client :number = 0;
  
  jour_1 :number = -1;
  jour_2 :number = -1
  jour_3 :number = -1
  jour_4 :number = -1
  jour_5 :number = -1
  jour_6 :number = -1
  jour_7 :number = -1
  
  heure_1 :string ="00:00:00";
  heure_2 :string ="00:00:00";
  heure_3 :string ="00:00:00";
  heure_4 :string ="00:00:00";
  heure_5 :string ="00:00:00";
  heure_6 :string ="00:00:00";
  heure_7 :string ="00:00:00";

  heure_11 :string ="00:00:00";
  heure_21 :string ="00:00:00";
  heure_31 :string ="00:00:00";
  heure_41 :string ="00:00:00";
  heure_51 :string ="00:00:00";
  heure_61 :string ="00:00:00";
  heure_71 :string ="00:00:00";
  
  autre_horaire !:any
  totalPanier :number = 0
  
  plus :boolean = true;

  constructor(private _utilisateurService:UtilisateurService,
    private formBuilder:FormBuilder,
    private routes: ActivatedRoute,
    private router:Router){
    
  }
  
  ngOnInit(){

    this.listeDesMissions()
    this.getOptions()
    this.createAffectationForm()

    this.routes.params.subscribe(routeParams => {
  
      this.id_client = routeParams['id_client']
      
      if(Number(this.id_client) > 0 ){
        this.infoClient(this.id_client)
      }

    });

  }

  listeDesAffectations(){

    this._utilisateurService.getAffectations().subscribe((data:Affectation[]) => {
      this.affectations = data;

    });

  }

  listeDesMissions(){

    this._utilisateurService.getMissions().subscribe((data:Mission[]) => {
      this.missions = data;
    });

  }

  createAffectationForm() {

    this.assignForm = this.formBuilder.group({
     
     'id_mission' :['',Validators.compose([Validators.required])],
     'id_utilisateur':['',Validators.compose([Validators.required])],
      'id_client' :['',Validators.compose([Validators.required])],
      'duree' :['',Validators.compose([Validators.required])],
      'montant' :['',Validators.compose([Validators.required])],
      'commisions' :['',Validators.compose([Validators.required])], 
      'frequence' :['',Validators.compose([Validators.required])],
      'date_mission' :[''],
      'heure_mission' :[''],
      'tarif_horaire_personnel' :['',Validators.compose([Validators.required])],
      'tarif_horaire_client' :['',Validators.compose([Validators.required])],
      'jour_1':[''],
      'heure_1':[''],
      'jour_2':[''],
      'heure_2':[''],
      'jour_3':[''],
      'heure_3':[''],
      'jour_4':[''],
      'heure_4':[''],
      'jour_5':[''],
      'heure_5':[''],
      'jour_6':[''],
      'heure_6':[''],
      'jour_7':[''],
      'heure_7':[''],
      'source_id':[''],
      'montant_option':[],
      'tarif_horaire_option':[],
      'total_facture':[],
      'autre_horaire':[],
      'nombre':[]
 
    });

  }

  getOptions(){

    this._utilisateurService.getOptions().subscribe((data:any[])=>{
      this.options = data
    });

  }

  infoClient(id_client : any){
    
    this._utilisateurService.getClientById(id_client).subscribe((data:any) => {

      this.id_client = data.id_client;
      this.id_source = data.id_source;
  
    });
  
  }
  
  calculationOfValues(){
      
    this.montant_option = 0

    this.commisions = this.duree * this.tarif_horaire_personnel

    this.montant_option = this.duree * this.tarif_horaire_option

    this.montant = this.duree * this.tarif_horaire_client

    this.total_facture = this.montant + this.montant_option

    this.outputPanier()

  }

  onDureeChange(){

    this.montant_option = 0;
   
    this.calculationOfValues()

  }

  onTarifHoraireOptionChange(){

    this.montant_option = 0;
    this.montant_option = this.duree * this.tarif_horaire_option

    this.calculationOfValues();

  }

  onTarifHorairePersonnelChange(){
      
    this.calculationOfValues();

  }

  onTarifHoraireClientChange(){
    
    this.calculationOfValues();

  }

  onDateMissionChange(e:Event){
        
    let date : Date = new Date((<HTMLInputElement>e.target).value);
    let day = Number(date.getDay());
    let month = Number(date.getMonth())

    this.jour_1 = day;

  }

  onHeureMissionChange(e:Event){
     this.heure_1 = (<HTMLInputElement>e.target).value
  }
  
  onAutreHoraireChange(){
    console.log(this.autre_horaire)
  }

  preventDefaultBehaviour(e:Event){
    e.preventDefault()
  }

  onServiceClick(e:Event){

    let id_mission = Number((<HTMLInputElement>e.target).value)
    
    let add : boolean = true
        
    //Rechercher un id_option
    this.panier.find((obj) => {
      
      if(obj.id_mission == id_mission){
        this.panier = this.panier.filter(item => Number(item.id_mission) !== Number(id_mission));
        add =false;
      }

    });
    
    if(add){
      this.infoMission(id_mission)
    }
 
  }

  onOptionClick(e:Event){

    let id_option = (<HTMLInputElement>e.target).value
    
    this.infoOption(id_option)

  }

  infoMission(id_mission: any){
    
    this._utilisateurService.getMissionById(id_mission).subscribe((data:any) => {

      if(data.montant > 0){
        this.panier.push(
          {
            id_mission:data.id_mission,
             montant:data.montant,
             lien:data.lien, 
             id_option:0, 
             montant_option:0,
             service_option:data.mission
          }
        )
      }

    });

    this.outputPanier();
  
  }

  infoOption(id_option : any){

    this._utilisateurService.getOptionById(id_option).subscribe((data:any) => {
      
      if(data.montant_option > 0){
        
        let unCheck : boolean = false
        
        //Rechercher un id_option
        this.panier.find((obj) => {
          
          if(obj.id_option == data.id_option){
            //Supprimer une id_option
            this.panier = this.panier.filter(item => Number(item.id_option) !== Number(data.id_option));
            unCheck =true;
          }

        });

        if(! unCheck){
          
          this.panier.push(
            {
              id_mission:0,
               montant:0, 
               id_option:data.id_option, 
               montant_option:data.montant_option,
               service_option:data.option,
               lien:''
            }
          )

        }
        
      }

    });
    
    
    this.outputPanier();
  
  }

  outputPanier(){
    
    this.totalPanier = 0
    let tempTotalPanier : number= 0
    let temp_tarif_horaire_option :number= 0
    let temp_tarif_horaire_client :number = 0;

    this.panier.forEach(element => {

      tempTotalPanier += Number(element.montant) + Number(element.montant_option)
      temp_tarif_horaire_option += Number(element.montant_option)
      temp_tarif_horaire_client += Number(element.montant)

      this.totalPanier = tempTotalPanier * this.duree

      if(this.totalPanier == 0){
        this.totalPanier = tempTotalPanier
      }

      this.total_facture = this.totalPanier;
      this.tarif_horaire_option = temp_tarif_horaire_option;
      this.tarif_horaire_client = temp_tarif_horaire_client;

    });

  }

  ngDoCheck(){
    this. calculationOfValues()
  }

  delete(e:Event, id_mission:number){
    
    e.preventDefault()

    let unCheck : boolean = false
        
    //Rechercher un id_option
    this.panier.find((obj) => {
      
      if(obj.id_mission == id_mission){
        //Supprimer une id_option
        this.panier = this.panier.filter(item => Number(item.id_mission) !== Number(id_mission));
        unCheck =true;
      }

    });

  }

  createAffectation(values:any){
    this.router.navigate(['/creer-compte']);
  }

}
