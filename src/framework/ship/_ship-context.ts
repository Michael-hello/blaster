import type { Subject } from "rxjs";
import { ShipLifeChange, isCollisionEvent, Enemy, type Event, KeyPressDown, KeyPressUp, cloneObject,  isUserEvent, type UserEvent, type IPageState, type IOptions, keys, ShipMoveEvent, type ILocation } from "..";
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
    moving = false;
    direction = 0;     /** direction ship is facing in degrees */
    currentLives = Number.MAX_VALUE;

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
        this.updateLives(this.state.lives);

        this.initialiseEvents(this.events);

        let sub1 = this.events.pipe(
            filter(x => isUserEvent(x))
        ).subscribe((x) => {
            if(x.topic == KeyPressDown) this.processKey(x as UserEvent, 'down');
            if(x.topic == KeyPressUp) this.processKey(x as UserEvent, 'up');
        });

        let sub2 = this.events.pipe(
            filter(x => isCollisionEvent(x))
        ).subscribe((x) => {
            this.updateLives(this.currentLives - 1);
        });

        this.subscriptions.push(...[ sub1, sub2 ]);
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
        this.moving = direction == 'down';
    };

    updateLocation(position: { x?: number, y?: number} ){
        if(this.paused) return;

        let original = cloneObject(this.state.location);
        let { x , y } = position;
        if(x) this.state.location.x = x;
        if(y) this.state.location.y = y;

        if(x == null) position.x = original.x;
        if(y == null) position.y = original.y;

        this.direction = Enemy.trajectoryAtoB(original, position as ILocation);
    };

    updateLives(count: number) {
        this.currentLives = count;    
        this.events.next({ topic: ShipLifeChange, remainingLives: this.currentLives });
    };

    move(){
        if(this.paused) return;

        let move = this.options.shipSpeed / this.options.difficulty;
        let size = this.options.shipSize / 2;

        if(this.keyDown['w']) this.updateLocation({ y: Math.max(0, this.y - move - size) });
        if(this.keyDown['s']) this.updateLocation({ y: Math.min(this.y + move, this.page.height - (size * 2) ) });

        if(this.keyDown['a']) this.updateLocation({ x: Math.max(0 + size , this.x - move) });
        if(this.keyDown['d']) this.updateLocation({ x: Math.min(this.x + move, this.page.width - (size * 2) ) });

        this.events.next({ topic: ShipMoveEvent, x: this.x, y: this.y });
    };

    dispose(): void {
        super.dispose();
    };
}