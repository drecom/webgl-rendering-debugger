import Inspector from 'interface/Inspector';
import { WebGLRenderingDebuggerError } from 'error';
import { InspectorIds, DrawCall } from 'inspectors';

/**
 * WebGLRenderingDebugger
 *
 * It attaches inspector to WebGLRenderingContext instance.
 * Each of inspectors may want to invoke there task in WebGLRenderingContext's method.
 * This class controlls method wrapping and restoring.
 *
 * NOTE: This is a debugging tool therefore its behavior may affect to performance.
 */
class WebGLRenderingDebugger {
  /**
   * public API to provide INSPECTOR_IDS to user.
   */
  public static Inspectors: { [index: string]: string } = InspectorIds;

  /**
   * Although no typings, it expects WebGLRenderingContext instance.
   */
  private context!: any;

  /**
   * Instances of Inspector.
   * index is one of INSPECTOR_IDS.
   */
  private inspectors!: { [name: string]: Inspector };
  /**
   * Original WebGLRenderingContext instance method container.
   */
  private preservations!: { [property: string]: Function  };
  /**
   * A Container for invoking tasks of inspectors.
   * Each array of tasks is related to wrapping method name.
   */
  private invokations!: {
    [property: string]: {
      [inspector: string]: Function[]
    }
  };

  /**
   * Key cache to avoid collecting keys in invoked method.
   * TODO: Assure atomicity with invokations.
   */
  private invokationsInspectorKeyCache!: { [property:string]: string[] };

  public static createInspector(inspectorId: string): Inspector | null {
    switch (inspectorId) {
      case InspectorIds.DRAW_CALLS: return new DrawCall();
      default: return null;
    }
  }

  /**
   * C'tor
   */
  constructor(ctx: any) {
    this.context = ctx;
    this.inspectors = {};
    this.preservations = {};
    this.invokations = {};
    this.invokationsInspectorKeyCache = {};
  }

  /**
   * Returns Inspector implements as generic argument type.
   */
  public getAttachedInstpector<T extends Inspector>(name: string): T {
    return this.inspectors[name] as T;
  }

  /**
   * Attaches inspector to WebGLRenderingContext instance.
   */
  public attach(inspectorId: string): void {
    if (this.inspectors.hasOwnProperty(inspectorId)) {
      throw new WebGLRenderingDebuggerError();
    }

    const inspector = WebGLRenderingDebugger.createInspector(inspectorId);

    if (inspector === null) {
      return;
    }

    this.inspectors[inspectorId] = inspector;

    const tasks = this.inspectors[inspectorId].getInvokingTasks();
    const tragetProperties = Object.keys(tasks);
    for (let i = 0; i < tragetProperties.length; i++) {
      const targetProperty = tragetProperties[i];
      this.attachInspector(targetProperty, inspectorId, tasks[targetProperty]);
    }
  }

  private attachInspector(targetProperty: string, inspectorId: string, task: Function[]): void {
    if (!this.invokations.hasOwnProperty(targetProperty)) {
      this.invokations[targetProperty] = {};
      this.invokationsInspectorKeyCache[targetProperty] = [];
    }
    this.invokations[targetProperty][inspectorId] = task;
    this.invokationsInspectorKeyCache[targetProperty].push(inspectorId);

    if (!this.preservations.hasOwnProperty(targetProperty)) {
      this.replaceContextMethod(targetProperty);
    }
  }

  /**
   * Detaches inspector from WebGLRenderingContext instance.
   */
  public detach(inspectorId: string): void {
    // collect detaching inspector names
    const targetProperties = Object.keys(this.invokations);

    // iterate through invokations
    for (let i = 0; i < targetProperties.length; i++) {
      const targetProperty = targetProperties[i];

      this.detachInspector(targetProperty, inspectorId);

      this.restorePropertyIfNeeded(targetProperty);
    }

    delete this.inspectors[inspectorId];
  }

  private detachInspector(targetProperty: string, inspectorId: string): void {
    if (!this.invokations[targetProperty].hasOwnProperty(inspectorId)) {
      return;
    }

    delete this.invokations[targetProperty][inspectorId];
    const index = this.invokationsInspectorKeyCache[targetProperty].indexOf(inspectorId);
    if (index >= 0) {
      this.invokationsInspectorKeyCache[targetProperty].splice(index, 1);
    }
  }

  private restorePropertyIfNeeded(targetProperty: string): void {
    // restore target property if all inspectors are removed
    if (Object.keys(this.invokations[targetProperty]).length > 0) {
      return;
    }

    this.context[targetProperty] = this.preservations[targetProperty];
    delete this.invokations[targetProperty];
    delete this.invokationsInspectorKeyCache[targetProperty];
    delete this.preservations[targetProperty];
  }

  /**
   * Replacing WebGLRenderingContext method to invoke inspector's tasks
   */
  private replaceContextMethod(targetProperty: string): void {
    this.preservations[targetProperty] = this.context[targetProperty];

    this.context[targetProperty] = (...args: any[]): void => {
      const inspectorTasks = this.invokationsInspectorKeyCache[targetProperty];
      for (let i = 0; i < inspectorTasks.length; i++) {
        const tasks = this.invokations[targetProperty][inspectorTasks[i]];
        for (let j = 0; j < tasks.length; j++) {
          tasks[j](...args);
        }
      }

      // call original
      this.preservations[targetProperty].call(this.context, ...args);
    };
  }
}

export { WebGLRenderingDebugger as default, DrawCall, WebGLRenderingDebuggerError };
