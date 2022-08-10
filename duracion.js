let calculo,reset,tiempoSec=0;
let app=document.getElementById('app');

// calculo=document.getElementById('tiempo');
// calculo.addEventListener('click',calcularTiempo);



(function agregarOpciones(){
    fetch('https://raw.githubusercontent.com/Nirbeat/listaTNC/539436c320651c26db5d8ca789f5c9226ef3d6e9/duraciones?token=GHSAT0AAAAAABXQXEN7IWYJLM5NUE4ABJICYXUFNNQ')
        .then(res=>res.json())
        .then(res=>{

            for(let i=0;i<Object.entries(res).length;i++){

                app.appendChild(document.createElement('span')).className="opcion";
                app.lastChild.appendChild(document.createElement('input')).id=i;
                document.getElementById(i).type="checkbox";
                app.lastChild.appendChild(document.createElement('label')).innerHTML=res[`id${i}`].nombre;
                document.getElementById(i).setAttribute("duracion",res[`id${i}`].durationSec);
                app.lastChild.appendChild(document.createElement('br'));
            }
        })

        crearBoton('calcular');
})();


// function crearReset(){

//     document.body.appendChild(document.createElement('input'));
//     document.body.lastChild.type='button';
//     document.body.lastChild.value='Reset';
//     document.body.lastChild.addEventListener('click',reinicio)
// }



function calcularTiempo(){

    for(let i=0;i<app.childElementCount;i++){

        let check=document.getElementById(i);
        let duration=check.getAttribute('duracion');

        if(check.checked){    
            tiempoSec+=parseInt(duration);
        }        
    }

    convertirTiempo()
    document.getElementById('calculo').remove();
    crearBoton('reset');
}

function reinicio(){
    tiempoSec=0;
    app.lastChild.remove();

    for(let i=0;i<app.childElementCount;i++){

        let check=document.getElementById(i);
        if(check.checked){
            check.checked=false;
        }
    }
    document.getElementById('reset').remove();
    crearBoton('calcular');
}

function convertirTiempo(){
    
    let min=Math.floor(tiempoSec/60);
    let sec=parseInt(tiempoSec%60);
    tiempoSec=min;
    app.appendChild(document.createElement('p')).innerHTML=`EL show dura ${min}:${sec} minutos`
}

function crearBoton(arg){

    document.body.appendChild(document.createElement('input'));
    document.body.lastChild.type='button';

    if(arg=='calcular'){
        document.body.lastChild.id='calculo';
        document.body.lastChild.value='Calcular';
        document.body.lastChild.addEventListener('click',calcularTiempo);
    }

    if(arg=='reset'){

        document.body.lastChild.id='reset';
        document.body.lastChild.value='Reset';
        document.body.lastChild.addEventListener('click',reinicio);
    }
    
}