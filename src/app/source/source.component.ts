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
import { Source } from '../models/source'

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent {

  sourceForm! : FormGroup;
  
  constructor(private formBuilder:FormBuilder,
    private _utilisateurService : UtilisateurService,
    private routes:ActivatedRoute,
   private router:Router, 
   private _notificationService : NotificationService) { }
  
   source !: string;
	 description!: string;
	 id_source!:number;

   connected_user_id !:number;

   titreFenetre : string="Modification de Source"
   titreButton : string="Enregistrer"

   ngOnInit(): void {

    this.createSourceForm()

    let id_source = ''
    
    //Information de l'utilisateur a modifier
    this.connected_user_id = this.routes.snapshot.params['id_utilisateur'];

    if (this.routes.snapshot.params['id_source']){

      id_source = this.routes.snapshot.params['id_source'];

      if(id_source !=='') {
        this.infoSource(id_source)
      }

    }

  }

  createSourceForm() {

    this.sourceForm = this.formBuilder.group({
      'id_source' :[''],
      'source' :['',Validators.compose(
       [Validators.required])],
       'description' :['']
    });
  }
  
infoSource(id_source : any){

  this._utilisateurService.getSourceById(id_source).subscribe((data:any) => {
    
    this.id_source = data.id_source
    this.description = data.description
    this.source = data.source
    
  });

}

updateSource(data:any){
    
    this._utilisateurService.updateSource(data).subscribe((data) => {
      this.ListeSources()

      let title : string = "Source mise à jours avec succès";

      this._notificationService.createNotification(2, title)

   });

  }

  ListeSources(){
    this.router.navigate(['/source-list', this.connected_user_id]);
  }
  
}
