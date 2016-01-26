<?php
    $db = new SQLite3('gis') or die ('cannot create db');
    $query = 'CREATE TABLE IF NOT EXISTS contacts (name text UNIQUE NOT NULL, title text, phone text, email text, school text); ';

	$input = fopen('contacts.txt','r');
	while(($line = fgets($input)) !== false){
		$contact = explode('***', $line);
        print_r($contact);
    	$query .= 'INSERT INTO contacts (name, title, phone, email, school) VALUES("' . $contact[0] . '", "' . $contact[1] . '", "' . $contact[2] . '", "' . $contact[3] . '", "' . trim($contact[4]) . '"); ';
	}
    echo $query;
	fclose($input);
    $db -> exec($query);
?>