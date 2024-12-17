import { filter, type Subject } from "rxjs";
import { type ILocation, BaseContext, ShipMoveEvent, isShipMoveEvent, type Event, type IOptions, type IPageState } from "..";
import { Enemy, type IEnemy } from "./_enemy";
import type { IEnemyCtxState } from "./_enemy-builder";



/** controls the spawning of enemies and updating their locations */
export class EnemyManager extends BaseContext {

    public enemies: IEnemy[] = [];

    private events: Subject<Event> = null as any;
    private page: IPageState = null as any;
    private initialised = false;

    get spawnRate() { return this.options.spawnRate };
    get rateIncreasePower() { return this.options.rateIncreasePower };
    get enemySpeed() { return this.options.enemySpeed };

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
        this.addEnemies(1)
        // let interval = setInterval(() => { 
        //     this.addEnemies(this.spawnRate);
        //  }, 3000 );

         let sub1 = this.events.pipe(
            filter(x => x.topic == ShipMoveEvent)
        ).subscribe(x => {
            
        });

        // this.intervals.push(interval);
        this.subscriptions.push(sub1);
    };

    addEnemies(count: number){

        const getShipLocation = () => this.shipLocation

        for(let i = 0; i < count; i++){
            let enemy = new Enemy(this.enemySpeed, getShipLocation, this.options);
            this.enemies.push(enemy);
            let index = i % 4;
            let start = this.startPos[index] as [ number, number ];

            index = 2;   

            if(index == 1) start[0] -= 2 * this.options.enemySize;
            if(index == 2) start[1] -= 2 * this.options.enemySize;

            start = [300, 350]        
            enemy.updatePosition(start);
            enemy.startHunting();            
            console.log('ADDING ENEMY', count, enemy, index, start)
        }
    };

}
