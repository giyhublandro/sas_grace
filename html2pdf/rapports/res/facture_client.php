

<style type="text/css">
<!--
table { vertical-align: top; }
tr    { vertical-align: top; }
td    { vertical-align: top; }
-->

<?php
    $sql = "SELECT `id_affectation`, affectation.id_facturation, affectation.id_mission, affectation.duree, affectation.montant, affectation.commisions, tarif_horaire_client, 
    affectation.date_mission, affectation.heure_mission, mission.mission, montant_option, tarif_horaire_option
    FROM affectation, facturation, mission
    WHERE affectation.id_facturation = facturation.id_facturation AND affectation.id_mission = mission.id_mission
    AND affectation.id_facturation = $id_facturation
    ORDER BY id_affectation ASC";
    
    $affectations = array();
    $i = 0 ;
    
    if($result = mysqli_query($con,$sql)){

    }
?>

</style>
<page backcolor="#FEFEFE" backimgx="center" backimgy="bottom" backimgw="100%" backtop="0" backbottom="30mm" style="font-size: 12pt">
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
    <table cellspacing="0" style="width: 100%; text-align: left; font-size: 11pt;">
        <tr>
            <td style="width:40%;"></td>
            <td style="width:14%; ">Client :</td>
            <td style="width:46%"> <?= $nom_client; ?> </td>
        </tr>
        <tr>
            <td style="width:40%;"></td>
            <td style="width:14%; ">Adresse :</td>
            <td style="width:46%"><?= $adresse_client; ?></td>
        </tr>
        <tr>
            <td style="width:40%;"></td>
            <td style="width:14%; ">Ville :</td>
            <td style="width:46%"><?= $ville_client; ?></td>
        </tr>
        <tr>
            <td style="width:40%;"></td>
            <td style="width:14%; "> Code Postal :</td>
            <td style="width:46%"><?= $code_postal; ?></td>
        </tr>
        <tr>
            <td style="width:40%;"></td>
            <td style="width:14%; ">Email :</td>
            <td style="width:46%"><?= $email_client; ?></td>
        </tr>
        <tr>
            <td style="width:40%;"></td>
            <td style="width:14%; ">Tel :</td>
            <td style="width:46%"><?= $telephone_1; ?> </td>
        </tr>
    </table>
    <br>
    <br>
    <table cellspacing="0" style="width: 100%; text-align: left;font-size: 10pt">
        <tr>
            <td style="width:70%;"></td>
            <td style="width:50%; ">Le <?= $date_facturation ;?></td>
        </tr>
    </table>
    <br>
    <i>
        Date de facturation : <?= $date_facturation ;?> <br>
        <b><u>Facture No :  </u> &laquo; <?= $numero_facture; ?> &raquo;</b><br>
    </i>
    <br>
   
    <br>
    <br>
    Veuillez trouver ci-dessous le détail de votre facture :<br>
    <br>
    <table cellspacing="0" style="width: 100%; border: solid 1px black; background: #F7F7F7; font-size: 10pt;">
        <colgroup>
            <col style="width: 20%; text-align: left">
            <col style="width: 31%; text-align: left">
            <col style="width: 13%; text-align: left">
            <col style="width: 13%; text-align: right">
            <col style="width: 10%; text-align: center">
            <col style="width: 13%; text-align: right">
        </colgroup>
        <thead>
            <tr style="background: #E7E7E7;">
                <th style="border-bottom: solid 1px black;">Date d'intervention</th>
                <th style="border-bottom: solid 1px black;">Type d'intervention</th>
                <th style="border-bottom: solid 1px black;">Options</th>
                <th style="border-bottom: solid 1px black;">Prix Horaire</th>
                <th style="border-bottom: solid 1px black;">Durée</th>
                <th style="border-bottom: solid 1px black;">Prix Net</th>
            </tr>
        </thead>
        <tbody>
<?php

//on ne facture que les missions validees statut = 1

$sql = "SELECT `id_affectation`, affectation.id_facturation, affectation.id_mission, affectation.duree, affectation.montant, affectation.commisions, tarif_horaire_client, 
affectation.date_mission, affectation.heure_mission, mission.mission, montant_option, tarif_horaire_option
FROM affectation, facturation, mission
WHERE affectation.id_facturation = facturation.id_facturation AND affectation.id_mission = mission.id_mission
AND affectation.id_facturation = $id_facturation
ORDER BY id_affectation ASC";

$affectations = array();
$i = 0 ;

if($result = mysqli_query($con,$sql)){

    while($affectation = mysqli_fetch_assoc($result)){
        
        $affectations[$i]['duree'] = $affectation['duree'];
        $affectations[$i]['montant'] = $affectation['montant'];
        $affectations[$i]['montant_option'] = $affectation['montant_option'];
        $affectations[$i]['commisions'] = $affectation['commisions'];
        $affectations[$i]['date_mission'] = $affectation['date_mission'];
        $affectations[$i]['heure_mission'] = $affectation['heure_mission'];
        $affectations[$i]['mission'] = $affectation['mission'];
        $affectations[$i]['tarif_horaire_client'] = $affectation['tarif_horaire_client'];
        $affectations[$i]['tarif_horaire_option'] = $affectation['tarif_horaire_option'];

        $i++;

    }

}

    $nb = $i;
    $total = 0;
    $totalHt = 0;
    $produits = array();
    $taxe = 0;
    $option = 0;
    $tarif_horaire_option = 0;
    $enLettre = "";

    for ($k=0; $k<$nb; $k++) {

        $date_mission = $affectations[$k]['date_mission'];
        $nom = $affectations[$k]['mission'];
        $qua = $affectations[$k]['duree'];
        $prix = $affectations[$k]['tarif_horaire_client'];
        $option = $affectations[$k]['montant_option'];
        $tarif_horaire_option = $affectations[$k]['tarif_horaire_option'];
        $total+= ($prix * $qua) + $option ;
        $taxe+= $taux_tv*( ($prix*$qua) + $option);

?>
            <tr>
                <td><?php echo $date_mission; ?></td>
                <td><?php echo $nom; ?></td>
                <td><?php echo number_format($tarif_horaire_option, 2, ',', ' '); ?> &euro;</td>
                <td><?php echo number_format($prix, 2, ',', ' '); ?> &euro;</td>
                <td><?php echo $qua; ?> H </td>
                <td><?php echo number_format(($prix*$qua) + $option, 2, ',', ' '); ?> &euro;</td>
            </tr>
<?php
    }
    $totalHt = $total - $taxe;

?>
            <tr style="background: #E7E7E7;">
                <th colspan="5" style="border-top: solid 1px black; text-align: right;">TOTAL HT :  </th>
                <th style="border-top: solid 1px black;"><?php echo number_format($totalHt, 2, ',', ' '); ?> &euro;</th>
            </tr>
            <tr style="background: #E7E7E7;">
                <th colspan="5" style="border-top: solid 1px black; text-align: right;">TVA <?= $taux;?> : </th>
                <th style="border-top: solid 1px black;"><?php echo number_format($taxe, 2, ',', ' '); ?> &euro;</th>
            </tr>
            <tr style="background: #E7E7E7;">
                <th colspan="5" style="border-top: solid 1px black; text-align: right;">TOTAL TTC : </th>
                <th style="border-top: solid 1px black;"><?php echo number_format($total, 2, ',', ' '); ?> &euro;</th>
            </tr>
        </tbody>

    </table>

    <br>
    Soit la somme de : <?= int2str($total) ?> Euros; <br>

    <br>
    Conditions de règlement : Paiement comptant à réception de facture. <br> Mode paiement : Virement Bancaire.<br>
    
</page>