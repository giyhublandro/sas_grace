
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            // Sanitize.
            $id_entree = mysqli_real_escape_string($con, (int)trim($request->id_entree));
            $id_type = mysqli_real_escape_string($con, trim($request->id_type));
            $nom_type = "";
            $id_membre = mysqli_real_escape_string($con, trim($request->id_membre));
            $nom_membre = "";
            $montant = mysqli_real_escape_string($con, trim($request->montant));
            $date_entree = mysqli_real_escape_string($con, trim($request->date_entree));
            $commentaire = mysqli_real_escape_string($con, trim($request->commentaire));

            $sql_ = "SELECT * FROM `type` WHERE id_type = '{$id_type}'";

            if($result = mysqli_query($con,$sql_)){
                while($type = mysqli_fetch_assoc($result)){
                    $nom_type = $type['nom_type'];
                }
            }

            $sql_ = "SELECT * FROM membre WHERE id_membre = '{$id_membre}'";

            if($result = mysqli_query($con,$sql_)){
                while($membre = mysqli_fetch_assoc($result)){
                    $nom_membre = $membre['nom_membre'];
                }
            }

            // Create.
            $sql = "INSERT INTO `entree` (`id_type`, `nom_type`, `id_membre`, `nom_membre`, `montant`, `date_entree`, `commentaire`) 
            VALUES ('$id_type', '$nom_type','$id_membre','$nom_membre', '$montant','$date_entree','$commentaire')";
            
            if(mysqli_query($con,$sql)){
                http_response_code(201);
            }else{
                http_response_code(422);
            }

        }

    }else if(isset($_GET['liste'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM `entree` ORDER BY date_entree DESC";
            
        if($result = mysqli_query($con, $sql)){

            $entrees = array();

            $i = 0 ;

            while($entree = mysqli_fetch_assoc($result)){
                
                $entrees[$i]['id_entree'] = $entree['id_entree'];
                $entrees[$i]['id_type'] = $entree['id_type'];
                $entrees[$i]['nom_type'] = $entree['nom_type'];
                $entrees[$i]['commentaire'] = $entree['commentaire'];
                $entrees[$i]['id_membre'] = $entree['id_membre'];
                $entrees[$i]['nom_membre'] = $entree['nom_membre'];
                $entrees[$i]['montant'] = $entree['montant'];
                $entrees[$i]['date_entree'] = $entree['date_entree'];

                $i++;

            }

            echo json_encode($entrees);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['entree_delete_id'])){

        $id_entree = (int)$_GET['entree_delete_id'];

		$sql = "DELETE FROM `entree` WHERE id_entree='{$id_entree}'";

		if (mysqli_query($con,$sql)) {
			http_response_code(204);
		}else{
			http_response_code(422);
		}

    }else if(isset($_GET['entree_edit'])){

        //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

        $id_entree = $_GET['entree_edit'];

		$sql = "SELECT * FROM `entree` WHERE id_entree = '{$id_entree}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }else if(isset($_GET['entree_update'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);
            
            // Sanitize.
            $id_entree = mysqli_real_escape_string($con, (int)trim($request->id_entree));
            $id_type = mysqli_real_escape_string($con, trim($request->id_type));
            $nom_type = "";
            $id_membre = mysqli_real_escape_string($con, trim($request->id_membre));
            $nom_membre = "";
            $montant = mysqli_real_escape_string($con, trim($request->montant));
            $date_entree = mysqli_real_escape_string($con, trim($request->date_entree));
            $commentaire = mysqli_real_escape_string($con, trim($request->commentaire));

            $sql_ = "SELECT * FROM `type` WHERE id_type = '{$id_type}'";

            if($result = mysqli_query($con,$sql_)){
                while($type = mysqli_fetch_assoc($result)){
                    $nom_type = $type['nom_type'];
                }
            }
            
            $sql_ = "SELECT * FROM membre WHERE id_membre = '{$id_membre}'";

            if($result = mysqli_query($con,$sql_)){
                while($membre = mysqli_fetch_assoc($result)){
                    $nom_membre = $membre['nom_membre'];
                }
            }

            $sql = "UPDATE `entree` SET `id_type`='$id_type' ,`nom_type`='$nom_type',`id_membre`='$id_membre',`nom_membre`='$nom_membre',`montant`='$montant',`date_entree`='$date_entree',`commentaire`='$commentaire'
             WHERE `id_entree` = '{$id_entree}'";

            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            echo $json = json_encode("Donne");

        }


    }else if(isset($_GET['categ'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT DISTINCT nom_type FROM `entree` ORDER BY nom_type ASC";
            
        if($result = mysqli_query($con, $sql)){

            $entreesCateg = array();
            
            $i = 0 ;

            while($entreeCateg = mysqli_fetch_assoc($result)){
                
                $nom_type = $entreeCateg['nom_type'];
                $sql_ = "SELECT SUM(montant) AS montant FROM entree WHERE nom_type = '{$nom_type}'";
                
                if($result_ = mysqli_query($con,$sql_)){
                    
                    while($entree = mysqli_fetch_assoc($result_)){
                        $entreesCateg[$i]['nom_type'] = $entreeCateg['nom_type'];
                        $entreesCateg[$i]['montant'] = $entree['montant'];
                        
                    }
                }
                
                $i++;

            }

            echo json_encode($entreesCateg);

        }else{
            http_response_code(422);
        }
    }

?>