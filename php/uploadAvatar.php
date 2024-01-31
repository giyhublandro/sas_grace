
<?php     
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: PUT, GET, POST");
   header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
   
   require_once 'config/database.php';
   
   $postdata = file_get_contents("php://input");

    $folderPath = 'C:/www/angular/coup_de_balai/src/assets/dist/img';
    $postdata = file_get_contents("php://input");     

    $infosfichier =pathinfo($_FILES['image']['name']);

    $extension_upload = $infosfichier['extension'];

   // echo $infosfichier;
   // echo $extension_upload;

    //$extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png', 'pdf');

    $target_dir="../src/assets/dist/img/";

    $target_file = $target_dir.basename($_FILES["image"]["name"]);
    $uploakOk = 1;
    //$imageFileType = $infosfichier['extension'];
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png', 'pdf');

    if(isset($postdata)){

        if(in_array($imageFileType,$extensions_autorisees)){

            $id_agence = $_GET['id_agence'];
            $id_utilisateur = $_GET['id_utilisateur'];

            $check = getimagesize($_FILES['image']['tmp_name']);

            if($check !== false){

                if(move_uploaded_file($_FILES['image']['tmp_name'], $target_file)){

                    if(isset($_GET['id_agence'])){
                        $sql = "UPDATE `agence` SET `logo`='$target_file' WHERE `id_agence` = '{$id_agence}'";
                    }else if(isset($_GET['id_utilisateur'])){
                        $sql = "UPDATE `utilisateur` SET `avatar`='$target_file' WHERE `id_utilisateur` = '{$id_utilisateur}'";
                    }
                    
                    if (mysqli_query($con,$sql)) {
                        http_response_code(204);
                        
                    }else{
                        http_response_code(422);
                    } 

                }
                
            }else{
                echo json_encode("Oups");
                $uploakOk = 0;
            }

        }
        

    }

?>



