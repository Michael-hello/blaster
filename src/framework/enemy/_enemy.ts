import { degreeToRad, radToDegree, SubscriptionHandler, wrapAngle, type IOptions, type ILocation, CollisionCheck } from "../shared";

export interface IEnemy {
    x: number;
    y: number;
}


export class Enemy extends SubscriptionHandler  implements IEnemy {

    id = Math.random();

    public x = 0;
    public y = 0;

    /** trajectory always in degrees */
    private currentTrajectory = 0;    
    private previousTrajectories: number[] = [];
        
    constructor(     
        private collisionDetected: () => void,
        private getShipLocation: () => ILocation,
        private options: IOptions
    ){
        super();
    };

    public updatePosition(position: ILocation){
        this.x = position.x;
        this.y = position.y;

        let opts = this.options;
        let ship = this.getShipLocation();
        let collided = CollisionCheck(ship, position, opts.shipSize / 2, opts.enemySize / 2);
        if(collided) this.collisionDetected();
    };

    private updateTrajectory(traj: number){
        this.currentTrajectory = wrapAngle(traj);
        this.previousTrajectories.push(traj);
    };

    public startHunting(){

        /** sets initial trajectory to be directly towards the ship */
        let traj = this.trajToShip();
        this.updateTrajectory(traj);

        let cycleLength = 100 / this.options.difficulty;
        let interval = setInterval(() => { 
            this.moveTowardsShip();
         }, cycleLength );

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

        let traj = this.currentTrajectory;
        let prev = this.previousTrajectories;
        
        //TO DO: adjust the value based on difficulty setting and enemy speed
        if(prev.length > 10) 
            traj = prev[prev.length - 10];

        let theta = degreeToRad(traj);
        let r = this.options.enemySpeed;
        let xOffset = Math.sin(theta) * r;
        let yOffset = Math.cos(theta) * r;
        let newPos: ILocation = { x:  this.x + xOffset, y: this.y - yOffset  };
        this.updatePosition(newPos);

        this.updateTrajectory(this.trajToShip());

    };

}