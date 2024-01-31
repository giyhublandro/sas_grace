
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            // Sanitize.
            $id_depense = mysqli_real_escape_string($con, (int)trim($request->id_depense));
            $id_charge = mysqli_real_escape_string($con, trim($request->id_charge));
            $nom_charge = "";
            $id_membre = mysqli_real_escape_string($con, trim($request->id_membre));
            $nom_membre = "";
            $montant = mysqli_real_escape_string($con, trim($request->montant));
            $date_depense = mysqli_real_escape_string($con, trim($request->date_depense));
            $commentaire = mysqli_real_escape_string($con, trim($request->commentaire));

            $sql_ = "SELECT * FROM charge WHERE id_charge = '{$id_charge}'";

            if($result = mysqli_query($con,$sql_)){
                while($charge = mysqli_fetch_assoc($result)){
                    $nom_charge = $charge['nom_charge'];
                }
            }

            $sql_ = "SELECT * FROM membre WHERE id_membre = '{$id_membre}'";

            if($result = mysqli_query($con,$sql_)){
                while($membre = mysqli_fetch_assoc($result)){
                    $nom_membre = $membre['nom_membre'];
                }
            }

            // Create.
            $sql = "INSERT INTO `depense` (`id_charge`, `nom_charge`, `id_membre`, `nom_membre`, `montant`, `date_depense`, `commentaire`) 
            VALUES ('$id_charge', '$nom_charge','$id_membre','$nom_membre', '$montant','$date_depense','$commentaire')";
            
            if(mysqli_query($con,$sql)){
                http_response_code(201);
            }else{
                http_response_code(422);
            }

        }

    }else if(isset($_GET['liste'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM `depense` ORDER BY date_depense DESC";
            
        if($result = mysqli_query($con, $sql)){

            $depenses = array();

            $i = 0 ;

            while($depense = mysqli_fetch_assoc($result)){
                
                $depenses[$i]['id_depense'] = $depense['id_depense'];
                $depenses[$i]['id_charge'] = $depense['id_charge'];
                $depenses[$i]['nom_charge'] = $depense['nom_charge'];
                $depenses[$i]['commentaire'] = $depense['commentaire'];
                $depenses[$i]['id_membre'] = $depense['id_membre'];
                $depenses[$i]['nom_membre'] = $depense['nom_membre'];
                $depenses[$i]['montant'] = $depense['montant'];
                $depenses[$i]['date_depense'] = $depense['date_depense'];

                $i++;

            }

            echo json_encode($depenses);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['depense_delete_id'])){

        $id_depense = (int)$_GET['depense_delete_id'];

		$sql = "DELETE FROM `depense` WHERE id_depense='{$id_depense}'";

		if (mysqli_query($con,$sql)) {
			http_response_code(204);
		}else{
			http_response_code(422);
		}

    }else if(isset($_GET['depense_edit'])){

        //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

        $id_depense = $_GET['depense_edit'];

		$sql = "SELECT * FROM `depense` WHERE id_depense = '{$id_depense}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }else if(isset($_GET['depense_update'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);
            
            // Sanitize.
            $id_depense = mysqli_real_escape_string($con, (int)trim($request->id_depense));
            $id_charge = mysqli_real_escape_string($con, trim($request->id_charge));
            $nom_charge = "";
            $id_membre = mysqli_real_escape_string($con, trim($request->id_membre));
            $nom_membre = "";
            $montant = mysqli_real_escape_string($con, trim($request->montant));
            $date_depense = mysqli_real_escape_string($con, trim($request->date_depense));
            $commentaire = mysqli_real_escape_string($con, trim($request->commentaire));

            $sql_ = "SELECT * FROM charge WHERE id_charge = '{$id_charge}'";

            if($result = mysqli_query($con,$sql_)){
                while($charge = mysqli_fetch_assoc($result)){
                    $nom_charge = $charge['nom_charge'];
                }
            }
            
            $sql_ = "SELECT * FROM membre WHERE id_membre = '{$id_membre}'";

            if($result = mysqli_query($con,$sql_)){
                while($membre = mysqli_fetch_assoc($result)){
                    $nom_membre = $membre['nom_membre'];
                }
            }

            $sql = "UPDATE `depense` SET `id_charge`='$id_charge',`nom_charge`='$nom_charge',`id_membre`='$id_membre',`nom_membre`='$nom_membre',`montant`='$montant',`date_depense`='$date_depense',`commentaire`='$commentaire' WHERE `id_depense` = '{$id_depense}'";

            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            echo $json = json_encode("Donne");

        }


    }else if(isset($_GET['categ'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT DISTINCT nom_charge FROM `depense` ORDER BY nom_charge ASC";
            
        if($result = mysqli_query($con, $sql)){

            $depensesCateg = array();
            
            $i = 0 ;

            while($depenseCateg = mysqli_fetch_assoc($result)){
                
                $nom_charge = $depenseCateg['nom_charge'];
                $sql_ = "SELECT SUM(montant) AS montant FROM depense WHERE nom_charge = '{$nom_charge}'";
                
                if($result_ = mysqli_query($con,$sql_)){
                    
                    while($depense = mysqli_fetch_assoc($result_)){
                        $depensesCateg[$i]['nom_charge'] = $depenseCateg['nom_charge'];
                        $depensesCateg[$i]['montant'] = $depense['montant'];
                    }
                    
                }
                
                $i++;

            }

            echo json_encode($depensesCateg);

        }else{
            http_response_code(422);
        }
    }

?>