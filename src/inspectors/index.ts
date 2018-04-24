import DrawCall  from 'inspectors/DrawCall';
import Polygon  from 'inspectors/Polygon';

/**
 * Inspector IDs
 */
const InspectorIds: { [index: string]: string } = Object.freeze({
  DRAW_CALLS: DrawCall.name,
  POLYGON:    Polygon.name
});

export { DrawCall, Polygon, InspectorIds };
