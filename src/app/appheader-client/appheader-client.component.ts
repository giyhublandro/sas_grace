import { Component,} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-appheader-client',
  templateUrl: './appheader-client.component.html',
  styleUrls: ['./appheader-client.component.css']
})
export class AppheaderClientComponent {

  id_client !:number;
  nom_client !:string;
  adresse_client !:string;
  telephone_1 !:string;
  telephone_2 !:string;
  email_client !:string;
  code_acces_1 !:string;
  code_acces_2  !:string;
	type_client !:string;
  id_source !:number;
  code_postal !: string;
  //id_utilisateur !:number;
  ville_client !:string;

  region !:any;
  departement !:any;
  commune !:any;
  nom_referent !:string;
  commentaire !:string;
  code_postaux :any[]=[]
  villes :any[]=[]
  frequence_client !:number;

  constructor(private router:Router,
    private routes:ActivatedRoute,
    private _utilisateurService:UtilisateurService){
  }
  
  referent: boolean = false;
  attestations : string ="";
  profil : string ="";
  reservations : string ="";
  facture : string ="";
  home : string ="";

  menu :any;

  ngOnInit():void{
    
    if (this.routes.snapshot.params['id_client']){

      if(Number(this.routes.snapshot.params['id_client']) > 0) {

        this.id_client = Number(this.routes.snapshot.params['id_client']);
        
        this.infoClient(this.id_client);

      }

    }

    this.routes.queryParams.subscribe(queryParams => {
      console.log(queryParams)
    });
    this.routes.params.subscribe(routeParams => {
      //console.log(routeParams['menu'])
      this.paramsValue(routeParams['menu'])
      this.menu = routeParams['menu']
      
      console.log(routeParams['menu'] == "reservations")

    });

  }

  ngDoCheck(){
    //this.paramsValue(this.menu)
  }

  logout(){
    this.confirmBox()
  }
  
  infoClient(id_client : any){
    
    this._utilisateurService.getClientById(id_client).subscribe((data:any) => {

      this.id_client = data.id_client;
      this.nom_client = data.nom_client;
      this.adresse_client = data.adresse_client;
      this.telephone_1 = data.telephone_1;
      this.telephone_2 = data.telephone_2;
      this.email_client = data.email_client;
      this.code_acces_1 = data.code_acces_1;
      this.code_acces_2  = data.code_acces_2;
      this.type_client = data.type_client;
      this.id_source = data.id_source;
      this.code_postal = data.code_postal;
      this.ville_client = data.ville_client;
      this.commune = data.commune;
      this.region = data.region;
      this.departement = data.departement;
      
      this.commentaire=data.commentaire
      this.nom_referent =data.nom_referent
      this.frequence_client = data.frequence_client
  
      if( this.type_client == "Entreprise"){
        this.referent = true;
      }else{
        this.referent = false;
      }
      
      //this.getClientOptions(this.id_client)
      
      this._utilisateurService.getCodePostalByVilleName(this.ville_client).subscribe((data_:any[]) =>{
        
        this.code_postaux = data_;
  
      });
  
  
    });
  
  }

  confirmBox(){
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/home'])
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
  }

  paramsValue(menu :string){

    if(menu == "mon-profil"){
      this.profil ="active"
      this.attestations ="";
      this.reservations ="";
      this.facture ="";
      this.home=""

    }else if(menu == "reservations"){
      this.reservations="active"
      this.profil =""
      this.attestations ="";
      this.facture ="";
      this.home=""
    }else if(menu == "facturation-list"){
      this.facture="active"
      this.profil =""
      this.attestations ="";
      this.reservations ="";
      this.home=""
    }else if(menu == "attestations"){
      this.attestations="active"
      this.profil =""
      this.reservations ="";
      this.facture ="";
      this.home=""
    }else{
      
      this.home="active"
      this.attestations=""
      this.profil =""
      this.reservations ="";
      this.facture ="";

    }

    console.log('Home :'+this.home)
    console.log('attestations :'+this.attestations)
    console.log('profil :'+this.profil)
    console.log('reservations :'+this.reservations)
    console.log('facture :'+this.facture)

    //this.router.navigate(['/espace-client', this.id_client, menu]);

  }

}
