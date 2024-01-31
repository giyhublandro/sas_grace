
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            // Sanitize.
            $id_categorie = mysqli_real_escape_string($con, (int)trim($request->id_categorie));
            $lie_membre = mysqli_real_escape_string($con, (int)trim($request->lie_membre));
            $nom_type = mysqli_real_escape_string($con, trim($request->nom_type));
            $nom_categorie ="";

            $sql_ = "SELECT * FROM categorie WHERE id_categorie = '{$id_categorie}'";

            if($result = mysqli_query($con,$sql_)){
                while($categorie = mysqli_fetch_assoc($result)){
                    $nom_categorie = $categorie['nom_categorie'];
                }
            }

            // Create.
            $sql = "INSERT INTO `type` (`id_categorie`, `nom_type`, `nom_categorie`, `lie_membre`) VALUES ('$id_categorie', '$nom_type','$nom_categorie','$lie_membre')";
            
            if(mysqli_query($con,$sql)){
                http_response_code(201);
            }else{
                http_response_code(422);
            }

        }

    }else if(isset($_GET['regions'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM `regions` WHERE etat_region = 1 ORDER BY nom_region ASC";
            
        if($result = mysqli_query($con, $sql)){

            $regions = array();

            $i = 0 ;

            while($region= mysqli_fetch_assoc($result)){
                
                $regions[$i]['id_region'] = $region['id_region'];
				$regions[$i]['code_region'] = $region['code_region'];
				$regions[$i]['nom_region'] = $region['nom_region'];
                $regions[$i]['etat_region'] = $region['etat_region'];

                $i++;

            }

            echo json_encode($regions);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['code_region'])){

        //SELECTION DES DEPARTEMENTS D'UNE REGION

        $code_region = $_GET['code_region'];

		$sql = "SELECT * FROM `departements` WHERE code_region = '{$code_region}'";

		if($result = mysqli_query($con, $sql)){

            $departements = array();

            $i = 0 ;

            while($departement= mysqli_fetch_assoc($result)){
                
				$departements[$i]['code_departement'] = $departement['code_departement'];
				$departements[$i]['nom_departement'] = $departement['nom_departement'];

                $i++;

            }

            echo json_encode($departements);

        }else{
            http_response_code(422);
        }
        
    }else if(isset($_GET['code_departement'])){

        //SELECTION DES DEPARTEMENTS D'UNE REGION

        $code_departement = $_GET['code_departement'];

		$sql = "SELECT * FROM `communes_departements_regions` WHERE code_departement = '{$code_departement}'";

		if($result = mysqli_query($con, $sql)){

            $communes = array();

            $i = 0 ;

            while($commune= mysqli_fetch_assoc($result)){
                
				$communes[$i]['code_postal'] = $commune['code_postal'];
				$communes[$i]['code_commune'] = $commune['code_commune'];
                $communes[$i]['nom_commune_complet'] = $commune['nom_commune_complet'];
                $communes[$i]['nom_commune'] = $commune['nom_commune'];

                $i++;

            }

            echo json_encode($communes, JSON_UNESCAPED_UNICODE);

        }else{
            http_response_code(422);
        }
        
    }else if(isset($_GET['code_commune'])){

        //SELECTION DES DEPARTEMENTS D'UNE REGION

        $code_commune = $_GET['code_commune'];

		$sql = "SELECT * FROM `communes_departements_regions` WHERE code_commune = '{$code_commune}'";

		if($result = mysqli_query($con, $sql)){

            $communes = array();

            $i = 0 ;

            while($commune= mysqli_fetch_assoc($result)){
                
				$communes[$i]['code_postal'] = $commune['code_postal'];
				$communes[$i]['code_commune'] = $commune['code_commune'];
                $communes[$i]['nom_commune_complet'] = $commune['nom_commune_complet'];
                $communes[$i]['nom_commune'] = $commune['nom_commune'];
                $communes[$i]['libelle_acheminement'] = $commune['libelle_acheminement'];

                $i++;

            }

            echo json_encode($communes);

        }else{
            http_response_code(422);
        }
        
    }else if(isset($_GET['ville_list'])){
        
        //SELECTION DES DEPARTEMENTS D'UNE REGION

		$sql = "SELECT * FROM `villes_france` WHERE `etat` = 1 ORDER BY ville_nom ASC";

		if($result = mysqli_query($con, $sql)){

            $villes = array();

            $i = 0 ;

            while($ville= mysqli_fetch_assoc($result)){
                
				$villes[$i]['ville_id'] = $ville['ville_id'];
                $villes[$i]['ville_nom'] = $ville['ville_nom'];
                $villes[$i]['ville_nom_simple'] = $ville['ville_nom_simple'];
                //$villes[$i]['ville_nom_reel'] = $ville['ville_nom_reel'];
                $villes[$i]['ville_code_postal'] = $ville['ville_code_postal'];

                $i++;

            }

            echo json_encode($villes);

        }else{
            http_response_code(422);
        }
        
    }else if(isset($_GET['ville_nom'])){

        //SELECTION DES DEPARTEMENTS D'UNE REGION

        $ville_nom = $_GET['ville_nom'];

		$sql = "SELECT * FROM `villes_france` WHERE ville_nom = '{$ville_nom}' ORDER BY ville_nom_simple ASC";

		if($result = mysqli_query($con, $sql)){

            $villes = array();

            $i = 0 ;

            while($ville= mysqli_fetch_assoc($result)){
                
				$villes[$i]['ville_id'] = $ville['ville_id'];
                $villes[$i]['ville_nom'] = $ville['ville_nom'];
                $villes[$i]['ville_nom_simple'] = $ville['ville_nom_simple'];
               //$villes[$i]['ville_nom_reel'] = $ville['ville_nom_reel'];
               $villes[$i]['ville_code_postal'] = $ville['ville_code_postal'];

                $i++;

            }

            echo json_encode($villes);

        }else{
            http_response_code(422);
        }
        
    }

?>