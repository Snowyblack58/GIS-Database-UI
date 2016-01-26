<?php
    $db = new SQLite3('gis') or die ('cannot create db');
    $query = 'CREATE TABLE IF NOT EXISTS colleges (name text UNIQUE NOT NULL, umc text, miles float, minutes float, information text); ';

	$input = fopen('colleges.txt','r');
	while(($line = fgets($input)) !== false){
		$college = explode('***', $line);
    	$query .= 'INSERT INTO colleges (name, umc, miles, minutes, information) VALUES("' . $college[0] . '", "' . $college[1] . '", ' . $college[2] . ', ' . $college[3] . ', "' . $college[4] . '"); ';
	}
	fclose($input);
    $db -> exec($query);
	echo $query;
?>