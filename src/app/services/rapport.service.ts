import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Utilisateurs } from '../models/utilisateur';
import { Pays } from '../models/pays';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RapportService {

  baseUrlOnline:string="https://coup-de-balai.hotelsoft.cm/php";
  baseUrlOffline:string="http://localhost/angular/coup_de_balai/php";
  
  //baseUrl:string= this.baseUrlOffline;
  baseUrl:string= this.baseUrlOnline;

  constructor(private http:HttpClient) { }

  rapportChiffresAffaires(filtre : any, date_du :Date, date_au:Date){
    const url = this.baseUrl + '/rapport.php?chiffre_affaire='+filtre+'&du='+date_du+'&au='+date_au
    return this.http.get<any[]>(url);
  }

  rapportChiffresAffairesGraphique(filtre : number, date_du :Date, date_au:Date){
    //const url = this.baseUrl + '/rapport.php?chiffre_affaire_graphique='+filtre+'&du='+date_du+'&au='+date_au
    const url = this.baseUrl + '/rapport.php?chiffre_affaire_graphique='+filtre
    return this.http.get<any[]>(url);
  }

  rapportClients(value, filtre){
    
    let url = ""
    
      if (filtre == 0) {
        url = this.baseUrl + "/rapport.php?client&date_du="+value.date_du+"&date_au="+value.date_au
     }else if(filtre == 1){
       url = this.baseUrl + "/rapport.php?client&date_du="+value.date_du+"&date_au="+value.date_au+"&type_client="+value.type_client;
     }else if(filtre == 2){
       url = this.baseUrl + "/rapport.php?client&date_du="+value.date_du+"&date_au="+value.date_au+"&source="+value.id_source;
     }else if(filtre == 3){
       url = this.baseUrl + "/rapport.php?client&date_du="+value.date_du+"&date_au="+value.date_au+"&frequence="+value.id_source;
     }
    
    return this.http.get<any[]>(url);
    
  }

  rapportUtilisateurs(value){
    const url = this.baseUrl + '/rapport.php?utilisateur&id_profil='+value.id_profil+'&date_du='+value.date_du+'&date_au='+value.date_au
    return this.http.get<any[]>(url);
  }
  
  rapportAffectations(value){
    
    let url :string = ""

    if (value.filtre_affectation == 0 ){
      url  = this.baseUrl + "/rapport.php?affectations&date_du="+value.date_du+"&date_au="+value.date_au+"&id_rapport="+value.rapports+"&filtre_affectation="+value.filtre_affectation;
    }else if (value.filtre_affectation == 1 ){
      url  = this.baseUrl + "/rapport.php?affectations&date_du="+value.date_du+"&date_au="+value.date_au+"&id_rapport="+value.rapports+"&filtre_affectation="+value.filtre_affectation+"&id_client="+value.id_client;
    }else if (value.filtre_affectation == 2 ){
      url  = this.baseUrl + "/rapport.php?affectations&date_du="+value.date_du+"&date_au="+value.date_au+"&id_rapport="+value.rapports+"&filtre_affectation="+value.filtre_affectation+"&id_utilisateur="+value.id_utilisateur;
    }

    return this.http.get<any[]>(url);

  }

}
