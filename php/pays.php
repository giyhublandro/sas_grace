
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

    if(isset($_GET['liste'])){

        //DERNIER PROFIL ENREGISTRE
        $sql = "SELECT * FROM pays";
            
        if ($result = mysqli_query($con,$sql)){

            $pays = array();

            $i = 0 ;

            while($pay = mysqli_fetch_assoc($result)){

                $pays[$i]['ID_PAYS'] = $pay['ID_PAYS'];
                $pays[$i]['NOM_PAYS_FR'] = $pay['NOM_PAYS_FR'];
                
                $i++;

            }

           // echo mysqli_fetch_assoc($result);
            
            echo json_encode($pays);

        }else{
            http_response_code(422);
        }

    }

?>