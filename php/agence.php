
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            // Sanitize.
            $id_agence = mysqli_real_escape_string($con, trim($request->id_agence));
            $nom = mysqli_real_escape_string($con, trim($request->nom));
            $logo = mysqli_real_escape_string($con, trim($request->logo));
            
            // Create.
            $sql = "INSERT INTO `agence`(`nom`,`logo`) VALUES ('$nom','$logo')";
            
            if(mysqli_query($con,$sql)){
    
                http_response_code(201);
                
            }else{
                http_response_code(422);
            }
        }

    }else if(isset($_GET['liste'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM agence ORDER BY nom ASC";
            
        if($result = mysqli_query($con,$sql)){

            $categories = array();

            $i = 0 ;

            while($categorie = mysqli_fetch_assoc($result)){
                
                $categories[$i]['id_agence'] = $categorie['id_agence'];
                $categories[$i]['nom'] = $categorie['nom'];
                $categories[$i]['logo'] = $categorie['logo'];

                $categories[$i]['telephone'] = $categorie['telephone'];
                $categories[$i]['adresse'] = $categorie['adresse'];
                $categories[$i]['description'] = $categorie['description'];
                $categories[$i]['email'] = $categorie['email'];
            
                $i++;
            }

            echo json_encode($categories);

        }else{
            http_response_code(422);
        }
 
    }else if(isset($_GET['agence_delete_id'])){

        $id_agence = (int)$_GET['agence_delete_id'];

		$sql = "DELETE FROM agence WHERE id_agence='{$id_agence}'";

		if (mysqli_query($con,$sql)) {
			http_response_code(204);
		}else{
			http_response_code(422);
		}

    }else if(isset($_GET['agence_edit'])){

        //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

        $id_agence = $_GET['agence_edit'];

		$sql = "SELECT * FROM agence WHERE id_agence = '{$id_agence}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }else if(isset($_GET['agence_update'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);

            $id_agence = mysqli_real_escape_string($con, trim($request->id_agence));
            $nom = mysqli_real_escape_string($con, trim($request->nom));
            $logo = mysqli_real_escape_string($con, trim($request->logo));
            
            $description = mysqli_real_escape_string($con, trim($request->description));
            $adresse = mysqli_real_escape_string($con, trim($request->adresse));
            $telephone = mysqli_real_escape_string($con, trim($request->telephone));
            $email = mysqli_real_escape_string($con, trim($request->email));

            $sql = "UPDATE `agence` SET `nom`='$nom',`logo`='$logo',`description`='$description',`email`='$email' ,`telephone`='$telephone',
            `adresse`='$adresse' WHERE `id_agence` = '{$id_agence}'";
            
            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            echo $json = json_encode("Donne");

        }


    }

?>