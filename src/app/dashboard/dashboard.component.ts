import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Utilisateurs } from '../models/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { AuthService } from '../services/auth.service';
import { CategDepense } from '../models/categ_depenses';
import { Source } from '../models/source';
import { Facture } from '../models/facture';
import { Affectation } from '../models/affectation';
import { RapportService } from '../services/rapport.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  nombreDeClient : number = 0
  totalDesEntrees : number = 0
  totalDesDepenses : number = 0
  soldeEnCaisse : number = 0
  
  constructor(private router:Router,
    private _authService:AuthService,
    private _rapportService : RapportService,
    private _utilisateurService:UtilisateurService,
    private routes:ActivatedRoute) {}
    
    CA_source : any[] = [];
    CA_frequence : any[] = [];
    CA_type : any[] = [];
    
    id_utilisateur !: number  ;

    id_profile !: number;

    profiles : boolean =false
    entrees : boolean=false
    sorties : boolean=false
    utilisateurs : boolean=false
    collectes : boolean=false
    clients : boolean=false
    previsions : boolean=false
    charges : boolean=false
    anti_datage : boolean=false
    rapports : boolean=false
    recap_financier: boolean=false

    categ_depenses !: CategDepense[];
    
    nombreDeProfil !: number;
    nombreDeUser !: number;
    nombreDeSource !: number;
    nombreDeFacture !: number;
    factureReglee : number = 0;
    factureNonReglee : number = 0;

    totalFactureReglee : number = 0;
    totalFactureNonReglee : number = 0;
    totalDesFactures : number = 0;
    totalBalance :number = 0;
    paiements :number = 0;
    
    nonValidee :number =0;
    totalDesMissions :number = 0;
    validee :number = 0;
    payees :number = 0;
    aPayer :number =0;
    
    nonPayee :number = 0;
    annulees :number =0;
    
    affectations :Affectation[]=[];
    
    totalCA :number = 0

    ngOnInit(): void {
      
      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

      this.listeDesClients()
      //this.listeDesEntrees()
      //this.listeDesDepenses()

     // this.categ_listeDesEntrees()
      //this.categ_listeDesDepenses()

      this.listeDesProfils();
      this.listeDesUtilisateurs();
      this.listeDesSources();
      this.listeDesFactures();
      this.listeDesAffectations();

      this._utilisateurService.getUserById(this.id_utilisateur).subscribe((data: any) => {
    
        if (data == null){
          this._authService.logout();
        }else{
  
          this.id_profile = data.id_profil
  
          //this.nomUtilisateur = data.nom_utilisateur;
  
          this._utilisateurService.getProfilById(this.id_profile).subscribe((data:any)=>{
            
            if (data.profiles == '1') {
              this.profiles = true; //ok
            }
            
          });
  
        }
  
      });
      
    }

    listeDesClients(){
      this._utilisateurService.getClients().subscribe((data:any[]) => {

        data.forEach(element => {
          this.nombreDeClient += 1
        });

      });
    }

    listeDesEntrees(){
      this._utilisateurService.getEntrees().subscribe((data:any[]) => {
        data.forEach(element => {
          this.totalDesEntrees += parseFloat(element.montant)
          this.soldeEnCaisse += parseFloat(element.montant)
        });
    });
  }

  listeDesDepenses(){
    this._utilisateurService.getDepenses().subscribe((data:any[]) => {

        data.forEach(element => {
          this.totalDesDepenses += parseFloat(element.montant)
          this.soldeEnCaisse -= parseFloat(element.montant)
        });
    });
  }

  categ_listeDesDepenses(){
    this._utilisateurService.getDepensesCateg().subscribe((data:any[]) => {
      this.categ_depenses = data
    });
  }

  listeDesProfils(){

    this._utilisateurService.getListesProfil().subscribe((data:any[]) => {

      this.nombreDeProfil = data.length;

    });
    
  }

  listeDesUtilisateurs(){

    this._utilisateurService.getUsers().subscribe((data:Utilisateurs[]) => {

      this.nombreDeUser = data.length
        
    });

  }

  listeDesSources(){

    this._utilisateurService.getSources().subscribe((data:Source[]) => {
      this.nombreDeSource =  data.length;

    });

  }
  
  listeDesFactures(){
    
    this.factureNonReglee =0
    this.totalFactureNonReglee = 0
    this.totalFactureReglee = 0
    this.totalDesFactures = 0
    this.totalCA = 0

    this._utilisateurService.getFactures().subscribe((data:Facture[]) => {
      this.nombreDeFacture = data.length;

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        
        if(element.etat == 0){
          this.factureNonReglee += 1;
          this.totalFactureNonReglee += Number(element.montant)
        }else if(element.etat == 1){
          this.factureReglee += 1;
          this.totalFactureReglee += Number(element.montant)
        }

        this.totalDesFactures += Number(element.montant)
        
        this.totalCA += Number(element.montant)

      }

    });

  }

  listeDesAffectations(){

    this._utilisateurService.getAffectations().subscribe((data:Affectation[]) => {
        
      this.paiements = 0;

        for (let index = 0; index < data.length; index++) {
          const element = data[index];
     
          if(Number(element.statut) == 3){
            this.paiements += Number(element.commisions);
            this.payees +=1;
          }

          if(Number(element.statut) == 0){
            this.nonValidee += 1;
          }

          if(Number(element.statut) >= 1){
            this.validee += 1;
          }

          if(Number(element.statut) == 2){
            this.aPayer += 1;
          }

          if(Number(element.statut) == -1){
            this.annulees += 1;
          }

        }

        this.totalDesMissions = data.length

        this.totalBalance = this.totalFactureReglee - this.paiements

        this.nonPayee = this.totalDesMissions - this.payees

    });

  }

}
