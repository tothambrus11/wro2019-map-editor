class Drawer {
    /**
     * Drawer constructor
     * @param u unit size
     * @param w width in units
     * @param h height in units
     */
    constructor(public u: number, public w: number, public h: number) {
        createCanvas(this.u * this.w, this.u * this.h)
    }

    /**
     * Draw a rectangle with unit sizes
     * @param x
     * @param y
     * @param w width of the rectangle
     * @param h height of the rectangle
     */
    rectangle(x: number, y: number, w: number, h: number) {
        rect(x * this.u, y * this.u, w * this.u, h * this.u);
    }

    line(x1: number, y1: number, x2: number, y2: number) {
        line(x1 * this.u, y1 * this.u, x2 * this.u, y2 * this.u);
    }

    shape(vertexes: { x: number; y: number }[]) {
        beginShape();
        vertexes.forEach((value) => {
            vertex(value.x * this.u, value.y * this.u);
        });
        endShape(CLOSE);
    }
}
