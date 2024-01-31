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
            <td style="width: 25%;">
            </td>
            <td style="width: 50%; color: #444444;">
                <img style="width: 35%;" src="./pages/LOGO_GET_.png" alt="Logo"><br>
                GRACE ETONNANTE TABERNACLE
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
        <b><u>Intitulé </u>: &laquo; Rapport ;</b><br>
    </i>
    <br>
    
    <table cellspacing="2" style="width: 100%; border: solid 1px black; background: #F7F7F7; font-size: 10pt;">
        <colgroup>
            <col style="width: 10%; text-align: left">
            <col style="width: 70%; text-align: left">
            <col style="width: 20%; text-align: right">
        </colgroup>
        <thead>
            <tr style="background: #E7E7E7;">
                <th style="border-bottom: solid 1px black;">Ordre</th>
                <th style="border-bottom: solid 1px black;">Dépense</th>
                <th style="border-bottom: solid 1px black;">Montant</th>
            </tr>
        </thead>
        <tbody>
<?php
    $nb = rand(5, 11);
    $produits = array();
    $total = 0;
    for ($k=0; $k<$nb; $k++) {
        $num = $k+1;
        $nom = "le produit n°".rand(1, 100);
        $qua = rand(1, 20);
        $prix = rand(100, 9999)/100.;
        $total+= $prix*$qua;
        $produits[] = array($num, $nom, $qua, $prix, rand(0, $qua));
?>
            <tr>
                <td><?php echo $num; ?></td>
                <td><?php echo $nom; ?></td>
                <td><?php echo number_format($prix*$qua, 2, ',', ' '); ?> &euro;</td>
            </tr>
<?php
    }
?>
            <tr style="background: #E7E7E7;">
                <th colspan="2" style="border-top: solid 1px black; text-align: right;">Total : </th>
                <th style="border-top: solid 1px black;"><?php echo number_format($total, 2, ',', ' '); ?> &euro;</th>
            </tr>
        </tbody>
    </table>
    <br>
   
</page>