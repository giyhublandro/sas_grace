import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Utilisateurs } from '../models/utilisateur';
import { Pays } from '../models/pays';
import { map, Observable } from 'rxjs';
import { Ville } from '../models/ville';
import { Client } from '../models/client';
import { Affectation } from '../models/affectation';

@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {

  //baseUrlOnline:string="https://getfinance.ebarcles.com/php";
  baseUrlOnline:string="https://coup-de-balai.hotelsoft.cm/php";
  baseUrlOffline:string="http://localhost/angular/coup_de_balai/php";

 baseUrl:string= this.baseUrlOnline;
 //baseUrl:string= this.baseUrlOffline;

  constructor(private http:HttpClient) { }

  createUtilisateur(data :any){
    const url = this.baseUrl + '/utilisateur.php'
    return this.http.post(url, data, {responseType: 'text'})
  }
  
  getUsers(){
    const url = this.baseUrl + '/user.php?user_list'
  	return this.http.get<Utilisateurs[]>(url);
  }

  getPersonnels(){
    const url = this.baseUrl + '/user.php?personnel_list'
  	return this.http.get<Utilisateurs[]>(url);
  }

  getVilles(){
    const url = this.baseUrl + '/regions-france.php?ville_list'
  	return this.http.get<any[]>(url);
  }
  
  getDetailFrequence(id_affectation:number){
    return this.http.get<any>(this.baseUrl+'/affectation.php?affectation_frequence='+id_affectation)
  }

  getConnectedUsers(){
    return this.http.get<Utilisateurs[]>(this.baseUrl + '/user.php?connectes');
  }

  //CREATION DU PROFIL
  createProfil(profil : any){
    const url = this.baseUrl + '/profil.php?create'
  	return this.http.post(url, profil, {responseType: 'text'});
  }

  createCharge(charge : any){
    const url = this.baseUrl + '/charge.php?create'
  	return this.http.post(url, charge, {responseType: 'text'});
  }

  createMission(mission : any){
    const url = this.baseUrl + '/mission.php?create'
  	return this.http.post(url, mission, {responseType: 'text'});
  }

  createSource(source : any){
    const url = this.baseUrl + '/source.php?create'
  	return this.http.post(url, source, {responseType: 'text'});
  }

  createOption(source : any){
    const url = this.baseUrl + '/option.php?create'
  	return this.http.post(url, source, {responseType: 'text'});
  }

  createAffectation(affectation : any){
    const url = this.baseUrl + '/affectation.php?create'
  	return this.http.post(url, affectation, {responseType: 'text'});
  }
  

  createFacture(affectation : any[], montant:any, id_client : number, date_facturation:Date, libelle :string, du:Date, au:Date){

    const url = this.baseUrl + '/affectation.php?create_facture=' + montant +'&id_client='+id_client+'&date_facturation='+date_facturation+'&libelle='+libelle+'&du='+du+'&au='+au
    return this.http.post(url, affectation, {responseType: 'text'});

  }

  createClient(client : any){
    const url = this.baseUrl + '/client.php?create'
  	return this.http.post(url, client, {responseType: 'text'});
  }

  createCompte(client:any){
    const url = this.baseUrl + '/client.php?compte'
  	return this.http.post(url, client, {responseType: 'text'});
  }

  getCharges(){
    const url = this.baseUrl + '/charge.php?liste'
    return this.http.get<any[]>(url);
  }

  getMissions(){
    const url = this.baseUrl + '/mission.php?liste'
    return this.http.get<any[]>(url);
  }

  getSources(){
    const url = this.baseUrl + '/source.php?liste'
    return this.http.get<any[]>(url);
  }

  getOptions(){
    const url = this.baseUrl + '/option.php?liste'
    return this.http.get<any[]>(url);
  }

  getClotures(date_cloture :any){
    const url = this.baseUrl + '/affectation.php?cloture_list='+date_cloture;
    return this.http.get<any[]>(url);
  }

  getAffectations(){
    const url = this.baseUrl + '/affectation.php?liste'
    return this.http.get<any[]>(url);
  }

  getAffectationsADupliquer(date_cloture:any){
    const url = this.baseUrl + '/affectation.php?dupliquer_liste='+date_cloture
    return this.http.get<any[]>(url);
  }

  getAffectationsParFiltre(filtre:any){
    const url = this.baseUrl + '/affectation.php?filtre='+filtre
    return this.http.get<any[]>(url);
  }

  getAffectationsParFiltreSourceDate(id_source:any, du:any, au:any){
    const url = this.baseUrl + '/affectation.php?filtre_source='+id_source+'&du='+du+'&au='+au
    return this.http.get<any[]>(url);
  }

  getAffectationsParFiltreIncluDate(filtre:any, du:any, au:any){
    const url = this.baseUrl + '/affectation.php?filtre_plus_date='+filtre+'&du='+du+'&au='+au
    return this.http.get<any[]>(url);
  }

  getAffectationsParFiltreDate(du:any, au:any){
    const url = this.baseUrl + '/affectation.php?date_du='+du+'&au='+au
    return this.http.get<any[]>(url);
  }

  cloturer(date_cloture:any, id_utilisateur:number){
    const url = this.baseUrl + '/affectation.php?cloturer='+date_cloture+'&utilisateur_id='+id_utilisateur
    return this.http.put(url, date_cloture);
  }

  dupliquerAffectation(affectation:any,startingDate:any){
    const url =this.baseUrl + '/affectation.php?duplication_affectation='+startingDate
    return this.http.post(url, affectation, {responseType: 'text'})
  }

  dupliquerAffectationSpeciale(affectation:any,startingDate:any){
    const url =this.baseUrl + '/affectation.php?duplication_affectation_speciale='+startingDate
    return this.http.post(url, affectation, {responseType: 'text'})
  }

  getRegionsDeFrance(){
    const url = this.baseUrl + '/regions-france.php?regions'
    return this.http.get<any[]>(url);
  }

  getDepartementsDeFrance(code_region:any){
    const url = this.baseUrl + '/regions-france.php?code_region='+code_region;
    return this.http.get<any[]>(url);
  }

  getCommunesDeFrance(code_departement:any){
    const url = this.baseUrl + '/regions-france.php?code_departement='+code_departement;
    return this.http.get<any[]>(url);
  }

  getCodePostalCommune(code_commune:any){
    const url = this.baseUrl + '/regions-france.php?code_commune='+code_commune;
    return this.http.get<any[]>(url);
  }
  
  getFactures(){
    const url = this.baseUrl + '/affectation.php?factures'
    return this.http.get<any[]>(url);
  }
  
  getFacturesParFiltre(filtre:any){
    const url = this.baseUrl + '/facture.php?filtre='+filtre
    return this.http.get<any[]>(url);
  }

  getFacturesParFiltreIncluDate(filtre:any, du:any, au:any){
    const url = this.baseUrl + '/facture.php?filtre_plus_date='+filtre+'&du='+du+'&au='+au
    return this.http.get<any[]>(url);
  }

  getFacturesParFiltreDate(du:any, au:any){
    const url = this.baseUrl + '/facture.php?date_du='+du+'&au='+au
    return this.http.get<any[]>(url);
  }
  
  getFacturesPeriodique(data:any){
    const url = this.baseUrl + '/affectation.php?factures_periodiques&du='+ data.date_du +'&au='+ data.date_au + '&filtre_facture='+ data.filtre_facture + '&id_client='+data.id_client
    return this.http.get<any[]>(url);
  }

  getFacturesPersonnel(){
    const url = this.baseUrl + '/affectation.php?factures_personnel'
    return this.http.get<any[]>(url);
  }

  getClients(){
    const url = this.baseUrl + '/client.php?liste'
    return this.http.get<any[]>(url);
  }

  getClientsFiltre(filtre:any){
    const url = this.baseUrl + '/client.php?filtre_facture='+filtre
    return this.http.get<any[]>(url);
  }

  getClientsParFiltre(filtre:any){
    const url = this.baseUrl + '/client.php?filtre='+filtre
    return this.http.get<any[]>(url);
  }

  getClientsParFiltreIncluDate(filtre:any, du:any, au:any){
    const url = this.baseUrl + '/client.php?filtre_plus_date='+filtre+'&du='+du+'&au='+au
    return this.http.get<any[]>(url);
  }

  getClientsParFiltreDate(du:any, au:any){
    const url = this.baseUrl + '/client.php?date_du='+du+'&au='+au
    return this.http.get<any[]>(url);
  }

  getListesCharges(){
    const url = this.baseUrl + '/charge.php?liste'
    return this.http.get<any[]>(url);
  }

  getListesProfil(){
    const url = this.baseUrl + '/profil.php?liste'
    return this.http.get<any[]>(url);
  }

  getListesPays(){
    const url = this.baseUrl + '/pays.php?liste'
    return this.http.get<Pays[]>(url);
  }

  getChargeById(id_charge:number){
    return this.http.get<any[]>(this.baseUrl + '/charge.php?charge_edit=' + id_charge);
  }

  getClientById(id_client:number){
    return this.http.get<any[]>(this.baseUrl + '/client.php?client_edit=' + id_client);
  }

  getMissionById(id_mission:number){
    return this.http.get<any[]>(this.baseUrl + '/mission.php?mission_edit=' + id_mission);
  }
  
  getCodePostalByVilleName(vile_name:any){
    return this.http.get<any[]>(this.baseUrl + '/regions-france.php?ville_nom=' + vile_name);
  }

  getSourceById(id_source:number){
    return this.http.get<any[]>(this.baseUrl + '/source.php?source_edit=' + id_source);
  }

  getOptionById(id_option:number){
    return this.http.get<any[]>(this.baseUrl + '/option.php?option_edit=' + id_option);
  }
  
  getClientOptions(id_client:number){
    return this.http.get<any[]>(this.baseUrl + '/option.php?option_edit_client=' + id_client);
  }
  

  getAffectationById(id_affectation:number){
    return this.http.get<any[]>(this.baseUrl + '/affectation.php?affectation_edit=' + id_affectation);
  }

  getAffectationsByFacturationId(id_facturation:number){
    return this.http.get<any[]>(this.baseUrl + '/affectation.php?affectation_facturation_edit=' + id_facturation);
  }

  getAffectationCompleteInfoById(id_affectation:number){
    return this.http.get<any[]>(this.baseUrl + '/affectation.php?affectation_complete_details=' + id_affectation);
  }

  getProfilById(profil_id:number){
    return this.http.get<any[]>(this.baseUrl + '/profil.php?profil_edit=' + profil_id);
  }

  getUserProfilById(user_id:number){
    return this.http.get<any[]>(this.baseUrl + '/profil.php?user_profil=' + user_id);
  }

  updateMission(mission : any){
  	return this.http.put(this.baseUrl + '/mission.php?mission_update=' + mission.id_mission, mission);
  }
  
  miseAjoursDeFactureApresEditionDeMission(id_facturation){
  	return this.http.put(this.baseUrl + '/facture.php?update_facture_apres_edition=' + id_facturation , id_facturation);
  }
  
  updateSource(source : any){
  	return this.http.put(this.baseUrl + '/source.php?source_update=' + source.id_source, source);
  }

  updateOption(option : any){
  	return this.http.put(this.baseUrl + '/option.php?option_update=' + option.id_option, option);
  }

  updateAffectation(affectation : any){
  	return this.http.put(this.baseUrl + '/affectation.php?affectation_update=' + affectation.id_affectation, affectation);
  }

  updateEtat(affectation : any, etat : any){
  	return this.http.put(this.baseUrl + '/affectation.php?affectation_update_etat=' + etat, affectation);
  }

  updateFactureEtat(facture :any, etat : any){
  	return this.http.put(this.baseUrl + '/facturation.php?facturation_update_etat=' + etat, facture);
  }
  
  assignerSourceAuxFactures(value:any){
  	return this.http.put(this.baseUrl + '/affectation.php?assigner_source_au_facture', value);
  }

  updateClient(client : any){
  	return this.http.put(this.baseUrl + '/client.php?client_update=' + client.id_client, client);
  }

  updateProfil(profil : any,profilId :number){
  	return this.http.put(this.baseUrl + '/profil.php?profil_update='+profilId, profil);
  }

  updateCharge(charge : any){
  	return this.http.put(this.baseUrl + '/charge.php?charge_update='+charge.id_charge, charge);
  }

  deleteProfil(profil_id : number){
    const url = this.baseUrl + '/profil.php?profil_delete_id=' + profil_id
  	return this.http.delete<any[]>(url);
  }

  deleteCharge(charge_id : number){
    const url = this.baseUrl + '/charge.php?charge_delete_id=' + charge_id
  	return this.http.delete<any[]>(url);
  }

  deleteClient(client_id : number){
    const url = this.baseUrl + '/client.php?client_delete_id=' + client_id
  	return this.http.delete<any[]>(url);
  }

  deleteMission(mission_id : number){
    const url = this.baseUrl + '/mission.php?mission_delete_id=' + mission_id
  	return this.http.delete<any[]>(url);
  }

  deleteSource(source_id : number){
    const url = this.baseUrl + '/source.php?source_delete_id=' + source_id
  	return this.http.delete<any[]>(url);
  }

  deleteOption(id_option : number){
    const url = this.baseUrl + '/option.php?option_delete_id=' + id_option
  	return this.http.delete<any[]>(url);
  }

  deleteAffectation(affectation_id : number){
    const url = this.baseUrl + '/affectation.php?affectation_delete_id=' + affectation_id
  	return this.http.delete<any[]>(url);
  }

  //----------- END PROFIL -----------
  
  deleteUser(user_id : number){
    const url = this.baseUrl + '/user.php?delete_id=' + user_id
  	return this.http.delete<Utilisateurs[]>(url);
  }

  deleteFacture(id_facturation : number){
    const url = this.baseUrl + '/affectation.php?delete_facture=' + id_facturation
  	return this.http.delete<Affectation[]>(url);
  }


  getUserById(user_id:number):Observable<any>{
    const url = this.baseUrl + '/user.php?user_by_id=' + user_id
    return this.http.get<any>(url);
  }

  getFactureById(id_facturation:number):Observable<any>{
    const url = this.baseUrl + '/facture.php?facture_by_id=' + id_facturation
    return this.http.get<any>(url);
  }

  upDateUser(data : any){
    const url = this.baseUrl + '/update-user.php' + '?update_id=' + data.id_utilisateur
  	return this.http.put(url, data);
  }

  upDateUserProfil(data : any){
    const url = this.baseUrl + '/update-user.php' + '?update_profil_id=' + data.id_utilisateur
  	return this.http.put(url, data);
  }

  changeUserPassword(data : any, userId :number){
  	return this.http.put(this.baseUrl + '/update-user.php' + '?update_password=' + userId, data);
  }

  login(loginData:any){
    return this.http.post<Utilisateurs[]>(this.baseUrl + '/login.php', loginData);
  }

  loginCompte(loginData:any){
    return this.http.post<Client[]>(this.baseUrl + '/login.php?compte', loginData);
  }

  logOut(userId:number){
    return this.http.put(this.baseUrl + '/login.php?logOut='+ userId, userId);
  }

  //----------------- CATEGORIES ------------------
  createCategorie(categorie : any){
    const url = this.baseUrl + '/categorie.php?create'
  	return this.http.post(url, categorie, {responseType: 'text'});
  }
 

  getCategories(){
    const url = this.baseUrl + '/categorie.php?liste'
    return this.http.get<any[]>(url);
  }

  deleteCategorie(id_categorie : number){
    const url = this.baseUrl + '/categorie.php?categorie_delete_id=' + id_categorie
  	return this.http.delete<any[]>(url);
  }

  getAgenceById(id_agence:number){
    return this.http.get<any[]>(this.baseUrl + '/agence.php?agence_edit=' + id_agence);
  }
  

  getAffectationByClientId(filtre : any){
    return this.http.put(this.baseUrl + '/affectation.php?filtrer_affectation=' + filtre.id_client, filtre);
  }

  facturerAffectationByClientId(filtre : any){
  	return this.http.put(this.baseUrl + '/affectation.php?affectation_update_facturation=' + filtre.id_client, filtre);
  }

  upDateAgence(agence : any){
  	return this.http.put(this.baseUrl + '/agence.php?agence_update=' + agence.id_agence, agence);
  }

  //------------------------------------- TYPE ---------------------------------------

  createType(type : any){
    const url = this.baseUrl + '/type.php?create'
  	return this.http.post(url, type, {responseType: 'text'});
  }
  
  getTypes(){
    const url = this.baseUrl + '/type.php?liste'
    return this.http.get<any[]>(url);
  }

  deleteType(id_type : number){
    const url = this.baseUrl + '/type.php?type_delete_id=' + id_type
  	return this.http.delete<any[]>(url);
  }

  getTypeById(id_type:number){
    return this.http.get<any[]>(this.baseUrl + '/type.php?type_edit=' + id_type);
  }

  updateType(type:any){
  	return this.http.put(this.baseUrl + '/type.php?type_update=' + type.id_type, type);
  }

  //------------------------------------- DEPENSE ---------------------------------------
  
  createDepense(depense : any){
    const url = this.baseUrl + '/depense.php?create'
  	return this.http.post(url, depense, {responseType: 'text'});
  }
  
  getDepenses(){
    const url = this.baseUrl + '/depense.php?liste'
    return this.http.get<any[]>(url);
  }

  getDepensesCateg(){
    const url = this.baseUrl + '/depense.php?categ'
    return this.http.get<any[]>(url);
  }

  deleteDepense(id_depense : number){
    const url = this.baseUrl + '/depense.php?depense_delete_id=' + id_depense
  	return this.http.delete<any[]>(url);
  }

  getDepenseById(id_depense:number){
    return this.http.get<any[]>(this.baseUrl + '/depense.php?depense_edit=' + id_depense);
  }

  updateDepense(depense:any){
  	return this.http.put(this.baseUrl + '/depense.php?depense_update=' + depense.id_depense, depense);
  }

  //------------------------------------- ENTREES ---------------------------------------
  
  createEntree(entree : any){
    const url = this.baseUrl + '/entree.php?create'
  	return this.http.post(url, entree, {responseType: 'text'});
  }
  
  getEntrees(){
    const url = this.baseUrl + '/entree.php?liste'
    return this.http.get<any[]>(url);
  }

  getEntreesCateg(){
    const url = this.baseUrl + '/entree.php?categ'
    return this.http.get<any[]>(url);
  }

  deleteEntree(id_entree : number){
    const url = this.baseUrl + '/entree.php?entree_delete_id=' + id_entree
  	return this.http.delete<any[]>(url);
  }

  getEntreeById(id_entree:number){
    return this.http.get<any[]>(this.baseUrl + '/entree.php?entree_edit=' + id_entree);
  }

  updateEntree(entree:any){
  	return this.http.put(this.baseUrl + '/entree.php?entree_update=' + entree.id_entree, entree);
  }


  //-------------------------------- RAPPORTS ----------------------------------------

  createRapport(rapport : any){
    const url = this.baseUrl + '/html2pdf/rapports/depenses.php?create'
  	return this.http.post(url, rapport, {responseType: 'text'});
  }


}
