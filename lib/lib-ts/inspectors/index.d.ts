import DrawCall from 'inspectors/DrawCall';
import Polygon from 'inspectors/Polygon';
/**
 * Providing inspector ids as enum makes safer specification than string literal.<br />
 * It is used to identify inspector implementations.<br />
 */
declare const InspectorIds: {
    DRAW_CALLS: string;
    POLYGON: string;
};
export { DrawCall, Polygon, InspectorIds };
