export default class MouseCoor {
  isMouseDown = false;
  startTime = Date.now();
  endTime = Date.now();
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;

  mousedown(x: number, y: number) {
    this.isMouseDown = true;
    this.x1 = x; this.y1 = y;
    this.startTime = Date.now();
  }

  mouseup(x: number, y: number) {
    this.isMouseDown = false;
    this.x2 = x; this.y2 = y;
    this.endTime = Date.now();
  }
}