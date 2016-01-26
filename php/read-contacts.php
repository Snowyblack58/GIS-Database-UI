<?php
    $db = new SQLite3('gis') or die ('cannot create db');
    $statement = $db -> prepare('SELECT * FROM contacts');
    $result = $statement -> execute();
    while($row = $result -> fetchArray()){ 
        echo $row['name'] . '***'  . $row['title'] . '***' . $row['phone'] . '***' . $row['email'] . '***' . $row['school'] . '|';
    }
?>