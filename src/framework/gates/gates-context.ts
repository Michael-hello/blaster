import { filter, type Subject } from "rxjs";
import { CollisionCheck, type ILocation, ShipEnemyCollision, BaseContext, ShipMoveEvent, isShipMoveEvent, type Event, type IOptions, type IPageState } from "..";
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

    shipLocation: ILocation = { x: 0, y: 0 };

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
        this.shipLocation.x = ship.x;
        this.shipLocation.y = ship.y;

        let sub1 = this.events.pipe(
        ).subscribe((event) => {
            if(isShipMoveEvent(event)){
                this.shipLocation.x = event.x;
                this.shipLocation.y = event.y;
            };
        });

        this.subscriptions.push(sub1);
        this.updatePageState(page);
        this.startSpawning();
    }

     private startSpawning(){
        this.addGates(1)
        // let interval = setInterval(() => { 
        //     this.addGates(this.spawnRate);
        //  }, 3000 );

         let sub1 = this.events.pipe(
            filter(x => x.topic == ShipMoveEvent)
        ).subscribe(x => {
            
        });

        // this.intervals.push(interval);
        this.subscriptions.push(sub1);
    };

    private addGates(count: number){

        const getShipLocation = () => this.shipLocation;
        const collisionDetected = () => this.events.next({ topic: ShipEnemyCollision });

        const randomLoc = () => { return { x: Math.random() * this.page.width, y: Math.random() * this.page.height }};
        const collided = (x: ILocation) => CollisionCheck(this.shipLocation, x, this.options.shipSize / 2, this.options.gateLength);

        for(let i = 0; i < count; i++) {
            let location: ILocation = randomLoc();

            /** re-generates random gate location until location without ship collision is created */
            while(collided(location)) {
                location = randomLoc();
            };

            let gate = new Gate(
                getShipLocation, 
                collisionDetected, 
                this.options, 
                location
            );
            this.gates.push(gate);
        };
    };

}
