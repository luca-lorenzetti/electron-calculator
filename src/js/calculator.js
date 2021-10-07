// OPERATIONS FUNCTIONS
let fontText = $(window).width()/20;
let fontOldText = fontText/2;

$('#display_text').css('font-size',fontText);
$('#old_display_text').css('font-size',fontOldText);
$('button').css('font-size', fontText);

let statusCalc = 'waiting';
let maxText = $(window).width() / (parseInt($("#display_text").css("font-size").toString().slice(0,-2)));

function checkExpression(operator){

    let op = operator;
    let lastText = $('#old_display_text').text();
    let currentText = $('#display_text').text();

    if(lastText == "number too large"){
        lastText = "";
    }

    const operators = ['+', '-' , '/', '*', '106', '111', '107', '109'];

    if(operators.includes(operator.toString())){
        if(!isNaN(operator)){
            op = convertCharacter(operator);
        }
        if(lastText != 0 && !lastText.includes("=")){
         
            let expression = lastText.toString() + currentText.toString();
            let result = getResult(expression);


                if(result.toString() == 'Infinity'){
                    console.log("errore")
                    result = "Error";
                    $('#old_display_text').text(result);
                }
                else{
                    $('#old_display_text').text(result + " " +op);
                }


        }
        else{

            $('#old_display_text').text(currentText+ " " + op);
        }
        $('#display_text').text("0");
   
    }
    else{
      
        if(!lastText.includes("=")){
            let expression = lastText.toString() + currentText.toString();
            let result = getResult(expression);

            // if (result.toString().length < max){
                if(result.toString() == 'Infinity'){
                    console.log("errore")
    
                    result = "Error";
                    $('#old_display_text').text("0")
                    $('#display_text').text( result );
                }
                else{

                        lastText = getResult(lastText.slice(0,-2)) + lastText.slice(lastText.length-2,lastText.length);
                        currentText = getResult(currentText);
                        // console.log(lastText)
                        console.log(currentText)
                        $('#old_display_text').text(lastText + " " +currentText + " =");
                        
                    
                    $('#display_text').text( getResult(result) );
                }
            // }
            // else{
            //     $('#old_display_text').text("number too large");
            // }
        }
    }



function getResult(expression){
    
    return math.evaluate(expression);
    }
}
function isSpecialCharacter(keyCode){
    const characters = ['190','110','188','189','109','106','107', '187', '197','111','106','43','47', '42'];


    if( characters.includes(keyCode.toString())){
        return true;
    }
    else{
        return false;
    }
}


function convertCharacter(keyCode){
    let characters = {
        '190' : '.',
        '110' : '.',
        '188' : ',',
        '189' : '-',
        '109' : '-',
        '107' : '+',
        '187' : '+',
        '43': '+',
        '111' : '/',
        '47' : '/',
        '106' : '*',
        '42' : '*'
    };

   return characters[keyCode];
}
function addText(keyCode){

    if( !isSpecialCharacter(keyCode) ){
        if( (parseInt(keyCode) >= 48 && parseInt(keyCode) <= 57) ||(parseInt(keyCode) >= 96 && parseInt(keyCode) <= 105) ){

            if((parseInt(keyCode) >= 96 && parseInt(keyCode) <= 105)){
                keyCode -= 48;
            }

            if($('#display_text').text() == 0 || $('#display_text').text() == 'Error'){
                $('#display_text').text(String.fromCharCode(keyCode) );
            }

            else{
                if( String.fromCharCode(keyCode)){
                    $('#display_text').text( $('#display_text').text() + String.fromCharCode(keyCode) );
                }
            }
        }
    }
    else{
        $('#display_text').text( $('#display_text').text() + convertCharacter(keyCode) );

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
        addText(key);
    }
    else if(key == "del"){
        remvoeText();
    }
}

function clearAllText(){
    $('#display_text').text('0');
    $('#old_display_text').text('0');
}

function clearOnlyText(){
    $('#display_text').text('0');
}

$(document).ready(()=>{
    $('button').click((e)=>{


        let val = $(e.target).val();

        if(statusCalc == 'resolve'){
            if( e.which != '106' && e.which != '111' && e.which !=  '107' && e.which != '109'){
                $('#display_text').text('0');
            }

            
            statusCalc = 'processing';
        }

        if(val.charCodeAt(0) == '43' || val.charCodeAt(0) == '47' || val.charCodeAt(0) ==  '42' || val.charCodeAt(0) == '45' || val.charCodeAt(0) == '61' ){
            
            if(val.charCodeAt(0) == '61'){
                statusCalc = 'resolve';
            }

            checkExpression(val);
        }
        else if(val == 'C'){
            clearAllText();
        }
        else if(val == 'CE'){
            clearOnlyText();
        }
        else{
            addText(val.charCodeAt(0));
        }

    });


    $('html').keydown((e)=>{

        if(statusCalc == 'resolve'){
            if( e.which != '106' && e.which != '111' && e.which !=  '107' && e.which != '109'){
                $('#display_text').text('0');

            }
            statusCalc = 'processing';
        }

        if(e.which == 8){
            checkKeyUp("del");
        }
        else if( e.which == '13' || e.which == '106' || e.which == '111' || e.which ==  '107' || e.which == '109'){

            if(e.which == '13'){
                statusCalc = 'resolve';
                checkExpression(e.which);
            }
            checkExpression(e.which);
        }
        else{
            if($('#display_text').text().length < maxText){
                checkKeyUp(e.which);
            }
        }
    });
});

