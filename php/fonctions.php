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
	
?>