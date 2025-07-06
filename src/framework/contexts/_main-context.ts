import { ReplaySubject, type Subject, type SubscriptionLike } from "rxjs";
import { debounceTime, filter, map } from "rxjs/operators";
import type { ShipContext, Event, IEnemyCtxState, IPageState, IBuilder, IShipState, OptionsService, EnemyManager } from "..";
import { PauseEventTopic } from '..';
import type { GateManager, IGateState } from "../gates";
import { BaseContext } from "../shared/_base-context";
import * as _ from "lodash";

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
        this.dispose();
        this.initialise();
    };

    pauseGame() {
        if(!this.initialised) return;
        this.paused = !this.paused;
        this.events.next({ topic: PauseEventTopic, paused: this.paused });
    };

    initialise(width?: number, height?: number){

        if(this.ship != null && !this.ship.disposed)
            this.ship.dispose();
        if(this.enemy != null && !this.enemy.disposed)
            this.enemy.dispose();
        if(this.gates != null && !this.gates.disposed)
            this.gates.dispose();

        this.ship = this.shipBuilder.build();
        this.enemy = this.enemyBuilder.build();
        this.gates = this.gateBuilder.build();

        this.ship.initialise(this.events, this.page);
        let ship = { x: this.ship.x, y: this.ship.y };

        if(width != null && height != null) {
            this.updateDiemnsions(width, height);
            ship = { x: width / 2, y: height / 2 };
        };

        this.enemy.initialise(this.events, this.page, ship);
        this.gates.initialise(this.events, this.page, ship);
        this._initialised = true;
    };

    updateDiemnsions(width: number, height: number){
        let state = _.cloneDeep(this.page);
        state.width = width;
        state.height = height;  
        this.updateState(state);      
    };

    updateState(state: IPageState) {
        this.page = state;
        if(this.ship != null)
            this.ship.updatePageState(this.page);
        if(this.enemy != null)
            this.enemy.updatePageState(this.page);
        if(this.gates != null)
            this.gates.updatePageState(this.page);
    };

    dispose(): void {
        super.dispose();
        if(this.ship != null && !this.ship.disposed) {
            this.ship.dispose();
        };
        if(this.enemy != null && !this.enemy.disposed) {
            this.enemy.dispose();
        };
        if(this.gates != null && !this.gates.disposed) {
            this.gates.dispose();
        };
    };

}