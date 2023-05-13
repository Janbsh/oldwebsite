const code = editor.value;
function interpretSquiggle(code) {
    const validChars = "~+-/* ";
    const error = "Error";
    let tb = 0;
    let ob = 0;
    let op;
    if(typeof code !== "string" && !Array.isArray(code)){
        return "Error: code is not a string or iterable object";
    }    
    for(const c of code){
        if(c === '~') tb ++;
        else if("+-/*".indexOf(c) > -1) {
            if(op === undefined) ob = tb;
            else if(op === "+") ob += tb
            else if(op === "-") ob -= tb
            else if(op === "*") ob *= tb
            else if(op === "/") ob /= tb
            tb = 0; 
            op = c;
        }
    }
    if(op === "+") ob += tb
    else if(op === "-") ob -= tb
    else if(op === "*") ob *= tb
    else if(op === "/") ob /= tb
    else ob = tb;
    if (!code.split('').every(c => validChars.includes(c))) return error;
    else return ob;
}

var runButton;
var editor;
var console;

addEventListener("load", () => {
    runButton = document.getElementById("run-button");
    editor = document.getElementById("editor");
    console = document.getElementById("console");
});

function run() {
    let result = interpretSquiggle(code);
    console.value = result;
}

function clearAll() {
    editor.value = "";
    console.value = "";
}
