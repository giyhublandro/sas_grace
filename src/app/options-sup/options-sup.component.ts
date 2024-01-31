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
import { Option } from '../models/option';

@Component({
  selector: 'app-options-sup',
  templateUrl: './options-sup.component.html',
  styleUrls: ['./options-sup.component.css']
})
export class OptionsSupComponent {

  optionsForm! : FormGroup;
  
  isUpDate : boolean = false;

  constructor(private formBuilder:FormBuilder,
    private _utilisateurService : UtilisateurService,
    private routes:ActivatedRoute,
   private router:Router, 
   private _notificationService : NotificationService) { }
  
   option !: string;
	 montant_option : number = 0;
	 id_option!:number;

    options : Option[]=[]

   connected_user_id !:number;

   titreFenetre : string="Options"
   titreButton : string="Créer"

   ngOnInit(): void {

    this.createOptionForm()

    let id_option = ''
    
    //Information de l'utilisateur a modifier
    this.connected_user_id = this.routes.snapshot.params['id_utilisateur'];

    if (this.routes.snapshot.params['id_option']){

      id_option = this.routes.snapshot.params['id_option'];

      if(id_option !== '') {

        this.infoOption(id_option)
        this.isUpDate = true;

      }else{
        this.isUpDate=true
      }

    }

    this.getOptions();

  }

createOptionForm() {

    this.optionsForm = this.formBuilder.group({
      'id_option' :[''],
      'option' :['',Validators.compose([Validators.required])],
      'montant_option':['']
    });
  }
  
infoOption(id_option : any){

  this._utilisateurService.getOptionById(id_option).subscribe((data:any) => {
    
    this.id_option = data.id_option
    this.option = data.option
    this.montant_option = data.montant_option
    
  });

}

updateOption(data:any){
    
    this._utilisateurService.updateOption(data).subscribe((data) => {
      this.ListeOption()

      let title : string = "Options mise à jours avec succès";

      this._notificationService.createNotification(2, title)

      this.ListeOption();

   });

  }

  ListeOption(){
    this.router.navigate(['/options', this.connected_user_id]);
  }

  delete(option:any){

    this.comboBox(option)
  }

  edit(option:any){

    this.router.navigate(['/options',this.connected_user_id, option.id_option]);

    this.id_option = option.id_option

    this.infoOption(this.id_option)
    this.isUpDate = true;

  }

  comboBox(option:any){

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {

      if (result.value) {
        
        this._utilisateurService.deleteOption(option.id_option).subscribe(data => {
          this.options = this.options.filter(u => u !== option);
        });

        let title : string = "option supprimée avec succès";

        this._notificationService.createNotification(2, title)
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }

    })
  }

  getOptions(){

    this._utilisateurService.getOptions().subscribe((data:any[])=>{
      this.options = data
    });

  }

  createOption(values :any){

      this._utilisateurService.createOption(values).subscribe((data) => {
        
        this.ngOnInit()

        let title : string = "Option créee avec succès";

        this._notificationService.createNotification(2, title)
        
        this.isUpDate = false;

      });
   
  }

}
