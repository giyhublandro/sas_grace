import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router , Params} from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { NotificationService } from '../services/notifications.service';

import { Mission } from '../models/mission';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent {

  isUpdate : boolean = false;
  missionForm! : FormGroup;

  id_utilisateur : number = 0 ;

  missions !: Mission[];

  constructor(private formBuilder:FormBuilder,
     private _utilisateurService : UtilisateurService,
     private routes:ActivatedRoute,
    private router:Router,
    private _notificationService : NotificationService) { }

    ngOnInit(): void {
      
      this.listeDesMissions()

      this.id_utilisateur = this.routes.snapshot.params['id_utilisateur'];

    }

    listeDesMissions(){

      this._utilisateurService.getMissions().subscribe((data:Mission[]) => {
        this.missions = data;
      });

    }

    delete(mission:any){
      this.comboBox(mission)
    }


    edit(mission:any){
      this.router.navigate(['/mission-edit',this.id_utilisateur, mission.id_mission]);
    }

    createMission(){
      this.router.navigate(['/mission',this.id_utilisateur]);
    }

    comboBox(mission:any){

      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {

        if (result.value) {
          
          this._utilisateurService.deleteMission(mission.id_mission).subscribe(data => {
            this.missions = this.missions.filter(u => u !== mission);
          });

          let title : string = "Mission supprimée avec succès";

          this._notificationService.createNotification(2, title)
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          
        }

      })
      
    }
}
