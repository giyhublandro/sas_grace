
<?php

	require_once 'config/database.php';

	
	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($postdata) && !empty($postdata)){
		// Extract the data.
		$request = json_decode($postdata);

		

		// Sanitize.
		$id_profil = mysqli_real_escape_string($con, trim($request->id_profil));
		$nom_utilisateur = mysqli_real_escape_string($con, trim($request->nom_utilisateur));
		$prenom_utilisateur = mysqli_real_escape_string($con, trim($request->prenom_utilisateur));
		$actif = mysqli_real_escape_string($con, trim($request->actif));
		$email_utilisateur = mysqli_real_escape_string($con, $request->email_utilisateur);
		$mot_de_passe_utilisateur = mysqli_real_escape_string($con, $request->mot_de_passe_utilisateur);

		//$hash = password_hash($mot_de_passe_utilisateur, PASSWORD_BCRYPT, array('cost'=>$cost));

		$adresse = mysqli_real_escape_string($con, $request->adresse);
		$telephone = mysqli_real_escape_string($con, $request->telephone);
		$sex = mysqli_real_escape_string($con, $request->sex);
		$type_identite = mysqli_real_escape_string($con, $request->type_identite);
		$num_piece_identite = mysqli_real_escape_string($con, $request->num_piece_identite);
		$date_expiration = mysqli_real_escape_string($con, $request->date_expiration);

		// Create.
		$sql = "INSERT INTO `utilisateur`(`id_profil`, `nom_utilisateur`, `prenom_utilisateur`, `actif`, `email_utilisateur`, `mot_de_passe_utilisateur`,`adresse`, `telephone`, `sex`, `type_identite`, `num_piece_identite`, `date_expiration`) 
		VALUES ('$id_profil', '$nom_utilisateur', '$prenom_utilisateur', '$actif', '$email_utilisateur', '$mot_de_passe_utilisateur', '$adresse', '$telephone', '$sex', '$type_identite', '$num_piece_identite', '$date_expiration')";

		if(mysqli_query($con,$sql)){

			http_response_code(201);
			
			//DERNIER PROFIL ENREGISTRE
			$sql = "SELECT * FROM utilisateur ORDER BY id_utilisateur DESC";

			if($result = mysqli_query($con,$sql)){

				$utilisateurs = array();

				$i = 0 ;

				while($utilisateur = mysqli_fetch_assoc($result)){
					
					$utilisateurs[$i]['id_profil'] = $utilisateur['id_profil'];
					$utilisateurs[$i]['nom_utilisateur'] = $utilisateur['nom_utilisateur'];
					$utilisateurs[$i]['prenom_utilisateur'] = $utilisateur['prenom_utilisateur'];
					$utilisateurs[$i]['login_utilisateur'] = $utilisateur['login_utilisateur'];
					$utilisateurs[$i]['mot_de_passe_utilisateur'] = $utilisateur['mot_de_passe_utilisateur'];
					$utilisateurs[$i]['id_utilisateur'] = $utilisateur['id_utilisateur'];

					$utilisateurs[$i]['actif'] = $utilisateur['actif'];
					$utilisateurs[$i]['adresse'] = $utilisateur['adresse'];
					$utilisateurs[$i]['telephone'] = $utilisateur['telephone'];
					$utilisateurs[$i]['sex'] = $utilisateur['sex'];
					$utilisateurs[$i]['type_identite'] = $utilisateur['type_identite'];
					$utilisateurs[$i]['num_piece_identite'] = $utilisateur['num_piece_identite'];
					$utilisateurs[$i]['date_expiration'] = $utilisateur['date_expiration'];

					$i++;
				}

			}

			echo json_encode($utilisateurs);
		
		}else{
			http_response_code(422);
		}
	}
?>