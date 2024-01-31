<?php

	require_once 'config/database.php';

	
    //SELECTION DE LA LISTE DE UTILISATEURS
    $sql = "SELECT * FROM region";

    if($result = mysqli_query($con,$sql)){

        $regions = array();

        $i = 0 ;

        while($region = mysqli_fetch_assoc($result)){
            
            $regions[$i]['IDENT_REGION'] = $region['IDENT_REGION'];
            $regions[$i]['LIBELLE_REGION_FR'] = $region['LIBELLE_REGION_FR'];
            $regions[$i]['CODE_REGION'] = $region['CODE_REGION'];

            $i++;
        }
        //print_r($regions);
        echo json_encode($regions);

    }else{
        http_response_code(404);
    }



?>