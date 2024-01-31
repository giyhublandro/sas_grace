import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Profiles } from '../models/profils';
import { UtilisateurService } from '../services/utilisateur.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NotificationService } from '../services/notifications.service';

import {Subject} from 'rxjs';

@Component({
  selector: 'app-profiles-liste',
  templateUrl: './profiles-liste.component.html',
  styleUrls: ['./profiles-liste.component.css']
})

export class ProfilesListeComponent implements OnInit, OnDestroy {

  constructor(private formBuilder:FormBuilder,
    private _utilisateurService : UtilisateurService,
    private routes:ActivatedRoute,
   private router:Router,
   private _notificationService : NotificationService) { }
  
   //dtoptions:DataTables.Settings ={}
   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject<any>();

   profils !: Profiles[];

   id_utilisateur : number = 0 ;

   _id: any;

  ngOnInit(): void {
     
    this.dtOptions = {
      pagingType : 'full_numbers',
      pageLength: 10,
      dom: 'blfrtip', // use 'blfrtip' instead of 'bfrtip'
       
    };

    this.listeDesProfils()

    this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  listeDesProfils(){

    this._utilisateurService.getListesProfil().subscribe((data:any[]) => {

      this.profils = data;
      this.dtTrigger.next;
    });
    
 }

 edit(data:any){
    this.router.navigate(['profile-edit', this.id_utilisateur,data.id_profil]);
 }


 delete(profilData:any){

  this.comboBox(profilData)

 }

 createProfile(){
  this.router.navigate(['/profiles/'+this.id_utilisateur]);
 }

 comboBox(profilData:any){

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {

      if (result.value) {
        
        this._utilisateurService.deleteProfil(profilData.id_profil).subscribe(data => {
          this.profils = this.profils.filter(u => u !== profilData);
        });

        let title : string = "Profil supprimé avec succès";

        this._notificationService.createNotification(2, title)
        
        this.ListeProfil();

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }

    })
  }

  ListeProfil(){
    this.router.navigate(['/profiles-liste/'+this.id_utilisateur]);
  }

}
