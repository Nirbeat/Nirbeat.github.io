const canvas=document.querySelector('canvas');
const canvasCtx=canvas.getContext('2d');

canvas.width=900;
canvas.height=600;
canvas.style.backgroundColor='black';

const p1=document.getElementById('p1');
const p2=document.getElementById('p2');

//////////////////////////////////////////////////////////////////////////////

function animate(){
    
    requestAnimationFrame(animate);
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
    pad2.draw();
    pad1.draw();
    ball.draw();


}

///////////////////////////////////////////////////////////////////////////////
class Pad{
    constructor(x){

        this.width=20;
        this.height=100;

        this.position={
            x:x,
            y:canvas.height/2-this.height/2
        }
        
        this.point=0;
        this.velocity=0;
    }

    draw(){

        canvasCtx.fillStyle='white';
        canvasCtx.fillRect(this.position.x,this.position.y,this.width,this.height)
        this.move();
        moveAndCollision(pad1,1);
        moveAndCollision(pad2,2);
    }

    move(){
        //las funciones de movimiento solo deben especificar el valor de desplazamiento
        this.position.y+=this.velocity;    
    }

}

//////////////////////////////////////////////////////////////////////////////

class Ball{

    constructor(){

        this.width=10;
        this.height=10;

        this.position={
            x:0,
            y:-10
        }

        this.velocity={
            x:0,
            y:0
        }
    }

    draw(){

        canvasCtx.fillStyle='white';
        canvasCtx.fillRect(this.position.x,this.position.y,this.width,this.height);
        this.move();
        this.collision();
        this.randomServe();


    }

    randomServe(){
        let serve=Math.floor(Math.random()*4);

        if(this.velocity.x==0&&this.velocity.y==0
            &&this.position.x==0&this.position.y==-10){

            this.position.x=canvas.width/2;
            this.position.y=canvas.height/2;
            setTimeout(() => {
                switch(serve){

                case 0:
                    this.velocity.x=5;
                    this.velocity.y=-5;
                    break;
                
                case 1:
                    this.velocity.x=5;
                    this.velocity.y=5;
                    break;
    
                case 2:
                    this.velocity.x=-5;
                    this.velocity.y=5;
                    break;
    
                case 3:
                    this.velocity.x=-5;
                    this.velocity.y=-5;
                    break;
                }
            },1200);
        }   
    }

    move(){

        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;
    }

    collision(){
        let puntaje=0;
        //rebote estatico bordes
        if(this.position.y<=0||this.position.y>=canvas.height-this.height){
            
            this.velocity.y*=(-1)          
        }

        //colision estatica con pads
        if(this.position.x+this.width>pad2.position.x
        &&this.position.y+this.height>pad2.position.y
        &&this.position.y<pad2.position.y+pad2.height
        ||
        this.position.x<pad1.position.x+pad1.width
        &&this.position.y+this.height>pad1.position.y
        &&this.position.y<pad1.position.y+pad2.height){

            // this.collDirection(pad1);
            // this.collDirection(pad2);
            this.velocity.x*=(-1);
            
        }
        
        if (this.position.x>pad2.position.x
        ||this.position.x+this.width<pad1.position.x+pad1.width
        &&this.position.x!=0){

            switch(this.position.x<canvas.width/2){

                case true:
                    pad2.point+=1;
                    p2.innerHTML=`${pad2.point}`
                    break;
                
                case false:
                    pad1.point+=1;
                    p1.innerHTML=`${pad1.point}`
                    break;

            }
                this.position.x=0;
                this.position.y=-10;
                this.velocity.x=0;
                this.velocity.y=0;
        }
    }
//funcion que detecta area de pad para cambiar direccion
    collDirection(pad){                
        
    }
}

//////////////////////////////////////////////////////////////////////////////
const keys={
    up1:{
        pressed:false
    },
    up2:{
        pressed:false
    },
    down1:{
        pressed:false
    },
    down2:{
        pressed:false
    }
}

addEventListener('keydown',(e)=>{

    switch(e.key){

        case 'w':
            keys.up1.pressed=true;
            break;

        case 's':
            keys.down1.pressed=true;
            break;

        case 'ArrowUp':
            keys.up2.pressed=true;
            break;
        
        case 'ArrowDown':
            keys.down2.pressed=true;
            break;
    }
});

addEventListener('keyup',(e)=>{

    switch(e.key){

        case 'w':
            keys.up1.pressed=false;
            break;

        case 's':
            keys.down1.pressed=false;
            break;

        case 'ArrowUp':
            keys.up2.pressed=false;
            break;
        
        case 'ArrowDown':
            keys.down2.pressed=false;
            break;
    }
})


function moveAndCollision(pad,n){

    if(pad.position.y<=0){
        pad.velocity=0;
        pad.position.y=5
    }else if(pad.position.y>=canvas.height-pad.height){
            pad.velocity=0;
            pad.position.y=canvas.height-5-pad.height}
            else{
                if(keys[`up${n}`].pressed){
                    pad.velocity=-7
                }else if(keys[`down${n}`].pressed){
                    pad.velocity=7
                }else pad.velocity=0;
    }      
}
//////////////////////////////////////////////////////////////////////////////

const pad1= new Pad(10);
const pad2= new Pad(canvas.width-10-pad1.width);
const ball=new Ball();

function bgSize(){
    animate();

        setInterval(() => {
            canvas.height-=10
            if(ball.velocity.x>0){ball.velocity.x+=1.5}
            else if(ball.velocity.x<0){ball.velocity.x-=1.5};
        }, 9000);   
}
bgSize();
