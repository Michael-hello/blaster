import type { Subject } from "rxjs";
import { KeyPressDown, KeyPressUp,  isUserEvent, type UserEvent, type IPageState, type IOptions, keys } from "..";
import {  filter } from "rxjs/operators";
import { BaseContext } from "../index";

export interface IShipState {
    positionX: number;
    positionY: number; 
    lives: number;   
}

export class ShipContext extends BaseContext {

    private events: Subject<UserEvent> = null as any;
    private page: IPageState = null as any;

    get positionX(){ return this.state.positionX }
    get positionY(){ return this.state.positionY }

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

    initialise(events: Subject<UserEvent>, page: IPageState){
        this.updatePageState(page);
        this.events = events;

        /** initialise position to centre of page */
        let y = this.page.height / 2;
        let x = this.page.width / 2;
        this.updateLocation({ x , y });

        let sub1 = this.events.pipe(
            filter(x => isUserEvent(x))
        ).subscribe((x) => {
            if(x.topic == KeyPressDown) this.processKey(x, 'down');
            if(x.topic == KeyPressUp) this.processKey(x, 'up');
        });

        this.subscriptions.push(sub1);
        this.intervals.push(setInterval(() => this.move(), 30));
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
        if(x) this.state.positionX = x;
        if(y) this.state.positionY = y;
    };

    move(){
        let move = this.options.shipSpeed;
        let size = this.options.shipSize;

        if(this.keyDown['w']) this.updateLocation({ y: Math.max(0 , this.positionY - move) });
        if(this.keyDown['s']) this.updateLocation({ y: Math.min(this.positionY + move, this.page.height - size) });

        if(this.keyDown['a']) this.updateLocation({ x: Math.max(0 , this.positionX - move) });
        if(this.keyDown['d']) this.updateLocation({ x: Math.min(this.positionX + move, this.page.width- size) });

        // this.events.next({ topic: ShipMoveEvent, x: this._positionX, y: this.positionY });
    };
}