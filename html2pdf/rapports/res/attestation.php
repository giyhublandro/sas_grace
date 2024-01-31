

<style type="text/css">
<!--
table { vertical-align: top; }
tr    { vertical-align: top; }
td    { vertical-align: top; }
-->

<?php
  
   $grandTotal = 0;
   $mission ="";
   $dureeGrandTotal = 0;
   $grandTotalMontant = 0;
   $year = explode('-', $du);
   $date_facturation_start = Date($year[0].'-12-01');
   $date_facturation_end= Date($year[0].'-12-15');
   //on ne facture que les missions validees statut = 1

   $month = "";
    $j = 0;

    $facturations = array();

   for ($i=1; $i <= 12 ; $i++) { 

    if($i == 1){
        $month = "JANVIER";
        $date_facturation_start = Date($year[0].'-01-01');
        $date_facturation_end = Date($year[0].'-01-31');
    }else if($i == 2){
        $month = "FERVRIER";
        $date_facturation_start = Date($year[0].'-02-01');
        $date_facturation_end = Date($year[0].'-02-28');
    }else if($i == 3){
        $month = "MARS";
        $date_facturation_start = Date($year[0].'-03-01');
        $date_facturation_end = Date($year[0].'-03-31');
    }else if($i == 4){
        $month = "AVRIL";
        $date_facturation_start = Date($year[0].'-04-01');
        $date_facturation_end = Date($year[0].'-04-30');
    }else if($i == 5){
        $month = "MAI";
        $date_facturation_start = Date($year[0].'-05-01');
        $date_facturation_end = Date($year[0].'-05-31');
    }else if($i == 6){
        $month = "JUIN";
        $date_facturation_start = Date($year[0].'-06-01');
        $date_facturation_end = Date($year[0].'-06-30');
    }else if($i == 7){
        $month = "JUILLET";
        $date_facturation_start = Date($year[0].'-07-01');
        $date_facturation_end = Date($year[0].'-07-31');
    }else if($i == 8){
        $month = "AOUT";
        $date_facturation_start = Date($year[0].'-08-01');
        $date_facturation_end = Date($year[0].'-08-31');
    }else if($i == 9){
        $month = "SEPTEMBRE";
        $date_facturation_start = Date($year[0].'-09-01');
        $date_facturation_end = Date($year[0].'-09-30');
    }else if($i == 10){
        $month = "OCTOBRE";
        $date_facturation_start = Date($year[0].'-10-01');
        $date_facturation_end = Date($year[0].'-10-31');
    }else if($i == 11){
        $month = "NOVEMBRE";
        $date_facturation_start = Date($year[0].'-11-01');
        $date_facturation_end = Date($year[0].'-11-30');
    }else if($i == 12){
        $month = "DECEMBRE";
        $date_facturation_start = Date($year[0].'-12-01');
        $date_facturation_end = Date($year[0].'-12-31');
    } 
    
    $dureeTotal = 0;
    $montantTotal = 0;

    $sql = "SELECT * FROM facturation 
    WHERE facturation.id_client = $id_client
    AND facturation.date_facturation BETWEEN '$date_facturation_start' AND '$date_facturation_end'";

    if($result = mysqli_query($con,$sql)){
        
        while($facturation = mysqli_fetch_assoc($result)){
            
            //ON DTERMINE LE NOMBRE D'HEURE
            $id_facturation = intval($facturation['id_facturation']);

            $sql_ = "SELECT affectation.duree, mission FROM affectation, mission 
            WHERE 
            affectation.id_facturation = '{$id_facturation}' AND affectation.id_mission = mission.id_mission";
                
            if($result_ = mysqli_query($con,$sql_)){
        
                while($affectation = mysqli_fetch_assoc($result_)){
                    $dureeTotal += $affectation['duree'];
                    $mission = $affectation['mission'];
                }
                
            }

            $montantTotal += $facturation['montant'];
            $grandTotalMontant += $facturation['montant'];
            
            //$mission = $facturation['mission'];
            
        }
    
    }

    if($montantTotal > 0){

        $j = Count($facturations);

        $dureeGrandTotal += $dureeTotal;
        
        $facturations[$j]['DUREE'] = $dureeTotal;
        $facturations[$j]['MONTANT'] = $montantTotal;
        $facturations[$j]['MISSION'] = $mission;
        $facturations[$j]['TARIF'] = $montantTotal / $dureeTotal;
        $facturations[$j]['MOIS'] = $month;

    }
    
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
            <td style="width:14%; ">A L'Attention de </td>
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
        
    </table>
    <br>
    <table cellspacing="0" style="width: 100%; text-align: center;font-size: 12pt">
        <tr>
            <td style="width:100%; ">ATTESTATION FISCALE ANNEE <?= $year[0] ; ?> </td>
        </tr>
        <tr>
            <td style="width:100%; "> SERVICE A LA PERSONNE </td>
        </tr>
    </table>
    <br>

    <p text-align: justify;font-size: 8pt>
        Je soussignée <em> Catherine NGO NLOGA </em>, Représentante de l'organisme <em> <?= $nom_agence ;?> </em>, <?= $adresse_agence ;?> No SIRET : <?= $siret ;?> et Déclaré SAP 888299484 le 25/02/2021,
        Atteste avoir réalisé des prestations de ménage au domicile de Monsieur / Madame <?= $nom_client; ?> sis au <?= $adresse_client; ?> <br> <br>
    
        Le montant total facturé est payé s'élèvee à <?= $grandTotalMontant ?> Euros (<?= int2str($grandTotalMontant) ?> Euros) ;  Pour un nombre d'heures total de <?= $dureeGrandTotal ?> heures. <br> <br>
    </p>

    <table cellspacing="0" style="width: 100%; border: solid 1px black; background: #F7F7F7; font-size: 10pt;">
    <colgroup>
            <col style="width: 20%; text-align: left">
            <col style="width: 15%; text-align: left">
            <col style="width: 35%; text-align: left">
            <col style="width: 15%; text-align: right">
            <col style="width: 15%; text-align: center">
        </colgroup>
        <thead>
            <tr style="background: #E7E7E7;">
                <th style="border-bottom: solid 1px black;">MOIS</th>
                <th style="border-bottom: solid 1px black;">DUREE</th>
                <th style="border-bottom: solid 1px black;">PRESTATION</th>
                <th style="border-bottom: solid 1px black;">TARIF HORAIRE</th>
                <th style="border-bottom: solid 1px black;">TOTAL INTERVENTION</th>
            </tr>
        </thead>
        <tbody>
<?php

    $nb = $i;
    $total = 0;
    $totalHt = 0;
    $produits = array();
    $taxe = 0;
    $option = 0;
    $tarif_horaire_option = 0;
    $enLettre = "";

    for ($k=0; $k < Count($facturations) ; $k++) {

?>
            <tr>
                <td> <?= $facturations[$k]['MOIS'] ?> </td>
                <td><?= $facturations[$k]['DUREE'] ?> H</td>
                <td><?= $facturations[$k]['MISSION'] ?></td>
                <td><?php echo number_format($facturations[$k]['TARIF'] , 2, ',', ' '); ?> &euro;</td>
                <td><?php echo number_format($facturations[$k]['MONTANT'], 2, ',', ' '); ?> &euro;</td>
            </tr>
<?php
    }
    $totalHt = $total - $taxe;

?>
            <tr style="background: #E7E7E7;">
                <th style="border-top: solid 1px black; text-align: left;">TOTAUX :  </th>
                <th style="border-top: solid 1px black;"><?php echo number_format($dureeGrandTotal, 2, ',', ' '); ?> H</th>
                <th style="border-top: solid 1px black; text-align: left;"> </th>
                <th style="border-top: solid 1px black; text-align: left;"> </th>
                <th style="border-top: solid 1px black;"><?php echo number_format($grandTotalMontant, 2, ',', ' '); ?> &euro;</th>
            </tr>
        </tbody>

    </table>

    <p> La présente Attestation est délivrée pour servir et valoir ce que de droit. </p>

    <p style="text-align:right;"> Fait à Paris le <?= date("d-m-Y", strtotime($du));; ?> <br> Catherine NGO NLOGA</p>
    
    <p style="text-align:center;"> <?= $agence ?> <br> SAS Immatriculée au RCS Paris sous le numéro 88829948400012 / No tva FR 04888299484 <br> 
    <?= $adresse_agence ;?> - <?= $tel_agence; ?>
    </p>
    
    
</page>