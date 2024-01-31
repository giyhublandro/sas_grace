<?php

	require_once 'config/database.php';

	$postdata = file_get_contents("php://input");

	if(isset($_GET['chiffre_affaire'])){
        //DERNIER PROFIL ENREGISTRE

		$filtre = intval($_GET['chiffre_affaire']);
		$du = $_GET['du']; 
    	$au = $_GET['au']; 

		if($filtre == 0){
			
			$sql = "SELECT DISTINCT id_client FROM affectation WHERE affectation.date_mission BETWEEN '$du' AND '$au' ORDER BY id_client ASC";
			
			$nom_client = "";

			if($result = mysqli_query($con,$sql)){
	
				$chiffres = array();
	
				$i = 0 ;
	
				while($chiffre = mysqli_fetch_assoc($result)){

					$id_client = $chiffre['id_client'];
					$total_client = 0;

					$sql_ = "SELECT total_facture, nom_client, affectation.id_client FROM affectation, client 
					WHERE affectation.id_client = '{$id_client}' AND affectation.id_client = client.id_client
					AND affectation.date_mission BETWEEN '$du' AND '$au'";
					
					if($result_ = mysqli_query($con,$sql_)){
	
						while($chiffre_client = mysqli_fetch_assoc($result_)){
							$total_client += $chiffre_client['total_facture'];
							$nom_client = $chiffre_client['nom_client'];
						}
			
					}

					$chiffres[$i]['total_facture'] = $total_client;
					$chiffres[$i]['critere'] = $nom_client;
					$i++;
	
				}
	
				echo json_encode($chiffres);
	
			}else{
				http_response_code(422);
			}

		}else if($filtre == 1){

			$sql = "SELECT DISTINCT type_client FROM client ORDER BY nom_client ASC";
			
			$type_client = "";

			if($result = mysqli_query($con,$sql)){
	
				$chiffres = array();
	
				$i = 0 ;
	
				while($chiffre = mysqli_fetch_assoc($result)){

					$type_client = $chiffre['type_client'];
					$total_client = 0;

					$sql_ = "SELECT total_facture, nom_client FROM affectation, client 
					WHERE type_client = '{$type_client}' AND affectation.id_client = client.id_client
					AND affectation.date_mission BETWEEN '$du' AND '$au'";
					
					if($result_ = mysqli_query($con,$sql_)){
	
						while($chiffre_client = mysqli_fetch_assoc($result_)){
							$total_client += $chiffre_client['total_facture'];
						}
			
					}

					$chiffres[$i]['total_facture'] = $total_client;
					$chiffres[$i]['critere'] = $type_client;
					$i++;
	
				}
	
				echo json_encode($chiffres);
	
			}else{
				http_response_code(422);
			}

		}else if($filtre == 2){
			$sql = "SELECT DISTINCT source_id FROM affectation ORDER BY source_id ASC";

			if($result = mysqli_query($con,$sql)){
	
				$chiffres = array();
	
				$i = 0 ;
	
				while($chiffre = mysqli_fetch_assoc($result)){

					$source_id = $chiffre['source_id'];
					$total_client = 0;
					$source = "";
					$sql_ = "SELECT total_facture, source FROM affectation, source 
					WHERE source_id = '{$source_id}' AND affectation.source_id = source.id_source
					AND affectation.date_mission BETWEEN '$du' AND '$au'";
					
					if($result_ = mysqli_query($con,$sql_)){
	
						while($chiffre_client = mysqli_fetch_assoc($result_)){
							$total_client += $chiffre_client['total_facture'];
							$source = $chiffre_client['source'];
						}
			
					}

					$chiffres[$i]['total_facture'] = $total_client;
					$chiffres[$i]['critere'] = $source;
					$i++;
	
				}
	
				echo json_encode($chiffres);
	
			}else{
				http_response_code(422);
			}
		}else if($filtre == 3){

			$sql = "SELECT DISTINCT frequence_client FROM client ORDER BY frequence_client ASC";

			if($result = mysqli_query($con,$sql)){
	
				$chiffres = array();
	
				$i = 0 ;
	
				while($chiffre = mysqli_fetch_assoc($result)){

					$frequence_client = intval($chiffre['frequence_client']);
					$total_client = 0;
					$frequence = "";

					$sql_ = "SELECT total_facture, frequence_client FROM affectation, client 
					WHERE frequence_client = '{$frequence_client}' AND affectation.id_client = client.id_client
					AND affectation.date_mission BETWEEN '$du' AND '$au'";
					
					if($result_ = mysqli_query($con,$sql_)){
	
						while($chiffre_client = mysqli_fetch_assoc($result_)){
							$total_client += $chiffre_client['total_facture'];
							$frequence = $chiffre_client['frequence_client'];
						}

						if($frequence_client == 0){
							$frequence = "Ponctuel";
						}else{
							$frequence = "Régulier";
						}

					}

					$chiffres[$i]['total_facture'] = $total_client;
					$chiffres[$i]['critere'] = $frequence;
					$i++;
	
				}
	
				echo json_encode($chiffres);
	
			}else{
				http_response_code(422);
			}
		}
    }elseif(isset($_GET['client'])){

		if(isset($_GET['date_du'])){
			$date_du = $_GET['date_du'];
		}
		
		if(isset($_GET['date_au'])){
			$date_au = $_GET['date_au'];
		}
		
		$rapport = -1;
		
		if(isset($_GET['type_client'])){
			$rapport = 1;
			$type_client = $_GET['type_client'];
			$libelle = "PAR TYPE";
		}else if(isset($_GET['source'])){
			$rapport = 2;
			$id_source = (int)$_GET['source'];
			$libelle = "PAR SOURCE";
		}else if(isset($_GET['frequence'])){
			$rapport = 3;
			$frequence = (int)$_GET['frequence'];
			$libelle = "PAR FREQUENCE";
		}else{
			$rapport = 0;
		}

		if ($rapport == 1){
			$sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, 
			`code_acces_1`, `code_acces_2`, `type_client`, client.id_source, `date_creation`, `source` FROM `client`,`source` 
			WHERE type_client =  '{$type_client}' AND client.id_source=source.id_source AND date_creation BETWEEN '{$date_du}' AND '{$date_au}' ORDER BY date_creation DESC";
		}else if ($rapport == 2){
			$sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, 
			`code_acces_1`, `code_acces_2`, `type_client`, client.id_source, `date_creation`, `source` FROM `client`,`source` 
			WHERE source.id_source =  '{$id_source}' AND client.id_source=source.id_source 
			AND date_creation BETWEEN '{$date_du}' AND '{$date_au}' ORDER BY date_creation DESC";
		}else if ($rapport == 3){
			$sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, 
			`code_acces_1`, `code_acces_2`, `type_client`, client.id_source, `date_creation`, `source` FROM `client`,`source` 
			WHERE frequence = '{$frequence}' AND date_creation BETWEEN '{$date_du}' AND '{$date_au}' ORDER BY date_creation DESC";
		}else {
			$sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, 
			`code_acces_1`, `code_acces_2`, `type_client`, client.id_source, `date_creation`, `source` FROM `client`, `source` 
			WHERE client.id_source = source.id_source AND date_creation BETWEEN '{$date_du}' AND '{$date_au}' ORDER BY date_creation DESC";
		}
		
		$i = 0 ;
					
		if($result = mysqli_query($con, $sql)){
		
			$clients = array();
		
			while($client = mysqli_fetch_assoc($result)){
				
				$clients[$i]['nom_client'] = $client['nom_client'];
				$clients[$i]['adresse_client'] = $client['adresse_client'];
				$clients[$i]['telephone_1'] = $client['telephone_1'];
				$clients[$i]['telephone_2'] = $client['telephone_2'];
				$clients[$i]['email_client'] = $client['email_client'];
				$clients[$i]['code_acces_1'] = $client['code_acces_1'];
				$clients[$i]['code_acces_2'] = $client['code_acces_2'];
				$clients[$i]['type_client'] = $client['type_client'];
				$clients[$i]['id_source'] = $client['id_source'];
				$clients[$i]['date_creation'] = $client['date_creation'];
				$clients[$i]['source'] = $client['source'];
		
				$i++;
		
			}

			echo json_encode($clients);
		
		}

	}elseif(isset($_GET['utilisateur'])){
		
		if(isset($_GET['date_du'])){
			$date_du = $_GET['date_du'];
		}
		
		if(isset($_GET['date_au'])){
			$date_au = $_GET['date_au'];
		}
		
		if(isset($_GET['id_profil'])){
			$id_profil = $_GET['id_profil'];
		}

		if ($id_profil == 0){

			$sql = "SELECT  `id_utilisateur`, utilisateur.id_profil, `nom_utilisateur`, `prenom_utilisateur`, `email_utilisateur`, 
			`mot_de_passe_utilisateur`, `adresse`, `telephone`, `sex`, `type_identite`, `num_piece_identite`, `date_expiration`, `actif`, 
			`super_admin`, `nom_profil`,`date_creation`
			FROM utilisateur INNER JOIN profil 
			WHERE super_admin = 0 AND utilisateur.id_profil = profil.id_profil
			AND date_creation BETWEEN '{$date_du}' AND '{$date_au}'
			ORDER BY nom_utilisateur ASC";
		
		}else{
		
		   $sql = "SELECT  `id_utilisateur`, utilisateur.id_profil, `nom_utilisateur`, `prenom_utilisateur`, `email_utilisateur`, 
			`mot_de_passe_utilisateur`, `adresse`, `telephone`, `sex`, `type_identite`, `num_piece_identite`, `date_expiration`, `actif`, 
			`super_admin`, `nom_profil`,`date_creation`
			FROM utilisateur INNER JOIN profil 
			WHERE super_admin = 0 AND utilisateur.id_profil = profil.id_profil AND utilisateur.id_profil = '{$id_profil}'
			AND date_creation BETWEEN '{$date_du}' AND '{$date_au}'
			ORDER BY nom_utilisateur ASC";
		
		}
		
		
		$i = 0 ;
					
		if($result = mysqli_query($con, $sql)){
		
			$utilisateurs = array();
		
			while($utilisateur = mysqli_fetch_assoc($result)){
				
				$utilisateurs[$i]['id_profil'] = $utilisateur['id_profil'];
				$utilisateurs[$i]['nom_utilisateur'] = $utilisateur['nom_utilisateur'];
				$utilisateurs[$i]['prenom_utilisateur'] = $utilisateur['prenom_utilisateur'];
				$utilisateurs[$i]['adresse'] = $utilisateur['adresse'];
				$utilisateurs[$i]['mot_de_passe_utilisateur'] = $utilisateur['mot_de_passe_utilisateur'];
				$utilisateurs[$i]['id_utilisateur'] = $utilisateur['id_utilisateur'];
				$utilisateurs[$i]['telephone'] = $utilisateur['telephone'];
				$utilisateurs[$i]['email_utilisateur'] = $utilisateur['email_utilisateur'];
		
				if ($utilisateur['type_identite'] == "1"){
					$utilisateurs[$i]['type_identite'] = "PASSPORT";
				}else if($utilisateur['type_identite'] == "0"){
					$utilisateurs[$i]['type_identite'] = "CARTE NATIONALE";
				}
		
				$utilisateurs[$i]['sex'] = $utilisateur['sex'];
				
				$utilisateurs[$i]['num_piece_identite'] = $utilisateur['num_piece_identite'];
				$utilisateurs[$i]['date_expiration'] = $utilisateur['date_expiration'];
				$utilisateurs[$i]['actif'] = $utilisateur['actif'];
				$utilisateurs[$i]['nom_profil'] = $utilisateur['nom_profil'];
				$utilisateurs[$i]['date_creation'] = $utilisateur['date_creation'];
		
				$i++;
		
			}

			echo json_encode($utilisateurs);
		
		}
		
	}elseif(isset($_GET['affectations'])){

		if(isset($_GET['date_du'])){
			$date_du = $_GET['date_du'];
		}
		
		if(isset($_GET['date_au'])){
			$date_au = $_GET['date_au'];
		}

		if(isset($_GET['id_rapport'])){

			$rapport = (int)$_GET['id_rapport'];
			
			if(isset($_GET['filtre_affectation'])){
				$filtre_affectation = (int)$_GET['filtre_affectation'];
			}
		
			if(isset($_GET['id_client'])){
				$id_client = (int)$_GET['id_client'];
			}
		
			if(isset($_GET['id_utilisateur'])){
				$id_utilisateur = (int)$_GET['id_utilisateur'];
			}
		
			if($rapport == 2){
				$libelle = "MISSIONS";
			}else if($rapport == 3){
				$libelle = "VALIDATIONS";
			}else if($rapport == 4){
				$libelle = "PAIEMENTS";
			}
		
		}

		if($rapport == 2){
			// les missions independament de l'etat
			$etat = 0;

			if($filtre_affectation == 0){
		
				//Toutes les missions
				$sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
				affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence,total_facture,montant_option, 
				affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
				`description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
				FROM affectation, utilisateur, mission, client
				WHERE affectation.id_client = client.id_client 
				AND affectation.id_mission = mission.id_mission 
				AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
				AND statut = '{$etat}'
				AND affectation.id_utilisateur = utilisateur.id_utilisateur
				ORDER BY id_affectation DESC";
				
			}else if( $filtre_affectation == 1 ){
		
				$sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
				affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence,total_facture,montant_option, 
				affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
				`description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
				FROM affectation, utilisateur, mission, client
				WHERE affectation.id_client = client.id_client 
				AND affectation.id_mission = mission.id_mission 
				AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}' 
				AND statut = '{$etat}'
				AND affectation.id_utilisateur = utilisateur.id_utilisateur
				AND affectation.id_client = '{$id_client}'
				ORDER BY date_mission DESC";
		
			}else if ( $filtre_affectation == 2 ) {
		
				$sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
				affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, total_facture,montant_option,
				affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
				`description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
				FROM affectation, utilisateur, mission, client
				WHERE affectation.id_client = client.id_client 
				AND affectation.id_mission = mission.id_mission 
				AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
				AND statut = '{$etat}'
				AND affectation.id_utilisateur = utilisateur.id_utilisateur
				AND affectation.id_utilisateur = '{$id_utilisateur}'
				ORDER BY date_mission DESC";
		
			}
			
		}else if($rapport == 3){
			//Les validations
			$etat = 1;
		
			if($filtre_affectation == 0){
		
				//Toutes les missions
				$sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
				affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, total_facture,montant_option,
				affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
				`description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
				FROM affectation, utilisateur, mission, client
				WHERE affectation.id_client = client.id_client 
				AND affectation.id_mission = mission.id_mission 
				AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
				AND statut = '{$etat}'
				AND affectation.id_utilisateur = utilisateur.id_utilisateur
				ORDER BY id_affectation DESC";
				
			}else if( $filtre_affectation == 1 ){
		
				$sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
				affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, total_facture,montant_option,
				affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
				`description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
				FROM affectation, utilisateur, mission, client
				WHERE affectation.id_client = client.id_client 
				AND affectation.id_mission = mission.id_mission 
				AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
				AND statut = '{$etat}'
				AND affectation.id_utilisateur = utilisateur.id_utilisateur
				AND affectation.id_client = '{$id_client}'
				ORDER BY date_mission DESC";
		
			}else if ( $filtre_affectation == 2 ) {
		
				$sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
				affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, total_facture,montant_option,
				affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
				`description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
				FROM affectation, utilisateur, mission, client
				WHERE affectation.id_client = client.id_client 
				AND affectation.id_mission = mission.id_mission 
				AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}' 
				AND statut = '{$etat}'
				AND affectation.id_utilisateur = utilisateur.id_utilisateur
				AND affectation.id_utilisateur = '{$id_utilisateur}'
				ORDER BY date_mission DESC";
		
			}
		
		}else if($rapport == 4){
			//Les paiements
			$etat = 3;
			$etat = intval($etat);

			if($filtre_affectation == 0){
		
				//Toutes les paiements
				$sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
				affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, total_facture,montant_option,
				affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
				`description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
				FROM affectation, utilisateur, mission, client
				WHERE affectation.id_client = client.id_client 
				AND affectation.id_mission = mission.id_mission 
				AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
				AND statut = '{$etat}'
				AND affectation.id_utilisateur = utilisateur.id_utilisateur
				ORDER BY id_affectation DESC";
				
			}else if( $filtre_affectation == 1 ){
		
				$sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
				affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, total_facture,montant_option,
				affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
				`description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
				FROM affectation, utilisateur, mission, client
				WHERE affectation.id_client = client.id_client 
				AND affectation.id_mission = mission.id_mission 
				AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
				AND statut = '{$etat}'
				AND affectation.id_utilisateur = utilisateur.id_utilisateur
				AND affectation.id_client = '{$id_client}'
				ORDER BY date_mission DESC";
		
			}else if ( $filtre_affectation == 2 ) {
				
				$sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
				affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, total_facture,montant_option,
				affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
				`description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
				FROM affectation, utilisateur, mission, client
				WHERE affectation.id_client = client.id_client 
				AND affectation.id_mission = mission.id_mission 
				AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}' 
				AND statut = '{$etat}'
				AND affectation.id_utilisateur = utilisateur.id_utilisateur
				AND affectation.id_utilisateur = '{$id_utilisateur}'
				ORDER BY date_mission DESC";
		
			}
		
		}
		
		$i = 0 ;
		
		 if($result = mysqli_query($con,$sql)){
		
			 $affectations = array();
		
			 while($affectation = mysqli_fetch_assoc($result)){
				 
				 $affectations[$i]['id_mission'] = $affectation['id_mission'];
				 $affectations[$i]['id_affectation'] = $affectation['id_affectation'];
				 $affectations[$i]['id_client'] = $affectation['id_client'];
				 $affectations[$i]['id_utilisateur'] = $affectation['id_utilisateur'];
				 $affectations[$i]['duree'] = $affectation['duree'];
				 $affectations[$i]['montant'] = $affectation['montant'];
		
				 $affectations[$i]['commisions'] = $affectation['commisions'];
				 $affectations[$i]['frequence'] = $affectation['frequence'];
				 $affectations[$i]['date_mission'] = $affectation['date_mission'];
				 $affectations[$i]['heure_mission'] = $affectation['heure_mission'];
				 $affectations[$i]['nom_client'] = $affectation['nom_client'];
				 $affectations[$i]['prenom_utilisateur'] = $affectation['prenom_utilisateur'];
				 $affectations[$i]['nom_utilisateur'] = $affectation['nom_utilisateur'];
				 $affectations[$i]['mission'] = $affectation['mission'];
		
				 $affectations[$i]['statut'] = $affectation['statut'];
				 $affectations[$i]['description'] = $affectation['description'];
		
				 $affectations[$i]['nom_client'] = $affectation['nom_client'];
				 $affectations[$i]['adresse_client'] = $affectation['adresse_client'];
				 $affectations[$i]['telephone_1'] = $affectation['telephone_1'];
				 $affectations[$i]['telephone_2'] = $affectation['telephone_2'];
				 $affectations[$i]['email_client'] = $affectation['email_client'];
				 $affectations[$i]['code_acces_1'] = $affectation['code_acces_1'];
				 $affectations[$i]['code_acces_2'] = $affectation['code_acces_2'];
				 $affectations[$i]['type_client'] = $affectation['type_client'];
				 
				 $affectations[$i]['tarif_horaire_personnel'] = $affectation['tarif_horaire_personnel'];
				 $affectations[$i]['tarif_horaire_client'] = $affectation['tarif_horaire_client'];
				 
				 $affectations[$i]['montant_option'] = $affectation['montant_option'];
				 $affectations[$i]['total_facture'] = $affectation['total_facture'];

				 $i++;
		
			 }

			 echo json_encode($affectations);
		
		}

	}elseif(isset($_GET['chiffre_affaire_graphique'])){
        //DERNIER PROFIL ENREGISTRE

		$filtre = intval($_GET['chiffre_affaire_graphique']);

		//$du = $_GET['du']; 
    	//$au = $_GET['au']; 

		if($filtre == 1){

			$sql = "SELECT DISTINCT type_client FROM client ORDER BY nom_client ASC";
			
			$type_client = "";

			if($result = mysqli_query($con,$sql)){
	
				$chiffres = array();
	
				$i = 0 ;
	
				while($chiffre = mysqli_fetch_assoc($result)){

					$type_client = $chiffre['type_client'];
					$total_client = 0;

					//$sql_ = "SELECT total_facture, nom_client FROM affectation, client 
					//WHERE type_client = '{$type_client}' AND affectation.id_client = client.id_client
					//AND affectation.date_mission BETWEEN '$du' AND '$au'";

					$sql_ = "SELECT total_facture, nom_client FROM affectation, client 
					WHERE type_client = '{$type_client}' AND affectation.id_client = client.id_client";
					
					if($result_ = mysqli_query($con,$sql_)){
	
						while($chiffre_client = mysqli_fetch_assoc($result_)){
							$total_client += $chiffre_client['total_facture'];
						}
			
					}

					$chiffres[$i]['total_facture'] = $total_client;
					$chiffres[$i]['critere'] = $type_client;
					$i++;
	
				}
	
				echo json_encode($chiffres);
	
			}else{
				http_response_code(422);
			}

		}else if($filtre == 2){

			$sql = "SELECT DISTINCT source_id FROM affectation ORDER BY source_id ASC";

			if($result = mysqli_query($con,$sql)){
	
				$chiffres = array();
	
				$i = 0 ;
	
				while($chiffre = mysqli_fetch_assoc($result)){

					$source_id = $chiffre['source_id'];
					$total_client = 0;
					$source = "";

					//$sql_ = "SELECT total_facture, source FROM affectation, source 
					//WHERE source_id = '{$source_id}' AND affectation.source_id = source.id_source
					//AND affectation.date_mission BETWEEN '$du' AND '$au'";

					$sql_ = "SELECT total_facture, source FROM affectation, source 
					WHERE source_id = '{$source_id}' AND affectation.source_id = source.id_source";
					
					if($result_ = mysqli_query($con,$sql_)){
	
						while($chiffre_client = mysqli_fetch_assoc($result_)){
							$total_client += $chiffre_client['total_facture'];
							$source = $chiffre_client['source'];
						}
			
					}

					$chiffres[$i]['total_facture'] = $total_client;
					$chiffres[$i]['critere'] = $source;
					$i++;
	
				}
	
				echo json_encode($chiffres);
	
			}else{
				http_response_code(422);
			}

		}else if($filtre == 3){

			$sql = "SELECT DISTINCT frequence_client FROM client ORDER BY frequence_client ASC";

			if($result = mysqli_query($con,$sql)){
	
				$chiffres = array();
	
				$i = 0 ;
	
				while($chiffre = mysqli_fetch_assoc($result)){

					$frequence_client = intval($chiffre['frequence_client']);
					$total_client = 0;
					$frequence = "";

					//$sql_ = "SELECT total_facture, frequence_client FROM affectation, client 
					//WHERE frequence_client = '{$frequence_client}' AND affectation.id_client = client.id_client
					//AND affectation.date_mission BETWEEN '$du' AND '$au'";

					$sql_ = "SELECT total_facture, frequence_client FROM affectation, client 
					WHERE frequence_client = '{$frequence_client}' AND affectation.id_client = client.id_client";
					
					if($result_ = mysqli_query($con,$sql_)){
	
						while($chiffre_client = mysqli_fetch_assoc($result_)){
							$total_client += $chiffre_client['total_facture'];
							$frequence = $chiffre_client['frequence_client'];
						}

						if($frequence_client == 0){
							$frequence = "Ponctuel";
						}else{
							$frequence = "Régulier";
						}

					}

					$chiffres[$i]['total_facture'] = $total_client;
					$chiffres[$i]['critere'] = $frequence;
					$i++;
	
				}
	
				echo json_encode($chiffres);
	
			}else{
				http_response_code(422);
			}
		}
    }