var umc = false;
var lastUMC = '';


function readColleges(){
    console.log("Attempted Read Colleges");
    $.ajax({
        type: 'POST',
        url: 'https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/php/read-colleges.php',
        success: function(result){
            var htmlToAppend = '';
            colleges = result.split('|')
            colleges.pop();
            for(var cnt = 0; cnt < colleges.length; cnt++){
                college = colleges[cnt].split('***');
                htmlToAppend += '<tr id="' + college[0] + '">';
				//Name
				htmlToAppend += '<td class="name"><span>' + college[0] + '</span><span class="information">?</span></td>';
				//umc
				htmlToAppend += '<td class="umc">';
				if(college[1].indexOf('u') !== -1)
					htmlToAppend += '<span class="undergraduate" style="font-weight: bold">U</span> ';
				else
					htmlToAppend += 'U '
				if(college[1].indexOf('m') !== -1)
					htmlToAppend += '<span class="masters" style="font-weight: bold">M</span> ';
				else
					htmlToAppend += 'M '
				
				if(college[1].indexOf('c') !== -1)
					htmlToAppend += '<span class="certificate" style="font-weight: bold">C</span>';
				else
					htmlToAppend += 'C'
				htmlToAppend += '</td>';
				//Distance				
				htmlToAppend += '<td class="distance">' + college[2] + ' mi</td>';
				//Travel Time				
				htmlToAppend += '<td class="time">';
                htmlToAppend += parseInt(college[3] / 60) + ':';
                if(college[3] % 60 < 10)
                    htmlToAppend += '0' + (college[3] % 60) + ' hrs</td>';
                else
                    htmlToAppend += (college[3] % 60) + ' hrs</td>';
				//Contact
				htmlToAppend += '<td class="contact"><ul></ul></td>';
                htmlToAppend += '</tr>';
                localStorage.setItem(college[0], college[4]);
                $('#colleges').html($('#colleges').html() + htmlToAppend);
                htmlToAppend = '';
//                readContacts(college[0]);
            }
            $('#college-table').tablesorter({
                headers: {
                    2: {
                        sorter: 'distancesorter'   
                    },
                    3: {
                        sorter: 'timesorter'
                    }
                }
            });
            readContacts();
        },
        error: function(result){
            console.log("error : " + result); 
        }
    });
}

function readContacts(){
    $.ajax({
        type: 'POST',
        url: 'https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/php/read-contacts.php',
        success: function(result){
            var htmlToAppend = '';
            var contacts = result.split('|')
            contacts.pop();
            for(var cnt = 0; cnt < contacts.length; cnt++){
                contact = contacts[cnt].split('***');
                htmlToAppend = '<li>';
                //Title
                htmlToAppend += '<i>' + contact[1] + '</i>';
                //Name
                htmlToAppend += ' <b>' + contact[0] + '</b>';
                //Phone
                htmlToAppend += ' ' + contact[2];
                //Email
                htmlToAppend += ' ' + contact[3];
                htmlToAppend += '</li>';
                $('[id="' + contact[4] + '"] ul').html($('[id="' + contact[4] + '"] ul').html() + htmlToAppend);
            }
        }
    });
}

$(document).on('click','.information',function(ev){
    if($('#information_box').val() != $(this).parent().parent().attr('id')){
        $('#information_box').css('visibility','visible')
                             .css('left', ev.pageX + 12)
                             .css('top', ev.pageY)
                             .html('<b>' + $(this).parent().parent().attr('id') + '</b><br><p>' + localStorage.getItem($(this).parent().parent().attr('id')) + '</p>')
                             .val($(this).parent().parent().attr('id'));
    } else {
        $('#information_box').css('visibility','hidden')
                             .val('');
    }
});



$(document).on('click','#undergraduate', function(ev){
    if(!umc){
        $('.undergraduate').parent().parent().css('background','#28AD28').css('color','#FFF');
        lastUMC = 'U';
        umc = true;
    } else {
        if(lastUMC != 'U'){
            $('.masters').parent().parent().css('background','none').css('color','#000');
            $('.certificate').parent().parent().css('background','none').css('color','#000');
            $('.undergraduate').parent().parent().css('background','#28AD28').css('color','#FFF');
            lastUMC = 'U';
            umc = true;
        } else {
            $('.undergraduate').parent().parent().css('background','none').css('color','#000');
            lastUMC = '';
            umc = false;
        }
    }
});

$(document).on('click','#masters', function(ev){
    if(!umc){
        $('.masters').parent().parent().css('background','#28AD28').css('color','#FFF');
        lastUMC = 'M';
        umc = true;
    } else {
        if(lastUMC != 'M'){
            $('.undergraduate').parent().parent().css('background','none').css('color','#000');
            $('.certificate').parent().parent().css('background','none').css('color','#000');
            $('.masters').parent().parent().css('background','#28AD28').css('color','#FFF');
            lastUMC = 'M';
            umc = true;
        } else {
            $('.masters').parent().parent().css('background','none').css('color','#000');
            lastUMC = '';
            umc = false;
        }
    }
});

$(document).on('click','#certificate', function(ev){
    if(!umc){
        $('.certificate').parent().parent().css('background','#28AD28').css('color','#FFF');
        lastUMC = 'C';
        umc = true;
    } else {
        if(lastUMC != 'C'){
            $('.masters').parent().parent().css('background','none').css('color','#000');
            $('.undergraduate').parent().parent().css('background','none').css('color','#000');
            $('.certificate').parent().parent().css('background','#28AD28').css('color','#FFF');
            lastUMC = 'C';
            umc = true;
        } else {
            $('.certificate').parent().parent().css('background','none').css('color','#000');
            lastUMC = '';
            umc = false;
        }
    }
});


$('tbody tr').hover(function(){
    $(this).css('border-color','#28AD28');
}, function(){
    $(this).css('border-color','#CCC');
});


$(document).on('click', function(ev){
   if($('#information_box').css('visibility') == 'visible'){
       if($(ev.target).attr('class') != 'information'){
            $('#information_box').css('visibility','hidden')
                                 .val('');
       }
   }
});

$(function(){
    localStorage.setItem('Header Information','U - Undergraduate<br>M - Masters<br>C- Certificate');
});

$.tablesorter.addParser({
    id: 'distancesorter',
    is: function(s){
        return false;   
    },
    format: function(s){
        return s.replace(/mi/,'').replace(/\s/,'');   
    },
    type: 'numeric'
});

$.tablesorter.addParser({
    id: 'timesorter',
    is: function(s){
        return false;   
    },
    format: function(s){
        s = s.replace(/hrs/,'').replace(/\s/,'');
        hrs = parseInt(s.substring(0, s.indexOf(':')));
        mins = parseInt(s.substring(s.indexOf(':') + 1));
        return hrs * 60 + mins;
    },
    type: 'numeric'
});

$('#edit_list').click(function(){
    location.href = "https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/add.html"
});

$('#back_to_list').click(function(){
    location.href = "https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/index.html"
});