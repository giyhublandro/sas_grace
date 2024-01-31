<?php

	require_once 'config/database.php';

if (isset($_GET['uto'])){

    $sql = "SELECT * FROM uto";

    if($result = mysqli_query($con,$sql)){

        $utos = array();

        $i = 0 ;

        while($uto = mysqli_fetch_assoc($result)){
            
            $utos[$i]['IDENT_TYPE_UTO'] = $uto['IDENT_TYPE_UTO'];
            $utos[$i]['LIBELLE_UTO_FR'] = $uto['LIBELLE_UTO_FR'];
            $utos[$i]['LOCALISATION'] = $uto['LOCALISATION'];
            $utos[$i]['NOM_FICHE'] = $uto['NOM_FICHE'];

            $i++;
            
        }
        //print_r($utos);
        echo json_encode($utos);

    }else{
        http_response_code(404);
    }

}else if(isset($_GET['delete'])){
    
    $sql = "DELETE FROM mouchard";

    if(mysqli_query($con,$sql)){

        echo json_encode("Donne");
    }

}else{

    $sql = "SELECT * FROM mouchard ORDER BY IDENT_MOUCHARD DESC";

    if($result = mysqli_query($con,$sql)){

        $mouchards = array();

        $i = 0 ;

        while($mouchard = mysqli_fetch_assoc($result)){
            
            $mouchards[$i]['IDENT_MOUCHARD'] = $mouchard['IDENT_MOUCHARD'];
            $mouchards[$i]['CODE_USER'] = $mouchard['CODE_USER'];
            $mouchards[$i]['DATE_OPER'] = $mouchard['DATE_OPER'];
            $mouchards[$i]['LIBEL_OPER'] = $mouchard['LIBEL_OPER'];
            $mouchards[$i]['NOM_POSTE'] = $mouchard['NOM_POSTE'];

            $i++;
            
        }
        //print_r($mouchards);
        echo json_encode($mouchards);

    }else{
        http_response_code(404);
    }

}
    
?>