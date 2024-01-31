
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
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

            // Create.
            $sql = "INSERT INTO `affectation`( `id_mission`, `id_utilisateur`, `duree`, `montant`, `commisions`, `frequence`, `date_mission`, `heure_mission`, `id_client`,`tarif_horaire_personnel`, `tarif_horaire_client`) 
                VALUES ( '$id_mission', '$id_utilisateur', '$duree', '$montant', '$commisions', '$frequence', '$date_mission', '$heure_mission','$id_client','$tarif_horaire_personnel','$tarif_horaire_client')";
            
            if(mysqli_query($con,$sql)){
                http_response_code(201);
            }else{
                http_response_code(422);
            }
        }

    }else if(isset($_GET['liste'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
        `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
         `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
       FROM affectation, utilisateur, mission, client
       WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND affectation.id_utilisateur = utilisateur.id_utilisateur
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
            
            $sql = "UPDATE `affectation` SET `id_mission`='$id_mission', `id_utilisateur`='$id_utilisateur', `id_client`='$id_client',`duree`='$duree', 
            `tarif_horaire_personnel`='$tarif_horaire_personnel',`tarif_horaire_client`='$tarif_horaire_client',`montant`='$montant',
            `commisions`='$commisions',`frequence`='$frequence',`date_mission`='$date_mission',`heure_mission`='$heure_mission'
                WHERE `id_affectation` = '{$id_affectation}'";
  
            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            echo $json = json_encode("Donne");

        }

    }else if(isset($_GET['facturation_update_etat'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);

            $etat =  $_GET['facturation_update_etat'];

            $id_facturation = mysqli_real_escape_string($con, trim($request->id_facturation));
            
            $sql = "UPDATE `facturation` SET `etat`='$etat' WHERE `id_facturation` = '{$id_facturation}'";
  
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
         `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
       FROM affectation, utilisateur, mission, client
       WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission 
       AND affectation.id_utilisateur = utilisateur.id_utilisateur AND id_affectation = '{$id_affectation}'
       ORDER BY id_affectation ASC";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);

    }else if(isset($_GET['filtrer_affectation'])){

        $id_client = $_GET['filtrer_affectation'];
        //on ne facture que les missions validees statut = 1
        // n'ayant pas encore ete assigne a des utilisateurs
        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, affectation.date_mission, affectation.heure_mission, statut, 
        `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`,
         `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
       FROM affectation, utilisateur, mission, client
       WHERE affectation.id_client = client.id_client AND affectation.id_mission = mission.id_mission AND statut = 1
       AND affectation.id_utilisateur = utilisateur.id_utilisateur AND affectation.id_client = '{$id_client}' AND id_facturation = 0
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
    
}else if(isset($_GET['update_facture'])){

    $numero_facture = "LESEXPERTS2013";
    $montant = $_GET['update_facture'];
    $libelle = $_GET['libelle'];
    $date_facturation = $_GET['date_facturation'];
    $id_client = $_GET['id_client'];
    $libelle = $_GET['libelle'];


    // Create.
    $sql = "INSERT INTO `facturation` (`numero_facture`, `montant`, `libelle`, `date_facturation`,`id_client`)
         VALUES ('$numero_facture','$montant','$libelle','$date_facturation', '$id_client')";
    
    if(mysqli_query($con,$sql)){
        
    }

    echo $json = json_encode("Donne");

}else if(isset($_GET['factures'])){
  
    $sql = "SELECT `id_facturation`, `libelle`, `date_facturation`, `montant`, `numero_facture`, facturation.id_client,
     `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `etat`, `id_facturation`
    FROM facturation, client, source WHERE facturation.id_client = client.id_client ORDER BY nom_client ASC, date_facturation DESC";
        
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
            $facturations[$i]['id_client'] = $facturation['id_client'];
            $facturations[$i]['email_client'] = $facturation['email_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['etat'] = $facturation['etat'];
            
            $i++;

        }

        echo json_encode($facturations);

    }

}else if(isset($_GET['facture_update_etat'])){

    

}
    
?>
