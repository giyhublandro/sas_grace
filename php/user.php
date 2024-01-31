<?php

	require_once 'config/database.php';

	$postdata = file_get_contents("php://input");

	if(!function_exists('bcrypt_hash_password')){
		function bcrypt_hash_password($password, $options=[]){

			$cost = isset($options['rounds']) ? $options['rounds'] :10 ;

			$hash = password_hash($password, PASSWORD_BCRYPT, array('cost'=>$cost));
			
			if($hash === false){
				throw new Eception ("Bcrypt hashing n'est pas supoorté.");
			}
			
			return $hash;
		}
	}

	//VERIFIER MOT DE PASSE HASHÉ
	if(!function_exists('bcrypt_verify_password')){
		function bcrypt_verify_password($password,$hashedPassword){
			return password_verify($password, $hashedPassword) ;
		}
	}
	
	//EDITION DE UTILISATEUR EN PROVENANCE DE LA LISTE
	if(isset($_GET['edit_id'])){

		$id = $_GET['edit_id'];

		$sql = "SELECT `id`, `mot_de_passe`, `nom`, `prenom`, `email`, `telephone`, `actif`,
		`ID_ACCES`, `ID_USER`, profil_utilisateur.IDENT_PROFIL, `NOM_PROFIL` 
		FROM utilisateur , utilisateur_acces, profil_utilisateur 
		WHERE utilisateur.id = utilisateur_acces.ID_USER 
		AND utilisateur_acces.IDENT_PROFIL=profil_utilisateur.IDENT_PROFIL AND id= '{$id}'";
		
		//$sql = "SELECT `id`, `mot_de_passe`, `nom`, `prenom`, `email`, `telephone`, `actif`
		//FROM utilisateur
		//WHERE id= '{$id}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);

	}elseif (isset($_GET['user_by_id'])){

		$id = $_GET['user_by_id'];

		$sql = "SELECT  `id_utilisateur`, utilisateur.id_profil, `nom_utilisateur`, `prenom_utilisateur`, `email_utilisateur`, `mot_de_passe_utilisateur`, `adresse`, `telephone`, `sex`, `type_identite`, `num_piece_identite`, `date_expiration`, `actif`, `super_admin`, `nom_profil` FROM utilisateur INNER JOIN profil WHERE utilisateur.id_profil = profil.id_profil AND id_utilisateur= '{$id}' ORDER BY nom_utilisateur ASC";

		//$sql = "SELECT * FROM utilisateur WHERE id_utilisateur= '{$id}'";
		
		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);

	}elseif (isset($_GET['delete_id'])){
		
		//SELECTION DE L'UTILISATEUR A SUPPRIMER
		$id = $_GET['delete_id'];

		$sql = "DELETE FROM utilisateur WHERE id_utilisateur='{$id}'";

		if (mysqli_query($con,$sql)) {
			http_response_code(204);
		}else{
			http_response_code(422);
		}
		
	}else if (isset($_GET['connectes'])){
		//CONNECTED USERS
		$actif = 1;

		$sql = "SELECT * FROM utilisateur WHERE `actif`='{$actif}'";

		if($result = mysqli_query($con,$sql)){

			$users = array();

			$i = 0 ;

			while($user = mysqli_fetch_assoc($result)){
				
				$users[$i]['id'] = $user['id'];
				$users[$i]['mot_de_passe'] = $user['mot_de_passe'];
				$users[$i]['nom'] = $user['nom'];
				$users[$i]['prenom'] = $user['prenom'];
				$users[$i]['email'] = $user['email'];
				$users[$i]['telephone'] = $user['telephone'];

				$i++;
			}

			echo $users;
			//print_r($users);
			echo json_encode($users);

		}else{
			http_response_code(404);
		}

	}elseif (isset($_GET['user_list'])){
		//SELECTION DE LA LISTE DE UTILISATEURS
		$sql = "SELECT  `id_utilisateur`, utilisateur.id_profil, `nom_utilisateur`, `prenom_utilisateur`, `email_utilisateur`, `mot_de_passe_utilisateur`, `adresse`, `telephone`, `sex`, `type_identite`, `num_piece_identite`, `date_expiration`, `actif`, `super_admin`, `nom_profil` FROM utilisateur INNER JOIN profil WHERE super_admin = 0 AND utilisateur.id_profil = profil.id_profil ORDER BY nom_utilisateur ASC";

		if($result = mysqli_query($con,$sql)){

			$utilisateurs = array();

			$i = 0 ;

			while($utilisateur = mysqli_fetch_assoc($result)){
				
				$utilisateurs[$i]['id_profil'] = $utilisateur['id_profil'];
				$utilisateurs[$i]['nom_utilisateur'] = $utilisateur['nom_utilisateur'];
				$utilisateurs[$i]['prenom_utilisateur'] = $utilisateur['prenom_utilisateur'];
				$utilisateurs[$i]['adresse'] = $utilisateur['adresse'];
				$utilisateurs[$i]['mot_de_passe_utilisateur'] = $utilisateur['mot_de_passe_utilisateur'];
				$utilisateurs[$i]['id_utilisateur'] = $utilisateur['id_utilisateur'];
				$utilisateurs[$i]['telephone'] = $utilisateur['telephone'];
				$utilisateurs[$i]['email_utilisateur'] = $utilisateur['email_utilisateur'];

				$utilisateurs[$i]['sex'] = $utilisateur['sex'];
				$utilisateurs[$i]['type_identite'] = $utilisateur['type_identite'];
				$utilisateurs[$i]['num_piece_identite'] = $utilisateur['num_piece_identite'];
				$utilisateurs[$i]['date_expiration'] = $utilisateur['date_expiration'];
				$utilisateurs[$i]['actif'] = $utilisateur['actif'];
				$utilisateurs[$i]['nom_profil'] = $utilisateur['nom_profil'];

				$i++;

			}

			echo json_encode($utilisateurs);

		}else{
			http_response_code(404);
		}

	}elseif (isset($_GET['personnel_list'])){
		//SELECTION DE LA LISTE DE UTILISATEURS
		$sql = "SELECT  `id_utilisateur`, utilisateur.id_profil, `nom_utilisateur`, `prenom_utilisateur`, `email_utilisateur`, `mot_de_passe_utilisateur`, `adresse`, `telephone`, `sex`, `type_identite`, `num_piece_identite`, `date_expiration`, `actif`, `super_admin`, `nom_profil` FROM utilisateur INNER JOIN profil WHERE super_admin = 0 AND administration = 0 AND utilisateur.id_profil = profil.id_profil ORDER BY nom_utilisateur ASC";

		if($result = mysqli_query($con,$sql)){

			$utilisateurs = array();

			$i = 0 ;

			while($utilisateur = mysqli_fetch_assoc($result)){
				
				$utilisateurs[$i]['id_profil'] = $utilisateur['id_profil'];
				$utilisateurs[$i]['nom_utilisateur'] = $utilisateur['nom_utilisateur'];
				$utilisateurs[$i]['prenom_utilisateur'] = $utilisateur['prenom_utilisateur'];
				$utilisateurs[$i]['adresse'] = $utilisateur['adresse'];
				$utilisateurs[$i]['mot_de_passe_utilisateur'] = $utilisateur['mot_de_passe_utilisateur'];
				$utilisateurs[$i]['id_utilisateur'] = $utilisateur['id_utilisateur'];
				$utilisateurs[$i]['telephone'] = $utilisateur['telephone'];
				$utilisateurs[$i]['email_utilisateur'] = $utilisateur['email_utilisateur'];

				$utilisateurs[$i]['sex'] = $utilisateur['sex'];
				$utilisateurs[$i]['type_identite'] = $utilisateur['type_identite'];
				$utilisateurs[$i]['num_piece_identite'] = $utilisateur['num_piece_identite'];
				$utilisateurs[$i]['date_expiration'] = $utilisateur['date_expiration'];
				$utilisateurs[$i]['actif'] = $utilisateur['actif'];
				$utilisateurs[$i]['nom_profil'] = $utilisateur['nom_profil'];

				$i++;

			}

			echo json_encode($utilisateurs);

		}else{
			http_response_code(404);
		}

	}else{

	}

?>