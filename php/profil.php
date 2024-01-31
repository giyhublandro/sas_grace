
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
    
            $id_profil = mysqli_real_escape_string($con, trim($request->id_profil));
            $nom_profil = mysqli_real_escape_string($con, trim($request->nom_profil));
            $profil = mysqli_real_escape_string($con, trim($request->profil));
            $mission = mysqli_real_escape_string($con, $request->mission);
            $agence = mysqli_real_escape_string($con, $request->agence);
            $paiements = mysqli_real_escape_string($con, trim($request->paiements));
            $mes_paiements = mysqli_real_escape_string($con, trim($request->mes_paiements));
            $clients = mysqli_real_escape_string($con, trim($request->clients));
            $mes_missions = mysqli_real_escape_string($con, trim($request->mes_missions));
            $utilisateurs = mysqli_real_escape_string($con, trim($request->utilisateurs));
            $mon_planning = mysqli_real_escape_string($con, trim($request->mon_planning));
            $rapports = mysqli_real_escape_string($con, trim($request->rapports));
            $validations = mysqli_real_escape_string($con, trim($request->validations));
            $administration = mysqli_real_escape_string($con, trim($request->administration));

            $contact = mysqli_real_escape_string($con, trim($request->contact));
            $source = mysqli_real_escape_string($con, trim($request->source));

            // Create.
            $sql = "INSERT INTO `profil` (`nom_profil`, `profil`, `mission`, `agence`, `utilisateurs`, `mes_paiements`, `clients`, `mes_missions`, `mon_planning`, `paiements`, `rapports`, `validations`, `administration`, `source`,`contact`) 
            VALUES ('$nom_profil', '$profil', '$mission', '$agence', '$utilisateurs', '$mes_paiements', '$clients', '$mes_missions', '$mon_planning', '$paiements', '$rapports', '$validations', '$administration','$source', '$contact')";
            
            if(mysqli_query($con,$sql)){
    
                http_response_code(201);
                
            }else{
                http_response_code(422);
            }
        }

    }else if(isset($_GET['liste'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM profil WHERE etat = 1 ORDER BY nom_profil ASC";
            
        if($result = mysqli_query($con,$sql)){

            $profiles = array();

            $i = 0 ;

            while($profile = mysqli_fetch_assoc($result)){
                
                $profiles[$i]['id_profil'] = $profile['id_profil'];
                $profiles[$i]['nom_profil'] = $profile['nom_profil'];
                $profiles[$i]['mission'] = $profile['mission'];
                $profiles[$i]['agence'] = $profile['agence'];
                $profiles[$i]['validations'] = $profile['validations'];
                $profiles[$i]['paiements'] = $profile['paiements'];
                $profiles[$i]['mes_paiements'] = $profile['mes_paiements'];
                $profiles[$i]['clients'] = $profile['clients'];
                $profiles[$i]['profil'] = $profile['profil'];
                $profiles[$i]['utilisateurs'] = $profile['utilisateurs'];
                $profiles[$i]['mes_missions'] = $profile['mes_missions'];
                $profiles[$i]['mon_planning'] = $profile['mon_planning'];
                $profiles[$i]['rapports'] = $profile['rapports'];
                $profiles[$i]['administration'] = $profile['administration'];

                $profiles[$i]['contact'] = $profile['contact'];
                $profiles[$i]['source'] = $profile['source'];

                $i++;
            }

            echo json_encode($profiles);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['profil_delete_id'])){

      $id_profil = $_GET['profil_delete_id'];

      $sql = "DELETE FROM profil WHERE id_profil = '{$id_profil}'";

      if (mysqli_query($con,$sql)) {
        http_response_code(204);
      }else{
        http_response_code(422);
      }

    }else if(isset($_GET['profil_edit'])){

        //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

        $id_profil = $_GET['profil_edit'];

		$sql = "SELECT * FROM profil WHERE id_profil = '{$id_profil}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }else if(isset($_GET['profil_update'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);

            $id_profil = (int)$_GET['profil_update'];
            $nom_profil = mysqli_real_escape_string($con, trim($request->nom_profil));
            $profil = mysqli_real_escape_string($con, (int)trim($request->profil));
            $mission = mysqli_real_escape_string($con, (int)trim($request->mission));
            $agence = mysqli_real_escape_string($con, (int)trim($request->agence));
            $validations = mysqli_real_escape_string($con, (int)trim($request->validations));
            $administration = mysqli_real_escape_string($con, (int)trim($request->administration));
            $paiements = mysqli_real_escape_string($con, (int)trim($request->paiements));
            $mes_paiements = mysqli_real_escape_string($con, (int)trim($request->mes_paiements));
            $clients = mysqli_real_escape_string($con, (int)trim($request->clients));
            $utilisateurs = mysqli_real_escape_string($con, (int)trim($request->utilisateurs));
            $mes_missions = mysqli_real_escape_string($con, (int)trim($request->mes_missions));
            $rapports = mysqli_real_escape_string($con, (int)trim($request->rapports));
            $mon_planning = mysqli_real_escape_string($con, (int)trim($request->mon_planning));

            $contact = mysqli_real_escape_string($con, trim($request->contact));
            $source = mysqli_real_escape_string($con, trim($request->source));
            
            if ($source === "checked" or $source == 1){
              $source_ = 1;
            }else{
              $source_ = 0;
            }

            if ($contact === "checked" or $contact == 1){
              $contact_ = 1;
            }else{
              $contact_ = 0;
            }

            if ($profil === "checked" or $profil == 1){
                $profil_ = 1;
              }else{
                $profil_ = 0;
              }
              
              if ($mission =="checked" or $mission == 1){
                $mission_ = 1;
              }else{
                $mission_ = 0;
              }

              if ($utilisateurs =="checked" or $utilisateurs == 1){
                $utilisateurs_ = 1;
              }else{
                $utilisateurs_ = 0;
              }

              if ($agence =="checked" or $agence == 1){
                $agence_ = 1;
              }else{
                $agence_ = 0;
              }
              
              if ($validations =="checked" or $validations == 1){
                $validations_ = 1;
              }else{
                $validations_ = 0;
              }

              if ($administration =="checked" or $administration == 1){
                $administration_ = 1;
              }else{
                $administration_ = 0;
              }
              
              if ($paiements =="checked" or $paiements == 1){
                $paiements_ = 1;
              }else{
                $paiements_ = 0;
              }
              
              if ($mes_paiements =="checked" or $mes_paiements == 1){
                $mes_paiements_ = 1;
              }else{
                $mes_paiements_ = 0;
              }
        
              if ($clients =="checked" or $clients == 1){
                $clients_ = 1;
              }else{
                $clients_ = 0;
              }
        
              if ($rapports =="checked" or $rapports == 1){
                $rapports_ = 1;
              }else{
                $rapports_ = 0;
              }
        
              if ($mes_missions =="checked" or $mes_missions == 1){
                $mes_missions_ = 1;
              }else{
                $mes_missions_ = 0;
              }
        
              if ($mon_planning =="checked" or $mon_planning == 1){
                $mon_planning_ = 1;
              }else{
                $mon_planning_ = 0;
              }
              
              $sql = "UPDATE `profil` SET `nom_profil`='$nom_profil', `profil`='$profil_',`mon_planning`='$mon_planning_', `mes_missions`='$mes_missions_', `contact`='$contact_', `source`='$source_',
            `clients`='$clients_', `agence`='$agence_',`validations`='$validations_', `administration`='$administration_', `paiements`='$paiements_', `utilisateurs`='$utilisateurs_',
            `mes_paiements`='$mes_paiements_', `rapports`='$rapports_' , `mission`='$mission_' WHERE `id_profil` = '{$id_profil}'";
            
            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            echo $json = json_encode("Donne");

        }


    }else if(isset($_GET['user_profil'])){

       
    }else if(isset($_GET['user_niveau'])){

    }

?>