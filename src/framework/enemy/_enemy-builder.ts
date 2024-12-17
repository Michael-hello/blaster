import { EnemyManager, type IBuilder, type IEnemy, type OptionsService } from "..";


export interface IEnemyCtxState {
    enemies: IEnemy[]
}


export class EnemyBuilder implements IBuilder<EnemyManager, IEnemyCtxState> {

    constructor(
        private optionsService: OptionsService
    ){}

    build(): EnemyManager {

        let state: IEnemyCtxState = {
            enemies: []
        };

        let options = this.optionsService.getOptions();

        return new EnemyManager(state, options);
    };

    load(state: IEnemyCtxState): EnemyManager {
        let options = this.optionsService.getOptions();
        return new EnemyManager(state, options);
    };
}