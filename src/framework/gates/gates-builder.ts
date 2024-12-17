import type { IBuilder, OptionsService } from "..";
import type { IGate } from "./gate";
import { GateManager } from "./gates-context";



export interface IGateState {
    gates: IGate[]
};


export class GateBuilder implements IBuilder<GateManager, IGateState> {

    constructor(
        private optionsService: OptionsService
    ){}

    build(): GateManager {

        let state: IGateState = {
            gates: []
        };

        let options = this.optionsService.getOptions();

        return new GateManager(state, options);
    };

    load(state: IGateState): GateManager {
        let options = this.optionsService.getOptions();
        return new GateManager(state, options);
    };
}