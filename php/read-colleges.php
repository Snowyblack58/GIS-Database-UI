<?php
    $db = new SQLite3('gis') or die ('cannot create db');
    $statement = $db -> prepare('SELECT * FROM colleges');
    $result = $statement -> execute();
    while($row = $result -> fetchArray()){ 
        echo $row['name'] . '***' . $row['umc'] . '***' . $row['miles'] . '***' . $row['minutes'] . '***' . $row['information'] . '|';
    }
?>