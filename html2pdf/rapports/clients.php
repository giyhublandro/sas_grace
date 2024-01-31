<?php

$libelle ="";

if(isset($_GET['date_du'])){
    $date_du = $_GET['date_du'];
}

if(isset($_GET['date_au'])){
    $date_au = $_GET['date_au'];
}

$rapport = -1;

if(isset($_GET['type_client'])){
    $rapport = 1;
    $type_client = $_GET['type_client'];
    $libelle = "PAR TYPE";
}else if(isset($_GET['source'])){
    $rapport = 2;
    $id_source = (int)$_GET['source'];
    $libelle = "PAR SOURCE";
}else if(isset($_GET['frequence'])){
    $rapport = 3;
    $frequence = (int)$_GET['frequence'];
    $libelle = "PAR FREQUENCE";
}else{
    $rapport = 0;
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
        <b><u>Intitulé </u>: &laquo; LISTE DES CLIENTS <?= $libelle; ?> DU <?= $date_du; ?> AU <?= $date_au; ?>  </b><br>
    </i>
    <br>
    
    <table cellspacing="2" style="width: 100%; border: solid 1px black; background: #F7F7F7; font-size: 10pt;">
        <colgroup>
            <col style="width: 3%; text-align: left">
            <col style="width: 7%; text-align: left">
            <col style="width: 25%; text-align: left">
            <col style="width: 23%; text-align: left">
            <col style="width: 23%; text-align: left">
            <col style="width: 10%; text-align: left">
            <col style="width: 10%; text-align: left">
        </colgroup>
        <thead>
            <tr style="background: #E7E7E7;">
                <th style="border-bottom: solid 1px black;">No</th>
                <th style="border-bottom: solid 1px black;">DATE CREATION</th>
                <th style="border-bottom: solid 1px black;">CLIENTS</th>
                <th style="border-bottom: solid 1px black;">ADRESSE</th>
                <th style="border-bottom: solid 1px black;">CONTACTS</th>
                <th style="border-bottom: solid 1px black;">ACCES</th>
                <th style="border-bottom: solid 1px black;">SOURCE</th>
            </tr>
        </thead>
        <tbody>
<?php

 if ($rapport == 1){
    $sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, 
    `code_acces_1`, `code_acces_2`, `type_client`, client.id_source, `date_creation`, `source` FROM `client`,`source` 
    WHERE type_client =  '{$type_client}' AND client.id_source=source.id_source AND date_creation BETWEEN '{$date_du}' AND '{$date_au}' ORDER BY date_creation DESC";
}else if ($rapport == 2){
    $sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, 
    `code_acces_1`, `code_acces_2`, `type_client`, client.id_source, `date_creation`, `source` FROM `client`,`source` 
    WHERE source.id_source =  '{$id_source}' AND client.id_source=source.id_source 
    AND date_creation BETWEEN '{$date_du}' AND '{$date_au}' ORDER BY date_creation DESC";
}else if ($rapport == 3){
    $sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, 
    `code_acces_1`, `code_acces_2`, `type_client`, client.id_source, `date_creation`, `source` FROM `client`,`source` 
    WHERE frequence = '{$frequence}' AND date_creation BETWEEN '{$date_du}' AND '{$date_au}' ORDER BY date_creation DESC";
}else {
    $sql = "SELECT `id_client`, `nom_client`, `adresse_client`, `telephone_1`, `telephone_2`, `email_client`, 
    `code_acces_1`, `code_acces_2`, `type_client`, client.id_source, `date_creation`, `source` FROM `client`, `source` 
    WHERE client.id_source = source.id_source AND date_creation BETWEEN '{$date_du}' AND '{$date_au}' ORDER BY date_creation DESC";
}

$i = 0 ;
            
if($result = mysqli_query($con, $sql)){

    $clients = array();

    while($client = mysqli_fetch_assoc($result)){
        
        $clients[$i]['nom_client'] = $client['nom_client'];
        $clients[$i]['adresse_client'] = $client['adresse_client'];
        $clients[$i]['telephone_1'] = $client['telephone_1'];
        $clients[$i]['telephone_2'] = $client['telephone_2'];
        $clients[$i]['email_client'] = $client['email_client'];
        $clients[$i]['code_acces_1'] = $client['code_acces_1'];
        $clients[$i]['code_acces_2'] = $client['code_acces_2'];
        $clients[$i]['type_client'] = $client['type_client'];
        $clients[$i]['id_source'] = $client['id_source'];
        $clients[$i]['date_creation'] = $client['date_creation'];
        $clients[$i]['source'] = $client['source'];

        $i++;

    }

}

    $nb =  $i;

    for ($k=0; $k<$nb; $k++) {
        
?>
            <tr>
                <td><?php echo $k+1; ?></td>
                <td><?php echo $clients[$k]['date_creation'] ; ?></td>
                <td><?php echo $clients[$k]['nom_client'] ; ?> <br> ( <?php echo $clients[$k]['type_client'] ; ?>) </td>
                <td><?php echo $clients[$k]['adresse_client'] ; ?></td>
                <td><?php echo $clients[$k]['email_client'] ; ?> <br> <?php echo $clients[$k]['telephone_1'] ; ?> <br> <?php echo $clients[$k]['telephone_2'] ; ?>  </td>
                <td><?php echo $clients[$k]['code_acces_1'] ; ?> <br> <?php echo $clients[$k]['code_acces_2'] ; ?> </td>
                <td><?php echo $clients[$k]['source'] ; ?></td>
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
