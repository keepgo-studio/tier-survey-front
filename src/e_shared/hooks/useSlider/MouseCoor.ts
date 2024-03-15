export default class MouseCoor {
  isMouseDown = false;
  startTime = Date.now();
  startX = 0;
  startY = 0;
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;

  mousedown(x: number, y: number) {
    this.isMouseDown = true;
    this.x1 = x; this.y1 = y; 
    this.startX = x; this.startY = y;
    this.startTime = Date.now();
  }

  mousemove(x: number, y: number, callback: () => void) {
    this.x2 = x; this.y2 = y;
    callback();
    this.x1 = x; this.y1 = y;
  }

  mouseup(x: number, y: number) {
    this.x2 = x; this.y2 = y;
    this.isMouseDown = false;

    const velocity = Math.abs(this.x2 - this.x1) / (Date.now() - this.startTime);

    return velocity;
  }
}