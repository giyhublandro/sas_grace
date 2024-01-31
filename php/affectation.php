
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            $vue_user = 1;
            $vue_client = 1;
            
            if($duree_binom > 0 && $commisions_binom > 0){
                $vue_user = 0;
            }

            $duree_binom = mysqli_real_escape_string($con, trim($request->duree_binom));
            $commisions_binom = mysqli_real_escape_string($con, trim($request->commisions_binom));
            $id_utilisateur_binom = mysqli_real_escape_string($con, $request->id_utilisateur_binom);

            $id_mission = mysqli_real_escape_string($con, trim($request->id_mission));
            $id_utilisateur = mysqli_real_escape_string($con, $request->id_utilisateur);
            $duree = mysqli_real_escape_string($con, trim($request->duree));
            $id_client = mysqli_real_escape_string($con, trim($request->id_client));
            $montant = mysqli_real_escape_string($con, trim($request->montant));
            $commisions = mysqli_real_escape_string($con, $request->commisions);
            $frequence = mysqli_real_escape_string($con, (int)trim($request->frequence));
            $date_mission = mysqli_real_escape_string($con, trim($request->date_mission));
            $heure_mission = mysqli_real_escape_string($con, trim($request->heure_mission));

            $tarif_horaire_personnel = mysqli_real_escape_string($con, trim($request->tarif_horaire_personnel));
            $tarif_horaire_client = mysqli_real_escape_string($con, trim($request->tarif_horaire_client));

            $total_facture = mysqli_real_escape_string($con, trim($request->total_facture));
            $tarif_horaire_option = mysqli_real_escape_string($con, trim($request->tarif_horaire_option));
            $montant_option = mysqli_real_escape_string($con, trim($request->montant_option));
            $dupliquer = 0;

            if($frequence > 1){
                $dupliquer = 1;
            }

            $sql = "SELECT id_source FROM client WHERE id_client = '{$id_client}' ORDER BY nom_client ASC";
                
            if($result = mysqli_query($con,$sql)){

                $clients = array();

                $i = 0 ;

                while($client = mysqli_fetch_assoc($result)){
                    
                    $clients[$i]['id_source'] = $client['id_source'];
                    $source_id = $client['id_source'];
                    $i++;

                }

            }

            // Create.
            $sql = "INSERT INTO `affectation`( `id_mission`, `id_utilisateur`, `duree`, `montant`, `commisions`, `frequence`, `date_mission`, 
            `heure_mission`, `id_client`,`tarif_horaire_personnel`, `tarif_horaire_client`,`source_id`,`total_facture`,`montant_option`,
            `tarif_horaire_option`,`dupliquer`, `vue_client`,`vue_user`) 
                VALUES ( '$id_mission', '$id_utilisateur', '$duree', '$montant', '$commisions', '$frequence', '$date_mission', '$heure_mission',
                '$id_client','$tarif_horaire_personnel','$tarif_horaire_client', '$source_id','$total_facture','$montant_option',
                '$tarif_horaire_option','$dupliquer','$vue_client', '$vue_user')";
            
            if(mysqli_query($con,$sql)){
                http_response_code(201);
            }else{
                http_response_code(422);
            }

            if($frequence > 1){

                $affectation_id = 0;

                $sql = "SELECT * FROM affectation ORDER BY id_affectation ASC";
                
                if($result = mysqli_query($con,$sql)){

                    $affectations = array();

                    while($affectation = mysqli_fetch_assoc($result)){
                        $affectation_id = $affectation['id_affectation'];
                    }

                }

                $jour_1 = mysqli_real_escape_string($con, $request->jour_1);
                $jour_2 = mysqli_real_escape_string($con, $request->jour_2);
                $jour_3 = mysqli_real_escape_string($con, $request->jour_3);
                $jour_4 = mysqli_real_escape_string($con, $request->jour_4);
                $jour_5 = mysqli_real_escape_string($con, $request->jour_5);
                $jour_6 = mysqli_real_escape_string($con, $request->jour_6);
                $jour_7 = mysqli_real_escape_string($con, $request->jour_7);

                $heure_1 = mysqli_real_escape_string($con, $request->heure_1);
                $heure_2 = mysqli_real_escape_string($con, $request->heure_2);
                $heure_3 = mysqli_real_escape_string($con, $request->heure_3);
                $heure_4 = mysqli_real_escape_string($con, $request->heure_4);
                $heure_5 = mysqli_real_escape_string($con, $request->heure_5);
                $heure_6 = mysqli_real_escape_string($con, $request->heure_6);
                $heure_7 = mysqli_real_escape_string($con, $request->heure_7);

                if ($frequence == 2 || $frequence == 5){

                    $jour_2 = -1;
                    $jour_3 = -1;
                    $jour_4 = -1;
                    $jour_5 = -1;
                    $jour_6 = -1;
                    $jour_7 = -1;
              
                    $heure_2 = "00:00:00";
                    $heure_3 = "00:00:00";
                    $heure_4 = "00:00:00";
                    $heure_5 = "00:00:00";
                    $heure_6 = "00:00:00";
                    $heure_7 = "00:00:00";
                    
                  }
              
                  if ($frequence == 3){
              
                    $jour_3 = -1;
                    $jour_4 = -1;
                    $jour_5 = -1;
                    $jour_6 = -1;
                    $jour_7 = -1;
              
                    $heure_3 = "00:00:00";
                    $heure_4 = "00:00:00";
                    $heure_5 = "00:00:00";
                    $heure_6 = "00:00:00";
                    $heure_7 = "00:00:00";
                    
                  }

                  if ($frequence == 4){

                    if($jour_3 == ""){
                        $jour_3 = -1;
                    }

                    if($jour_4 == ""){
                        $jour_4 = -1;
                    }

                    if($jour_5 == ""){
                        $jour_5 = -1;
                    }

                    if($jour_6 == ""){
                        $jour_6 = -1;
                    }

                    if($jour_7 == ""){
                        $jour_7 = -1;
                    }

                  }
                  
                $sql = "INSERT INTO `affectation_frequence` (`jour_1`, `jour_2`, `jour_3`, `jour_4`, `jour_5`, `jour_6`,
                 `jour_7`, `heure_1`, `heure_2`, `heure_3`, `heure_4`, `heure_5`, `heure_6`, `heure_7`, `affectation_id`) 
                VALUES ('$jour_1', '$jour_2', '$jour_3', '$jour_4', '$jour_5', '$jour_6', '$jour_7', '$heure_1', '$heure_2','$heure_3',
                '$heure_4','$heure_5', '$heure_6','$heure_7','$affectation_id')";

                if(mysqli_query($con,$sql)){
                    http_response_code(201);
                }else{
                    http_response_code(422);
                }

            }

            if($duree_binom !== 0 && $commisions_binom !== 0){

                $vue_user = 1;
                $vue_client = 0;

                for ($i=0; $i <= 1 ; $i++) { 
                    
                }

            }

        }

    }else if(isset($_GET['liste'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
        `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
         `email_client`, `code_acces_1`, `code_acces_2`, `type_client`, `source_id`, `total_facture`, `montant_option`, `tarif_horaire_option`
       FROM affectation, utilisateur, mission, client
       WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
       ORDER BY nom_client ASC, affectation.date_mission ASC";
            
        if($result = mysqli_query($con,$sql)){

            $affectations = array();

            $i = 0 ;

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
                $affectations[$i]['source_id'] = $affectation['source_id'];

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

                $affectations[$i]['total_facture'] = $affectation['total_facture'];
                $affectations[$i]['montant_option'] = $affectation['montant_option'];
                $affectations[$i]['tarif_horaire_option'] = $affectation['tarif_horaire_option'];

                $i++;

            }

            echo json_encode($affectations);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['affectation_delete_id'])){

        $id_affectation = (int)$_GET['affectation_delete_id'];

		$sql = "DELETE FROM affectation WHERE id_affectation='{$id_affectation}'";

		if (mysqli_query($con,$sql)) {
			http_response_code(204);
		}else{
			http_response_code(422);
		}

    }else if(isset($_GET['affectation_edit'])){

        //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

        $id_affectation = $_GET['affectation_edit'];

		$sql = "SELECT * FROM affectation WHERE id_affectation = '{$id_affectation}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }else if(isset($_GET['affectation_update'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);

            $id_affectation = mysqli_real_escape_string($con, trim($request->id_affectation));
            
            $id_mission = mysqli_real_escape_string($con, trim($request->id_mission));
            $id_utilisateur = mysqli_real_escape_string($con, $request->id_utilisateur);
            $duree = mysqli_real_escape_string($con, trim($request->duree));
            $id_client = mysqli_real_escape_string($con, trim($request->id_client));
            $montant = mysqli_real_escape_string($con, trim($request->montant));
            $commisions = mysqli_real_escape_string($con, $request->commisions);
            $frequence = mysqli_real_escape_string($con, (int)trim($request->frequence));
            $date_mission = mysqli_real_escape_string($con, trim($request->date_mission));
            $heure_mission = mysqli_real_escape_string($con, trim($request->heure_mission));

            $tarif_horaire_personnel = mysqli_real_escape_string($con, trim($request->tarif_horaire_personnel));
            $tarif_horaire_client = mysqli_real_escape_string($con, trim($request->tarif_horaire_client));
            $source_id = mysqli_real_escape_string($con, trim($request->source_id));
            
            $total_facture = mysqli_real_escape_string($con, trim($request->total_facture));
            $tarif_horaire_option = mysqli_real_escape_string($con, trim($request->tarif_horaire_option));
            $montant_option = mysqli_real_escape_string($con, trim($request->montant_option));
            
            $sql = "UPDATE `affectation` SET `id_mission`='$id_mission', `id_utilisateur`='$id_utilisateur', `id_client`='$id_client',
            `duree`='$duree', `tarif_horaire_personnel`='$tarif_horaire_personnel',`tarif_horaire_client`='$tarif_horaire_client',`montant`='$montant', 
            `commisions`='$commisions',`frequence`='$frequence',`date_mission`='$date_mission',`heure_mission`='$heure_mission', 
            `source_id`=$source_id, `total_facture`='$total_facture', `montant_option`='$montant_option', `tarif_horaire_option`='$tarif_horaire_option'
                WHERE `id_affectation` = '{$id_affectation}'";
  
            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }
            
            if($frequence > 1){ 
                
                //Avant de mettre a jours on doit rechercher si elle existe deja sinon on la crée juste

                $jour_1 = mysqli_real_escape_string($con, $request->jour_1);
                $jour_2 = mysqli_real_escape_string($con, $request->jour_2);
                $jour_3 = mysqli_real_escape_string($con, $request->jour_3);
                $jour_4 = mysqli_real_escape_string($con, $request->jour_4);
                $jour_5 = mysqli_real_escape_string($con, $request->jour_5);
                $jour_6 = mysqli_real_escape_string($con, $request->jour_6);
                $jour_7 = mysqli_real_escape_string($con, $request->jour_7);

                $heure_1 = mysqli_real_escape_string($con, $request->heure_1);
                $heure_2 = mysqli_real_escape_string($con, $request->heure_2);
                $heure_3 = mysqli_real_escape_string($con, $request->heure_3);
                $heure_4 = mysqli_real_escape_string($con, $request->heure_4);
                $heure_5 = mysqli_real_escape_string($con, $request->heure_5);
                $heure_6 = mysqli_real_escape_string($con, $request->heure_6);
                $heure_7 = mysqli_real_escape_string($con, $request->heure_7);

                if ($frequence == 2 || $frequence == 5){

                    $jour_2 = -1;
                    $jour_3 = -1;
                    $jour_4 = -1;
                    $jour_5 = -1;
                    $jour_6 = -1;
                    $jour_7 = -1;
              
                    $heure_2 = "00:00:00";
                    $heure_3 = "00:00:00";
                    $heure_4 = "00:00:00";
                    $heure_5 = "00:00:00";
                    $heure_6 = "00:00:00";
                    $heure_7 = "00:00:00";
                    
                  }
              
                  if ($frequence == 3){
              
                    $jour_3 = -1;
                    $jour_4 = -1;
                    $jour_5 = -1;
                    $jour_6 = -1;
                    $jour_7 = -1;
              
                    $heure_3 = "00:00:00";
                    $heure_4 = "00:00:00";
                    $heure_5 = "00:00:00";
                    $heure_6 = "00:00:00";
                    $heure_7 = "00:00:00";
                    
                  }

                  if ($frequence == 4){

                    if($jour_3 == ""){
                        $jour_3 = -1;
                    }

                    if($jour_4 == ""){
                        $jour_4 = -1;
                    }

                    if($jour_5 == ""){
                        $jour_5 = -1;
                    }

                    if($jour_6 == ""){
                        $jour_6 = -1;
                    }

                    if($jour_7 == ""){
                        $jour_7 = -1;
                    }

                  }
                
                $sql = "SELECT * FROM affectation_frequence WHERE affectation_id = '{$id_affectation}'";
                $result = mysqli_query($con,$sql);

                $i = 0;

                while($row = mysqli_fetch_assoc($result)){
                    $i++;
                }

                //LORS DE LA DETERMINATION DE FREQUENCE SI CETTE DEERNIER EXIST ON FAIT DES MISE AJORS AU CAS CONTRAIRE ON AJOUTE
                if($i >= 1){

                    $sql = "UPDATE `affectation_frequence` SET `jour_1`='$jour_1', `jour_2`='$jour_2', `jour_3`='$jour_3', `jour_4`='$jour_4', 
                    `jour_5`='$jour_5', `jour_6`='$jour_6', `jour_7`='$jour_7',`heure_1`='$heure_1', `heure_2`='$heure_2', `heure_3`='$heure_3',
                     `heure_4`='$heure_4', `heure_5`='$heure_5', `heure_6`='$heure_6', `heure_7`='$heure_7' 
                     WHERE affectation_id='{$id_affectation}'";

                }else if ($i == 0) {

                    $sql = "INSERT INTO `affectation_frequence` (`jour_1`, `jour_2`, `jour_3`, `jour_4`, `jour_5`, `jour_6`,
                    `jour_7`, `heure_1`, `heure_2`, `heure_3`, `heure_4`, `heure_5`, `heure_6`, `heure_7`, `affectation_id`) 
                    VALUES ('$jour_1', '$jour_2', '$jour_3', '$jour_4', '$jour_5', '$jour_6', '$jour_7', '$heure_1', '$heure_2','$heure_3',
                    '$heure_4','$heure_5', '$heure_6','$heure_7','$id_affectation')";

                }

                if(mysqli_query($con,$sql)){
                    http_response_code(201);
                }else{
                    http_response_code(422);
                }

            }

            echo $json = json_encode("Donne");

        }

    }else if(isset($_GET['affectation_update_etat'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);

            $statut =  $_GET['affectation_update_etat'];

            $id_affectation = mysqli_real_escape_string($con, trim($request->id_affectation));
            
            $sql = "UPDATE `affectation` SET  `statut`='$statut' WHERE `id_affectation` = '{$id_affectation}'";
  
            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            echo $json = json_encode("Donne");

        }

    }else if((isset($_GET['affectation_complete_details']))){

        $id_affectation = $_GET['affectation_complete_details']; // Used for details of affectation from planning
        
        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, 
        affectation.duree,tarif_horaire_client, tarif_horaire_personnel, 
        affectation.montant, affectation.commisions, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
        `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
         `email_client`, `code_acces_1`, `code_acces_2`, `type_client`,`source_id`, `total_facture`, `montant_option`, `tarif_horaire_option`
       FROM affectation, utilisateur, mission, client
       WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission 
       AND affectation.id_utilisateur = utilisateur.id_utilisateur AND id_affectation = '{$id_affectation}'
       ORDER BY nom_client ASC, affectation.date_mission ASC";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);

    }else if(isset($_GET['filtrer_affectation'])){
        
        //POUR LES ELEMENTS DE PRODUCTIONS DES FACTURES : LIGNE DE FACTURE

        if (isset($postdata) && !empty($postdata)){
            
            $request = json_decode($postdata);
            $du = mysqli_real_escape_string($con, trim($request->date_du));
            $au = mysqli_real_escape_string($con, $request->date_au);
            
        }
        
        $statut = 1;
        $id_client = $_GET['filtrer_affectation'];
        //on ne facture que les missions validees statut = 1
        //on doit se rassurer qu'il ne fait pas deja parti d'un element de facture
        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
        `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
         `email_client`, `code_acces_1`, `code_acces_2`, `type_client`,`source_id`, `total_facture`, `montant_option`, `tarif_horaire_option`
       FROM affectation, utilisateur, mission, client
       WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND statut = '{$statut}'
       AND affectation.id_utilisateur = utilisateur.id_utilisateur AND affectation.id_client = '{$id_client}' AND id_facturation = 0
       AND affectation.date_mission BETWEEN '$du' AND '$au'
       ORDER BY nom_client ASC, affectation.date_mission ASC";
            
        if($result = mysqli_query($con,$sql)){

            $affectations = array();

            $i = 0 ;

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

                $affectations[$i]['source_id'] = $affectation['source_id'];

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

                $affectations[$i]['total_facture'] = $affectation['total_facture'];
                $affectations[$i]['montant_option'] = $affectation['montant_option'];
                $affectations[$i]['tarif_horaire_option'] = $affectation['tarif_horaire_option'];

                $i++;

            }

            echo json_encode($affectations);

        }
    
}else if(isset($_GET['create_facture'])){

    $id_client = $_GET['id_client'];

    $sql = "SELECT `source`, `description` FROM client, source WHERE client.id_source = source.id_source AND id_client = '{$id_client}'";

    $clients = array();

    $code_source ="";

    if($result = mysqli_query($con,$sql)){
        while($client = mysqli_fetch_assoc($result)){
            $code_source = $client['description'];
        }
    }
    //ON DOIT DETERMINER id_facturation

    $sql = "SELECT * FROM facturation WHERE etat = 0 ORDER BY id_facturation DESC";
        
    if($result = mysqli_query($con,$sql)){

        $facturations = array();

        $i = 0 ;

        while($facturation = mysqli_fetch_assoc($result)){
            
            $facturations[$i]['id_facturation'] = $facturation['id_facturation'];
                
            $i++;

        } 

    }

    $id_facturation = $facturations[0]['id_facturation'] + 1 ;

    $montant = $_GET['create_facture'];
    $libelle = $_GET['libelle'];
    $date_facturation = $_GET['date_facturation'];
    $du = $_GET['du'];
    $au = $_GET['au'];
    $source_date = $_GET['date_facturation'];
    $date = new DateTime($source_date);
    $date = $date->format('dmY'); // 31.07.2012
    
    $numero_facture = $id_facturation.''.$date.''.$code_source;

    $libelle = $_GET['libelle'];

    $sql = "INSERT INTO `facturation` (`numero_facture`, `montant`, `libelle`, `date_facturation`,`id_client`)
    VALUES ('$numero_facture','$montant','$libelle','$date_facturation', '$id_client')";
    
    if(mysqli_query($con,$sql)){

        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
        `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
            `email_client`, `code_acces_1`, `code_acces_2`, `type_client`, `source_id`
        FROM affectation, utilisateur, mission, client
        WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND statut = 2
        AND affectation.id_utilisateur = utilisateur.id_utilisateur AND affectation.id_client = '{$id_client}' AND affectation.id_facturation = 0
        AND affectation.date_mission BETWEEN '$du' AND '$au'
        ORDER BY id_affectation ASC";
            
        if($result = mysqli_query($con,$sql)){

            $affectations = array();

            while($affectation = mysqli_fetch_assoc($result)){
                
                $id_affectation = $affectation['id_affectation'];
                $sql = "UPDATE `affectation` SET `id_facturation`='$id_facturation' WHERE `id_affectation` = '{$id_affectation}'";
                mysqli_query($con,$sql);

            }

        }

    }

    echo $json = json_encode("Donne");

}else if(isset($_GET['factures'])){

    $sql = "SELECT * FROM facturation";

    $id_facturation_delete ;

    if($result = mysqli_query($con,$sql)){  

        while($facturation = mysqli_fetch_assoc($result)){

            $sql_ = "SELECT * FROM affectation";

            $delete = true;

            if($result_ = mysqli_query($con,$sql_)){
                while($affectation = mysqli_fetch_assoc($result_)){

                    $id_facturation_delete = $facturation['id_facturation'];

                    if($affectation['id_facturation'] == $facturation['id_facturation']){
                        $delete = false; 
                    }

                }
            }

            if ($delete){

		        $sql = "DELETE FROM facturation WHERE id_facturation='{$id_facturation_delete}'";

                if (mysqli_query($con,$sql)) {}

            }
        }
    
    }
    
    $sql = "SELECT `id_facturation`, `libelle`, `date_facturation`, `montant`, `numero_facture`, facturation.id_client,
     `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `etat`, `type_client`  
    FROM facturation, client WHERE facturation.id_client = client.id_client ORDER BY id_facturation ASC";
        
    if($result = mysqli_query($con,$sql)){

        $facturations = array();

        $i = 0 ;

        while($facturation = mysqli_fetch_assoc($result)){
            
            $facturations[$i]['id_facturation'] = $facturation['id_facturation'];
            $facturations[$i]['libelle'] = $facturation['libelle'];
            $facturations[$i]['montant'] = $facturation['montant'];
            $facturations[$i]['date_facturation'] = $facturation['date_facturation'];
            $facturations[$i]['numero_facture'] = $facturation['numero_facture'];
            $facturations[$i]['id_client'] = $facturation['id_client'];

            $facturations[$i]['nom_client'] = $facturation['nom_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['telephone_1'] = $facturation['telephone_1'];
            $facturations[$i]['telephone_2'] = $facturation['telephone_2'];
            $facturations[$i]['email_client'] = $facturation['email_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['etat'] = $facturation['etat'];
            $facturations[$i]['type_client'] = $facturation['type_client'];
            
            
            $i++;

        }

        echo json_encode($facturations);

    }

}else if(isset($_GET['facture_update_etat'])){

    $sql = "SELECT * FROM `agence`";
    
    $agences = array();

    if($result = mysqli_query($con, $sql)){

        $i = 0 ;

        while($agence = mysqli_fetch_assoc($result)){
            
            $agences[$i]['nom'] = $agence['nom'];
            $agences[$i]['logo'] = $agence['logo'];
            $agences[$i]['adresse'] = $agence['adresse'];
            $agences[$i]['telephone'] = $agence['telephone'];
            $agences[$i]['email'] = $agence['email'];
            $agences[$i]['description'] = $agence['description'];
            
            $i++;

        }

        echo json_encode($agences);

    }

}else if(isset($_GET['factures_personnel'])){

    //on ne facture que les missions validees statut = 1
    $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
    affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
    `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
     `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
   FROM affectation, utilisateur, mission, client
   WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND statut = 1
   AND affectation.id_utilisateur = utilisateur.id_utilisateur AND affectation.id_client = '{$id_client}'
   ORDER BY id_affectation ASC";
        
    if($result = mysqli_query($con,$sql)){

        $affectations = array();

        $i = 0 ;

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

            $i++;

        }

        echo json_encode($affectations);

    }

}else if(isset($_GET['affectation_frequence'])){

    $affectation_id = $_GET['affectation_frequence'];

    $sql = "SELECT * FROM `affectation_frequence` WHERE affectation_id = '{$affectation_id}' ORDER BY affectation_id ASC";

    $result = mysqli_query($con, $sql);

    $row = mysqli_fetch_assoc($result);

    echo $json = json_encode($row);

}else if(isset($_GET['duplication_affectation'])){

    if(isset($postdata) && !empty($postdata)){
        // Extract the data.
        $request = json_decode($postdata);
        
        $id_affectation =  mysqli_real_escape_string($con, trim($request->id_affectation));
        $id_mission = mysqli_real_escape_string($con, trim($request->id_mission));
        $id_utilisateur = mysqli_real_escape_string($con, $request->id_utilisateur);
        $duree = mysqli_real_escape_string($con, trim($request->duree));
        $id_client = mysqli_real_escape_string($con, trim($request->id_client));
        $montant = mysqli_real_escape_string($con, trim($request->montant));
        $commisions = mysqli_real_escape_string($con, $request->commisions);
        $frequence = mysqli_real_escape_string($con, (int)trim($request->frequence));

        $statut = 0;
        $new_date_mission = $_GET['duplication_affectation'];
        $date_mission = $new_date_mission;
        //$date_mission = mysqli_real_escape_string($con, trim($request->date_mission));
       
        $dupliquer = 0;

        $heure_mission = mysqli_real_escape_string($con, trim($request->heure_mission));
        $tarif_horaire_personnel = mysqli_real_escape_string($con, trim($request->tarif_horaire_personnel));
        $tarif_horaire_client = mysqli_real_escape_string($con, trim($request->tarif_horaire_client));
        $total_facture = mysqli_real_escape_string($con, trim($request->total_facture));
        $tarif_horaire_option = mysqli_real_escape_string($con, trim($request->tarif_horaire_option));
        $montant_option = mysqli_real_escape_string($con, trim($request->montant_option));
        
        if($frequence > 1){
            $dupliquer = 1;
        }

        $sql = "SELECT id_source FROM client WHERE id_client = '{$id_client}' ORDER BY nom_client ASC";
            
        if($result = mysqli_query($con,$sql)){

            $clients = array();

            $i = 0 ;

            while($client = mysqli_fetch_assoc($result)){
                
                $clients[$i]['id_source'] = $client['id_source'];
                $source_id = $client['id_source'];
                $i++;

            }

        }

        // Create.
        $sql = "INSERT INTO `affectation`( `id_mission`, `id_utilisateur`, `duree`, `montant`, `commisions`, `frequence`, `date_mission`, 
        `heure_mission`, `id_client`,`tarif_horaire_personnel`, `tarif_horaire_client`,`source_id`,`total_facture`,`montant_option`,
        `tarif_horaire_option`,`dupliquer`,`statut`) 
            VALUES ( '$id_mission', '$id_utilisateur', '$duree', '$montant', '$commisions', '$frequence', '$date_mission', '$heure_mission',
            '$id_client','$tarif_horaire_personnel','$tarif_horaire_client', '$source_id','$total_facture','$montant_option',
            '$tarif_horaire_option','$dupliquer','$statut')";
        
        if(mysqli_query($con,$sql)){
            http_response_code(201);
        }else{
            http_response_code(422);
        }

        //DUPLICATION DES DETAILS DE LA FREQUENCE DE LA MISSION
        if($frequence > 1){

            $affectation_id = 0;

            $sql = "SELECT * FROM affectation ORDER BY id_affectation ASC";
            
            if($result = mysqli_query($con,$sql)){

                $affectations = array();

                while($affectation = mysqli_fetch_assoc($result)){
                    $affectation_id = $affectation['id_affectation'];
                }

            }

            $sql = "SELECT * FROM affectation ORDER BY id_affectation ASC";
            
            if($result = mysqli_query($con,$sql)){

                $affectations = array();

                while($affectation = mysqli_fetch_assoc($result)){
                    $affectation_id = $affectation['id_affectation'];
                }

            }

            $sql = "SELECT * FROM `affectation_frequence` WHERE affectation_id = '{$id_affectation}' ORDER BY affectation_id ASC";

            if($result = mysqli_query($con, $sql)){

                while($affectation_detail = mysqli_fetch_assoc($result)){

                    $jour_1 = $affectation_detail['jour_1'];
                    $jour_2 = $affectation_detail['jour_2'];
                    $jour_3 = $affectation_detail['jour_3'];
                    $jour_4 = $affectation_detail['jour_4'];
                    $jour_5 = $affectation_detail['jour_5'];
                    $jour_6 = $affectation_detail['jour_6'];
                    $jour_7 = $affectation_detail['jour_7'];

                    $heure_1 = $affectation_detail['heure_1'];
                    $heure_2 = $affectation_detail['heure_2'];
                    $heure_3 = $affectation_detail['heure_3'];
                    $heure_4 = $affectation_detail['heure_4'];
                    $heure_5 = $affectation_detail['heure_5'];
                    $heure_6 = $affectation_detail['heure_6'];
                    $heure_7 = $affectation_detail['heure_7'];

                }

            }

            if ($frequence == 2 || $frequence == 5){

                $jour_2 = -1;
                $jour_3 = -1;
                $jour_4 = -1;
                $jour_5 = -1;
                $jour_6 = -1;
                $jour_7 = -1;
          
                $heure_2 = "00:00:00";
                $heure_3 = "00:00:00";
                $heure_4 = "00:00:00";
                $heure_5 = "00:00:00";
                $heure_6 = "00:00:00";
                $heure_7 = "00:00:00";
                
              }
          
              if ($frequence == 3){
          
                $jour_3 = -1;
                $jour_4 = -1;
                $jour_5 = -1;
                $jour_6 = -1;
                $jour_7 = -1;
          
                $heure_3 = "00:00:00";
                $heure_4 = "00:00:00";
                $heure_5 = "00:00:00";
                $heure_6 = "00:00:00";
                $heure_7 = "00:00:00";
                
              }

              if ($frequence == 4){

                if($jour_3 == ""){
                    $jour_3 = -1;
                }

                if($jour_4 == ""){
                    $jour_4 = -1;
                }

                if($jour_5 == ""){
                    $jour_5 = -1;
                }

                if($jour_6 == ""){
                    $jour_6 = -1;
                }

                if($jour_7 == ""){
                    $jour_7 = -1;
                }

              }
              
            $sql = "INSERT INTO `affectation_frequence` (`jour_1`, `jour_2`, `jour_3`, `jour_4`, `jour_5`, `jour_6`,
             `jour_7`, `heure_1`, `heure_2`, `heure_3`, `heure_4`, `heure_5`, `heure_6`, `heure_7`, `affectation_id`) 
            VALUES ('$jour_1', '$jour_2', '$jour_3', '$jour_4', '$jour_5', '$jour_6', '$jour_7', '$heure_1', '$heure_2','$heure_3',
            '$heure_4','$heure_5', '$heure_6','$heure_7','$affectation_id')";

            if(mysqli_query($con,$sql)){
                http_response_code(201);
            }else{
                http_response_code(422);
            }

        }

        //ON CHANGE LA VALEUR DE DUPLIQUER DE L'AFFECTATION (ANCIENNE) POUR NE PLUS LA PRENDRE EN COMPTE LORS DE NOUVELLE DUPLICATION
        $sql = "UPDATE `affectation` SET  `dupliquer`=0 WHERE `id_affectation` = '{$id_affectation}'";
  
        if (mysqli_query($con,$sql)) {
            http_response_code(204);
            
        }else{
            http_response_code(422);
        }

        echo $json = json_encode("Donne");

    }

}else if(isset($_GET['duplication_affectation_speciale'])){

    if(isset($postdata) && !empty($postdata)){
        // Extract the data.
        $request = json_decode($postdata);
        
        $id_affectation =  mysqli_real_escape_string($con, trim($request->id_affectation));
        $id_mission = mysqli_real_escape_string($con, trim($request->id_mission));
        $id_utilisateur = mysqli_real_escape_string($con, $request->id_utilisateur);
        $duree = mysqli_real_escape_string($con, trim($request->duree));
        $id_client = mysqli_real_escape_string($con, trim($request->id_client));
        $montant = mysqli_real_escape_string($con, trim($request->montant));
        $commisions = mysqli_real_escape_string($con, $request->commisions);
        $frequence = mysqli_real_escape_string($con, (int)trim($request->frequence));

        $statut = 0;
        $new_date_mission = $_GET['duplication_affectation_speciale'];
        $date_mission = $new_date_mission;
        //$date_mission = mysqli_real_escape_string($con, trim($request->date_mission));
       
        $dupliquer = 0;

        $heure_mission = mysqli_real_escape_string($con, trim($request->heure_mission));
        $tarif_horaire_personnel = mysqli_real_escape_string($con, trim($request->tarif_horaire_personnel));
        $tarif_horaire_client = mysqli_real_escape_string($con, trim($request->tarif_horaire_client));
        $total_facture = mysqli_real_escape_string($con, trim($request->total_facture));
        $tarif_horaire_option = mysqli_real_escape_string($con, trim($request->tarif_horaire_option));
        $montant_option = mysqli_real_escape_string($con, trim($request->montant_option));
        
        $sql = "SELECT id_source FROM client WHERE id_client = '{$id_client}' ORDER BY nom_client ASC";
            
        if($result = mysqli_query($con,$sql)){

            $clients = array();

            $i = 0 ;

            while($client = mysqli_fetch_assoc($result)){
                
                $clients[$i]['id_source'] = $client['id_source'];
                $source_id = $client['id_source'];
                $i++;

            }

        }

        // Create.
        $sql = "INSERT INTO `affectation`( `id_mission`, `id_utilisateur`, `duree`, `montant`, `commisions`, `frequence`, `date_mission`, 
        `heure_mission`, `id_client`,`tarif_horaire_personnel`, `tarif_horaire_client`,`source_id`,`total_facture`,`montant_option`,
        `tarif_horaire_option`,`dupliquer`,`statut`) 
            VALUES ( '$id_mission', '$id_utilisateur', '$duree', '$montant', '$commisions', '$frequence', '$date_mission', '$heure_mission',
            '$id_client','$tarif_horaire_personnel','$tarif_horaire_client', '$source_id','$total_facture','$montant_option',
            '$tarif_horaire_option','$dupliquer','$statut')";
        
        if(mysqli_query($con,$sql)){
            http_response_code(201);
        }else{
            http_response_code(422);
        }

        $sql = "SELECT * FROM affectation ORDER BY id_affectation ASC";
            
        if($result = mysqli_query($con,$sql)){

            $affectations = array();

            while($affectation = mysqli_fetch_assoc($result)){
                $affectation_id = $affectation['id_affectation'];
            }

        }

        $jour_1 = mysqli_real_escape_string($con, trim($request->jour_1));
        $jour_2 = mysqli_real_escape_string($con, trim($request->jour_2));
        $jour_3 = mysqli_real_escape_string($con, trim($request->jour_3));
        $jour_4 = mysqli_real_escape_string($con, trim($request->jour_4));
        $jour_5 = mysqli_real_escape_string($con, trim($request->jour_5));
        $jour_6 = mysqli_real_escape_string($con, trim($request->jour_6));
        $jour_7 = mysqli_real_escape_string($con, trim($request->jour_7));

        $heure_1 = mysqli_real_escape_string($con, trim($request->heure_1));
        $heure_2 = mysqli_real_escape_string($con, trim($request->heure_2));
        $heure_3 = mysqli_real_escape_string($con, trim($request->heure_3));
        $heure_4 = mysqli_real_escape_string($con, trim($request->heure_4));
        $heure_5 = mysqli_real_escape_string($con, trim($request->heure_5));
        $heure_6 = mysqli_real_escape_string($con, trim($request->heure_6));
        $heure_7 = mysqli_real_escape_string($con, trim($request->heure_7));

        if( $jour_1 == ""){
            $jour_1 = -1;
        }

        if( $jour_2 == ""){
            $jour_2 = -1;
        }

        if( $jour_3 == ""){
            $jour_3 = -1;
        }

        if( $jour_4 == ""){
            $jour_4 = -1;
        }

        if( $jour_5 == ""){
            $jour_5 = -1;
        }

        if( $jour_6 == ""){
            $jour_6 = -1;
        }

        if( $jour_7 == ""){
            $jour_7 = -1;
        }

        if( $heure_1 == ""){
            $heure_1 = "00:00:00";
        }

        if( $heure_2 == ""){
            $heure_2 = "00:00:00";
        }

        if( $heure_3 == ""){
            $heure_3 = "00:00:00";
        }

        if( $heure_4 == ""){
            $heure_4 = "00:00:00";
        }

        if( $heure_5 == ""){
            $heure_5 = "00:00:00";
        }

        if( $heure_6 == ""){
            $heure_6 = "00:00:00";
        }

        if( $heure_7 == ""){
            $heure_7 = "00:00:00";
        }

        if($frequence >=2 && $frequence <=5){
            
            $sql = "INSERT INTO `affectation_frequence` (`jour_1`, `jour_2`, `jour_3`, `jour_4`, `jour_5`, `jour_6`,
             `jour_7`, `heure_1`, `heure_2`, `heure_3`, `heure_4`, `heure_5`, `heure_6`, `heure_7`, `affectation_id`) 
            VALUES ('$jour_1', '$jour_2', '$jour_3', '$jour_4', '$jour_5', '$jour_6', '$jour_7', '$heure_1', '$heure_2','$heure_3',
            '$heure_4','$heure_5', '$heure_6','$heure_7','$affectation_id')";

            if(mysqli_query($con,$sql)){
                http_response_code(201);
            }else{
                http_response_code(422);
            }
         
        }
        
        echo $json = json_encode("Donne");

    }

}else if(isset($_GET['dupliquer_liste'])){
    
    $date_cloture = $_GET['dupliquer_liste'];

    $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
    affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission,
     affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, 
     `adresse_client`, `telephone_1`, `telephone_2`,  `email_client`, `code_acces_1`, `code_acces_2`, `type_client`, `source_id`, 
     `total_facture`, `montant_option`, `tarif_horaire_option`
   FROM affectation, utilisateur, mission, client
   WHERE affectation.id_client = client.id_client 
   AND affectation.id_mission = mission.id_mission 
   AND affectation.date_mission < '{$date_cloture}'
   AND affectation.id_utilisateur = utilisateur.id_utilisateur 
   AND dupliquer = 1
   ORDER BY id_affectation ASC";
        
    if($result = mysqli_query($con,$sql)){

        $affectations = array();

        $i = 0 ;

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
            $affectations[$i]['source_id'] = $affectation['source_id'];

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

            $affectations[$i]['total_facture'] = $affectation['total_facture'];
            $affectations[$i]['montant_option'] = $affectation['montant_option'];
            $affectations[$i]['tarif_horaire_option'] = $affectation['tarif_horaire_option'];

            $i++;

        }

        echo json_encode($affectations);

    }else{
        http_response_code(422);
    }

}else if(isset($_GET['cloturer'])){

    $date_cloture = $_GET['cloturer']; 
    $utilisateur_id = $_GET['utilisateur_id'];
     // Create.
     $sql = "INSERT INTO `cloture`(`date_cloture`, `utilisateur_id`) 
     VALUES ('$date_cloture', '$utilisateur_id')";
     
     if(mysqli_query($con,$sql)){
         http_response_code(201);
     }else{
         http_response_code(422);
     }

     echo json_encode('Donne');

}else if(isset($_GET['cloture_list'])){

    $date_cloture = $_GET['cloture_list'];
    
    $sql = "SELECT * FROM `cloture` WHERE `date_cloture` BETWEEN '{$date_cloture}' AND '{$date_cloture}'";
            
    if($result = mysqli_query($con,$sql)){
        
        $clotures = array();

        $i=0;

        while($cloture = mysqli_fetch_assoc($result)){

            $clotures[$i]['id_cloture']=$cloture['id_cloture'];
            $clotures[$i]['utilisateur_id']=$cloture['utilisateur_id'];
            $clotures[$i]['date_cloture']=$cloture['date_cloture'];

            $i++;

        }

    }

    echo json_encode($clotures);
    
}else if(isset($_GET['filtre'])){
    //DERNIER PROFIL ENREGISTRE

    $filtre = $_GET['filtre']; 

    $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
    affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
    `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
     `email_client`, `code_acces_1`, `code_acces_2`, `type_client`, `source_id`, `total_facture`, `montant_option`, `tarif_horaire_option`
   FROM affectation, utilisateur, mission, client
   WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
   AND nom_client LIKE '%$filtre%'
   OR affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
   AND nom_utilisateur LIKE '%$filtre%' 
   OR affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
   AND mission LIKE '%$filtre%' 
   ORDER BY nom_client ASC, affectation.date_mission ASC";
        
    if($result = mysqli_query($con,$sql)){

        $affectations = array();

        $i = 0 ;

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
            $affectations[$i]['source_id'] = $affectation['source_id'];

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

            $affectations[$i]['total_facture'] = $affectation['total_facture'];
            $affectations[$i]['montant_option'] = $affectation['montant_option'];
            $affectations[$i]['tarif_horaire_option'] = $affectation['tarif_horaire_option'];

            $i++;

        }

        echo json_encode($affectations);

    }else{
        http_response_code(422);
    }
}else if(isset($_GET['filtre_plus_date'])){
    //DERNIER PROFIL ENREGISTRE

    $filtre = $_GET['filtre_plus_date']; 
    $du = $_GET['du']; 
    $au = $_GET['au']; 

    $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
    affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
    `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
     `email_client`, `code_acces_1`, `code_acces_2`, `type_client`, `source_id`, `total_facture`, `montant_option`, `tarif_horaire_option`
   FROM affectation, utilisateur, mission, client
   WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
   AND nom_client LIKE '%$filtre%' AND affectation.date_mission BETWEEN '$du' AND '$au'
   OR affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
   AND nom_utilisateur LIKE '%$filtre%' AND affectation.date_mission BETWEEN '$du' AND '$au' 
   OR affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
   AND mission LIKE '%$filtre%' AND affectation.date_mission BETWEEN '$du' AND '$au'
   ORDER BY nom_client ASC, affectation.date_mission ASC";
        
    if($result = mysqli_query($con,$sql)){

        $affectations = array();

        $i = 0 ;

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
            $affectations[$i]['source_id'] = $affectation['source_id'];

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

            $affectations[$i]['total_facture'] = $affectation['total_facture'];
            $affectations[$i]['montant_option'] = $affectation['montant_option'];
            $affectations[$i]['tarif_horaire_option'] = $affectation['tarif_horaire_option'];

            $i++;

        }

        echo json_encode($affectations);

    }else{
        http_response_code(422);
    }
}else if(isset($_GET['date_du'])){
    //DERNIER PROFIL ENREGISTRE

    $du = $_GET['date_du']; 
    $au = $_GET['au']; 

    $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
    affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
    `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
     `email_client`, `code_acces_1`, `code_acces_2`, `type_client`, `source_id`, `total_facture`, `montant_option`, `tarif_horaire_option`
   FROM affectation, utilisateur, mission, client
   WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
     AND affectation.date_mission BETWEEN '$du' AND '$au'
   OR affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
   AND  affectation.date_mission BETWEEN '$du' AND '$au' 
   OR affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
   AND affectation.date_mission BETWEEN '$du' AND '$au'
   ORDER BY nom_client ASC, affectation.date_mission ASC";
        
    if($result = mysqli_query($con,$sql)){

        $affectations = array();

        $i = 0 ;

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
            $affectations[$i]['source_id'] = $affectation['source_id'];

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

            $affectations[$i]['total_facture'] = $affectation['total_facture'];
            $affectations[$i]['montant_option'] = $affectation['montant_option'];
            $affectations[$i]['tarif_horaire_option'] = $affectation['tarif_horaire_option'];

            $i++;

        }

        echo json_encode($affectations);

    }else{
        http_response_code(422);
    }
}else if(isset($_GET['factures_periodiques'])){

    $du = $_GET['du']; 
    $au = $_GET['au']; 
    $filtre_facture = intval($_GET['filtre_facture']); 
    $id_client = intval($_GET['id_client']); 

    if ($filtre_facture == 0){

        $sql = "SELECT `id_facturation`, `libelle`, `date_facturation`, `montant`, `numero_facture`, facturation.id_client,
        `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `etat`, `type_client`  
        FROM facturation, client 
        WHERE facturation.id_client = client.id_client 
        AND date_facturation BETWEEN '$du' AND '$au'
        ORDER BY nom_client ASC, date_facturation DESC";

    }else if ($filtre_facture == 1){

        $sql = "SELECT `id_facturation`, `libelle`, `date_facturation`, `montant`, `numero_facture`, facturation.id_client,
        `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `etat`, `type_client`  
        FROM facturation, client 
        WHERE facturation.id_client = client.id_client AND client.id_client = '{$id_client}'
        AND date_facturation BETWEEN '$du' AND '$au'
        ORDER BY nom_client ASC, date_facturation DESC";
        
    }

    if($result = mysqli_query($con,$sql)){

        $facturations = array();

        $i = 0 ;

        while($facturation = mysqli_fetch_assoc($result)){
            
            $facturations[$i]['id_facturation'] = $facturation['id_facturation'];
            $facturations[$i]['libelle'] = $facturation['libelle'];
            $facturations[$i]['montant'] = $facturation['montant'];
            $facturations[$i]['date_facturation'] = $facturation['date_facturation'];
            $facturations[$i]['numero_facture'] = $facturation['numero_facture'];
            $facturations[$i]['id_client'] = $facturation['id_client'];

            $facturations[$i]['nom_client'] = $facturation['nom_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['telephone_1'] = $facturation['telephone_1'];
            $facturations[$i]['telephone_2'] = $facturation['telephone_2'];
            $facturations[$i]['email_client'] = $facturation['email_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['etat'] = $facturation['etat'];
            $facturations[$i]['type_client'] = $facturation['type_client'];
            
            $i++;

        }

        echo json_encode($facturations);

    }
    
}else if(isset($_GET['filtre_source'])){
    //DERNIER PROFIL ENREGISTRE

    $id_source = $_GET['filtre_source']; 
    $du = $_GET['du']; 
    $au = $_GET['au']; 

    $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
    affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
    `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
     `email_client`, `code_acces_1`, `code_acces_2`, `type_client`, `source_id`, `total_facture`, `montant_option`, `tarif_horaire_option`
   FROM affectation, utilisateur, mission, client
   WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
   AND affectation.source_id = '{$id_source}' AND affectation.date_mission BETWEEN '$du' AND '$au'
   ORDER BY nom_client ASC, affectation.date_mission ASC";
        
    if($result = mysqli_query($con,$sql)){

        $affectations = array();

        $i = 0 ;

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
            $affectations[$i]['source_id'] = $affectation['source_id'];

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

            $affectations[$i]['total_facture'] = $affectation['total_facture'];
            $affectations[$i]['montant_option'] = $affectation['montant_option'];
            $affectations[$i]['tarif_horaire_option'] = $affectation['tarif_horaire_option'];

            $i++;

        }

        echo json_encode($affectations);

    }else{
        http_response_code(422);
    }
}else if(isset($_GET['assigner_source_au_facture'])){

    $sql = "SELECT * FROM facturation";

    if($result = mysqli_query($con,$sql)){  

        $facturations = array();

        $i = 0 ;

        while($facturation = mysqli_fetch_assoc($result)){
        
            $id_facturation = $facturation['id_facturation'];
            $sql_ = "SELECT * FROM affectation WHERE id_facturation = '{$id_facturation }'";

            if($result_ = mysqli_query($con,$sql_)){

                while($affectation = mysqli_fetch_assoc($result_)){
                    $source_id = $affectation['source_id'];
                    $sql1 = "UPDATE `facturation` SET `source_id`='{$source_id}' WHERE `id_facturation` = '{$id_facturation}'";

                    if (mysqli_query($con,$sql1)) {
                        http_response_code(204);
                    }

                }

            }

            $i++;
        }
        
    }

    echo json_encode("Donne");
    //echo $json = json_encode($result);
    
}else if(isset($_GET['affectation_facturation_edit'])){

    //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

    $id_facturation = intval($_GET['affectation_facturation_edit']);

     //DERNIER PROFIL ENREGISTRE
     $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
     affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
     `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
      `email_client`, `code_acces_1`, `code_acces_2`, `type_client`, `source_id`, `total_facture`, `montant_option`, `tarif_horaire_option`
    FROM affectation, utilisateur, mission, client
    WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur AND id_facturation='{$id_facturation}'
    ORDER BY nom_client ASC, affectation.date_mission ASC";
         
     if($result = mysqli_query($con,$sql)){

         $affectations = array();

         $i = 0 ;

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
             $affectations[$i]['source_id'] = $affectation['source_id'];

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

             $affectations[$i]['total_facture'] = $affectation['total_facture'];
             $affectations[$i]['montant_option'] = $affectation['montant_option'];
             $affectations[$i]['tarif_horaire_option'] = $affectation['tarif_horaire_option'];

             $i++;

         }

         echo json_encode($affectations);

     }else{
         http_response_code(422);
     }
    
}else if(isset($_GET['delete_facture'])){

    $id_facturation = (int)$_GET['delete_facture'];

    $sql = "DELETE FROM facturation WHERE id_facturation = '{$id_facturation}'";

   mysqli_query($con,$sql);

   $sql = "UPDATE `affectation` SET `id_facturation`= 0, `statut`= 1 WHERE `id_facturation` = '{$id_facturation}'";

   if (mysqli_query($con,$sql)) {
       http_response_code(204);
   }else{
       http_response_code(422);
   }

}

?>


