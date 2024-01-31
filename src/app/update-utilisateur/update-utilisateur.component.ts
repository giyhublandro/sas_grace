import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { Utilisateurs } from '../models/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { Profiles } from '../models/profils';
import { NotificationService } from '../services/notifications.service';
import { HttpClient } from '@angular/common/http';


// L'ID DE L'UTILISATEUR CONNECTE SE CONFONDS AVEC CELUI DE L'UTILISATEUR DONT ON VEUT MODIFIER LES INFORMATIONS 
@Component({
  selector: 'app-update-utilisateur',
  templateUrl: './update-utilisateur.component.html',
  styleUrls: ['./update-utilisateur.component.css']
})
export class UpdateUtilisateurComponent {

  profils !: Profiles[];

  utilisateurForm! : FormGroup;
  utilisateurs !: Utilisateurs[];

  user !: Utilisateurs;
  
  constructor(private formBuilder:FormBuilder,
    private _utilisateurService : UtilisateurService,
    private routes:ActivatedRoute,
   private router:Router, 
   private _notificationService : NotificationService,
   private http:HttpClient) { }
    
   mot_de_passe_utilisateur !: string;
	 nom_utilisateur!: string;
	 prenom_utilisateur!:string;
	 email_utilisateur!:string;
	 telephone_utilisateur!:string;
	 id_profil!:number;
   id_utilisateur !:number;

   connected_user_id !:number;

  adresse !:string;
	 telephone !:string;
	 sex !:number;
	 type_identite !:string;
	 num_piece_identite !:string;
	 date_expiration !:Date;
	 actif !:number;
	 nom_profil !:string

   titreFenetre : string="Modification d'utilisateur"
   titreButton : string="Enregistrer"

   ngOnInit(): void {

    this.listeDesProfils()

    this.createUtilisateurForm()

    let id_utilisateur_edit = ''
    
    //Information de l'utilisateur a modifier
    this.connected_user_id = this.routes.snapshot.params['id_utilisateur'];

    if (this.routes.snapshot.params['id_utilisateur_edit']){

      id_utilisateur_edit = this.routes.snapshot.params['id_utilisateur_edit'];

      if(id_utilisateur_edit !=='') {
        this.infoUtilisateur(id_utilisateur_edit)
      }

    }

  }

  createUtilisateurForm() {

    this.utilisateurForm = this.formBuilder.group({
     
      'id_profil':[''],
      'id_utilisateur' :[''],
      'nom_utilisateur' :['',Validators.compose(
       [Validators.required, Validators.minLength(3)])],
      'prenom_utilisateur' :['',Validators.compose(
       [Validators.required, Validators.minLength(3)])],

      'email_utilisateur' :['',Validators.compose(
       [Validators.required, Validators.minLength(5)])],
      'mot_de_passe_utilisateur' :['',Validators.compose(
       [Validators.required, Validators.minLength(4)])],

       'actif' :['',Validators.compose(
       [Validators.required])],

       'date_expiration' :['',Validators.compose(
       [Validators.required])],

       'num_piece_identite' :['',Validators.compose(
       [Validators.required, Validators.minLength(5)])],
   
       'type_identite' :['',Validators.compose(
       [Validators.required])],
               
       'sex' :['',Validators.compose(
       [Validators.required])],
       
       'telephone' :['',Validators.compose(
       [Validators.required, Validators.minLength(9)])],
                   
       'adresse' :['',Validators.compose(
       [Validators.required, Validators.minLength(5)])]

    });
  }
  
infoUtilisateur(id_utilisateur : any){

  this._utilisateurService.getUserById(id_utilisateur).subscribe((data:Utilisateurs) => {
    
    this.id_utilisateur = data.id_utilisateur
    this.mot_de_passe_utilisateur = data.mot_de_passe_utilisateur
    this.nom_utilisateur = data.nom_utilisateur
    this.prenom_utilisateur = data.prenom_utilisateur
    this.email_utilisateur = data.email_utilisateur
    this.id_profil = data.id_profil
    this.adresse  = data.adresse
		this.telephone = data.telephone
		this.sex = data.sex
		this.type_identite =data.type_identite
		this.num_piece_identite = data.num_piece_identite
		this.date_expiration = data.date_expiration
		this.actif = data.actif
		this.nom_profil = data.nom_profil

  });

}

listeDesProfils(){

  this._utilisateurService.getListesProfil().subscribe((data:any[]) => {

    this.profils = data;

  });
}

updateUtilisateur(data:any){
    
    this._utilisateurService.upDateUser(data).subscribe((data) => {
      this.ListeUtilisateurs()

      let title : string = "Utilisateur mis à jours avec succès";

      this._notificationService.createNotification(2, title)

   });

  }

  ListeUtilisateurs(){
    this.router.navigate(['/utilisateurs', this.connected_user_id]);
  }

  

}
