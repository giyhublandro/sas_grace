<?php

function int2str($a){
$convert = explode('.',$a);
if (isset($convert[1]) && $convert[1]!=''){
return int2str($convert[0]).'Dinars'.' et '.int2str($convert[1]).'Centimes' ;
}
if ($a<0) return 'moins '.int2str(-$a);
if ($a<17){
switch ($a){
case 0: return 'zero';
case 1: return 'un';
case 2: return 'deux';
case 3: return 'trois';
case 4: return 'quatre';
case 5: return 'cinq';
case 6: return 'six';
case 7: return 'sept';
case 8: return 'huit';
case 9: return 'neuf';
case 10: return 'dix';
case 11: return 'onze';
case 12: return 'douze';
case 13: return 'treize';
case 14: return 'quatorze';
case 15: return 'quinze';
case 16: return 'seize';
}
} else if ($a<20){
return 'dix-'.int2str($a-10);
} else if ($a<100){
if ($a%10==0){
switch ($a){
case 20: return 'vingt';
case 30: return 'trente';
case 40: return 'quarante';
case 50: return 'cinquante';
case 60: return 'soixante';
case 70: return 'soixante-dix';
case 80: return 'quatre-vingt';
case 90: return 'quatre-vingt-dix';
}
} elseif (substr($a, -1)==1){
if( ((int)($a/10)*10)<70 ){
return int2str((int)($a/10)*10).'-et-un';
} elseif ($a==71) {
return 'soixante-et-onze';
} elseif ($a==81) {
return 'quatre-vingt-un';
} elseif ($a==91) {
return 'quatre-vingt-onze';
}
} elseif ($a<70){
return int2str($a-$a%10).'-'.int2str($a%10);
} elseif ($a<80){
return int2str(60).'-'.int2str($a%20);
} else{
return int2str(80).'-'.int2str($a%20);
}
} else if ($a==100){
return 'cent';
} else if ($a<200){
return int2str(100).' '.int2str($a%100);
} else if ($a<1000){
return int2str((int)($a/100)).' '.int2str(100).' '.int2str($a%100);
} else if ($a==1000){
return 'mille';
} else if ($a<2000){
return int2str(1000).' '.int2str($a%1000).' ';
} else if ($a<1000000){
return int2str((int)($a/1000)).' '.int2str(1000).' '.int2str($a%1000);
}
else if ($a==1000000){
return 'millions';
}
else if ($a<2000000){
return int2str(1000000).' '.int2str($a%1000000).' ';
}
else if ($a<1000000000){
return int2str((int)($a/1000000)).' '.int2str(1000000).' '.int2str($a%1000000);
}
}
/**
 * Html2Pdf Library - example
 *
 * HTML => PDF converter
 * distributed under the OSL-3.0 License
 *
 * @package   Html2pdf
 * @author    Laurent MINGUET <webmaster@html2pdf.fr>
 * @copyright 2017 Laurent MINGUET
 */
require_once '/../vendor/autoload.php';
require_once '../../php/config/database.php';

    // INFORMATION DE FACTURE

$id_facturation = 0;
$numero_facture = "";
$date_facturation = "";

if(isset($_GET['id_facturation'])){
    $id_facturation = $_GET['id_facturation'];
}

if(isset($_GET['numero_facture'])){
    $numero_facture = $_GET['numero_facture'];
}

if(isset($_GET['date_facturation'])){
    $date_facturation = $_GET['date_facturation'];
}

if(isset($_GET['nom_client'])){
    $nom_client = $_GET['nom_client'];
}

if(isset($_GET['adresse_client'])){
    $adresse_client = $_GET['adresse_client'];
}

if(isset($_GET['telephone_1'])){
    $telephone_1 = $_GET['telephone_1'];
}

if(isset($_GET['telephone_2'])){
    $telephone_2 = $_GET['telephone_2'];
}

if(isset($_GET['email_client'])){
    $email_client = $_GET['email_client'];
}

if(isset($_GET['type_client'])){
    $type_client = $_GET['type_client'];
}

$taux_tv = 0;

$taux ="";

if($type_client === "Entreprise"){
    $taux_tv = 0.2;
    $taux = " (20 %)";
}else if($type_client === "Particulier"){
    $taux_tv = 0.1;
    $taux = " (10 %)";
}

$siret ="";
$adresse_agence ="";
$tel_agence ="";
$email_agence ="";

$sql = "SELECT * FROM `agence`";
    
$agences = array();

if($result = mysqli_query($con, $sql)){

    $i = 0 ;

    while($agence = mysqli_fetch_assoc($result)){
        
        $siret = $agence['description'];
        $adresse_agence = $agence['adresse'];
        $agences[$i]['nom'] = $agence['nom'];
        $agences[$i]['logo'] = $agence['logo'];
        $tel_agence = $agence['telephone'];
        $email_agence = $agence['email'];

        $i++;

    }

    //echo json_encode($agences);

}

$ville_client = "";
$code_postal = "";

$sql = "SELECT * FROM `client` WHERE nom_client = '{$nom_client}'";
    
$clients = array();

if($result = mysqli_query($con, $sql)){

    $i = 0 ;

    while($client = mysqli_fetch_assoc($result)){
        
        $ville_client = $client['ville_client'];
        $code_postal = $client['code_postal'];

    }

}

    
use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

try {
    // get the HTML
    ob_start();
    include dirname(__FILE__).'/res/facture_client.php';
   // include dirname(__FILE__).'/res/example07b.php';
    $content = ob_get_clean();

    $html2pdf = new Html2Pdf('P', 'A4', 'fr');
    $html2pdf->pdf->SetDisplayMode('fullpage');
    $html2pdf->writeHTML($content);
    $html2pdf->output($numero_facture.'.pdf');
} catch (Html2PdfException $e) {
    $html2pdf->clean();

    $formatter = new ExceptionFormatter($e);
    echo $formatter->getHtmlMessage();
}