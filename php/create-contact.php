<?php
    $db = new SQLite3('gis') or die ('cannot create db');
    $query .= 'CREATE TABLE IF NOT EXISTS contacts (name text, title text, phone text, email text, school string); ';
    $query .= 'INSERT INTO contacts (name, title, phone, email, school) VALUES ("' . $_POST['contactname'] . '", "' . $_POST['title'] . '", "' . $_POST['phone'] . '", "' . $_POST['email'] . '", "' . $_POST['school'] . '"); '; '); ';
    $db -> exec($query);
?>