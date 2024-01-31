
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            // Sanitize.
            $id_charge = mysqli_real_escape_string($con, trim($request->id_charge));
            $lie_membre = mysqli_real_escape_string($con, trim($request->lie_membre));
            $nom_charge = mysqli_real_escape_string($con, trim($request->nom_charge));
           
            // Create.
            $sql = "INSERT INTO `charge`(`nom_charge`, `lie_membre`) VALUES ('$nom_charge', '$lie_membre')";
            
            if(mysqli_query($con,$sql)){
    
                http_response_code(201);
                
            }else{
                http_response_code(422);
            }
        }

    }else if(isset($_GET['liste'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM charge ORDER BY nom_charge ASC";
            
        if($result = mysqli_query($con,$sql)){

            $charges = array();

            $i = 0 ;

            while($charge = mysqli_fetch_assoc($result)){
                
                $charges[$i]['id_charge'] = $charge['id_charge'];
                $charges[$i]['nom_charge'] = $charge['nom_charge'];
                $charges[$i]['lie_membre'] = $charge['lie_membre'];

                $i++;
            }

            echo json_encode($charges);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['charge_delete_id'])){

        $id_charge = (int)$_GET['charge_delete_id'];

		$sql = "DELETE FROM charge WHERE id_charge='{$id_charge}'";

		if (mysqli_query($con,$sql)) {
			http_response_code(204);
		}else{
			http_response_code(422);
		}

    }else if(isset($_GET['charge_edit'])){

        //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

        $id_charge = $_GET['charge_edit'];

		$sql = "SELECT * FROM charge WHERE id_charge = '{$id_charge}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }else if(isset($_GET['charge_update'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);

            $id_charge = mysqli_real_escape_string($con, (int)trim($request->id_charge));
            $nom_charge = mysqli_real_escape_string($con, trim($request->nom_charge));
            $lie_membre = mysqli_real_escape_string($con, (int)trim($request->lie_membre));

            $sql = "UPDATE `charge` SET `nom_charge`='$nom_charge', `lie_membre`='$lie_membre' WHERE `id_charge` = '{$id_charge}'";
            
            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            echo $json = json_encode("Donne");

        }


    }

?>