// @ts-check
const PATH_WIDTH = 101;
const PATH_HEIGHT = 9;

const PROGRESS = '--fancy-animation-progress';
const COLOR = '--fancy-animation-color';

class FancyLinkUnderlinePainter {
  static get inputProperties() {
    return [PROGRESS, COLOR];
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {{width: number; height: number}} geom
   * @param {ReadonlyMap<string, any>} properties
   */
  paint(ctx, geom, properties) {
    const progress = properties.get(PROGRESS);
    const color = properties.get(COLOR);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;

    const _xScaling = geom.width / PATH_WIDTH;
    const _yScaling = 1;

    ctx.translate(0, geom.height - PATH_HEIGHT);

    ctx.lineTo(0.426 * _xScaling, 1.973 * _yScaling);
    ctx.bezierCurveTo(
      4.144 * _xScaling,
      1.567 * _yScaling,
      17.77 * _xScaling,
      -0.514 * _yScaling,
      21.443 * _xScaling,
      1.48 * _yScaling,
    );
    ctx.bezierCurveTo(
      24.296 * _xScaling,
      3.026 * _yScaling,
      24.844 * _xScaling,
      4.627 * _yScaling,
      27.5 * _xScaling,
      7 * _yScaling,
    );
    ctx.bezierCurveTo(
      30.575 * _xScaling,
      9.748 * _yScaling,
      34.142 * _xScaling,
      2.859 * _yScaling,
      37.566 * _xScaling,
      2.312 * _yScaling,
    );
    ctx.bezierCurveTo(
      45.083 * _xScaling,
      1.112 * _yScaling,
      50.803 * _xScaling,
      7.737 * _yScaling,
      55.156 * _xScaling,
      5.057 * _yScaling,
    );
    ctx.bezierCurveTo(
      58.5 * _xScaling,
      3 * _yScaling,
      60.464 * _xScaling,
      -1.786 * _yScaling,
      66 * _xScaling,
      2 * _yScaling,
    );
    ctx.bezierCurveTo(
      67.996 * _xScaling,
      3.365 * _yScaling,
      69.174 * _xScaling,
      5.737 * _yScaling,
      71.286 * _xScaling,
      6.41 * _yScaling,
    );
    ctx.bezierCurveTo(
      76.709 * _xScaling,
      8.137 * _yScaling,
      96.626 * _xScaling,
      -1.571 * _yScaling,
      100.426 * _xScaling,
      5.116 * _yScaling,
    );
    ctx.stroke();

    ctx.clearRect(progress * geom.width, 0, (1 - progress) * geom.width, geom.height);
  }
}

// Register our class under a specific name
registerPaint('fancyLinkUnderline', FancyLinkUnderlinePainter);
