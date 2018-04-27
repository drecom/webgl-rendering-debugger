import Inspector from 'interface/Inspector';
/**
 * DrawCall
 *
 * [[Inspector]] implementation to inspect draw calls.<br />
 * It invokes count incrementing tasks on WebGL draw commands.
 */
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
