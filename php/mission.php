
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            $mission = mysqli_real_escape_string($con, trim($request->mission));
            $description = mysqli_real_escape_string($con, $request->description);
            $duree = mysqli_real_escape_string($con, trim($request->duree));
            $montant = mysqli_real_escape_string($con, trim($request->montant));
            $commisions = mysqli_real_escape_string($con, $request->commisions);
            $frequence = mysqli_real_escape_string($con, (int)trim($request->frequence));
            $date_mission = mysqli_real_escape_string($con, trim($request->date_mission));
            $heure_mission = mysqli_real_escape_string($con, trim($request->heure_mission));
            $lien = mysqli_real_escape_string($con, trim($request->lien));
            // Create.
            $sql = "INSERT INTO `mission`( `mission`, `description`, `duree`, `montant`, `commisions`, `frequence`, `date_mission`, `heure_mission`, `lien`) 
                VALUES ( '$mission', '$description', '$duree', '$montant', '$commisions', '$frequence', '$date_mission', '$heure_mission', '$lien')";
            
            if(mysqli_query($con,$sql)){
                http_response_code(201);
            }else{
                http_response_code(422);
            }
        }

    }else if(isset($_GET['liste'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM mission ORDER BY mission ASC";
            
        if($result = mysqli_query($con,$sql)){

            $missions = array();

            $i = 0 ;

            while($mission = mysqli_fetch_assoc($result)){
                
                $missions[$i]['id_mission'] = $mission['id_mission'];
                $missions[$i]['mission'] = $mission['mission'];
                $missions[$i]['description'] = $mission['description'];
                $missions[$i]['duree'] = $mission['duree'];
                $missions[$i]['montant'] = $mission['montant'];
                $missions[$i]['commisions'] = $mission['commisions'];
                $missions[$i]['frequence'] = $mission['frequence'];
                $missions[$i]['date_mission'] = $mission['date_mission'];
                $missions[$i]['heure_mission'] = $mission['heure_mission'];
                $missions[$i]['lien'] = $mission['lien'];

                $i++;
            }

            echo json_encode($missions);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['mission_delete_id'])){

        $id_mission = (int)$_GET['mission_delete_id'];

		$sql = "DELETE FROM mission WHERE id_mission='{$id_mission}'";

		if (mysqli_query($con,$sql)) {
			http_response_code(204);
		}else{
			http_response_code(422);
		}

    }else if(isset($_GET['mission_edit'])){

        //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

        $id_mission = $_GET['mission_edit'];

		$sql = "SELECT * FROM mission WHERE id_mission = '{$id_mission}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }else if(isset($_GET['mission_update'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);

            $id_mission = mysqli_real_escape_string($con, trim($request->id_mission));
            $mission = mysqli_real_escape_string($con, trim($request->mission));
            $description = mysqli_real_escape_string($con, $request->description);
            $duree = mysqli_real_escape_string($con, trim($request->duree));
            $montant = mysqli_real_escape_string($con, trim($request->montant));
            $commisions = mysqli_real_escape_string($con, $request->commisions);
            $frequence = mysqli_real_escape_string($con, (int)trim($request->frequence));
            $date_mission = mysqli_real_escape_string($con, trim($request->date_mission));
            $heure_mission = mysqli_real_escape_string($con, trim($request->heure_mission));
            $lien = mysqli_real_escape_string($con, trim($request->lien));

            $sql = "UPDATE `mission` SET `mission`='$mission', `description`='$description',`duree`='$duree', `montant`='$montant',
            `commisions`='$commisions',`frequence`='$frequence',`date_mission`='$date_mission',`heure_mission`='$heure_mission', `lien`='$lien'
                WHERE `id_mission` = '{$id_mission}'";
  
            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            echo $json = json_encode("Donne");

        }

    }

?>