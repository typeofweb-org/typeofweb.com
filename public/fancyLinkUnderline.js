// @ts-check
const PATH_WIDTH = 101;
const PATH_HEIGHT = 9;

const PROGRESS = '--fancy-animation-progress';
const COLOR = '--fancy-animation-color';

/**
 * @typedef {[cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number]} Bezier
 */

/**
 * @type {Bezier[]}
 */
const underlineBeziers = [
  [0.426, 1.973, 0.426, 1.973, 0.426, 1.973],
  [4.144, 1.567, 17.77, -0.514, 21.443, 1.48],
  [24.296, 3.026, 24.844, 4.627, 27.5, 7],
  [30.575, 9.748, 34.142, 2.859, 37.566, 2.312],
  [45.083, 1.112, 50.803, 7.737, 55.156, 5.057],
  [58.5, 3, 60.464, -1.786, 66, 2],
  [67.996, 3.365, 69.174, 5.737, 71.286, 6.41],
  [76.709, 8.137, 96.626, -1.571, 100.426, 5.116],
];

class FancyLinkUnderlinePainter {
  static get inputProperties() {
    return [PROGRESS, COLOR];
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {{width: number; height: number}} geom
   * @param {ReadonlyMap<string, any>} properties
   */
  paint(ctx, geom, properties) {
    const progress = properties.get(PROGRESS);
    const color = properties.get(COLOR);
    const xScaling = geom.width / PATH_WIDTH;
    const yScaling = 1;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.scale(xScaling, yScaling);
    ctx.translate(0, geom.height - PATH_HEIGHT);

    for (const args of underlineBeziers) {
      ctx.bezierCurveTo(...args);
    }
    ctx.stroke();

    ctx.resetTransform();
    ctx.clearRect(progress * geom.width, 0, (1 - progress) * geom.width, geom.height);
  }
}

// Register our class under a specific name
registerPaint('fancyLinkUnderline', FancyLinkUnderlinePainter);
