<?php
    $db = new SQLite3('gis') or die ('cannot create db');
    $query = 'CREATE TABLE IF NOT EXISTS colleges (name text UNIQUE NOT NULL, umc text, miles float, minutes float, information text); ';
    $query .= 'INSERT INTO colleges (name, umc, miles, minutes, information) VALUES("' . $_POST['collegename'] . '", "' . $_POST['umc'] . '", ' . $_POST['miles'] . ', ' . $_POST['minutes'] . ', "' . $_POST['information'] . '"); ';
    $db -> exec($query);
?> 