
export interface IEnemy {

}


export class Enemy implements IEnemy {

    public x = 0;
    public y = 0;

    /** current trajectory in degrees */
    private direction = 0;
    
        
    constructor(     
        private move: number   
    ){
        let interval = setInterval(() => { 
            this.moveSelf();
         }, 30 );
    }

    updatePosition(position: [ number, number ]){
        this.x = position[0];
        this.y = position[1];
    };

    updateDirection(dir: number){
        this.direction = dir;
    };

    moveSelf(){
        
    };

}