function repopulateTable(){
    console.log('Started repopulating...');
    var colleges = false;
    var contacts = false;
    $.ajax({
       type: 'POST',
        url: 'https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/php/delete.php',
        success: function(){
            $.ajax({
                type: 'POST',
                url: 'https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/php/input-colleges.php',
                success: function(result){
                    console.log('Colleges REPOPULATED');
                    $.ajax({
                        type: 'POST',
                        url: 'https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/php/input-contacts.php',
                        success: function(result){
                            console.log('Contacts REPOPULATED');
//                            console.log(result);
                            location.reload();
                        }
                    });
                }
            });  
        }
    });
}

$('#refresh').click(function(){
    localStorage.clear();
    repopulateTable();
    $('#overlay').css('visibility','visible');
    $('html').css('overflow','hidden');
});