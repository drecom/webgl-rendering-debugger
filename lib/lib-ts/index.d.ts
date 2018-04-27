import Inspector from 'interface/Inspector';
import { WebGLRenderingDebuggerError } from 'error';
import { InspectorIds, DrawCall, Polygon } from 'inspectors';
/**
 * WebGLRenderingDebugger
 *
 * It attaches inspector to WebGLRenderingContext instance.<br />
 * Each of inspectors may want to invoke there task in WebGLRenderingContext's method.<br />
 * This class controlls method wrapping and restoring.<br />
 * <br />
 * NOTE: This is a debugging tool therefore its behavior may affect to performance.
 */
declare class WebGLRenderingDebugger {
    /**
     * public API to provide [[InspectorIds]] to user.
     */
    static Inspectors: typeof InspectorIds;
    /**
     * Although no typings, it expects WebGLRenderingContext instance.
     */
    private context;
    /**
     * Instances of [[Inspector]].<br />
     * index is one of [[InspectorIds]].
     */
    private inspectors;
    /**
     * Original WebGLRenderingContext instance method container.
     */
    private preservations;
    /**
     * A container for invoking tasks of inspectors.<br />
     * Each array of tasks is related to wrapping method name.
     */
    private invokations;
    /**
     * Key cache to avoid collecting keys in invoked method.<br />
     * TODO: Assure atomicity with invokations.
     */
    private invokationsInspectorKeyCache;
    static createInspector(inspectorId: string): Inspector | null;
    /**
     * C'tor
     */
    constructor(ctx: any);
    /**
     * Returns [[Inspector]] implements as generic argument type.
     */
    getAttachedInstpector<T extends Inspector>(name: string): T;
    /**
     * Attaches inspector to WebGLRenderingContext instance.
     */
    attach(inspectorId: string): void;
    /**
     * Attaches inspector tasks to perticular property on WebGLRenderingContext instance.
     */
    private attachInspector(targetProperty, inspectorId, task);
    /**
     * Detaches inspector from WebGLRenderingContext instance.
     */
    detach(inspectorId: string): void;
    /**
     * Detaches inspector tasks from perticular property on WebGLRenderingContext instance.
     */
    private detachInspector(targetProperty, inspectorId);
    /**
     * Restore WebGLRenderingContext instance's property to its original one<br />
     * if [[invokations]]'s target property does not have any property.
     */
    private restorePropertyIfNeeded(targetProperty);
    /**
     * Replacing WebGLRenderingContext method to invoke inspector's tasks
     */
    private replaceContextMethod(targetProperty);
}
export { WebGLRenderingDebugger as default, DrawCall, Polygon, WebGLRenderingDebuggerError };
