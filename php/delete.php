<?php
    $db = new SQLite3('gis') or die ('cannot create db');
    $query .= 'DROP TABLE IF EXISTS colleges; ';
    $query .= 'DROP TABLE IF EXISTS contacts; ';
    $db -> exec($query);
?>