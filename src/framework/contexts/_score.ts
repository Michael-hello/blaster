import { filter, type Subject } from "rxjs";
import { isScoreableEvent, type EnemyDeathEvent, type GateSmashEvent, ShipGateSmashEvent, BaseContext, type Event, EnemyDeath } from "..";


export class ScoreContext extends BaseContext {

    get score() { return this._score };

    private events: Subject<Event> = null as any;

    _score = 0;

    constructor() {
        super();
    };

    initialise(events: Subject<Event>) {

        this.events = events;
        this._score = 0;

        let sub1 = this.events.pipe(
            filter(x => isScoreableEvent(x))
        ).subscribe(x => {
            this.updateScore(x as EnemyDeathEvent | GateSmashEvent);
        });

        this.subscriptions.push(...[ sub1 ]);
    };

    updateScore(event: EnemyDeathEvent | GateSmashEvent) {
        if(event.topic == EnemyDeath) {
            this._score += 50;
        } else if(event.topic == ShipGateSmashEvent) {
            this._score += 10;
        };
    };

    dispose(): void {
        super.dispose();
    };

}