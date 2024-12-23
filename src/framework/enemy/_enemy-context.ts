import { filter, type Subject } from "rxjs";
import { EnemyDeath, type EnermyDeathEvent, CollisionCheck, type GateSmashEvent, ShipGateSmashEvent, type EnemyCollisionEvent, type ILocation, ShipEnemyCollision, BaseContext, ShipMoveEvent, isShipMoveEvent, type Event, type IOptions, type IPageState } from "..";
import { Enemy, type IEnemy } from "./_enemy";
import type { IEnemyCtxState } from "./_enemy-builder";



/** controls the spawning of enemies and updating their locations */
export class EnemyManager extends BaseContext {

    public enemies: IEnemy[] = [];

    private events: Subject<Event> = null as any;
    private page: IPageState = null as any;
    private initialised = false;

    get spawnRate() { return this.options.spawnRateEnemy };
    get rateIncreasePower() { return this.options.rateIncreasePower };
    get enemySpeed() { return this.options.enemySpeed };
    get enemySize() { return this.options.enemySize };

    shipLocation: ILocation = { x: 0, y: 0 };

    constructor(
        state: IEnemyCtxState,
        private options: IOptions,
    ){ 
        super();
        this.enemies = state.enemies
    };

    get top(){ return [ this.page.width / 2 , 0 ] }
    get right(){ return [ this.page.width, this.page.height / 2 ] }
    get bottom(){ return [ this.page.width / 2, this.page.height ] }
    get left(){ return [ 0, this.page.height/2 ] }

    get startPos(){ return [ this.top, this.right, this.bottom, this.left ] }

    updatePageState(state: IPageState){
        this.page = state;
    };

    initialise(events: Subject<Event>, page: IPageState, ship: ILocation){
        if(this.initialised) 
            throw Error('Alreayd initialised');

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
        
        this.addEnemies(1000, 250);

         let sub1 = this.events.pipe(
            filter(x => x.topic == ShipMoveEvent)
        ).subscribe(x => {
            this.shipLocation.x = (x as ShipMoveEvent).x;
            this.shipLocation.y = (x as ShipMoveEvent).y;
        });

        let sub2 = this.events.pipe(
            filter(x => x.topic == ShipGateSmashEvent)
        ).subscribe(x => {
            this.killEnemies(x as GateSmashEvent);
        });

        this.subscriptions.push(...[ sub1, sub2 ]);
    };

    private addEnemies(count: number, delay: number){

        if(count == 0) return;

        const getShipLocation = () => this.shipLocation;
        const collisionDetected = (loc: ILocation) => {
            let event: EnemyCollisionEvent = { topic: ShipEnemyCollision, ...loc }
            this.events.next(event);
        };

        let enemy = new Enemy(collisionDetected, getShipLocation, this.options);
        this.enemies.push(enemy);
        let index = count % 4;
        let start = this.startPos[index] as [ number, number ];

        // 0 == top   // 1 == right   // 2 == bottom   // 3 == left
        let scalar = 2 * Math.random();
        if(index == 0 || index == 2) start[0] = start[0] * scalar;
        else start[1] = start[1] * scalar;

        enemy.updatePosition({ x: start[0], y: start[1] });
        enemy.startHunting(); 

        setTimeout(() => this.addEnemies(count - 1, delay), delay);      
        
    };

    private killEnemies(event: GateSmashEvent) {
        
        let gate = event.gate;
        let radius = gate.length * 0.75;

        for(let enemy of this.enemies) {
            if(CollisionCheck(gate, enemy, this.enemySize, radius)) {
                enemy.alive = false;
                let event: EnermyDeathEvent = { topic: EnemyDeath, x: enemy.x, y: enemy.y }
                this.events.next(event);
            };
        };

    };

}
