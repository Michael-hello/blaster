import { type IOptions, type ILocation, SubscriptionHandler, uuid, wrapAngle, degreeToRad } from "../shared";

export class Gate extends SubscriptionHandler implements IGate {

    id = uuid();

    constructor(
        private getShipLocation: () => ILocation,
        private collisionDetected: () => void,
        public options: IOptions,
        location: ILocation) 
    {
        super();
        this.x = location.x;
        this.y = location.y;
        this.increment = this.options.gateLength / 150;

        let length = options.gateLength / 3 + (2/3) * (options.gateLength * Math.random());

        this.updateLength(length);
        this.startMovement();
    };

    public x = 0;
    public y = 0;
    public rotation = Math.random() * 360;
    public length = 0;
    public increment = 0; //length change increment

    get rotationSpeed() { return this.options.rotationSpeed };

    /** locations of column 1 and 2 */
    get position1() {
        let r = this.length / 2;
        let x = r * Math.cos(degreeToRad(this.rotation)); 
        let y = r * Math.sin(degreeToRad(this.rotation));
        return { x:  this.x + x , y: this.y + y }; 
    };
    get position2() {
        let r = this.length / 2;
        let x = r * Math.cos(degreeToRad(this.rotation)); 
        let y = r * Math.sin(degreeToRad(this.rotation));
        return { x:  this.x - x , y: this.y - y }; 
    };

    startMovement() {

        let interval = setInterval(() => { 
            if(this.length >= 0.9 * this.options.gateLength) this.increment *= -1; 
            if(this.length <= 0.5 * this.options.gateLength) this.increment *= -1; 
            // this.updateLength(this.length + this.increment);
            // this.updateRotation(this.rotation + this.rotationSpeed);
        }, 60 );

        this.intervals.push(interval);
    };

    updateRotation(rot: number) {
        this.rotation = wrapAngle(rot, 'degrees');
    };

    updateLength(length: number) {
        let max = this.options.gateLength * 2;
        let min = this.options.gateLength / 2;
        length = Math.max(length, min);
        length = Math.min(length, max);
        this.length = length;
    };

};


export interface IGate extends ILocation {
    id: string;
    length: number; //length in pixels
    rotation: number; //in degrees
};