import Inspector from 'interface/Inspector';

export default class Polygon implements Inspector {
  /**
   * Draw call count
   */
  private _count: number = 0;

  /**
   * Getter for draw call
   */
  public get count(): number { return this._count; }

  /**
   * Resets draw call count to zero
   */
  public resetCount(): void {
    this._count = 0;
  }

  /**
   * Invokes count incrementation in draw commands.
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
