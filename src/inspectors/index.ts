import DrawCall  from 'inspectors/DrawCall';
import Polygon  from 'inspectors/Polygon';

/**
 * Providing inspector ids as enum makes safer specification than string literal.<br />
 * It is used to identify inspector implementations.<br />
 */
const InspectorIds: {
  DRAW_CALLS: string,
  POLYGON: string
} = Object.freeze({
  DRAW_CALLS: DrawCall.name,
  POLYGON:    Polygon.name
});

export { DrawCall, Polygon, InspectorIds };
