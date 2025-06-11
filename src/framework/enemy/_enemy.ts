import { degreeToRad, radToDegree, SubscriptionHandler, wrapAngle, type IOptions, type ILocation, CollisionCheck, uuid } from "../shared";

export interface IEnemy {
    x: number;
    y: number;
    alive: boolean;
}


export class Enemy extends SubscriptionHandler implements IEnemy {

    id = uuid();

    public x = 0;
    public y = 0;

    alive = true;

    /** trajectory always in degrees */
    private currentTrajectory = 0;    
    private previousTrajectories: number[] = [];
        
    constructor(     
        private collisionDetected: (x: ILocation) => void,
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
        if(collided) this.collisionDetected(position);
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
            if(this.alive)
                this.moveTowardsShip();
            else
                this.dispose();
        }, cycleLength );

        this.intervals.push(interval);
    };


    /** returns angle in degrees */
    private trajToShip(){
        let ship = this.getShipLocation();
        let current: ILocation = { x: this.x, y: this.y };
        return Enemy.trajectoryAtoB(current, ship);
    };

    static trajectoryAtoB(A: ILocation, B: ILocation) {
        let dx = B.x - A.x;
        let dy = -(B.y - A.y);
        let theta3 = radToDegree(Math.atan(dx/ dy));

        if(dx >= 0 && dy >= 0) theta3 = theta3;
        if(dx >= 0 && dy < 0 ) theta3 = theta3 - 180;
        if(dx < 0 && dy < 0  ) theta3 = 180 + theta3;
        if(dx < 0 && dy >= 0 ) theta3 = theta3;

        return theta3;
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