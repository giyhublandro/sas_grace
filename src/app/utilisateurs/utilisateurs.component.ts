import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { Utilisateurs } from '../models/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { Profiles } from '../models/profils';
import { NotificationService } from '../services/notifications.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})

export class UtilisateursComponent {

  profils !: Profiles[];

  isUpdate : boolean = false;
  utilisateurForm! : FormGroup;

  id_utilisateur : number = 0 ;

  utilisateurs !: Utilisateurs[];

  nom_profil !:string;

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
    private router:Router,
    private _notificationService : NotificationService) { }

    _id: any;

    ngOnInit(): void {
      
      this.listeDesProfils()

      this.createUtilisateurForm();

      this.listeDesUtilisateurs()

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    }
    
    createUtilisateurForm() {

      this.utilisateurForm = this.formBuilder.group({
       
       'id_profil' :[''],
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

    titreFenetre  : string ="Création d'utilisateur"
    titreButton : string = "Créer"
    
    createUtilisateur(values :any, isUpdate:any){

      if (! isUpdate) {
 
        this._utilisateurService.createUtilisateur(values).subscribe((data) => {
          //window.location.href = '/utilisateurs';
          this.ngOnInit()

          let title : string = "Utilisateur crée avec succès";

          this._notificationService.createNotification(2, title)
       
        });

      }else{

        this.isUpdate = false;

        this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];
        
      }
     
    }

    
  listeDesProfils(){

    this._utilisateurService.getListesProfil().subscribe((data:any[]) => {

      this.profils = data;

    });
 }

    listeDesUtilisateurs(){

      this._utilisateurService.getUsers().subscribe((data:Utilisateurs[]) => {
        this.utilisateurs = data;

      });

    }

    delete(utilisateur:any){

      this.comboBox(utilisateur)
    }

    userId : number = 0;
    
    edit(utilisateur:any){

      this.router.navigate(['update-utilisateur',this.id_utilisateur, utilisateur.id_utilisateur]);
      
    }

    comboBox(utilisateur:any){

      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {

        if (result.value) {
          
          this._utilisateurService.deleteUser(utilisateur.id_utilisateur).subscribe(data => {
            this.utilisateurs = this.utilisateurs.filter(u => u !== utilisateur);
          });

          let title : string = "Utilisateur supprimé avec succès";

          this._notificationService.createNotification(2, title)
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          
        }

      })
      
    }
    
}
