<?php

$date_du;
$date_au;

if(isset($_GET['date_du'])){
    $date_du = $_GET['date_du'];
}

if(isset($_GET['date_au'])){
    $date_au = $_GET['date_au'];
}

$qua = 0;
$prix = 0;
$total = 0;

$qua_t =0;
$prix_1= 0;
$total_1=0;

$rapport = -1;
$etat = -1;
$filtre_affectation;

$options = 0;

$id_client;
$id_utilisateur;
$libelle = "RAPPORTS";

require_once '/../vendor/autoload.php';
require_once '../../php/config/database.php';

if(isset($_GET['id_rapport'])){

    $rapport = (int)$_GET['id_rapport'];
    
    if(isset($_GET['filtre_affectation'])){
        $filtre_affectation = (int)$_GET['filtre_affectation'];
    }

    if(isset($_GET['id_client'])){
        $id_client = (int)$_GET['id_client'];
    }

    $nom_utilisateur = "";

    if(isset($_GET['id_utilisateur'])){
        
        $id_utilisateur = (int)$_GET['id_utilisateur'];

        $sql = "SELECT * FROM `utilisateur` WHERE id_utilisateur = '{$id_utilisateur}'";
    
        $utilisateurs = array();

        if($result = mysqli_query($con, $sql)){

            $i = 0 ;

            while($utilisateur = mysqli_fetch_assoc($result)){
                $nom_utilisateur = $utilisateur['nom_utilisateur']. ' '. $utilisateur['prenom_utilisateur'];
            }

}

    }

    if($rapport == 2){
        $libelle = "MISSIONS";
    }else if($rapport == 3){
        $libelle = "VALIDATIONS";
    }else if($rapport == 4){
        $libelle = "PAIEMENTS";
    }

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
//require_once dirname(__FILE__).'/../../vendor/autoload.php';


use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

try {
    
    // if(isset($_GET['depense']))
    if(true){
        // get the HTML
        ob_start();

        //
    
?>

        <style type="text/css">
<!--
table { vertical-align: top; }
tr    { vertical-align: top; }
td    { vertical-align: top; }
-->
</style>
<page backcolor="#FEFEFE" backimg="./res/bas_page.png" backimgx="center" backimgy="bottom" backimgw="100%" backtop="0" backbottom="30mm" footer="date;time;page" style="font-size: 12pt">
    <bookmark title="Lettre" level="0" ></bookmark>

    <table cellspacing="0" style="width: 100%; text-align: center; font-size: 14px">
        <tr>

            <td style="width: 25%; color: #444444; text-align:left;">
                <img style="width: 80%;" src="./res/logo.jpg" alt="Logo"><br> 
                   
                </td>
            <td style="width: 25%;">
                
            </td>
            
        </tr>
            <td style="width: 100%; text-align:left; font-size:20px;">
            <br> SAS SERVICE DE GRACE <br> 
            </td>
        <tr>
        </tr>
        <tr>
            <td style="width: 60%; color: #444444; text-align:left;">
                <br>
                <br>
                <br> 
                <br> 
                No Siret : <?= $siret ;?> <br>
                Adresse : <?= $adresse_agence ;?> <br>
                Tel : <?= $tel_agence; ?> <br>
                Email : <?= $email_agence ;?> <br>
                <br>
            </td>
            <td style="width: 25%;">
                
            </td>
        </tr>
    </table>

    <br>
    <br>
   
    <table cellspacing="0" style="width: 100%; text-align: left;font-size: 10pt">
        <tr>
            <td style="width:50%;"></td>
            <td style="width:50%; text-align:right;">Yaoundé, le <?php echo date('d/m/Y'); ?></td>
        </tr>
    </table>
    <br>
    <i>

    <?php
        if($filtre_affectation !== 2 && $rapport !== 4){
    ?>
        <b><u>Intitulé </u>: &laquo; LISTE DES <?= $libelle ;?> : <?= $date_du; ?> AU <?= $date_au; ?></b><br>

        <?php
            }else{

        ?>
            <b><u>Intitulé </u>: &laquo; LISTE DES <?= $libelle ;?> : <?= $date_du; ?> AU <?= $date_au; ?> de <?= $nom_utilisateur ;?> </b><br>
        <?php
            }
        ?>
    </i>
    <br>
    
    <table cellspacing="2" style="width: 100%; border: solid 1px black; background: #F7F7F7; font-size: 10pt;">
    <?php
        if($filtre_affectation !== 2 && $rapport !== 4){
    ?>
        <colgroup>
            <col style="width: 3%; text-align: left">
            <col style="width: 7%; text-align: left">
            <col style="width: 15%; text-align: left">
            <col style="width: 20%; text-align: left">
            <col style="width: 20%; text-align: left">
            <col style="width: 7%; text-align: left">
            <col style="width: 7%; text-align: left">
            <col style="width: 7%; text-align: left">
            <col style="width: 7%; text-align: left">
            <col style="width: 7%; text-align: left">
        </colgroup>
        <thead>
            <tr style="background: #E7E7E7;">
                <th style="border-bottom: solid 1px black;">No</th>
                <th style="border-bottom: solid 1px black;">DATE INTERV</th>
                <th style="border-bottom: solid 1px black;">MISSION</th>
                <th style="border-bottom: solid 1px black;">CLIENTS</th>
                <th style="border-bottom: solid 1px black;">PERSONNEL</th>
                <th style="border-bottom: solid 1px black;">DUREE</th>
                <th style="border-bottom: solid 1px black;">TARIF H CLIENT</th>
                <th style="border-bottom: solid 1px black;">TARIF H PERSO</th>
                <th style="border-bottom: solid 1px black;">MONTANT</th>
                <th style="border-bottom: solid 1px black;">COMM.</th>
            </tr>
        </thead>
        <tbody>
<?php
    }else{
?>
        <colgroup>
            <col style="width: 5%; text-align: left">
            <col style="width: 10%; text-align: left">
            <col style="width: 30%; text-align: left">
            <col style="width: 25%; text-align: left">
            <col style="width: 10%; text-align: left">
            <col style="width: 10%; text-align: left">
            <col style="width: 10%; text-align: left">
        </colgroup>
        <thead>
            <tr style="background: #E7E7E7;">
                <th style="border-bottom: solid 1px black;">No</th>
                <th style="border-bottom: solid 1px black;">DATE INTERV</th>
                <th style="border-bottom: solid 1px black;">MISSION</th>
                <th style="border-bottom: solid 1px black;">CLIENTS</th>
                <th style="border-bottom: solid 1px black;">DUREE</th>
                <th style="border-bottom: solid 1px black;">TARIF HORAIRE</th>
                <th style="border-bottom: solid 1px black;">MONTANT</th>
            </tr>
        </thead>
        <tbody>
<?php
    }
?>
<?php

if($rapport == 2){
    // les missions independament de l'etat

    if($filtre_affectation == 0){

        //Toutes les missions
        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, 
        affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
        `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
        FROM affectation, utilisateur, mission, client
        WHERE affectation.id_client = client.id_client 
        AND affectation.id_mission = mission.id_mission 
        AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
        AND affectation.id_utilisateur = utilisateur.id_utilisateur
        ORDER BY id_affectation DESC";
        
    }else if( $filtre_affectation == 1 ){

        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, 
        affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
        `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
        FROM affectation, utilisateur, mission, client
        WHERE affectation.id_client = client.id_client 
        AND affectation.id_mission = mission.id_mission 
        AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}' 
        AND affectation.id_utilisateur = utilisateur.id_utilisateur
        AND affectation.id_client = '{$id_client}'
        ORDER BY date_mission DESC";

    }else if ( $filtre_affectation == 2 ) {

        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, 
        affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
        `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
        FROM affectation, utilisateur, mission, client
        WHERE affectation.id_client = client.id_client 
        AND affectation.id_mission = mission.id_mission 
        AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}' 
        AND affectation.id_utilisateur = utilisateur.id_utilisateur
        AND affectation.id_utilisateur = '{$id_utilisateur}'
        ORDER BY date_mission DESC";

    }
    
}else if($rapport == 3){
    //Les validations
    $etat = 1;

    if($filtre_affectation == 0){

        //Toutes les missions
        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, 
        affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
        `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
        FROM affectation, utilisateur, mission, client
        WHERE affectation.id_client = client.id_client 
        AND affectation.id_mission = mission.id_mission 
        AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
        AND statut = '{$etat}'
        AND affectation.id_utilisateur = utilisateur.id_utilisateur
        ORDER BY id_affectation DESC";
        
    }else if( $filtre_affectation == 1 ){

        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, 
        affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
        `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
        FROM affectation, utilisateur, mission, client
        WHERE affectation.id_client = client.id_client 
        AND affectation.id_mission = mission.id_mission 
        AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
        AND statut = '{$etat}'
        AND affectation.id_utilisateur = utilisateur.id_utilisateur
        AND affectation.id_client = '{$id_client}'
        ORDER BY date_mission DESC";

    }else if ( $filtre_affectation == 2 ) {

        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, 
        affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
        `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
        FROM affectation, utilisateur, mission, client
        WHERE affectation.id_client = client.id_client 
        AND affectation.id_mission = mission.id_mission 
        AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}' 
        AND statut = '{$etat}'
        AND affectation.id_utilisateur = utilisateur.id_utilisateur
        AND affectation.id_utilisateur = '{$id_utilisateur}'
        ORDER BY date_mission DESC";

    }

}else if($rapport == 4){
    //Les paiements
    $etat = 3;

    if($filtre_affectation == 0){

        //Toutes les paiements
        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, 
        affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
        `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
        FROM affectation, utilisateur, mission, client
        WHERE affectation.id_client = client.id_client 
        AND affectation.id_mission = mission.id_mission 
        AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
        AND statut = '{$etat}'
        AND affectation.id_utilisateur = utilisateur.id_utilisateur
        ORDER BY id_affectation DESC";
        
    }else if( $filtre_affectation == 1 ){

        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, 
        affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
        `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
        FROM affectation, utilisateur, mission, client
        WHERE affectation.id_client = client.id_client 
        AND affectation.id_mission = mission.id_mission 
        AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}'
        AND statut = '{$etat}'
        AND affectation.id_utilisateur = utilisateur.id_utilisateur
        AND affectation.id_client = '{$id_client}'
        ORDER BY date_mission DESC";

    }else if ( $filtre_affectation == 2 ) {
        
        $sql = "SELECT `id_affectation`, affectation.id_mission, affectation.id_client, affectation.id_utilisateur, affectation.duree, 
        affectation.montant, affectation.commisions, tarif_horaire_client, tarif_horaire_personnel, affectation.frequence, 
        affectation.date_mission, affectation.heure_mission, statut, `nom_client`,`prenom_utilisateur`,`nom_utilisateur`, `mission`, 
        `description`,`nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, `code_acces_1`, `code_acces_2`, `type_client`
        FROM affectation, utilisateur, mission, client
        WHERE affectation.id_client = client.id_client 
        AND affectation.id_mission = mission.id_mission 
        AND affectation.date_mission BETWEEN '{$date_du}' AND '{$date_au}' 
        AND statut = '{$etat}'
        AND affectation.id_utilisateur = utilisateur.id_utilisateur
        AND affectation.id_utilisateur = '{$id_utilisateur}'
        ORDER BY date_mission DESC";

    }

}

$i = 0 ;

 if($result = mysqli_query($con,$sql)){

     $affectations = array();

     while($affectation = mysqli_fetch_assoc($result)){
         
         $affectations[$i]['id_mission'] = $affectation['id_mission'];
         $affectations[$i]['id_affectation'] = $affectation['id_affectation'];
         $affectations[$i]['id_client'] = $affectation['id_client'];
         $affectations[$i]['id_utilisateur'] = $affectation['id_utilisateur'];
         $affectations[$i]['duree'] = $affectation['duree'];
         $affectations[$i]['montant'] = $affectation['montant'];

         //$affectations[$i]['total_facture'] = $affectation['total_facture'];
         //$affectations[$i]['tarif_horaire_option'] = $affectation['tarif_horaire_option'];
         //$affectations[$i]['montant_option'] = $affectation['montant_option'];
        
         $affectations[$i]['commisions'] = $affectation['commisions'];
         $affectations[$i]['frequence'] = $affectation['frequence'];
         $affectations[$i]['date_mission'] = $affectation['date_mission'];
         $affectations[$i]['heure_mission'] = $affectation['heure_mission'];
         $affectations[$i]['nom_client'] = $affectation['nom_client'];
         $affectations[$i]['prenom_utilisateur'] = $affectation['prenom_utilisateur'];
         $affectations[$i]['nom_utilisateur'] = $affectation['nom_utilisateur'];
         $affectations[$i]['mission'] = $affectation['mission'];

         $affectations[$i]['statut'] = $affectation['statut'];
         $affectations[$i]['description'] = $affectation['description'];

         $affectations[$i]['nom_client'] = $affectation['nom_client'];
         $affectations[$i]['adresse_client'] = $affectation['adresse_client'];
         $affectations[$i]['telephone_1'] = $affectation['telephone_1'];
         $affectations[$i]['telephone_2'] = $affectation['telephone_2'];
         $affectations[$i]['email_client'] = $affectation['email_client'];
         $affectations[$i]['code_acces_1'] = $affectation['code_acces_1'];
         $affectations[$i]['code_acces_2'] = $affectation['code_acces_2'];
         $affectations[$i]['type_client'] = $affectation['type_client'];
         
         $affectations[$i]['tarif_horaire_personnel'] = $affectation['tarif_horaire_personnel'];
         $affectations[$i]['tarif_horaire_client'] = $affectation['tarif_horaire_client'];

         $qua = $affectation['duree'];
         $prix = $affectation['tarif_horaire_client'];
         $total+= $prix*$qua;

         $qua_t += $qua;
         $prix_1= $affectation['tarif_horaire_personnel'];
         $total_1+= $prix_1*$qua ;

         $i++;

     }

}

    $nb =  $i;

    for ($k=0; $k<$nb; $k++) {
        
            if( $filtre_affectation !== 2 && $rapport !== 4){

?>
            <tr>
                <td><?php echo $k+1; ?></td>
                <td><?php echo $affectations[$k]['date_mission'] ; ?> <br> <?php echo $affectations[$k]['heure_mission'] ; ?>  </td>
                <td><?php echo $affectations[$k]['mission'] ; ?> </td>
                <td><?php echo $affectations[$k]['nom_client'] ; ?> </td>
                <td><?php echo $affectations[$k]['nom_utilisateur'] ; ?> <?php echo $affectations[$k]['prenom_utilisateur'] ; ?> </td>
                <td><?php echo $affectations[$k]['duree'] ; ?> heures  </td>
                <td><?php echo $affectations[$k]['tarif_horaire_client'] ; ?> &euro;</td>
                <td><?php echo $affectations[$k]['tarif_horaire_personnel'] ; ?> &euro;</td>
                <td><?php echo $affectations[$k]['montant'] ; ?> &euro;</td>
                <td><?php echo $affectations[$k]['commisions'] ; ?> &euro;</td>
            </tr>
<?php
            }else{

        ?>

            <tr>
                <td><?php echo $k+1; ?></td>
                <td><?php echo $affectations[$k]['date_mission'] ; ?> <br> <?php echo $affectations[$k]['heure_mission'] ; ?>  </td>
                <td><?php echo $affectations[$k]['mission'] ; ?> </td>
                <td><?php echo $affectations[$k]['nom_client'] ; ?> </td>
                <td><?php echo $affectations[$k]['duree'] ; ?> H  </td>
                <td><?php echo $affectations[$k]['tarif_horaire_personnel'] ; ?> &euro;</td>
                <td><?php echo $affectations[$k]['commisions'] ; ?> &euro;</td>
            </tr>

        <?php

            }
    }

    if($filtre_affectation !== 2 && $rapport !== 4){

?>
            <tr style="background: #E7E7E7;">
                <th colspan="8" style="border-top: solid 1px black; text-align: right;">DUREE TOTALE :  </th>
                <th colspan="2" style="border-top: solid 1px black; text-align: left; "><?php echo number_format($qua_t, 2, ',', ' '); ?> H</th>
            </tr>
            <tr style="background: #E7E7E7;">
                <th colspan="8" style="border-top: solid 1px black; text-align: right;">TOTAL A FACTURER : </th>
                <th colspan="2" style="border-top: solid 1px black; text-align: left;"><?php echo number_format($total, 2, ',', ' '); ?> &euro;</th>
            </tr>
            <tr style="background: #E7E7E7;">
                <th colspan="8" style="border-top: solid 1px black; text-align: right;">TOTAL A PAYER : </th>
                <th colspan="2" style="border-top: solid 1px black; text-align: left;"><?php echo number_format($total_1, 2, ',', ' '); ?> &euro;</th>
            </tr>
<?php
    }else{
?>          
            <tr style="background: #E7E7E7;">
                <th colspan="5" style="border-top: solid 1px black; text-align: right;">DUREE TOTALE :  </th>
                <th colspan="2" style="border-top: solid 1px black; text-align: left; "><?php echo number_format($qua_t, 2, ',', ' '); ?> H</th>
            </tr>
            
            <tr style="background: #E7E7E7;">
                <th colspan="5" style="border-top: solid 1px black; text-align: right;">TOTAL : </th>
                <th colspan="2" style="border-top: solid 1px black; text-align: left;"><?php echo number_format($total_1, 2, ',', ' '); ?> &euro;</th>
            </tr>

<?php
    }
?>
        </tbody>
    </table>
    <br>
   
</page>

<?php
        //
        //include dirname(__FILE__).'/pages/depense.php';

        // include dirname(__FILE__).'/res/example07b.php';
        $content = ob_get_clean();

        if($filtre_affectation !== 2 && $rapport !== 4){
            $html2pdf = new Html2Pdf('L', 'A4', 'fr');
        }else{
            $html2pdf = new Html2Pdf('P', 'A4', 'fr');
        }
        
        $html2pdf->pdf->SetDisplayMode('fullpage');
        $html2pdf->writeHTML($content);
        $html2pdf->output('clients.pdf');

    }else{
        //include dirname(__FILE__).'/pages/about.php';
    }
    
   
} catch (Html2PdfException $e) {
    $html2pdf->clean();

    $formatter = new ExceptionFormatter($e);
    echo $formatter->getHtmlMessage();
}

?>
