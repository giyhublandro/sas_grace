import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Utilisateurs } from '../models/utilisateur';
import { Pays } from '../models/pays';
import { map, Observable } from 'rxjs';

import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router } from '@angular/router';
import { UtilisateurService } from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})

export class NotificationService { 

    constructor(private _router : Router,
        private _utilisateurService : UtilisateurService) { }

    createNotification(data :number, message :string){
        
        if (data == 1){ 
            this.toastAlertWarning(message)
        }else if (data == 2){
            this.toastAlertSuccess(message)
        }

    }

    toastAlertWarning(title : string){
    
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'warning',
          title: title
        })
    
      }
    
      toastAlertSuccess(title : string){
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: title
        })
    
      }

}

