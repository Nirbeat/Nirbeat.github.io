//CLASE DE OBJETOS DEL EXAMEN
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

//CREA PROPIEDADES DE OBJETOS DE EXAMEN
function CrearProps(obj){

    //GUARDA EN LOCALSTORAGE EL INDICE DE LAS RESPUESTAS
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

    //TOMA LAS RESPUESTAS DEL DOM Y LAS GUARDA EN EL OBJETO
    }if(obj==objetoRespuesta){
        
        for(let i=1;i<=4;i++){
            let arr=[];
            for(let j=1;j<=5;j++){
                let respuesta=document.getElementById(`ej${i}${j}`).value;
                arr.push(respuesta.toLowerCase());
            }
            objetoRespuesta[`ej${i}`]=arr;
        }
    }
}


//BOTON CREADOR DEL EXAMEN
const examen=document.getElementById('examen');
examen.addEventListener('click',()=>{
    CrearConsignas();
    examen.remove()
});

//ELEGIR IMAGENES POR NUMERO Y CREAR LOCALSTORAGE
function ElegirRespuestas(n){
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


//FUNCION PARA PONER LA RUTA DE IMAGENES EN EL DOM
function ImagenesExamen(ejercicio,nroImagen){
    let respuestas;
    respuestas=JSON.parse(localStorage.getItem(`ej${ejercicio}`));
    ruta=`imagen/bajo1/ej${ejercicio}/${respuestas[nroImagen]}.png`;
    return ruta;
};

//CREA EL EXAMEN EN EL DOM

//hay que revisar todo, sacar los br y dar un estilo mejor en lo posible con CSS
function CrearConsignas(){
    let examen=document.getElementById('consigna');
    let consignas=fetch('consignas.json');
    consignas
    .then(res=>res.json())
    .then((res)=>{
        for(let i=1;i<=4;i++){
            ElegirRespuestas(i);
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
                    .src=ImagenesExamen(i,j-1)
                span.appendChild(document.createElement('br'));
                span.appendChild(document.createElement('input'))
                    .id=`ej${i}${j}`;           
            } 
        }        
    });
    document.getElementById('buttons').appendChild(document.createElement('button')).id='corregir';
    document.getElementById('corregir').innerHTML='Evaluarme!';

    const evaluar=document.getElementById('corregir');
    evaluar.addEventListener('click',Evaluar);

}

//COMPARA LAS RESPUESTAS Y EL ARRAY DE RESPUESTAS CORRECTAS
function Evaluar() {
    let puntaje=0;

    CrearProps(objetoSolucion);
    CrearProps(objetoRespuesta);

    for(ej in objetoSolucion){

        for(let i=0;i<=4;i++){
            try {
                if(objetoSolucion[ej][i]==objetoRespuesta[ej][i]){
                puntaje++;
                }
            } catch (error) {
                console.log('No se que le pasa, pero solo si pongo el try/catch se ejecuta como corresponde')
            }  
        }
    }
    alert(`Tu puntaje es de ${puntaje/2}`);
}
