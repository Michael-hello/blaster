import type { BaseContext } from "./_base-context";

export interface IBuilder<T extends BaseContext, State> {
    build(): T;
    load(state: State): T;
}