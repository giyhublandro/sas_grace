
<?php
	
	//HASHAGE DE MOT DE PASSE AVEC Bcrypt
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
		
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if (isset($_GET['logOut'])){

		$code = (int)$_GET['logOut'];
		$actif = 0;
		$sql2= "UPDATE `utilisateur` SET `actif`='$actif' WHERE `id` ='$code'";

		if(mysqli_query($con,$sql2)){

			$sql = "SELECT * FROM utilisateur WHERE id='$code'";

			if($result = mysqli_query($con,$sql)){

				$users = array();

				$i = 0 ;

				while($user = mysqli_fetch_assoc($result)){
					
					$users[$i]['id'] = $user['id'];
					$code =$user['id'];
					$users[$i]['mot_de_passe'] = $user['mot_de_passe'];
					$users[$i]['nom'] = $user['nom'];
					$nom = $user['nom'];
					$users[$i]['prenom'] = $user['prenom'];
					$prenom = $user['prenom'];
					$users[$i]['email'] = $user['email'];
					$email = $user['email'];
					$users[$i]['telephone'] = $user['telephone'];

					$i++;
				}

			}

			$CODE_USER = $email; 
			$NOM =$nom;
			$PRENOM = $prenom;
			$LIBEL_OPER = "Deconnexion de ".$prenom." ".$nom  ;
			$NOM_POSTE = "ip(167.150.140.152)";
		
			// Create.
			$sql = "INSERT INTO `mouchard`(`CODE_USER`, `NOM`, `PRENOM`, `LIBEL_OPER`, `NOM_POSTE`) 
			VALUES ('$CODE_USER','$NOM','$PRENOM','$LIBEL_OPER','$NOM_POSTE')";

			if(mysqli_query($con,$sql)){}	

		}

		echo json_encode("Updated");

	}else if(isset($_GET['compte'])){

		// Extract the data.
		$request = json_decode($postdata);
		
		// Sanitize.
		$email_client = mysqli_real_escape_string($con, $request->email_utilisateur);
		$mot_de_passe = mysqli_real_escape_string($con, $request->mot_de_passe_utilisateur);
		
		// Create.

		$sql = "SELECT * FROM client WHERE email_client = '{$email_client}' AND mot_de_passe = '{$mot_de_passe}'";
		
		if($result = mysqli_query($con,$sql)){
			
			$users = array();

			$i = 0 ;

			while($user = mysqli_fetch_assoc($result)){

				$users[$i]['email_client'] = $user['email_client'];
				$users[$i]['id_client'] = $user['id_client'];
				$users[$i]['mot_de_passe'] = $user['mot_de_passe'];
				$users[$i]['nom_client'] = $user['nom_client'];

				$i++;

			}
		
			echo json_encode($users);

		}else{

		}


	}else if(isset($postdata) && !empty($postdata)){
		// Extract the data.
		$request = json_decode($postdata);
		
		// Validate.
		if(trim($request->email_utilisateur) === '' || trim($request->mot_de_passe_utilisateur) === ''){
			return http_response_code(400);			
		}

		// Sanitize.
		$email_utilisateur = mysqli_real_escape_string($con, $request->email_utilisateur);
		$mot_de_passe_utilisateur = mysqli_real_escape_string($con, $request->mot_de_passe_utilisateur);
		
		// Create.

		$sql = "SELECT * FROM utilisateur WHERE email_utilisateur = '{$email_utilisateur}' AND actif = 1 AND mot_de_passe_utilisateur = '{$mot_de_passe_utilisateur}'";
		
		if($result = mysqli_query($con,$sql)){
			
			$users = array();

			$i = 0 ;

			while($user = mysqli_fetch_assoc($result)){

			$users[$i]['id_profil'] = $user['id_profil'];
			$users[$i]['id_utilisateur'] = $user['id_utilisateur'];
			$users[$i]['mot_de_passe_utilisateur'] = $user['mot_de_passe_utilisateur'];
			$users[$i]['nom_utilisateur'] = $user['nom_utilisateur'];
			$users[$i]['prenom_utilisateur'] = $user['prenom_utilisateur'];
			$users[$i]['email_utilisateur'] = $user['email_utilisateur'];

				$i++;
			}
		
			echo json_encode($users);

		}else{

		}
	}
?>