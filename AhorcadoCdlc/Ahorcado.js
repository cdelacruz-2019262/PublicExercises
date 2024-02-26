const palabra = ["jamon", "pollo"];
const abcdario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function lienzo(){
    
    var canvas = document.getElementById('micanvas');
    var contexto = canvas.getContext("2d");
    contexto.moveTo(100, 180);
    contexto.lineTo(300, 180);
    contexto.strokeStyle = "green";
    contexto.stroke();
    contexto.moveTo(150, 180);
    contexto.lineTo(150, 20);
    contexto.strokeStyle = "#804000";
    contexto.stroke();
}

function inicio(){
    pElegida = palabra[Math.floor(Math.random() * palabra.length)];
    letrasCorrectas = [];
    vidas = 7
}

