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
import { Source } from '../models/source';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.css']
})
export class SourceListComponent {

  isUpdate : boolean = false;
  sourceForm! : FormGroup;

  id_utilisateur : number = 0 ;

  sources !: Source[];

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
    private router:Router,
    private _notificationService : NotificationService) { }

    _id: any;

    ngOnInit(): void {

      this.createSourceForm();

      this.listeDesSources()

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    }

    createSourceForm() {

      this.sourceForm = this.formBuilder.group({
       
       'id_source' :[''],
       'source' :['',Validators.compose(
        [Validators.required])],
        'description' :['']

      });

    }

    titreFenetre  : string ="Création de Source"
    titreButton : string = "Créer"
    
    createSource(values :any, isUpdate:any){

      if (! isUpdate) {
 
        this._utilisateurService.createSource(values).subscribe((data) => {
          //window.location.href = '/utilisateurs';
          this.ngOnInit()

          let title : string = "Source créee avec succès";

          this._notificationService.createNotification(2, title)
       
        });

      }else{

        this.isUpdate = false;

        this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];
        
      }
     
    }


    listeDesSources(){

      this._utilisateurService.getSources().subscribe((data:Source[]) => {
        this.sources = data;

      });

    }

    delete(source:any){

      this.comboBox(source)
    }

    edit(source:any){

      this.router.navigate(['/source',this.id_utilisateur, source.id_source]);
      
    }

    comboBox(source:any){

      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {

        if (result.value) {
          
          this._utilisateurService.deleteSource(source.id_source).subscribe(data => {
            this.sources = this.sources.filter(u => u !== source);
          });

          let title : string = "Source supprimée avec succès";

          this._notificationService.createNotification(2, title)
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          
        }

      })
    }

}
