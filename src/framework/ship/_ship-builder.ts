import type { IBuilder, OptionsService } from "..";
import { ShipContext, type IShipState } from "./_ship-context";

export class ShipBuilder implements IBuilder<ShipContext, IShipState> {

    constructor(
        private optionsService: OptionsService
    ){}

    build(): ShipContext {

        let state: IShipState = {
            location: {
                x: 0,
                y: 0
            },
            lives: 3
        };

        let options = this.optionsService.getOptions();

        return new ShipContext(state, options);
    };

    load(state: IShipState): ShipContext {
        let options = this.optionsService.getOptions();
        return new ShipContext(state, options);
    };
}