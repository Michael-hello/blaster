import { filter, type Subject } from "rxjs";
import { type GateSmashEvent, type GateCollisionEvent, cloneObject, CollisionCheck, degreeToRad, type ILocation, ShipGateSmashEvent, ShipGateCollision, BaseContext, ShipMoveEvent, isShipMoveEvent, type Event, type IOptions, type IPageState } from "..";
import { Gate, type IGate } from "./gate";
import type { IGateState } from "./gates-builder";



/** controls the spawning of gates  */
export class GateManager extends BaseContext {

    public gates: IGate[] = [];

    private events: Subject<Event> = null as any;
    private page: IPageState = null as any;
    private initialised = false;

    get spawnRate() { return this.options.spawnRateGate };
    get rotationSpeed() { return this.options.rotationSpeed };
    get filtered(){ return this.gates.filter(x => x.alive) };

    shipLocation: ILocation = { x: 0, y: 0 };
    previousShip: ILocation = { x: 0, y: 0 };

    constructor(
        state: IGateState,
        private options: IOptions,
    ){ 
        super();
        this.gates = state.gates;
    };

    updatePageState(state: IPageState){
        this.page = state;
    };

    initialise(events: Subject<Event>, page: IPageState, ship: ILocation){
        if(this.initialised) 
            throw Error('Already initialised');

        this.events = events;
        this.updateShipLocation(ship, false);
        this.updateShipLocation(ship, false);

        let sub1 = this.events.pipe(
        ).subscribe((event) => {
            if(isShipMoveEvent(event)){
                this.updateShipLocation(event);
            };
        });

        let targetFps = 30;
        let interval = setInterval(() => { 
            this.collisionCheck();
        }, 1000 / targetFps);

        this.intervals.push(interval);
        this.subscriptions.push(sub1);
        this.updatePageState(page);
        this.startSpawning();
    };

    private updateShipLocation(ship: ILocation, check = true) {
        if(check) this.gateCollisionCheck(ship);

        this.previousShip = cloneObject(this.shipLocation)
        this.shipLocation.x = ship.x;
        this.shipLocation.y = ship.y;
    };

    //code taken from https://stackoverflow.com/a/9997374/9589875
    private gateCollisionCheck(shipNew: ILocation) {
        if(this.previousShip == null) return;

        let ccw = (A: ILocation, B: ILocation, C: ILocation)  => {
            return (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x)
        };
        //Return true if line segments AB and CD intersect
        let intersect = (A: ILocation, B: ILocation, C: ILocation, D: ILocation)  => {
            return ccw(A,C,D) != ccw(B,C,D) && ccw(A,B,C) != ccw(A,B,D)
        };

        let A = cloneObject(this.previousShip);
        let B = cloneObject(shipNew);

        console.log(A, B)

        /** checks for intersection (crash) between segments AB (ship travel path)
            and gate length CD **/
        for(let gate of this.filtered) {
            let C = gate.position1;
            let D = gate.position2;
            if( intersect(A, B, C, D) ) {
                let event: GateSmashEvent = { topic: ShipGateSmashEvent, x: gate.x, y: gate.y };
                this.events.next(event);
                console.log('GATE SMASH')
            };
        };        
    };


    private collisionCheck() {

        let opts = this.options;
        let ship = JSON.parse(JSON.stringify(this.shipLocation));

        for(let gate of this.filtered) {

            //Check if gate is near ship
            let diameter = gate.length * 1.2;
            let nearby = CollisionCheck(ship, gate, opts.shipSize, diameter);
            if(!nearby) continue;

            //Check for collision with gate columns
            for(let column of [ gate.position1, gate.position2 ]) {
                let width = opts.gateColumnHeight - 2;
                if(CollisionCheck(ship, column, opts.shipSize, width)) {
                    let event: GateCollisionEvent = { topic: ShipGateCollision, x: ship.x, y: ship.y };
                    this.events.next(event);
                    return;
                 };
            };

            //Check for gate explosions
            let points: ILocation[] = [];
            let step = opts.shipSize / 5;
            let count = gate.length / step;
            let start = gate.position2;
            let mCos = Math.cos(degreeToRad(gate.rotation));
            let mSin = Math.sin(degreeToRad(gate.rotation));

            for(let i = 0; i <= count; i ++) {
                let offset = i * step;
                let x = offset * mCos; 
                let y = offset * mSin;
                points.push({ x:  start.x + x , y: start.y + y });
            };

            /** simulates the 'gate' as a series of points */
            for(let point of points) {
                if(CollisionCheck(ship, point, opts.shipSize, 1)) {
                    gate.killGate();
                    let event: GateSmashEvent = { topic: ShipGateSmashEvent, x: gate.x, y: gate.y };
                    this.events.next(event);
                    return;
                };
            };
        };
    };


     private startSpawning(){
        this.addGates(2);
        return;

        let interval = setInterval(() => { 
            this.addGates(1);
            this.removeGates();
         }, 2000 );

         let sub1 = this.events.pipe(
            filter(x => x.topic == ShipMoveEvent)
        ).subscribe(x => {
            
        });

        this.intervals.push(interval);
        this.subscriptions.push(sub1);
    };

    private addGates(count: number){

        const randomLoc = () => { return { x: Math.random() * this.page.width, y: Math.random() * this.page.height }};
        const collided = (x: ILocation) => CollisionCheck(this.shipLocation, x, this.options.shipSize / 2, this.options.gateLength);

        for(let i = 0; i < count; i++) {
            let location: ILocation = randomLoc();

            /** re-generates random gate location until location without ship collision is created */
            while(collided(location)) {
                location = randomLoc();
            };

            let gate = new Gate(
                this.options, 
                location
            );
            console.log(location)
            this.gates.push(gate);
        };
    };

    private removeGates() {
        for(let gate of this.gates) {
            if(!gate.alive) {
                let index = this.gates.findIndex(x => x.id == gate.id);
                this.gates.splice(index, 1);
            }
        };
    };

}
