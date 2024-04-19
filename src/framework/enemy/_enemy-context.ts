import type { Subject } from "rxjs";
import { BaseContext, ShipMoveEvent, type IOptions, type IPageState } from "..";
import { Enemy, type IEnemy } from "./_enemy";



/** controls the spawning of enemies and updating their locations */
export class EnemyManager extends BaseContext {

    public enemies: IEnemy[] = [];

    get spawnRate() { return this.options.spawnRate };
    get rateIncreasePower() { return this.options.rateIncreasePower };
    get enemySpeed() { return this.options.enemySpeed };

    constructor(
        private events: Subject<Event>,
        private state: IPageState,
        private options: IOptions
    ){ 
        super();
    };

    get top(){ return [ this.state.width/2 , 0 ] }
    get right(){ return [ this.state.width, this.state.height/2 ] }
    get bottom(){ return [ this.state.width / 2, this.state.height ] }
    get left(){ return [ 0, this.state.height/2 ] }

    get startPos(){ return [ this.top, this.right, this.bottom, this.left ] }

    // startSpawning(){
    //     let interval = setInterval(() => { 
    //         this.addEnemies(this.spawnRate);
    //         this.spawnRate = Math.pow(this.spawnRate, this.rateIncreasePower); 
    //      }, 3000 );

    //     let sub1 = this.events.pipe(
    //         filter(x => x.topic == ShipMoveEvent)
    //     ).subscribe(x => {

    //     });

    //     this.intervals.push(interval);
    //     this.subscriptions.push(sub1);
    // };

    addEnemies(count: number){

        for(let i = 0; i < count; i++){
            let enemy = new Enemy(this.enemySpeed);
            let index = 1 % 4;
            let start = this.startPos[ index - 1 ];
            enemy.updatePosition(start as [ number, number ]);
        }
    };

}
