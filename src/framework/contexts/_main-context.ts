import { ReplaySubject, type Subject, type SubscriptionLike } from "rxjs";
import { debounceTime, filter, map } from "rxjs/operators";
import type {  IEnemyCtxState, IPageState, IBuilder, IShipState, OptionsService, EnemyManager } from "..";
import type { ShipContext, Event } from "..";
import type { GateManager, IGateState } from "../gates";
import { BaseContext } from "../shared/_base-context";


export class MainContext extends BaseContext {

    public events: Subject<Event> = new ReplaySubject();
    public ship: ShipContext = null as any;
    public enemy: EnemyManager = null as any;
    public gates: GateManager = null as any;

    private _initialised = false;

    public page: IPageState = { 
        width: 0,
        height: 0
    };

    get initialised(){ 
        return this._initialised && this.ship != null && this.enemy != null;
    };

    constructor(
        private shipBuilder: IBuilder<ShipContext, IShipState>,
        private enemyBuilder: IBuilder<EnemyManager, IEnemyCtxState>,
        private gateBuilder: IBuilder<GateManager, IGateState>
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
        if(this.gates != null)
            this.gates.dispose();

        this.ship = this.shipBuilder.build();
        this.enemy = this.enemyBuilder.build();
        this.gates = this.gateBuilder.build();
        let ship = { x: this.ship.x, y: this.ship.y };

        if(width != null && height != null) {
            this.updateDiemnsions(width, height);
            ship = { x: width / 2, y: height / 2 };
        };

        this.ship.initialise(this.events, this.page);
        this.enemy.initialise(this.events, this.page, ship);
        this.gates.initialise(this.events, this.page, ship);
        this._initialised = true;
    };

    updateDiemnsions(width: number, height: number){
        this.page.width = width;
        this.page.height = height;

        if(this.ship != null)
            this.ship.updatePageState(this.page);
        if(this.enemy != null)
            this.enemy.updatePageState(this.page);
        if(this.gates != null)
            this.gates.updatePageState(this.page);
    };

    dispose(): void {
        super.dispose();
        if(this.ship != null)
            this.ship.dispose();
        if(this.enemy != null)
            this.enemy.dispose();
        if(this.gates != null)
            this.gates.dispose();
    };

}