import DrawCall  from 'inspectors/DrawCall';

/**
 * Inspector IDs
 */
const InspectorIds: { [index: string]: string } = Object.freeze({
  DRAW_CALLS: DrawCall.name
});

export { DrawCall, InspectorIds };
