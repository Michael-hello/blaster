import { degreeToRad, radToDegree, SubscriptionHandler, wrapAngle, type IOptions, type ILocation } from "../shared";

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
        private getShipLocation: () => ILocation,
        private options: IOptions
    ){
        super();
    };

    public updatePosition(position: [ number, number ]){
        this.x = position[0];
        this.y = position[1];
    };

    private updateTrajectory(traj: number){
        this.trajectory = wrapAngle(traj);
    };

    public startHunting(){

        /** sets initial trajectory to be directly towards the ship */
        let traj = this.trajToShip();
        this.updateTrajectory(traj);

        let interval = setInterval(() => { 
            this.moveTowardsShip();
         }, this.options.enemySpeed * 10 );

         this.intervals.push(interval);
    };


    /** returns angle in degrees */
    private trajToShip(){

        let ship = this.getShipLocation();
        let dx = ship.x - this.x;
        let dy = -(ship.y - this.y);
        let theta3 = radToDegree(Math.atan(dx/ dy));

        if(dx >= 0 && dy >= 0) theta3 = theta3;
        if(dx >= 0 && dy < 0 ) theta3 = theta3 - 180;
        if(dx < 0 && dy < 0  ) theta3 = 180 + theta3;
        if(dx < 0 && dy >= 0 ) theta3 = theta3;

        return (theta3);
    };

    private moveTowardsShip() {

        let theta = degreeToRad(this.trajectory);
        let r = this.move;
        let xOffset = Math.sin(theta) * r;
        let yOffset = Math.cos(theta) * r;
        let newPos = [ this.x + xOffset, this.y - yOffset ] as [number, number];
        this.updatePosition(newPos);

        this.trajectory = this.trajToShip();

        /**updates trajectory */
        // let maxAllowableRotation = 30; //degrees
        // let traj = this.trajToShip();
        // let current = this.trajectory;

        // let dif1 = wrapAngle(traj - current); //anticlockwise
        // let dif2 = wrapAngle(current - traj); //clockwise

        // if(Math.min(dif1,dif2) < maxAllowableRotation){
        //     this.updateTrajectory(traj);
        // }
        // else if(dif1 < dif2) 
        //     this.updateTrajectory(current - maxAllowableRotation);
        // else
        //     this.updateTrajectory(current + maxAllowableRotation);

        // /** moves along given trajectory */
        // let theta = this.trajectory;
        // let xScalar = 1;
        // let yScalar = 1;

        // /**TO DO: probably a cleaner way to calc new pos */
        // if(this.trajectory > 90) {
        //     theta = 180 - this.trajectory;
        //     yScalar = -1;
        //     xScalar = 1;
        // };

        // if(this.trajectory > 180){
        //     theta = 270 - this.trajectory;
        //     yScalar = -1;
        //     xScalar = -1;
        // };

        // if(this.trajectory > 270){
        //     theta = 360 - this.trajectory;
        //     yScalar = 1;
        //     xScalar = -1;
        // };

        // let hyp = this.move;
        // let yOffset = (Math.cos(degreeToRad(theta)) * hyp) * xScalar;
        // let xOffset = (Math.sin(degreeToRad(theta)) * hyp) * yScalar;

        // let x = this.x + xOffset;
        // let y = this.y + (yOffset * -1);
        // this.updatePosition([x,y]);

    };

}