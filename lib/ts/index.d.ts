import Inspector from 'interface/Inspector';
import { DrawCall } from 'inspectors';
/**
 * WebGLRenderingDebugger
 *
 * It attaches inspector to WebGLRenderingContext instance.
 * Each of inspectors may want to invoke there task in WebGLRenderingContext's method.
 * This class controlls method wrapping and restoring.
 *
 * NOTE: This is a debugging tool therefore its behavior may affect to performance.
 */
declare class WebGLRenderingDebugger {
    /**
     * public API to provide INSPECTOR_IDS to user.
     */
    static Inspectors: {
        [index: string]: string;
    };
    /**
     * Although no typings, it expects WebGLRenderingContext instance.
     */
    private context;
    /**
     * Instances of Inspector.
     * index is one of INSPECTOR_IDS.
     */
    private inspectors;
    /**
     * Original WebGLRenderingContext instance method container.
     */
    private preservations;
    /**
     * A Container for invoking tasks of inspectors.
     * Each array of tasks is related to wrapping method name.
     */
    private invokations;
    /**
     * Key cache to avoid collecting keys in invoked method.
     * TODO: Assure atomicity with invokations.
     */
    private invokationsInspectorKeyCache;
    /**
     * C'tor
     */
    constructor(ctx: any);
    /**
     * Returns Inspector implements as generic argument type.
     */
    getAttachedInstpector<T extends Inspector>(name: string): T;
    /**
     * Attaches inspector to WebGLRenderingContext instance.
     */
    attach(inspectorId: string): void;
    /**
     * Detaches inspector from WebGLRenderingContext instance.
     */
    detach(inspectorId: string): void;
    /**
     * Replacing WebGLRenderingContext method to invoke inspector's tasks
     */
    private replaceContextMethod(targetProperty);
}
export { WebGLRenderingDebugger as default, DrawCall };
