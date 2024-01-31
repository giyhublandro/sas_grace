import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { NotificationService } from '../services/notifications.service';

import { Client } from '../models/client';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {

  isUpdate : boolean = false;
  clientForm! : FormGroup;

  id_utilisateur : number = 0 ;

  clients !: Client[];

  nom_profil !:string;
  
  filtrer_client !: string;
  filtrer_client_date !: Date
  filtrer_client_du !:Date
  filtrer_client_au !:Date

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
    private router:Router,
    private _notificationService : NotificationService) { }

    ngOnInit(): void {
      
      this.listeDesClients()

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    }

    listeDesClients(){

      this._utilisateurService.getClients().subscribe((data:Client[]) => {
        this.clients = data;
      });

    }

    delete(client:any){
      this.comboBox(client)
    }


    edit(client:any){
      this.router.navigate(['client-edit',this.id_utilisateur, client.id_client]);
    }

    createClient(){
      this.router.navigate(['client',this.id_utilisateur]);
    }

    comboBox(client:any){

      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {

        if (result.value) {
          
          this._utilisateurService.deleteClient(client.id_client).subscribe(data => {
            this.clients = this.clients.filter(u => u !== client);
          });

          let title : string = "Client supprimé avec succès";

          this._notificationService.createNotification(2, title)
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          
        }

      })
      
    }

    filtrerClient(){

      if (this.filtrer_client_date){
        if (this.filtrer_client !== "") {
          this._utilisateurService.getClientsParFiltreIncluDate(this.filtrer_client, this.filtrer_client_du, this.filtrer_client_au).subscribe((data:Client[]) => {
            this.clients = data;
          });
        }else{
          this._utilisateurService.getClientsParFiltreDate(this.filtrer_client_du, this.filtrer_client_au).subscribe((data:Client[]) => {
            this.clients = data;
          });
        }
      }else{
        if (this.filtrer_client !== "" ) {
          this._utilisateurService.getClientsParFiltre(this.filtrer_client).subscribe((data:Client[]) => {
            this.clients = data;
          });
        }else{
          this.listeDesClients()
        }
      }
    }

}
