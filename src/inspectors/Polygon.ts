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
  private _count: number = 0;

  /**
   * Getter for polygon count
   */
  public get count(): number { return this._count; }

  /**
   * Resets polygon count to zero
   */
  public resetCount(): void {
    this._count = 0;
  }

  /**
   * Invokes count addition in draw commands.
   */
  public getInvokingTasks(): { [key: string]: Function[] } {
    return {
      drawElements: [
        (_mode: number, count: number, _type: number, _offset: number) => {
          this._count += count;
        }
      ],
      drawArrays: [
        (_mode: number, _first: number, count: number) => {
          this._count += count;
        }
      ]
    };
  }
}
