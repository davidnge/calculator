var keys = document.querySelectorAll("span");
var outputStr = "";
var output = document.getElementById('output');
var evaluated, decimalAdded = false;



function isOperator(i){
    if (i === '+' ||
        i === '-' ||
        i === 'x' ||
        i === '÷' ){
        return true;
    }
}

function isClear(i){
    if (i == "clear"){
        return true;
    }
}

function isEqual(i){
    if (i == "="){
        return true;
    }
}


function display(){
    var checkLast =  outputStr.slice(-1);
    var digit = /[0-9]/;
    var keyPressed = this.innerHTML;

    if(checkLast == ""){
        
        //handlig ÷/x/clear/= in the beginning
        if (isClear(keyPressed)|| isEqual(keyPressed) || keyPressed === "x" || keyPressed === "÷") {
            outputStr = "";
        }
        
        //handling "." in the beginning
        else if (keyPressed === "."){
            outputStr+=keyPressed;
            decimalAdded = true;
        }
        
        else {
            outputStr += keyPressed;
        }      
        
        evaluated = false;
    }
    
    else if (isClear(keyPressed)){
        outputStr = "";
        decimalAdded = false;
    }
    
    else if (keyPressed == "."){
        if (decimalAdded == false){
            outputStr+=keyPressed;
        }
        decimalAdded = true;
    }
    
    else if (isEqual(keyPressed)){
        
        if (checkLast === "." || isOperator(checkLast)==true){
            outputStr = outputStr.slice(0,-1)+'';
        }
        outputStr = outputStr.replace(/x/g,'*').replace(/÷/g, '/');
        var evalOutput = eval(outputStr);
        outputStr = ""+evalOutput;
        evaluated = true;
        decimalAdded = false;
    }
    
    else if (digit.test(checkLast) == true || checkLast == "."){
        outputStr += keyPressed;
    }
    
    else if (isOperator(checkLast)){
        if (digit.test(keyPressed) == true){
            outputStr += keyPressed;
        }
        
        //if is another operator, replace with the current one
        else if (isOperator(checkLast)){
             outputStr = outputStr.slice(0,-1) + keyPressed;
         }   
        
        decimalAdded = false;
        
        
    }
    
    output.innerHTML = outputStr;
    
    if (evaluated == true){
        outputStr = "";
    }
}

for (var i =0; i<keys.length; i++){
    keys[i].onclick = display;
}
