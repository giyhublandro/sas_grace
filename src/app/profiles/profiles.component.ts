import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Profiles } from '../models/profils';
import { UtilisateurService } from '../services/utilisateur.service';
import { NotificationService } from '../services/notifications.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profils !: Profiles[];
  profilForm !: FormGroup;

  id_utilisateur : number = 0 ;

  //utilisateurs !: Utilisateurs[];

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
    private router:Router, 
    private _notificationService : NotificationService) { }

    _id: any;

    ngOnInit(): void {
      
      this.createProfileForm();

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    }

    createProfileForm() {

      this.profilForm = this.formBuilder.group({
        
         id_profil:[''],
         nom_profil :['',Validators.compose(
          [Validators.required, Validators.minLength(5)])],
          profil :[''],
          mission :[''],
          agence :[''],
         utilisateurs :[''],
         paiements :[''],
         mes_paiements :[''],
         clients :[''],
         mes_missions :[''],
         mon_planning :[''],
         rapports :[''],
         validations :[''],
         contact :[''],
         source :[''],
         administration :['']

      });

    }

  OnSubmitCreateProfil(data:any){

    this._utilisateurService.createProfil(data).subscribe((data) => {
      
      this.router.navigate(['/profiles-liste', this.id_utilisateur]);

      let title : string = "Profil crée avec succès";

       this._notificationService.createNotification(2, title)

   });

 }

 ListeProfil(){
  this.router.navigate(['/profiles-liste/'+this.id_utilisateur]);
 }

}
