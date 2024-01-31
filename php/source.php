
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

	if(isset($_GET['create'])){

        if(isset($postdata) && !empty($postdata)){
            // Extract the data.
            $request = json_decode($postdata);
            
            $source = mysqli_real_escape_string($con, trim($request->source));
            $description = mysqli_real_escape_string($con, $request->description);
           
            // Create.
            $sql = "INSERT INTO `source`(`source`, `description`) 
                VALUES ( '$source', '$description')";
            
            if(mysqli_query($con,$sql)){
                http_response_code(201);
            }else{
                http_response_code(422);
            }
        }

    }else if(isset($_GET['liste'])){
        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM source ORDER BY source ASC";
            
        if($result = mysqli_query($con,$sql)){

            $sources = array();

            $i = 0 ;

            while($source = mysqli_fetch_assoc($result)){
                
                $sources[$i]['id_source'] = $source['id_source'];
                $sources[$i]['source'] = $source['source'];
                $sources[$i]['description'] = $source['description'];
                $sources[$i]['default_source'] = $source['default_source'];

                $i++;

            }

            echo json_encode($sources);

        }else{
            http_response_code(422);
        }

    }else if(isset($_GET['source_delete_id'])){

        $id_source = (int)$_GET['source_delete_id'];

		$sql = "DELETE FROM source WHERE id_source='{$id_source}'";

		if (mysqli_query($con,$sql)) {
			http_response_code(204);
		}else{
			http_response_code(422);
		}

    }else if(isset($_GET['source_edit'])){

        //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

        $id_source = $_GET['source_edit'];

		$sql = "SELECT * FROM source WHERE id_source = '{$id_source}'";

		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);
        
    }else if(isset($_GET['source_update'])){

        if (isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);

            $id_source = mysqli_real_escape_string($con, trim($request->id_source));
            $source = mysqli_real_escape_string($con, trim($request->source));
            $description = mysqli_real_escape_string($con, trim($request->description));
           
            $sql = "UPDATE `source` SET `source`='$source', `description`='$description'
                WHERE `id_source` = '{$id_source}'";
  
            if (mysqli_query($con,$sql)) {
                http_response_code(204);
                
            }else{
                http_response_code(422);
            }

            echo $json = json_encode("Donne");

        }

    }

?>