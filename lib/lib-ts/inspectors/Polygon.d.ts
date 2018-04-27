import Inspector from 'interface/Inspector';
/**
 * Polygon
 *
 * [[Inspector]] implementation to inspect polygons.
 * It invokes tasks that adds count on WebGL draw commands.
 */
export default class Polygon implements Inspector {
    /**
     * Polygon count
     */
    private _count;
    /**
     * Getter for polygon count
     */
    readonly count: number;
    /**
     * Resets polygon count to zero
     */
    resetCount(): void;
    /**
     * Invokes count addition in draw commands.
     */
    getInvokingTasks(): {
        [key: string]: Function[];
    };
}
