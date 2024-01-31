
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            $option = mysqli_real_escape_string($con, trim($request->option));
            $montant_option = mysqli_real_escape_string($con, $request->montant_option);
            $montant_option = doubleval($montant_option);
            // Create.
            $sql = "INSERT INTO `option`(`option`, `montant_option`) 
                VALUES ( '$option', '$montant_option')";
            
            if(mysqli_query($con,$sql)){
                http_response_code(201);
            }else{
                http_response_code(422);
            }
        }

    }else if(isset($_GET['liste'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM `option` ORDER BY `option` ASC";
            
        if($result = mysqli_query($con,$sql)){

            $options = array();

            $i = 0 ;

            while($option = mysqli_fetch_assoc($result)){
                
                $options[$i]['id_option'] = $option['id_option'];
                $options[$i]['option'] = $option['option'];
                $options[$i]['montant_option'] = $option['montant_option'];

                $i++;

            }

            echo json_encode($options);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['option_delete_id'])){

        $id_option = (int)$_GET['option_delete_id'];

		$sql = "DELETE FROM `option` WHERE id_option='{$id_option}'";

		if (mysqli_query($con,$sql)) {
			http_response_code(204);
		}else{
			http_response_code(422);
		}

    }else if(isset($_GET['option_edit'])){

        //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

        $id_option = $_GET['option_edit'];

		$sql = "SELECT * FROM `option` WHERE id_option = '{$id_option}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }else if(isset($_GET['option_update'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);

            $id_option = mysqli_real_escape_string($con, trim($request->id_option));
            $option = mysqli_real_escape_string($con, trim($request->option));
            $montant_option = mysqli_real_escape_string($con, trim($request->montant_option));
           
            $sql = "UPDATE `option` SET `option`='$option', `montant_option`='$montant_option'
                WHERE `id_option` = '{$id_option}'";
  
            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            echo $json = json_encode("Donne");

        }

    }else if(isset($_GET['option_edit_client'])){

        $id_client = $_GET['option_edit_client'];

		$sql = "SELECT * FROM `option_client` WHERE id_client = '{$id_client}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }

?>