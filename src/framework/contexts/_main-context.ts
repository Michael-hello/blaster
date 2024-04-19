import { ReplaySubject, type Subject, type SubscriptionLike } from "rxjs";
import { debounceTime, filter, map } from "rxjs/operators";
import type {  UserEvent, IPageState, IBuilder, IShipState, OptionsService, EnemyManager } from "..";
import type { ShipContext } from "..";
import { BaseContext } from "../shared/_base-context";


export class MainContext extends BaseContext {


    public events: Subject<UserEvent> = new ReplaySubject();
    public ship: ShipContext = null as any;
    public enemy: EnemyManager = null as any;

    public page: IPageState = { 
        width: 0,
        height: 0
    };

    constructor(
        private optionsService: OptionsService,
        private shipBuilder: IBuilder<ShipContext, IShipState>,
        // private enemyBuilder: IBuilder<EnemyManager, any>,
        // private gateBuilder: IBuilder<BaseContext, any>
     ){
        super();
        this.newGame();
    };

    newGame(){
        this.ship = this.shipBuilder.build();
        // this.enemy = this.enemyBuilder.build();

        this.ship.initialise(this.events, this.page);
    };

    initialise(width: number, height: number){
        this.updateDiemnsions(width, height);
        this.ship.updatePageState(this.page);
    };

    updateDiemnsions(width: number, height: number){
        this.page.width = width;
        this.page.height = height;
    };

    dispose(): void {
        super.dispose();
    };

}