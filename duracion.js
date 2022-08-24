let calculo,reset,tiempoSec=0;
let app=document.getElementById('app');
let repertorio={};
let arrNom=[];
let arrDur=[];

(function agregarOpciones(){
    
    fetch('https://raw.githubusercontent.com/Nirbeat/nirbeat.github.io/main/tnc')
        .then(res=>res.json())
        .then(res=>{

            ordenarLista(res);
            ordenarDuracion(arrNom,res);
            for(let i=0;i<Object.entries(res).length;i++){

            app.appendChild(document.createElement('span')).className="opcion";
            app.lastChild.appendChild(document.createElement('input')).id=i;
            document.getElementById(i).type="checkbox";
            app.lastChild.appendChild(document.createElement('label')).innerHTML=arrNom[i];
            document.getElementById(i).setAttribute("duracion",arrDur[i]);
            app.lastChild.appendChild(document.createElement('br'));
            }   
        });

        crearBoton('calcular');
})();


function calcularTiempo(){

    for(let i=0;i<app.childElementCount;i++){

        let check=document.getElementById(i);
        let duration=check.getAttribute('duracion');

        if(check.checked){    
            tiempoSec+=parseInt(duration);
        }        
    }

    mostrarTiempo()
    document.getElementById('calculo').remove();
    crearBoton('reset');
}


function reinicio(){
    tiempoSec=0;
    app.lastChild.remove();
    document.getElementById('reset').remove();
    crearBoton('calcular');
}


function mostrarTiempo(){
    
    let min=Math.floor(tiempoSec/60);
    let sec=parseInt(tiempoSec%60);
    tiempoSec=min;

    if(sec<10){
        app.appendChild(document.createElement('p')).innerHTML=`EL show dura ${min}:0${sec} minutos`
    }else (app.appendChild(document.createElement('p')).innerHTML=`EL show dura ${min}:${sec} minutos`)
    
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

function ordenarLista(data){

    for(let i=0;i<Object.entries(data).length;i++){

        arrNom.push(data[`id${i}`].nombre);
    }
    arrNom.sort();
}

function ordenarDuracion(arr,data){

    for(element of arr){

        for(let i=0;i<arr.length;i++){

            if(data[`id${i}`]['nombre']==element){
                arrDur.push(data[`id${i}`].durationSec);
            }
        }
    }
}

function elegirBanda(){

   
}
