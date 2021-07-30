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

function remvoeText(){
    if($('#display_text').text().length <= 1){
        $('#display_text').text('0')
    }
    else{
        $('#display_text').text($('#display_text').text().slice(0, -1));
    }
}

function checkKeyUp(key){
    if( key != "=" && key != "del"){
        console.log(key)
        addText(key);
        console.log("aggiunto")
    }
    else if(key == "del"){
        console.log("rim")
        remvoeText();
    }
}

$(document).ready(()=>{
    $('button').click((e)=>{

    })


    $('html').keyup((e)=>{
        if(e.which == 8){
            checkKeyUp("del");
        }
        else{
            checkKeyUp(String.fromCharCode(e.which));
        }
    });
});

