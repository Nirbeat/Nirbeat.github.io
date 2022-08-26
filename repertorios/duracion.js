let calculo,reset,tiempoSec=0;
let app=document.getElementById('app');
let repertorio={};
let arrNom=[];
let arrDur=[];

let bandas=document.getElementById('bandas');

bandas.addEventListener('change',elegirBanda)

async function elegirBanda(){
    arrNom.length=0;
    arrDur.length=0;

    switch(bandas.value){
        case 'tnc':
            await fetch('tnc.json').then(res=>res.json()).then(res=>repertorio=res);
            agregarOpciones();
            break;
        case 'tz':
            await fetch('taruka.json').then(res=>res.json()).then(res=>repertorio=res);
            agregarOpciones();
            break;
        default:
            repertorio={};
            break;
    }
}

function agregarOpciones(){

    let child=app.lastElementChild;

    while(child){
        app.removeChild(child);
        child=app.lastElementChild;
    }
    ordenarLista(repertorio);
    ordenarDuracion(arrNom,repertorio);
        for(let i=0;i<arrNom.length;i++){
            app.appendChild(document.createElement('span')).className="opcion";
            app.lastChild.appendChild(document.createElement('input')).id=i;
            document.getElementById(i).type="checkbox";
            app.lastChild.appendChild(document.createElement('label')).innerHTML=arrNom[i];
            document.getElementById(i).setAttribute("duracion",arrDur[i]);
            app.lastChild.appendChild(document.createElement('br'));
        }   
        
    if(!document.getElementById('calculo')) return crearBoton('calcular');

}


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
        app.appendChild(document.createElement('p')).innerHTML=`El show dura ${min}:0${sec} minutos`
    }else (app.appendChild(document.createElement('p')).innerHTML=`El show dura ${min}:${sec} minutos`)
    
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
