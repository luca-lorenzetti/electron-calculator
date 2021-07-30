// OPERATIONS FUNCTIONS


function addText(value){
    if( value != "."){
        if($('#display_text').text() == 0)
            $('#display_text').text(value );

        else{
            $('#display_text').text( $('#display_text').text() + value );
        }
    }
    else{
        $('#display_text').text( $('#display_text').text() + value );
    }
}

function checkKeyUp(key){
    if( key != "="){
        addText(key);
        console.log("aggiunto")
    }
}

$(document).ready(()=>{
    $('button').click((e)=>{

    })

    $(window).keypress((e)=>{
        checkKeyUp(String.fromCharCode(e.which));
    });
});

