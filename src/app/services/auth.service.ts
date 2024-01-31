import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateurs } from '../models/utilisateur';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NotificationService } from './notifications.service';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  utilisateurs !: Utilisateurs[];
  client !: Client[];

  constructor(private router:Router ,
    private _utilisateurService :UtilisateurService,
    private _notificationService :NotificationService) {}

  setToken(token:string):void{
    localStorage.setItem('token',token);
  }

  getToken():string | null{
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return this.getToken() !== null;
  }

  id !:number;

  login(data:any, notRobot:boolean){

    this._utilisateurService.login(data).subscribe((userData: Utilisateurs[]) => {

      this.utilisateurs = userData;
      
      if (this.utilisateurs.length >= 1 && notRobot) {
        
        this.setToken('sjflkjdkfjdfidhfdbfndfhdfdyfghdsfgdsfsodifuid');

        this.router.navigate(['/dashboard/' + this.utilisateurs[0].id_utilisateur]);
        
        let title : string = "Recevez nos salutations"
        this._notificationService.createNotification(2, title)
       
      }else{
        
        console.log(data);
        
        this._utilisateurService.loginCompte(data).subscribe((userData: Client[]) => {
          
          console.log(userData);

          this.client = userData;

          if(this.client.length >= 1 && notRobot){
            
            this.router.navigate(['/espace-client/' + this.client[0].id_client]);

            let title : string = "Recevez nos salutations"
            this._notificationService.createNotification(2, title)
  
          }else{
            
            let title : string = "Email et/ou Mot de passe incorrecte"
            //this.toastAlertWarning(title)
            this._notificationService.createNotification(1, title)
          }

        });

        
      }
      
    });

  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  simpleAlertSuccess(){
    Swal.fire('Engresitrment effectué avec succès', 'success')
  }

}
