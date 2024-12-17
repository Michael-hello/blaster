import type { Subject } from "rxjs";
import { type Event, KeyPressDown, KeyPressUp,  isUserEvent, type UserEvent, type IPageState, type IOptions, keys, ShipMoveEvent, type ILocation } from "..";
import {  filter } from "rxjs/operators";
import { BaseContext } from "../index";

export interface IShipState {
    location: ILocation;
    lives: number;   
}

export class ShipContext extends BaseContext {

    private events: Subject<Event> = null as any;
    private page: IPageState = null as any;

    /** location refers to centre of the ship */
    get x(){ return this.state.location.x }
    get y(){ return this.state.location.y }

    keyDown: { [key: string]: boolean } = { 'w': false, 'a': false, 's': false, 'd': false };

    constructor(
        private state: IShipState,
        private options: IOptions
    ){
        super();       
    };

    updatePageState(state: IPageState){
        this.page = state;
    };

    initialise(events: Subject<Event>, page: IPageState){
        this.updatePageState(page);
        this.events = events;

        /** initialise position to centre of page */
        let y = this.page.height / 2;
        let x = this.page.width / 2;
        this.updateLocation({ x , y });

        let sub1 = this.events.pipe(
            filter(x => isUserEvent(x))
        ).subscribe((x) => {
            if(x.topic == KeyPressDown) this.processKey(x as UserEvent, 'down');
            if(x.topic == KeyPressUp) this.processKey(x as UserEvent, 'up');
        });

        this.subscriptions.push(sub1);
        this.intervals.push(setInterval(() => this.move(), this.options.shipReloadRate));
    };

    save(): IShipState {
        return this.state;
    };

    processKey(x: UserEvent, direction: 'up' | 'down'){
        let key = x.key.toLowerCase();
        /** checks that the key corresponds to valid key press */
        let invalid = keys.find(x => x == key) == null;
        if(invalid) return;

        this.keyDown[key] = direction == 'down' ? true : false;
    };

    updateLocation(position: { x?: number, y?: number} ){
        let { x , y } = position;
        if(x) this.state.location.x = x;
        if(y) this.state.location.y = y;
    };

    move(){
        let move = this.options.shipSpeed;
        let size = this.options.shipSize / 2;

        if(this.keyDown['w']) this.updateLocation({ y: Math.max(0, this.y - move - size) });
        if(this.keyDown['s']) this.updateLocation({ y: Math.min(this.y + move, this.page.height - (size * 2) ) });

        if(this.keyDown['a']) this.updateLocation({ x: Math.max(0 + size , this.x - move) });
        if(this.keyDown['d']) this.updateLocation({ x: Math.min(this.x + move, this.page.width - (size * 2) ) });

        this.events.next({ topic: ShipMoveEvent, x: this.x, y: this.y });
    };
}