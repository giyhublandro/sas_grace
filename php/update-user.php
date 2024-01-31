<?php

	require_once 'config/database.php';

	$postdata = file_get_contents("php://input");

	if(isset($_GET['update_id'])){

		if (isset($postdata) && !empty($postdata)){
			
			$request = json_decode($postdata);
			
			$id = mysqli_real_escape_string($con, (int)$_GET['update_id']);

			$nom_utilisateur = mysqli_real_escape_string($con, trim($request->nom_utilisateur));
			$prenom_utilisateur = mysqli_real_escape_string($con, trim($request->prenom_utilisateur));
			$email_utilisateur = mysqli_real_escape_string($con, trim($request->email_utilisateur));
			$mot_de_passe_utilisateur = mysqli_real_escape_string($con, trim($request->mot_de_passe_utilisateur));
			$id_profil = mysqli_real_escape_string($con, trim($request->id_profil));
			$actif = mysqli_real_escape_string($con, trim($request->actif));
			$id_utilisateur = mysqli_real_escape_string($con, trim($request->id_utilisateur));

			$adresse = mysqli_real_escape_string($con, $request->adresse);
			$telephone = mysqli_real_escape_string($con, $request->telephone);
			$sex = mysqli_real_escape_string($con, $request->sex);
			$type_identite = mysqli_real_escape_string($con, $request->type_identite);
			$num_piece_identite = mysqli_real_escape_string($con, $request->num_piece_identite);
			$date_expiration = mysqli_real_escape_string($con, $request->date_expiration);

			$sql = "UPDATE `utilisateur` SET `actif`='$actif', `mot_de_passe_utilisateur`='$mot_de_passe_utilisateur',`nom_utilisateur`='$nom_utilisateur',`prenom_utilisateur`='$prenom_utilisateur',`email_utilisateur`='$email_utilisateur', `id_profil`='$id_profil',
			`adresse`='$adresse',`telephone`='$telephone', `sex`='$sex',`type_identite`='$type_identite', `num_piece_identite`='$num_piece_identite', `date_expiration`='$date_expiration' WHERE `id_utilisateur` = '{$id}'";
			
			if (mysqli_query($con,$sql)) {
				http_response_code(201);
			}else{
				http_response_code(422);
			}

		}

	}else if (isset($_GET['update_password'])){
		
		if (isset($postdata) && !empty($postdata)){

			$request = json_decode($postdata);

			$id = mysqli_real_escape_string($con, (int)$_GET['update_password']);

			$nouveauMotDePasse = mysqli_real_escape_string($con, trim($request->nouveauMotDePasse));
			
			$sql = "UPDATE `utilisateur` SET `mot_de_passe`='$nouveauMotDePasse' WHERE `id` = '{$id}'";
			
			if (mysqli_query($con,$sql)) {
				http_response_code(201);
			}else{
				http_response_code(422);
			}

		}
		
	}else if(isset($_GET['update_profil_id'])){
	    
	    if (isset($postdata) && !empty($postdata)){
			
			$request = json_decode($postdata);
			
			$id = mysqli_real_escape_string($con, (int)$_GET['update_profil_id']);

			$nom_utilisateur = mysqli_real_escape_string($con, trim($request->nom_utilisateur));
			$prenom_utilisateur = mysqli_real_escape_string($con, trim($request->prenom_utilisateur));
			$email_utilisateur = mysqli_real_escape_string($con, trim($request->email_utilisateur));
			$mot_de_passe_utilisateur = mysqli_real_escape_string($con, trim($request->mot_de_passe_utilisateur));
			$id_utilisateur = mysqli_real_escape_string($con, trim($request->id_utilisateur));

			$adresse = mysqli_real_escape_string($con, $request->adresse);
			$telephone = mysqli_real_escape_string($con, $request->telephone);
			$sex = mysqli_real_escape_string($con, $request->sex);
			$type_identite = mysqli_real_escape_string($con, $request->type_identite);
			$num_piece_identite = mysqli_real_escape_string($con, $request->num_piece_identite);
			$date_expiration = mysqli_real_escape_string($con, $request->date_expiration);

			$sql = "UPDATE `utilisateur` SET `mot_de_passe_utilisateur`='$mot_de_passe_utilisateur',`nom_utilisateur`='$nom_utilisateur',`prenom_utilisateur`='$prenom_utilisateur',`email_utilisateur`='$email_utilisateur',
			`adresse`='$adresse',`telephone`='$telephone', `sex`='$sex',`type_identite`='$type_identite', `num_piece_identite`='$num_piece_identite', `date_expiration`='$date_expiration' WHERE `id_utilisateur` = '{$id}'";
			
			if (mysqli_query($con,$sql)) {
				http_response_code(201);
			}else{
				http_response_code(422);
			}

		}
	}