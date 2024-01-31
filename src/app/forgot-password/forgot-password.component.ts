import { Component } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  
  nom !: string;
  email !: string;
  logo !: string;

  constructor(private _utilisateurService:UtilisateurService){

  }

  ngOnInit(): void{

    let id_agence :number = 1
    this.infoAgence(id_agence)

  }

  infoAgence(id_agence : any){

    this._utilisateurService.getAgenceById(id_agence).subscribe((data:any) => {

      this.nom = data.nom
      this.email = data.email
      this.logo = data.logo
      
    });

  }

  envoieDeMail(){

    console.log("Demande de reinitialisation du mot de passe");
       
  }
  
}
