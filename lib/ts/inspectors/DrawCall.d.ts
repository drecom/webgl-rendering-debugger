import Inspector from 'interface/Inspector';
export default class DrawCall implements Inspector {
    /**
     * Draw call count
     */
    private _count;
    /**
     * Getter for draw call
     */
    readonly count: number;
    /**
     * Resets draw call count to zero
     */
    resetCount(): void;
    /**
     * Invokes count incrementation in draw commands.
     */
    getInvokingTasks(): {
        [key: string]: Function[];
    };
}
