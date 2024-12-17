

export interface IOptions {

    /** enemy options */
    spawnRate: number;
    rateIncreasePower: number;
    enemySpeed: number;
    enemySize: number;

    /** ship options */
    shipSpeed: number; 
    shipSize: number; //in pixels
    shipReloadRate: number; //in ms
};


/** abstract so can load in from a different source in the future */
export class OptionsService {

    getOptions() : IOptions {
        return {
            spawnRate: 4,
            rateIncreasePower: 3,
            enemySpeed: 4,
            enemySize: 10,
            shipSpeed: 12,
            shipSize: 10,
            shipReloadRate: 30
        }
    };
};