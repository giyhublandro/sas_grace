import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { Categorie } from '../models/categorie';
import { UtilisateurService } from '../services/utilisateur.service';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Facture } from '../models/facture';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent {

  nomUtilisateur !: string;
  prenomUtilisateur !: string;

  nombreDeProfil : number = 0
  nombreUtilisateurs : number = 0
  nombreDeClient : number = 0
  nombreDeMissions : number = 0
  nombreDeSource : number = 0
  nombreOption :number = 0

  id_utilisateur !: number;
  id_profil !: number;

  profil : boolean =false
   mes_paiements : boolean=false
   sorties : boolean=false
   utilisateurs : boolean=false
   clients : boolean=false
   mon_planning : boolean=false
   mission : boolean=false
   paiements : boolean=false
   mes_missions : boolean=false
   rapports : boolean=false
   administration : boolean=false
   source : boolean=false
   validations : boolean=false
   url : string ="../../assets/dist/img/logo.jpg";
  
   libelle_facture :string="MES FACTURES"
   factures :Facture[]=[];

  constructor(private formBuilder:FormBuilder,
  private _utilisateurService : UtilisateurService,
  private _authService: AuthService,
  private routes:ActivatedRoute,
  private router:Router) { }
  
  ngOnInit(): void {
    
    this.nombreDeMission()

    this.nombreDesUtilisateurs()

    this.nombreDeClients()

    this.nombreDesProfil()

    this.nombreDesSources()

    this.nombreDOptions()
    
    this.listeDesFactures()

    this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    this._utilisateurService.getUserById(this.id_utilisateur).subscribe((data: any) => {
    
      if (data == null){
        this._authService.logout();
      }else{

        this.id_profil = data.id_profil
        this.url =""
        this.nomUtilisateur = data.nom_utilisateur;
        this.prenomUtilisateur = data.prenom_utilisateur;

        this._utilisateurService.getProfilById(this.id_profil).subscribe((data:any)=>{
          
          if (data.profil == '1') {
            this.profil = true; //ok
          }

          if (data.mes_paiements == '1') {
            this.mes_paiements = true; // ok
          }

          if (data.sorties == '1') {
            this.sorties = true; // ok
          }
          
          if (data.utilisateurs == '1') {
            this.utilisateurs = true; // ok
          }
          
          if (data.clients == '1') {
            this.clients = true; //ok
          }
          
          if (data.mon_planning == '1') {
            this.mon_planning = true; //ok
          }
          
          if (data.mission == '1') {
            this.mission = true; 
          }
          
          if (data.paiements == '1') {
            this.paiements = true;  //ok
          }
          
          if (data.mes_missions == '1') {
            this.mes_missions = true; //ok
          }
          
          if (data.rapports == '1') {
            this.rapports = true; //ok
          }

          if (data.administration == '1') {
            this.administration = true; //ok
            this.libelle_facture = "LES FACTURES"
          }

          if (data.source == '1') {
            this.source = true; //ok
          }

          if (data.validations == '1') {
            this.validations = true; //ok
          }
          
        });
        

      }

    });

    
  }
  
  listeDesFactures(){

    this._utilisateurService.getFactures().subscribe((data:Facture[]) => {
      this.factures = data;

    });

  }


  navigation(typeDeRapport:string,e:Event){
    this.router.navigate(
  		['/rapports', typeDeRapport, this.id_utilisateur], 
  	);

    e.preventDefault();

  }

  logout(){
    this.confirmBox()
  }

  nombreDeClients(){
    this._utilisateurService.getClients().subscribe((data:any[]) => {

      data.forEach(element => {
        this.nombreDeClient += 1
      });

    });
  }

  nombreDeMission(){
    this._utilisateurService.getMissions().subscribe((data:any[]) => {

      data.forEach(element => {
        this.nombreDeMissions += 1
      });

    });
  }

  nombreDesUtilisateurs(){
    this._utilisateurService.getUsers().subscribe((data:any[]) => {
      data.forEach(element => {
        this.nombreUtilisateurs += 1
      });

    });
  }

  nombreDesProfil(){
    this._utilisateurService.getListesProfil().subscribe((data:any[]) => {
      data.forEach(element => {
        this.nombreDeProfil += 1
      });

    });
  }

  nombreDesSources(){
    this._utilisateurService.getSources().subscribe((data:any[]) => {
      data.forEach(element => {
        this.nombreDeSource += 1
      });

    });
  }

  nombreDOptions(){
    this._utilisateurService.getOptions().subscribe((data:any[]) => {
      data.forEach(element => {
        this.nombreOption += 1
      });

    });
  }


  confirmBox(){
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/home'])
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
  }
}
