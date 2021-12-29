<?php
     $link =new mysqli("localhost","root","naziwin","records");
     if($link->connect_error){
      die("Ошибка: " . $link->connect_error);
     }
     
     $value = $link->query(" SELECT * FROM tetris");
     $min=1000000;
     $minID=0;
     foreach($value as $row){
         if($min>$row["Points"]){
             $min=$row["Points"];
             $minID=$row["ID"];
         }
     }
?>