const paso=document.getElementById('paso');
const app=document.getElementById('app');
const buttons=document.getElementById('buttons');
const result=document.getElementById('result');

paso.innerHTML='Elegir temas de la lista y dar click al boton'

let tiempoSec=0;
let repertorio={};
let arrNom=[];
let arrDur=[];
let lista=[];

let bandas=document.getElementById('bandas');
bandas.addEventListener('change',elegirBanda);

///////////////////////////////////////////////////////////////////////////////
async function elegirBanda(){
    arrNom.length=0;
    arrDur.length=0;
    result.innerHTML='';
    
    let child=buttons.lastElementChild;

    while(child){
        buttons.removeChild(buttons.lastChild);
        child=buttons.lastChild;
    }
    

    switch(bandas.value){
        case 'The New Challengers':
            await fetch('tnc.json').then(res=>res.json()).then(res=>repertorio=res);
            agregarOpciones();
            break;
        case 'Taruka Zupay':
            await fetch('taruka.json').then(res=>res.json()).then(res=>repertorio=res);
            agregarOpciones();
            break;
        default:
            repertorio={};
            agregarOpciones();
            buttons.removeChild(buttons.lastChild);
            break;
    }
}

///////////////////////////////////////////////////////////////////////////////
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
        
    crearBoton('calcular');

}

///////////////////////////////////////////////////////////////////////////////
function calcularTiempo(){

    for(let i=0;i<app.childElementCount;i++){

        let check=document.getElementById(i);
        let duration=check.getAttribute('duracion');

        if(check.checked){    
            tiempoSec+=parseInt(duration);
            lista.push(arrNom[i]);
        }        
    }

    mostrarTiempo()
    document.getElementById('calculo').remove();
    crearBoton('reset');
    localStorage.setItem('lista',JSON.stringify(lista));
    lista.length=0;

}

///////////////////////////////////////////////////////////////////////////////
function reinicio(){

    tiempoSec=0;
    result.innerHTML="";
    document.getElementById('reset').remove();
    document.getElementById('ordenar').remove();
    crearBoton('calcular');
}

///////////////////////////////////////////////////////////////////////////////
function mostrarTiempo(){
    
    let min=Math.floor(tiempoSec/60);
    let sec=parseInt(tiempoSec%60);
    tiempoSec=min;

    if(sec<10){
        result.innerHTML=`El show dura ${min}:0${sec} minutos`;
    }else result.innerHTML=`El show dura ${min}:${sec} minutos`;
    crearBoton('ordenar');
    localStorage.setItem('banda',JSON.stringify(bandas.value));
}

///////////////////////////////////////////////////////////////////////////////
function crearBoton(arg){
    
    buttons.appendChild(document.createElement('input'));
    buttons.lastChild.type='button';

    if(arg=='calcular'){

        buttons.lastChild.id='calculo';
        buttons.lastChild.value='Calcular';

        document.getElementById('calculo').addEventListener('click',calcularTiempo);      
    }

    if(arg=='reset'){

        buttons.lastChild.id='reset';
        buttons.lastChild.value='Recalcular';

        document.getElementById('reset').addEventListener('click',reinicio);
    }

    if(arg=='reiniciar'){

        buttons.lastChild.id='reiniciar';
        buttons.lastChild.value='Reiniciar';

        document.getElementById('reiniciar').addEventListener('click',clearDocument);
    }

    if(arg=='ordenar'){

        buttons.lastChild.id='ordenar';
        buttons.lastChild.value='Ordenar Lista';

        document.getElementById('ordenar').addEventListener('click',mostrarLista);
    }

    if(arg=='print'){

        buttons.lastChild.id='imprimir';
        buttons.lastChild.value='Imprimir Lista';

        document.getElementById('imprimir').addEventListener('click',imprimir)        
    }

    if(arg=='reordenar'){

        buttons.lastChild.id='reordenar';
        buttons.lastChild.value='Ordenar de nuevo';

        document.getElementById('reordenar').addEventListener('click',mostrarLista);

    }
}

///////////////////////////////////////////////////////////////////////////////
function ordenarLista(data){

    for(let i=0;i<Object.entries(data).length;i++){

        arrNom.push(data[`id${i}`].nombre);
    }
    arrNom.sort();
}

///////////////////////////////////////////////////////////////////////////////
function ordenarDuracion(arr,data){

    for(element of arr){

        for(let i=0;i<arr.length;i++){

            if(data[`id${i}`]['nombre']==element){
                arrDur.push(data[`id${i}`].durationSec);
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
function clearDocument(){

    bandas.value="";
    result.innerHTML="";
    tiempoSec=0;

    while(app.hasChildNodes()){

        app.removeChild(app.lastChild);
    }

    while(buttons.hasChildNodes()){

        buttons.removeChild(buttons.lastChild);
    }
}

///////////////////////////////////////////////////////////////////////////////
function mostrarLista(){

    lista.length=0;
    let data=JSON.parse(localStorage.getItem('lista'));
    paso.innerHTML='Elegir el orden final de los temas'
    clearDocument();

    for(let i=0;i<data.length;i++){

        app.appendChild(document.createElement('p')).innerHTML=data[i];
        app.lastChild.className='item';
    }
    crearBoton('reiniciar');
    listaFinal();
}

///////////////////////////////////////////////////////////////////////////////
function listaFinal(){

    paso.innerHTML='Elegir el orden final de los temas';
    app.childNodes.forEach((element)=>{
        
        element.addEventListener('click',()=>{

            if(!document.getElementById('reordenar')) crearBoton('reordenar');
            lista.push(element.innerHTML);
            element.remove();
            if(app.childElementCount==0){
        
                paso.innerHTML='Seguro que desea imprimir ésta lista?'

                crearBoton('print');

                for(let i=0;i<lista.length;i++){
        
                    app.appendChild(document.createElement('p')).innerHTML=lista[i];
                }

            lista.length=0;
            }
        });
    }); 
}

///////////////////////////////////////////////////////////////////////////////
function imprimir(){
    
    let impresion=open('imprimirlista.html','','');

    impresion.document.body.style.backgroundColor='red';
    impresion.document.body.appendChild(document.createElement('h1')).id='titulo';
    impresion.document.body.appendChild(document.createElement('div')).id='lista'; 

    let titulo=impresion.document.getElementById('titulo');
    titulo.style.fontFamily='fantasy';
    titulo.style.fontSize=75;
    titulo.innerHTML=`${JSON.parse(localStorage.getItem('banda'))}`;

    let repertorio=impresion.document.getElementById('lista');
    repertorio.style.fontSize=27;
    repertorio.innerHTML=app.innerHTML;

    impresion.print();
    impresion.close();
}
