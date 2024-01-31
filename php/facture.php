
<?php
	
	require_once 'config/database.php';

	// Get the posted data.
	$postdata = file_get_contents("php://input");

if(isset($_GET['factures'])){

    $sql = "SELECT * FROM facturation";

    $id_facturation_delete ;

    if($result = mysqli_query($con,$sql)){  

        while($facturation = mysqli_fetch_assoc($result)){

            $sql_ = "SELECT * FROM affectation";

            $delete = true;

            if($result_ = mysqli_query($con,$sql_)){
                while($affectation = mysqli_fetch_assoc($result_)){

                    $id_facturation_delete = $facturation['id_facturation'];

                    if($affectation['id_facturation'] == $facturation['id_facturation']){
                        $delete = false; 
                    }

                }
            }

            if ($delete){

		        $sql = "DELETE FROM facturation WHERE id_facturation='{$id_facturation_delete}'";

                if (mysqli_query($con,$sql)) {}

            }
        }
    
    }
    
    $sql = "SELECT `id_facturation`, `libelle`, `date_facturation`, `montant`, `numero_facture`, facturation.id_client,
     `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `etat`, `type_client`  
    FROM facturation, client WHERE facturation.id_client = client.id_client ORDER BY id_facturation ASC";
        
    if($result = mysqli_query($con,$sql)){

        $facturations = array();

        $i = 0 ;

        while($facturation = mysqli_fetch_assoc($result)){
            
            $facturations[$i]['id_facturation'] = $facturation['id_facturation'];
            $facturations[$i]['libelle'] = $facturation['libelle'];
            $facturations[$i]['montant'] = $facturation['montant'];
            $facturations[$i]['date_facturation'] = $facturation['date_facturation'];
            $facturations[$i]['numero_facture'] = $facturation['numero_facture'];
            $facturations[$i]['id_client'] = $facturation['id_client'];

            $facturations[$i]['nom_client'] = $facturation['nom_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['telephone_1'] = $facturation['telephone_1'];
            $facturations[$i]['telephone_2'] = $facturation['telephone_2'];
            $facturations[$i]['email_client'] = $facturation['email_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['etat'] = $facturation['etat'];
            $facturations[$i]['type_client'] = $facturation['type_client'];
            
            $i++;

        }

        echo json_encode($facturations);

    }

}else if(isset($_GET['filtre'])){
    //DERNIER PROFIL ENREGISTRE

    $filtre = $_GET['filtre']; 

    $sql = "SELECT `id_facturation`, `libelle`, `date_facturation`, `montant`, `numero_facture`, facturation.id_client,
     `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `etat`, `type_client`, facturation.source_id, source
    FROM facturation, client, source WHERE 
    facturation.id_client = client.id_client AND facturation.source_id = source.id_source AND nom_client LIKE '%$filtre%' 
    OR 
    facturation.id_client = client.id_client AND facturation.source_id = source.id_source AND source LIKE '%$filtre%' 
    ORDER BY nom_client ASC, date_facturation DESC";
        
    if($result = mysqli_query($con,$sql)){

        $facturations = array();

        $i = 0 ;

        while($facturation = mysqli_fetch_assoc($result)){
            
            $facturations[$i]['id_facturation'] = $facturation['id_facturation'];
            $facturations[$i]['libelle'] = $facturation['libelle'];
            $facturations[$i]['montant'] = $facturation['montant'];
            $facturations[$i]['date_facturation'] = $facturation['date_facturation'];
            $facturations[$i]['numero_facture'] = $facturation['numero_facture'];
            $facturations[$i]['id_client'] = $facturation['id_client'];

            $facturations[$i]['nom_client'] = $facturation['nom_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['telephone_1'] = $facturation['telephone_1'];
            $facturations[$i]['telephone_2'] = $facturation['telephone_2'];
            $facturations[$i]['email_client'] = $facturation['email_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['etat'] = $facturation['etat'];
            $facturations[$i]['type_client'] = $facturation['type_client'];
            
            
            $i++;

        }

        echo json_encode($facturations);

    }

}else if(isset($_GET['filtre_plus_date'])){
    //DERNIER PROFIL ENREGISTRE

    $filtre = $_GET['filtre_plus_date']; 
    $du = $_GET['du']; 
    $au = $_GET['au']; 

    $sql = "SELECT `id_facturation`, `libelle`, `date_facturation`, `montant`, `numero_facture`, facturation.id_client,
     `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `etat`, `type_client`  
    FROM facturation, client 
    WHERE facturation.id_client = client.id_client 
    AND nom_client LIKE '%$filtre%' AND date_facturation BETWEEN '$du' AND '$au'
    ORDER BY nom_client ASC, date_facturation DESC";
        
    if($result = mysqli_query($con,$sql)){

        $facturations = array();

        $i = 0 ;

        while($facturation = mysqli_fetch_assoc($result)){
            
            $facturations[$i]['id_facturation'] = $facturation['id_facturation'];
            $facturations[$i]['libelle'] = $facturation['libelle'];
            $facturations[$i]['montant'] = $facturation['montant'];
            $facturations[$i]['date_facturation'] = $facturation['date_facturation'];
            $facturations[$i]['numero_facture'] = $facturation['numero_facture'];
            $facturations[$i]['id_client'] = $facturation['id_client'];

            $facturations[$i]['nom_client'] = $facturation['nom_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['telephone_1'] = $facturation['telephone_1'];
            $facturations[$i]['telephone_2'] = $facturation['telephone_2'];
            $facturations[$i]['email_client'] = $facturation['email_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['etat'] = $facturation['etat'];
            $facturations[$i]['type_client'] = $facturation['type_client'];
            
            
            $i++;

        }

        echo json_encode($facturations);

    }

}else if(isset($_GET['date_du'])){
    //DERNIER PROFIL ENREGISTRE

    $du = $_GET['date_du']; 
    $au = $_GET['au']; 

    $sql = "SELECT `id_facturation`, `libelle`, `date_facturation`, `montant`, `numero_facture`, facturation.id_client,
     `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `etat`, `type_client`  
    FROM facturation, client 
    WHERE facturation.id_client = client.id_client 
    AND date_facturation BETWEEN '$du' AND '$au'
    ORDER BY nom_client ASC, date_facturation DESC";
        
    if($result = mysqli_query($con,$sql)){

        $facturations = array();

        $i = 0 ;

        while($facturation = mysqli_fetch_assoc($result)){
            
            $facturations[$i]['id_facturation'] = $facturation['id_facturation'];
            $facturations[$i]['libelle'] = $facturation['libelle'];
            $facturations[$i]['montant'] = $facturation['montant'];
            $facturations[$i]['date_facturation'] = $facturation['date_facturation'];
            $facturations[$i]['numero_facture'] = $facturation['numero_facture'];
            $facturations[$i]['id_client'] = $facturation['id_client'];

            $facturations[$i]['nom_client'] = $facturation['nom_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['telephone_1'] = $facturation['telephone_1'];
            $facturations[$i]['telephone_2'] = $facturation['telephone_2'];
            $facturations[$i]['email_client'] = $facturation['email_client'];
            $facturations[$i]['adresse_client'] = $facturation['adresse_client'];
            $facturations[$i]['etat'] = $facturation['etat'];
            $facturations[$i]['type_client'] = $facturation['type_client'];
            
            
            $i++;

        }

        echo json_encode($facturations);

    }

} else if(isset($_GET['update_facture_apres_edition'])){

    //SELECTION DES ELEMENTS DU PROFIL A MODIFIER

    $id_facturation = intval($_GET['update_facture_apres_edition']);
    
    //DERNIER PROFIL ENREGISTRE
    $sql = "SELECT * FROM affectation WHERE affectation.id_facturation = '{$id_facturation}'";
        
    if($result = mysqli_query($con,$sql)){

        $affectations = array();

        $montant = 0;
        while($affectation = mysqli_fetch_assoc($result)){
            
            $montant += $affectation['total_facture'];
          
            $i++;

        }

    }

    $sql = "UPDATE `facturation` SET `montant`='{$montant}' WHERE `id_facturation` = '{$id_facturation}'";

    if (mysqli_query($con,$sql)) {
        http_response_code(204);
    }
    
    echo json_encode("Donne");

}else if(isset($_GET['facture_by_id'])){
    
    $id_facturation = $_GET['facture_by_id'];

    $sql = "SELECT * FROM facturation WHERE id_facturation = '{$id_facturation}'";
    $result = mysqli_query($con,$sql);

    $row = mysqli_fetch_assoc($result);

    echo $json = json_encode($row);

}
?>


