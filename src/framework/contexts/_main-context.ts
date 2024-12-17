import { ReplaySubject, type Subject, type SubscriptionLike } from "rxjs";
import { debounceTime, filter, map } from "rxjs/operators";
import type {  UserEvent, IPageState, IBuilder, IShipState, OptionsService, EnemyManager } from "..";
import type { ShipContext, Event } from "..";
import { BaseContext } from "../shared/_base-context";


export class MainContext extends BaseContext {

    public events: Subject<Event> = new ReplaySubject();
    public ship: ShipContext = null as any;
    public enemy: EnemyManager = null as any;

    public page: IPageState = { 
        width: 0,
        height: 0
    };

    get initialised(){ 
        return this.ship != null && this.enemy != null;
    };

    constructor(
        private optionsService: OptionsService,
        private shipBuilder: IBuilder<ShipContext, IShipState>,
        private enemyBuilder: IBuilder<EnemyManager, any>,
        // private gateBuilder: IBuilder<BaseContext, any>
     ){
        super();
    };

    newGame(){
        if(!this.initialised) return;
        this.initialise();
    };

    initialise(width?: number, height?: number){
        if(this.ship != null)
            this.ship.dispose();
        if(this.enemy != null)
            this.enemy.dispose();

        this.ship = this.shipBuilder.build();
        this.enemy = this.enemyBuilder.build();

        this.ship.initialise(this.events, this.page);
        this.enemy.initialise(this.events, this.page, { x: this.ship.x, y: this.ship.y });

        if(width != null && height != null)
            this.updateDiemnsions(width, height);
    };

    updateDiemnsions(width: number, height: number){
        this.page.width = width;
        this.page.height = height;

        if(this.ship != null)
            this.ship.updatePageState(this.page);
    };

    dispose(): void {
        super.dispose();
        if(this.ship != null)
            this.ship.dispose();
        if(this.enemy != null)
            this.enemy.dispose();
    };

}