<?php

if(isset($_GET['date_du'])){
    $date_du = $_GET['date_du'];
}

if(isset($_GET['date_au'])){
    $date_au = $_GET['date_au'];
}

if(isset($_GET['id_profil'])){

    $id_profil = $_GET['id_profil'];
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

$online = false;

require_once '/../vendor/autoload.php';
require_once '../../php/config/database.php';

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

            <td style="width: 45%; color: #444444; text-align:left;">
                <img style="width: 75%;" src="./res/logo.jpg" alt="Logo"><br>
                   
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
        <b><u>INTITULE </u> : &laquo; LISTE DES UTILISATEURS <?= $date_du; ?> AU <?= $date_au; ?> &raquo; </b><br>
    </i>
    <br>
    
    <table cellspacing="2" style="width: 100%; border: solid 1px black; background: #F7F7F7; font-size: 10pt;">
        <colgroup>
            <col style="width: 3%; text-align: left">
            <col style="width: 25%; text-align: left">
            <col style="width: 16%; text-align: left">
            <col style="width: 22%; text-align: left">
            <col style="width: 13%; text-align: left">
            <col style="width: 14%; text-align: left">
            <col style="width: 7%; text-align: left">
        </colgroup>
        <thead>
            <tr style="background: #E7E7E7;">
                <th style="border-bottom: solid 1px black;">No</th>
                <th style="border-bottom: solid 1px black;">UITLISATEUR</th>
                <th style="border-bottom: solid 1px black;">ADRESSE</th>
                <th style="border-bottom: solid 1px black;">CONTACTS</th>
                <th style="border-bottom: solid 1px black;">IDENTITE</th>
                <th style="border-bottom: solid 1px black;">PROFIL</th>
                <th style="border-bottom: solid 1px black;">DATE CREATION</th>
            </tr>
        </thead>
        <tbody>
<?php

 if ($id_profil == 0){

    $sql = "SELECT  `id_utilisateur`, utilisateur.id_profil, `nom_utilisateur`, `prenom_utilisateur`, `email_utilisateur`, 
    `mot_de_passe_utilisateur`, `adresse`, `telephone`, `sex`, `type_identite`, `num_piece_identite`, `date_expiration`, `actif`, 
    `super_admin`, `nom_profil`,`date_creation`
    FROM utilisateur INNER JOIN profil 
    WHERE super_admin = 0 AND utilisateur.id_profil = profil.id_profil
    AND date_creation BETWEEN '{$date_du}' AND '{$date_au}'
    ORDER BY nom_utilisateur ASC";

}else{

   $sql = "SELECT  `id_utilisateur`, utilisateur.id_profil, `nom_utilisateur`, `prenom_utilisateur`, `email_utilisateur`, 
    `mot_de_passe_utilisateur`, `adresse`, `telephone`, `sex`, `type_identite`, `num_piece_identite`, `date_expiration`, `actif`, 
    `super_admin`, `nom_profil`,`date_creation`
    FROM utilisateur INNER JOIN profil 
    WHERE super_admin = 0 AND utilisateur.id_profil = profil.id_profil AND utilisateur.id_profil =  '{$id_profil}'
    AND date_creation BETWEEN '{$date_du}' AND '{$date_au}'
    ORDER BY nom_utilisateur ASC";

}


$i = 0 ;
            
if($result = mysqli_query($con, $sql)){

    $utilisateurs = array();

    while($utilisateur = mysqli_fetch_assoc($result)){
        
        $utilisateurs[$i]['id_profil'] = $utilisateur['id_profil'];
        $utilisateurs[$i]['nom_utilisateur'] = $utilisateur['nom_utilisateur'];
        $utilisateurs[$i]['prenom_utilisateur'] = $utilisateur['prenom_utilisateur'];
        $utilisateurs[$i]['adresse'] = $utilisateur['adresse'];
        $utilisateurs[$i]['mot_de_passe_utilisateur'] = $utilisateur['mot_de_passe_utilisateur'];
        $utilisateurs[$i]['id_utilisateur'] = $utilisateur['id_utilisateur'];
        $utilisateurs[$i]['telephone'] = $utilisateur['telephone'];
        $utilisateurs[$i]['email_utilisateur'] = $utilisateur['email_utilisateur'];

        if ($utilisateur['type_identite'] == "1"){
            $utilisateurs[$i]['type_identite'] = "PASSPORT";
        }else if($utilisateur['type_identite'] == "0"){
            $utilisateurs[$i]['type_identite'] = "CARTE NATIONALE";
        }

        $utilisateurs[$i]['sex'] = $utilisateur['sex'];
        
        $utilisateurs[$i]['num_piece_identite'] = $utilisateur['num_piece_identite'];
        $utilisateurs[$i]['date_expiration'] = $utilisateur['date_expiration'];
        $utilisateurs[$i]['actif'] = $utilisateur['actif'];
        $utilisateurs[$i]['nom_profil'] = $utilisateur['nom_profil'];
        $utilisateurs[$i]['date_creation'] = $utilisateur['date_creation'];

        $i++;

    }

}

    $nb =  $i;

    for ($k=0; $k<$nb; $k++) {
        
?>
            <tr>
                <td><?php echo $k+1; ?></td>
                <td><?php echo $utilisateurs[$k]['nom_utilisateur'] ; ?>  <?php echo $utilisateurs[$k]['prenom_utilisateur'] ; ?> </td>
                <td><?php echo $utilisateurs[$k]['adresse'] ; ?></td>
                <td><?php echo $utilisateurs[$k]['email_utilisateur'] ; ?> <br> <?php echo $utilisateurs[$k]['telephone'] ; ?>  </td>
                <td><?php echo $utilisateurs[$k]['type_identite'] ; ?> <br> <?php echo $utilisateurs[$k]['num_piece_identite'] ; ?> <br> <?php echo $utilisateurs[$k]['date_expiration'] ; ?> </td>
                <td><?php echo $utilisateurs[$k]['nom_profil'] ; ?></td>
                <td><?php echo $utilisateurs[$k]['date_creation'] ; ?></td>
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

        $html2pdf = new Html2Pdf('L', 'A4', 'fr');
        $html2pdf->pdf->SetDisplayMode('fullpage');
        $html2pdf->writeHTML($content);
        $html2pdf->output('utilisateurs.pdf');

    }else{
        //include dirname(__FILE__).'/pages/about.php';
    }
    
   
} catch (Html2PdfException $e) {
    $html2pdf->clean();

    $formatter = new ExceptionFormatter($e);
    echo $formatter->getHtmlMessage();
}

?>
