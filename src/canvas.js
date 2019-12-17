import React from 'react';
import Firefly from './firefly'
import image from './src/images/my.jpeg'
import image1 from './src/images/my2.jpeg'
const numberOfFirefly = 50,birthToGive = 5  ;

var population  = [],population_order;
var pos = {
    x:window.innerWidth/2,
    y:window.innerHeight/2,
    r:100,
    omega:70,
    theta:0
} 
var time  = 0;
// const getMousePos = (e) => {
//     let posx = 0
//     let posy = 0
//     if (!e) e = window.event
//     if (e.pageX || e.pageY) {
//         posx = e.pageX
//         posy = e.pageY
//     }
//     else if (e.clientX || e.clientY) {
//         posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
//         posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
//     }
//     return { x: posx, y: posy }
// }
class Canvas extends React.Component {
constructor(){
    super();
    // this.handleClick = this.handleClick.bind(this);
}

        draw = () => {
           time = time + 1;
        //    if(pos.r<=600)
        //    pos.r += 10;
        //    else if(pos.r>0)
        //    pos.r-=5;
        // pos.r = 50 +Math.abs(Math.sin(time/100))*300;
         
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.save();
                        // Assuming your canvas element is ctx
            this.ctx.shadowColor = "white"; // string
            //Color of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
            this.ctx.shadowOffsetX = 0; // integer
            //Horizontal distance of the shadow, in relation to the text.
            this.ctx.shadowOffsetY = 0; // integer
            //Vertical distance of the shadow, in relation to the text.
            this.ctx.shadowBlur = 10; // integer
            this.ctx.fillStyle = "white";
            this.ctx.arc(window.innerWidth/2, window.innerHeight/2,Math.abs(pos.r-20), 0, Math.PI*2);
            this.ctx.closePath()
            this.ctx.fill();
            this.ctx.restore();
        
            this.ctx.beginPath();

        
            population_order = population.slice(0);
            population_order.sort(function(a, b) {
            return a.y - b.y
            });
            for (var i in population_order) {
            var u = population_order[i].id;
            population[u].walk(this.ctx, population);
            }


         
            // this.ctx.fill();


            this.followPath(birthToGive)
            requestAnimationFrame(this.draw);
            window.onresize = ()=>{
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }
            this.updatePath(time);
           
        }

        initFireFly = ()=>{
            var i = 0;
            while (i < numberOfFirefly) {
                population[i] = new Firefly(i,this.canvas);
                i++;
            }
        }
         handleClick= (e)=>{
            this.giveBirth(e, birthToGive);
        }

        followPath = (u)=>{   
            var i = population.length;
            population[i] = new Firefly(i,this.canvas);
            
            population[i].x = pos.x;
            population[i].y = pos.y;
            // console.log(e.ScreenX)
            if (u > 1) this.    followPath( u - 1);

        }
        updatePath = (time)=>{
            pos.x = this.canvas.width/2 + Math.cos(pos.omega*time)*pos.r;
            pos.y = this.canvas.height/2 + Math.sin(pos.omega*time)*pos.r;

        }
        giveBirth = (e,u)=>{
            var i = population.length;
            population[i] = new Firefly(i,this.canvas);
            
            population[i].x = window.event.layerX;
            population[i].y = window.event.layerY;
            // console.log(e.ScreenX)
            if (u > 1) this.    giveBirth(e, u - 1);
        }
        componentDidMount() {
            // this.DOM = {
            //     canvas: this.refs.canvas,
            //     ctx:this.refs.canvas.getContext('2d'),
            //     image:this.refs.image
            // }
            this.canvas = this.refs.canvas;
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.initFireFly();
            this.draw();
        

          
        }
            render() {

                return ( 
                    <div>
                    <canvas
                    ref = "canvas"
                    style = {{border: '2px solid red',zIndex:'2',backgroundColor:'red'}} onMouseMove= {this.handleClick} >

                    </canvas>
                    {/* <img src = {image} ref = "image" style = {{position:'absolute',top:'10px',left:'10px',zIndex:'-1'}} /> */}
                    {/* <img src = {image1} ref = "image1" style = {{position:'absolute',top:'10px',left:'10px',zIndex:'-1'}} />   */}
                    </div>
                )
            }
        }

        export default Canvas;