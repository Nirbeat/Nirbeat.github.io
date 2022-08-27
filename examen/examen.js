//LISTENERS
function evento(tag,evento,funcion){
    document.addEventListener('DOMContentLoaded',(e)=>{
        if(!document.getElementById(tag)){
            e.preventDefault
        }else{
            document.getElementById(tag).addEventListener(evento,funcion);
        }
    }); 
} 

evento('examen','click',crearConsignas);
evento('evaluar','click',evaluar);


//OBJETOS DEL EXAMEN
class ObjetosExamen{
    constructor(ej1,ej2,ej3,ej4){
        this.ej1=ej1;
        this.ej2=ej2;
        this.ej3=ej3;
        this.ej4=ej4;
    }    
}

let objetoRespuesta=new ObjetosExamen();
let objetoSolucion=new ObjetosExamen();



//FUNCION PARA PONER LAS IMAGENES EN EL DOM
function imagenesExamen(ejercicio,nroImagen){
    let respuestas;
    respuestas=JSON.parse(localStorage.getItem(`ej${ejercicio}`));
    ruta=`imagen/bajo1/ej${ejercicio}/${respuestas[nroImagen]}.png`;
    return ruta;
};


//CREA PROPIEDADES DE OBJETOS DE EXAMEN Y GUARDA EL LOCALSTORAGE LAS RESPUESTAS PARA ASIGNAR LAS IMAGENES
function crearProps(obj){
    if(obj==objetoSolucion){
        let opciones;
        fetch('resp.json')
        .then(res=>res.json())
        .then(res=>{
            opciones=res;
            for(let i=1;i<=4;i++){
                let respuestasObjeto=[];
                let respuestas=JSON.parse(localStorage.getItem(`ej${i}`));
                for(element in respuestas){
                    respuestasObjeto.push(opciones[`opciones${i}`][respuestas[element]]);
                };                 
                obj[`ej${i}`]=respuestasObjeto;
            }
        });
    }if(obj==objetoRespuesta){
        tomarRespuestas();
    }
    return obj;
}

//CREA EL EXAMEN EN EL DOM

//hay que revisar todo, sacar los br y dar un estilo mejor en lo posible con CSS
function crearConsignas(){
    let examen=document.getElementById('consigna');
    let consignas=fetch('consignas.json');
    consignas
    .then(res=>res.json())
    .then((res)=>{
        for(let i=1;i<=4;i++){
            elegirRespuestas(i);
            let pregunta=document.createElement('p');
            examen.appendChild(document.createElement('div'))
                .appendChild(pregunta);
            pregunta.innerHTML=res[i];
            pregunta.appendChild(document.createElement('br'));
            for(let j=1;j<=5;j++){
                let span=document.createElement('span');
                pregunta.appendChild(span);
                pregunta.appendChild(document.createElement('br'));
                span.appendChild(document.createElement('img'))
                    .src=imagenesExamen(i,j-1)
                span.appendChild(document.createElement('br'));
                span.appendChild(document.createElement('input'))
                    .id=`ej${i}${j}`;           
            } 
        }        
    });examen.appendChild(document.createElement('button'))
            .innerHTML='Corregir'
            //.id='evaluar'
}


//ELEGIR IMAGENES POR NUMERO Y CREAR LOCALSTORAGE
function elegirRespuestas(n){
    let num=0;
    let solucion=[];
    for(let i=0;i<=4;i++){
        switch(n){
            case 1:
                num=Math.floor(Math.random()*20)+1;
                break;
            default:
                num=Math.floor(Math.random()*48)+1;
                break;}
        if(!solucion.includes(num)){
            solucion.push(num);
        }else{i--};
        localStorage.setItem(`ej${n}`,JSON.stringify(solucion));
    }
}

//FUNCION PARA TOMAR RESPUESTAS
function tomarRespuestas(){

}

//CREACION DE OBJETOS A EVALUAR
function evaluar(){
    crearProps(objetoSolucion);
    crearProps(objetoRespuesta);
    }


