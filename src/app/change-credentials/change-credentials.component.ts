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

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.css']
})
export class ChangeCredentialsComponent {

  utilisateurForm! : FormGroup;
  utilisateurs !: Utilisateurs[];
  
  selectedFile !: File ;
  url : any = "";

  constructor(private formBuilder:FormBuilder,
    private _utilisateurService : UtilisateurService,
    private routes:ActivatedRoute,
   private router:Router,
   private _notificationService : NotificationService,
   private http: HttpClient) { }
  
   id_profil !:number;
   mot_de_passe_utilisateur !: string;
	 nom_utilisateur!: string;
	 prenom_utilisateur!:string;
	 email_utilisateur!:string;
	 telephone_utilisateur!:string;
   id_utilisateur !:number;

   adresse !:string;
	 telephone !:string;
	 sex !:number;
	 type_identite !:string;
	 num_piece_identite !:string;
	 date_expiration !:Date;

   avatar!:any;

	 nom_profil !:string

   titreFenetre : string="Modification du profil"
   titreButton : string="Mettre à jours"

   ngOnInit(): void {

    this.createUtilisateurForm()

    let id_utilisateur = ''
    
    if (this.routes.snapshot.params['id_utilisateur']){

        id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

      if(id_utilisateur !=='') {
        this.infoUtilisateur(id_utilisateur)
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
       [Validators.required, Validators.minLength(5)])],

       'avatar':['']

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
		this.nom_profil = data.nom_profil
    this.avatar = data.avatar
    
  });

}

updateUtilisateur(data:any){
    
console.log(data)

    this._utilisateurService.upDateUserProfil(data).subscribe((data) => {
      this.ListeUtilisateurs()

      let title : string = "Profil mise à jours avec succès";

      this._notificationService.createNotification(2, title)

   });

  }

  ListeUtilisateurs(){
    this.router.navigate(['/dashboard', this.id_utilisateur]);
  }

  onUpload(){
    
    const fd = new FormData()
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost/angular/coup_de_balai/php/uploadAvatar.php?id_utilisateur='+this.id_utilisateur, fd, {
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
