<?php
    $db = new SQLite3('gis') or die ('cannot create db');
    $query = 'DELETE FROM colleges WHERE name="' . $_POST['school'] . '";';
    echo $query;
    $db -> exec($query);
?>