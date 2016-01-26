<?php
    $db = new SQLite3('gis') or die ('cannot create db');
    $query = 'DELETE FROM contacts WHERE name="' . $_POST['school'] . '" AND school="' . $_POST['school'] . '";';
    $db -> exec($query);
?>