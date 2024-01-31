import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { Utilisateurs } from '../models/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { Profiles } from '../models/profils';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NotificationService } from '../services/notifications.service';
import { Agence } from '../models/agence';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  
  url : any = "../../assets/dist/img/logo.jpg";

  agenceForm! : FormGroup;
  agence !: Agence;

  id_utilisateur !:number;

  selectedFile !: File ;

  constructor(private formBuilder:FormBuilder,
    private _utilisateurService : UtilisateurService,
    private routes:ActivatedRoute,
   private router:Router,
   private _notificationService : NotificationService,
   private http: HttpClient) { }

   id_agence !:number;
   logo !: string;
	 nom!:string;
	 email!:string;
	 description!:string;
   adresse !:string;
	 telephone !:string;

   titreFenetre : string="Configurations"
   titreButton : string="Mettre à jours"

   ngOnInit(): void {

    this.createAgenceForm()

    if (this.routes.snapshot.params['id_utilisateur']){
        this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];
    }

    let id_agence :number = 1;

    this.infoAgence(id_agence);

  }

  createAgenceForm() {

    this.agenceForm = this.formBuilder.group({

      'id_agence' :[''],
      'nom' :['',Validators.compose(
       [Validators.required, Validators.minLength(3)])],
      
      'email' :['',Validators.compose(
       [Validators.required, Validators.minLength(5)])],
      
       'telephone' :['',Validators.compose(
       [Validators.required, Validators.minLength(9)])],
                   
       'adresse' :['',Validators.compose(
       [Validators.required, Validators.minLength(5)])],

       'description':['',Validators.compose(
        [Validators.required, Validators.minLength(14)])],

       'logo':['']

    });
  }
  
infoAgence(id_agence : any){

  this._utilisateurService.getAgenceById(id_agence).subscribe((data:any) => {
    
    this.id_agence = data.id_agence
    this.nom = data.nom
    this.email = data.email
    this.description = data.description
    this.adresse  = data.adresse
		this.telephone = data.telephone
    this.logo = data.logo
    
  });

}

updateAgence(data:any){

    this._utilisateurService.upDateAgence(data).subscribe((data) => {
      
      let title : string = "Agence mise à jours avec succès";

      this._notificationService.createNotification(2, title);

      this.agenceList();

   });

  }

  agenceList(){
    this.router.navigate(['/dashboard', this.id_utilisateur]);
  }
  
  image !: any ;

  onSelectFile(e:any) {
    this.selectedFile = e.target.files[0]
  }

  onUpload(){
    
    const fd = new FormData()
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost/angular/coup_de_balai/php/uploadAvatar.php?id_agence='+this.id_agence, fd, {
      reportProgress:true,
      observe:'events'
    })
    .subscribe((response : any) => {
        console.log(response);
    })

  }

  getFile(e :any){
    
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload= (event:any)=>{
        this.url=event.target.result
      }
    }

    this.selectedFile = e.target.files[0];
    
  }


}
