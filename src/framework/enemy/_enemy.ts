import { degreeToRad, radToDegree, SubscriptionHandler, wrapAngle, type IOptions } from "../shared";

export interface IEnemy {
    x: number;
    y: number;
}


export class Enemy extends SubscriptionHandler  implements IEnemy {

    id = Math.random();

    public x = 0;
    public y = 0;

    /** current trajectory in degrees */
    private trajectory = 0;
    
        
    constructor(     
        private move: number, //amount to move by in pixels
        private shipLocation: { x: number, y: number },
        private options: IOptions
    ){
        super();
    };

    updatePosition(position: [ number, number ]){
        this.x = position[0];
        this.y = position[1];
    };

    updateTrajectory(traj: number){
        this.trajectory = wrapAngle(traj);
    };

    startHunting(){

        /** sets initial trajectory to be directly towards the ship */
        let traj = this.trajToShip();
        this.updateTrajectory(traj);

        // console.log(traj, this.x, this.y, this.shipLocation)

        let interval = setInterval(() => { 
            this.moveTowardsShip();
         }, this.options.enemySpeed * 10 );

         this.intervals.push(interval);
    };


    /** returns angle in degrees */
    private trajToShip(){
        // let x = this.x - this.shipLocation.x;
        // let y = this.y - this.shipLocation.y;
        // let theta = Math.atan(x/y);
        let dot = (this.x * this.shipLocation.x) + (this.y * this.shipLocation.y);
        let det = (this.x * this.shipLocation.y) - (this.y*this.shipLocation.x);
        let theta = Math.atan2(det, dot);
        return radToDegree(theta);
    };

    private moveTowardsShip(){

        /**updates trajectory */
        let maxAllowableRotation = 30; //degrees
        let traj = this.trajToShip();
        let current = this.trajectory;

        let dif1 = wrapAngle(traj - current); //anticlockwise
        let dif2 = wrapAngle(current - traj); //clockwise

        if(Math.min(dif1,dif2) < maxAllowableRotation){
            this.updateTrajectory(traj);
        }
        else if(dif1 < dif2) 
            this.updateTrajectory(current - maxAllowableRotation);
        else
            this.updateTrajectory(current + maxAllowableRotation);

        /** moves along given trajectory */
        let theta = this.trajectory;
        let xScalar = 1;
        let yScalar = 1;

        /**TO DO: probably a cleaner way to calc new pos */
        if(this.trajectory > 90) {
            theta = 180 - this.trajectory;
            yScalar = -1;
            xScalar = 1;
        };

        if(this.trajectory > 180){
            theta = 270 - this.trajectory;
            yScalar = -1;
            xScalar = -1;
        };

        if(this.trajectory > 270){
            theta = 360 - this.trajectory;
            yScalar = 1;
            xScalar = -1;
        };

        let hyp = this.move;
        let yOffset = (Math.cos(degreeToRad(theta)) * hyp) * xScalar;
        let xOffset = (Math.sin(degreeToRad(theta)) * hyp) * yScalar;

        let x = this.x + xOffset;
        let y = this.y + (yOffset * -1);
        this.updatePosition([x,y]);

    };

}