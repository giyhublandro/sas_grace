<?php

    require_once 'config/database.php';

    if(isset($_GET['element_id'], $_GET['table'], $_GET['field'])){

        $element_id = $_GET['element_id'];
        $table = $_GET['table'];
        $field = $_GET['field'];

		$sql = "SELECT * FROM ".$table."  WHERE ".$field." = '{$element_id}'";
		
		$result = mysqli_query($con,$sql);

		$row = mysqli_fetch_assoc($result);

		echo $json = json_encode($row);

    }

?>