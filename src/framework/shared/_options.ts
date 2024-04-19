

export interface IOptions {

    /** enemy options */
    spawnRate: number;
    rateIncreasePower: number;
    enemySpeed: number;

    /** ship options */
    shipSpeed: number;
    shipSize: number; //in pixels
}

export class Options implements IOptions {

    constructor(){

    };

    /** enemy options */
    spawnRate = 1;
    rateIncreasePower = 3;
    enemySpeed = 12;

    /** ship options */
    shipSpeed = 12;
    shipSize = 10;
};

/** abstract so can load in from a different source in the future */
export class OptionsService {
    getOptions() {
        return new Options();
    };
};