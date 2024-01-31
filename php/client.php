
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

    function last_inserted_id(){

        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM client ORDER BY id_client DESC";
            
        if($result = mysqli_query($con,$sql)){

            $clients = array();

            $i = 0 ;

            while($client = mysqli_fetch_assoc($result)){
                
                $clients[$i]['id_client'] = $client['id_client'];

                $i++;
            }

        }

        return $clients[0]['id_client'];

    }

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            // Sanitize.
            $id_client = mysqli_real_escape_string($con, trim($request->id_client));
            $adresse_client = mysqli_real_escape_string($con, trim($request->adresse_client));
            $telephone_1 = mysqli_real_escape_string($con, trim($request->telephone_1));
            $nom_client = mysqli_real_escape_string($con, $request->nom_client);
            $email_client = mysqli_real_escape_string($con, $request->email_client);
            $telephone_2 = mysqli_real_escape_string($con, trim($request->telephone_2));
            $code_acces_1 = mysqli_real_escape_string($con, trim($request->code_acces_1));
            $code_acces_2 = mysqli_real_escape_string($con, trim($request->code_acces_2));
            $type_client = mysqli_real_escape_string($con, trim($request->type_client));
            $id_source = mysqli_real_escape_string($con, trim($request->id_source));
            $ville_client = mysqli_real_escape_string($con, trim($request->ville_client));
            
            $commentaire = mysqli_real_escape_string($con, trim($request->commentaire));
            $nom_referent = mysqli_real_escape_string($con, trim($request->nom_referent));
            $code_postal = mysqli_real_escape_string($con, trim($request->code_postal));

            $frequence_client = mysqli_real_escape_string($con, trim($request->frequence_client));

            $date_creation = date('y-m-d');
            // Create.
            $sql = "INSERT INTO `client` (`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`,
             `type_client`,`id_source`,`ville_client`, `commentaire`, `nom_referent`, `code_postal`, `date_creation`,`frequence_client`) 
            VALUES ('$nom_client', '$adresse_client', '$telephone_1', '$telephone_2', '$email_client', '$code_acces_1', '$code_acces_2', '$type_client',
             '$id_source', '$ville_client','$commentaire','$nom_referent', '$code_postal','$date_creation', '$frequence_client')";

            if(mysqli_query($con,$sql)){
    
            }else{
               
            }

            $request = json_decode($postdata);

            $id_client = 0;

            $sql = "SELECT * FROM client ORDER BY id_client ASC";
            
            if($result = mysqli_query($con,$sql)){

                $clients = array();

                while($client = mysqli_fetch_assoc($result)){
                    $id_client = $client['id_client'];
                }

            }

            $id_option_1 = mysqli_real_escape_string($con, trim($request->option_1));
            $id_option_2 = mysqli_real_escape_string($con, trim($request->option_2));
            $id_option_3 = mysqli_real_escape_string($con, $request->option_3);
            $id_option_4 = mysqli_real_escape_string($con, $request->option_4);
            $montant_option_1 = mysqli_real_escape_string($con, trim($request->montant_option_1));
            $montant_option_2 = mysqli_real_escape_string($con, trim($request->montant_option_2));
            $montant_option_3 = mysqli_real_escape_string($con, trim($request->montant_option_3));
            $montant_option_4 = mysqli_real_escape_string($con, trim($request->montant_option_4));
            $nombre_option = mysqli_real_escape_string($con, (int)trim($request->nombreOption));
            
            if ( $nombre_option == 0){
                $id_option_1 = 0;
                $id_option_2 = 0;
                $id_option_3 = 0;
                $id_option_4 = 0;
                $montant_option_1 = 0;
                $montant_option_2 = 0;
                $montant_option_3 = 0;
                $montant_option_4 = 0;
            }

            if ( $nombre_option <= 1){
                $id_option_2 = 0;
                $montant_option_2 = 0;
            }

            if ($nombre_option <= 2){
                $id_option_3 = 0;
                $montant_option_3 = 0;
            }

            if ( $nombre_option <= 3){
                $id_option_4 = 0;
                $montant_option_4 = 0;
            }

            if ($nombre_option >= 1){

                $sql = "INSERT INTO `option_client`(`id_client`, `id_option_1`, `id_option_2`, `id_option_3`, `id_option_4`, `montant_option_1`, 
                `montant_option_2`, `montant_option_3`, `montant_option_4`, `nombre_option`) 
                VALUES ('$id_client', '$id_option_1', '$id_option_2', '$id_option_3', '$id_option_4', '$montant_option_1', '$montant_option_2', 
                '$montant_option_3', '$montant_option_4','$nombre_option')";

                if(mysqli_query($con,$sql)){
        
                    http_response_code(201);
                    
                }else{
                    http_response_code(422);
                }

            }
           
        }

    }else if(isset($_GET['liste'])){

        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`,`ville_client`,
         `code_acces_1`, `code_acces_2`, `type_client`, client.id_source, source, `nom_referent`, `commentaire`,`code_postal`,`frequence_client`
        FROM client, source 
        WHERE client.id_source = source.id_source
        ORDER BY nom_client ASC";
            
        if($result = mysqli_query($con,$sql)){

            $clients = array();

            $i = 0 ;

            while($client = mysqli_fetch_assoc($result)){
                
                $clients[$i]['id_client'] = $client['id_client'];
                $clients[$i]['adresse_client'] = $client['adresse_client'];
                $clients[$i]['telephone_1'] = $client['telephone_1'];
                $clients[$i]['telephone_2'] = $client['telephone_2'];
                $clients[$i]['code_acces_1'] = $client['code_acces_1'];
                $clients[$i]['code_acces_2'] = $client['code_acces_2'];
                $clients[$i]['type_client'] = $client['type_client'];
                $clients[$i]['email_client'] = $client['email_client'];
                $clients[$i]['nom_client'] = $client['nom_client'];
                $clients[$i]['id_source'] = $client['id_source'];
                $clients[$i]['source'] = $client['source'];

                $clients[$i]['nom_referent'] = $client['nom_referent'];
                $clients[$i]['commentaire'] = $client['commentaire'];
                $clients[$i]['code_postal'] = $client['code_postal'];

                $clients[$i]['ville_client'] = $client['ville_client'];

                $clients[$i]['frequence_client'] = $client['frequence_client'];
                
                $i++;

            }

            echo json_encode($clients);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['client_delete_id'])){

        $id_client = (int)$_GET['client_delete_id'];

		$sql = "DELETE FROM client WHERE id_client='{$id_client}'";

		if (mysqli_query($con,$sql)) {
			http_response_code(204);
		}else{
			http_response_code(422);
		}

    }else if(isset($_GET['client_edit'])){

        $id_client = $_GET['client_edit'];

		$sql = "SELECT * FROM client WHERE id_client = '{$id_client}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }else if(isset($_GET['client_update'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);

            $id_client = mysqli_real_escape_string($con, trim($request->id_client));

            $adresse_client = mysqli_real_escape_string($con, trim($request->adresse_client));
            $telephone_1 = mysqli_real_escape_string($con, trim($request->telephone_1));
            $nom_client = mysqli_real_escape_string($con, $request->nom_client);
            $email_client = mysqli_real_escape_string($con, $request->email_client);
            $telephone_2 = mysqli_real_escape_string($con, trim($request->telephone_2));
            $code_acces_1 = mysqli_real_escape_string($con, trim($request->code_acces_1));
            $code_acces_2 = mysqli_real_escape_string($con, trim($request->code_acces_2));
            $type_client = mysqli_real_escape_string($con, trim($request->type_client));
            $id_source = mysqli_real_escape_string($con, trim($request->id_source));

            $ville_client = mysqli_real_escape_string($con, trim($request->ville_client));

            $commentaire = mysqli_real_escape_string($con, trim($request->commentaire));
            $nom_referent = mysqli_real_escape_string($con, trim($request->nom_referent));
            $code_postal = mysqli_real_escape_string($con, trim($request->code_postal));

            $frequence_client = mysqli_real_escape_string($con, trim($request->frequence_client));

            $sql = "UPDATE `client` SET `adresse_client`='$adresse_client',`telephone_1`='$telephone_1',`nom_client`='$nom_client',
            `ville_client`='$ville_client',`id_source`='$id_source', `email_client`='$email_client',`telephone_2`='$telephone_2',`code_acces_1`='$code_acces_1',
            `code_acces_2`='$code_acces_2',`type_client`='$type_client',`commentaire`='$commentaire',`nom_referent`='$nom_referent',
            `code_postal`='$code_postal',  `frequence_client`='$frequence_client'
            WHERE `id_client` = '{$id_client}'";
            
            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            
            $id_option_1 = mysqli_real_escape_string($con, trim($request->option_1));
            $id_option_2 = mysqli_real_escape_string($con, trim($request->option_2));
            $id_option_3 = mysqli_real_escape_string($con, $request->option_3);
            $id_option_4 = mysqli_real_escape_string($con, $request->option_4);
            $montant_option_1 = mysqli_real_escape_string($con, trim($request->montant_option_1));
            $montant_option_2 = mysqli_real_escape_string($con, trim($request->montant_option_2));
            $montant_option_3 = mysqli_real_escape_string($con, trim($request->montant_option_3));
            $montant_option_4 = mysqli_real_escape_string($con, trim($request->montant_option_4));
            $nombre_option = mysqli_real_escape_string($con, trim($request->nombreOption));
            
            if($nombre_option == ''){
                $nombre_option = 0;
            }


            if ($nombre_option == 0){
                $id_option_1 = 0;
                $id_option_2 = 0;
                $id_option_3 = 0;
                $id_option_4 = 0;
                $montant_option_1 = 0;
                $montant_option_2 = 0;
                $montant_option_3 = 0;
                $montant_option_4 = 0;
            }

            if ( $nombre_option <= 1){
                $id_option_2 = 0;
                $montant_option_2 = 0;
            }

            if ($nombre_option <= 2){
                $id_option_3 = 0;
                $montant_option_3 = 0;
            }

            if ( $nombre_option <= 3){
                $id_option_4 = 0;
                $montant_option_4 = 0;
            }

            if ($nombre_option >= 0){

                $sql = "SELECT * FROM `option_client` WHERE id_client = '{$id_client}'";
                $result = mysqli_query($con,$sql);
                
                $i = 0;

                while($row = mysqli_fetch_assoc($result)){
                    $i += 1;
                }

                if($i >= 1){

                    $sql = "UPDATE `option_client` SET `id_option_1`='$id_option_1',`id_option_2`='$id_option_2',`id_option_3`='$id_option_3',
                    `id_option_4`='$id_option_4', `montant_option_1`='$montant_option_1',`montant_option_2`='$montant_option_2',
                    `montant_option_3`='$montant_option_3', `montant_option_4`='$montant_option_4', `nombre_option`='$nombre_option' 
                    WHERE `id_client` = '{$id_client}'";

                }else if ($i == 0) {

                    $sql = "INSERT INTO `option_client`(`id_client`, `id_option_1`, `id_option_2`, `id_option_3`, `id_option_4`, `montant_option_1`, 
                    `montant_option_2`, `montant_option_3`, `montant_option_4`, `nombre_option`) 
                    VALUES ('$id_client', '$id_option_1', '$id_option_2', '$id_option_3', '$id_option_4', '$montant_option_1', '$montant_option_2', 
                    '$montant_option_3', '$montant_option_4','$nombre_option')";

                }

                if(mysqli_query($con,$sql)){
        
                    http_response_code(201);
                    
                }else{
                    http_response_code(422);
                }

            }

            echo $json = json_encode("Donne");

        }

    }else if(isset($_GET['compte'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            $adresse_client = mysqli_real_escape_string($con, trim($request->adresse_client));
            $telephone_1 = mysqli_real_escape_string($con, trim($request->telephone_1));
            $nom_client = mysqli_real_escape_string($con, $request->nom_client);
            $email_client = mysqli_real_escape_string($con, $request->email_client);
            $telephone_2 = "";
            $code_acces_1 = "";
            $code_acces_2 = "";
            $type_client = mysqli_real_escape_string($con, trim($request->type_client));

            $sql = "SELECT * FROM source WHERE default_source = 1";
            
            if($result = mysqli_query($con,$sql)){

                $sources = array();

                while($source = mysqli_fetch_assoc($result)){
                    $id_source = $source['id_source'];
                }

            }

            $ville_client = mysqli_real_escape_string($con, trim($request->ville_client));
            
            $commentaire = mysqli_real_escape_string($con, trim($request->commentaire));
            $nom_referent = "";
            $code_postal = mysqli_real_escape_string($con, trim($request->code_postal));

            $frequence_client = mysqli_real_escape_string($con, trim($request->frequence_client));
            $mot_de_passe = mysqli_real_escape_string($con, trim($request->mot_de_passe));
            $date_creation = date('y-m-d');
            // Create.
            $sql = "INSERT INTO `client` (`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`,
             `type_client`,`id_source`,`ville_client`, `commentaire`, `nom_referent`, `code_postal`, `date_creation`,`frequence_client`,`mot_de_passe`) 
            VALUES ('$nom_client', '$adresse_client', '$telephone_1', '$telephone_2', '$email_client', '$code_acces_1', '$code_acces_2', '$type_client',
             '$id_source', '$ville_client','$commentaire','$nom_referent', '$code_postal','$date_creation', '$frequence_client','$mot_de_passe')";

            if(mysqli_query($con,$sql)){
    
            }else{
               
            }

            $request = json_decode($postdata);

            $id_client = 0;

            $sql = "SELECT * FROM client ORDER BY id_client ASC";
            
            if($result = mysqli_query($con,$sql)){

                $clients = array();

                while($client = mysqli_fetch_assoc($result)){
                    $id_client = $client['id_client'];
                }

            }
           
        }

        echo $json = json_encode("Donne");

    }else if(isset($_GET['filtre'])){

        //DERNIER PROFIL ENREGISTRE

        $filtre = $_GET['filtre'];

        $sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`,`ville_client`,
         `code_acces_1`, `code_acces_2`, `type_client`, client.id_source, source, `nom_referent`, `commentaire`,`code_postal`,`frequence_client`
        FROM client, source 
        WHERE client.id_source = source.id_source AND nom_client LIKE '%$filtre%'
        OR client.id_source = source.id_source AND type_client LIKE '%$filtre%'
        OR client.id_source = source.id_source AND source LIKE '%$filtre%'
        ORDER BY nom_client ASC";
            
        if($result = mysqli_query($con,$sql)){

            $clients = array();

            $i = 0 ;

            while($client = mysqli_fetch_assoc($result)){
                
                $clients[$i]['id_client'] = $client['id_client'];
                $clients[$i]['adresse_client'] = $client['adresse_client'];
                $clients[$i]['telephone_1'] = $client['telephone_1'];
                $clients[$i]['telephone_2'] = $client['telephone_2'];
                $clients[$i]['code_acces_1'] = $client['code_acces_1'];
                $clients[$i]['code_acces_2'] = $client['code_acces_2'];
                $clients[$i]['type_client'] = $client['type_client'];
                $clients[$i]['email_client'] = $client['email_client'];
                $clients[$i]['nom_client'] = $client['nom_client'];
                $clients[$i]['id_source'] = $client['id_source'];
                $clients[$i]['source'] = $client['source'];

                $clients[$i]['nom_referent'] = $client['nom_referent'];
                $clients[$i]['commentaire'] = $client['commentaire'];
                $clients[$i]['code_postal'] = $client['code_postal'];

                $clients[$i]['ville_client'] = $client['ville_client'];

                $clients[$i]['frequence_client'] = $client['frequence_client'];
                
                $i++;

            }

            echo json_encode($clients);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['filtre_plus_date'])){

        //DERNIER PROFIL ENREGISTRE

        $filtre = $_GET['filtre_plus_date'];
        $du = $_GET['du']; 
        $au = $_GET['au'];

        $sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`,`ville_client`,
         `code_acces_1`, `code_acces_2`, `type_client`, client.id_source, source, `nom_referent`, `commentaire`,`code_postal`,`frequence_client`
        FROM client, source 
        WHERE client.id_source = source.id_source AND nom_client LIKE '%$filtre%' AND client.date_creation BETWEEN '$du' AND '$au'
        OR client.id_source = source.id_source AND type_client LIKE '%$filtre%' AND client.date_creation BETWEEN '$du' AND '$au'
        OR client.id_source = source.id_source AND source LIKE '%$filtre%' AND client.date_creation BETWEEN '$du' AND '$au'
        ORDER BY nom_client ASC";
            
        if($result = mysqli_query($con,$sql)){

            $clients = array();

            $i = 0 ;

            while($client = mysqli_fetch_assoc($result)){
                
                $clients[$i]['id_client'] = $client['id_client'];
                $clients[$i]['adresse_client'] = $client['adresse_client'];
                $clients[$i]['telephone_1'] = $client['telephone_1'];
                $clients[$i]['telephone_2'] = $client['telephone_2'];
                $clients[$i]['code_acces_1'] = $client['code_acces_1'];
                $clients[$i]['code_acces_2'] = $client['code_acces_2'];
                $clients[$i]['type_client'] = $client['type_client'];
                $clients[$i]['email_client'] = $client['email_client'];
                $clients[$i]['nom_client'] = $client['nom_client'];
                $clients[$i]['id_source'] = $client['id_source'];
                $clients[$i]['source'] = $client['source'];

                $clients[$i]['nom_referent'] = $client['nom_referent'];
                $clients[$i]['commentaire'] = $client['commentaire'];
                $clients[$i]['code_postal'] = $client['code_postal'];

                $clients[$i]['ville_client'] = $client['ville_client'];

                $clients[$i]['frequence_client'] = $client['frequence_client'];
                
                $i++;

            }

            echo json_encode($clients);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['date_du'])){

        //DERNIER PROFIL ENREGISTRE

        $du = $_GET['date_du']; 
        $au = $_GET['au']; 

        $sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`,`ville_client`,
         `code_acces_1`, `code_acces_2`, `type_client`, client.id_source, source, `nom_referent`, `commentaire`,`code_postal`,`frequence_client`
        FROM client, source 
        WHERE client.id_source = source.id_source AND client.date_creation BETWEEN '$du' AND '$au'
        OR client.id_source = source.id_source AND client.date_creation BETWEEN '$du' AND '$au'
        OR client.id_source = source.id_source AND client.date_creation BETWEEN '$du' AND '$au'
        ORDER BY nom_client ASC";
            
        if($result = mysqli_query($con,$sql)){

            $clients = array();

            $i = 0 ;

            while($client = mysqli_fetch_assoc($result)){
                
                $clients[$i]['id_client'] = $client['id_client'];
                $clients[$i]['adresse_client'] = $client['adresse_client'];
                $clients[$i]['telephone_1'] = $client['telephone_1'];
                $clients[$i]['telephone_2'] = $client['telephone_2'];
                $clients[$i]['code_acces_1'] = $client['code_acces_1'];
                $clients[$i]['code_acces_2'] = $client['code_acces_2'];
                $clients[$i]['type_client'] = $client['type_client'];
                $clients[$i]['email_client'] = $client['email_client'];
                $clients[$i]['nom_client'] = $client['nom_client'];
                $clients[$i]['id_source'] = $client['id_source'];
                $clients[$i]['source'] = $client['source'];

                $clients[$i]['nom_referent'] = $client['nom_referent'];
                $clients[$i]['commentaire'] = $client['commentaire'];
                $clients[$i]['code_postal'] = $client['code_postal'];

                $clients[$i]['ville_client'] = $client['ville_client'];

                $clients[$i]['frequence_client'] = $client['frequence_client'];
                
                $i++;

            }

            echo json_encode($clients);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['filtre_facture'])){

        $filtre = $_GET['filtre_facture'];
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`,`ville_client`,
         `code_acces_1`, `code_acces_2`, `type_client`, client.id_source, source, `nom_referent`, `commentaire`,`code_postal`,`frequence_client`
        FROM client, source 
        WHERE client.id_source = source.id_source AND nom_client LIKE '%$filtre%'
        ORDER BY nom_client ASC";
            
        if($result = mysqli_query($con,$sql)){

            $clients = array();

            $i = 0 ;

            while($client = mysqli_fetch_assoc($result)){
                
                $clients[$i]['id_client'] = $client['id_client'];
                $clients[$i]['adresse_client'] = $client['adresse_client'];
                $clients[$i]['telephone_1'] = $client['telephone_1'];
                $clients[$i]['telephone_2'] = $client['telephone_2'];
                $clients[$i]['code_acces_1'] = $client['code_acces_1'];
                $clients[$i]['code_acces_2'] = $client['code_acces_2'];
                $clients[$i]['type_client'] = $client['type_client'];
                $clients[$i]['email_client'] = $client['email_client'];
                $clients[$i]['nom_client'] = $client['nom_client'];
                $clients[$i]['id_source'] = $client['id_source'];
                $clients[$i]['source'] = $client['source'];

                $clients[$i]['nom_referent'] = $client['nom_referent'];
                $clients[$i]['commentaire'] = $client['commentaire'];
                $clients[$i]['code_postal'] = $client['code_postal'];

                $clients[$i]['ville_client'] = $client['ville_client'];

                $clients[$i]['frequence_client'] = $client['frequence_client'];
                
                $i++;

            }

            echo json_encode($clients);

        }else{
            http_response_code(422);
        }

    }

?>