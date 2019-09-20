class WROMap {
    map: Field[][];

    constructor(public readonly w: number, public readonly h: number) {
        this.generateMap();
    }

    cX = 0;
    cY = 0;

    changeFields() {
        let mX = mouseX / drawer.u;
        let mY = mouseY / drawer.u;
        if (mX >= 0 && mX <= this.w && mY >= 0 && mY <= this.h) {
            this.cX = int(mX);
            this.cY = int(mY);

            if (this.map[this.cX][this.cY].fieldType !== FieldTypes.ROAD) return;
            if (mX - this.cX < mY - this.cY) { // Bal nagy 3-szög
                if (1 - mX + this.cX > mY - this.cY) {
                    this.map[this.cX][this.cY].openSides[3] = !this.map[this.cX][this.cY].openSides[3];
                } else {
                    this.map[this.cX][this.cY].openSides[2] = !this.map[this.cX][this.cY].openSides[2];
                }
            } else { // Jobb nagy 3-szög
                if (1 - mX + this.cX > mY - this.cY) {
                    this.map[this.cX][this.cY].openSides[0] = !this.map[this.cX][this.cY].openSides[0];
                } else {
                    this.map[this.cX][this.cY].openSides[1] = !this.map[this.cX][this.cY].openSides[1];
                }
            }
        }

    }

    changeFieldsOnKeyPress() {
        let mX = mouseX / drawer.u;
        let mY = mouseY / drawer.u;

        if (mX >= 0 && mX <= this.w && mY >= 0 && mY <= this.h) {
            this.cX = int(mX);
            this.cY = int(mY);
            switch (keyCode) {
                case 79: // o
                    this.map[this.cX][this.cY].fieldType = FieldTypes.OBSTACLE;
                    break;
                case 82: // r
                    this.map[this.cX][this.cY].fieldType = FieldTypes.ROAD;
                    break;
                case 87: // w
                    this.map[this.cX][this.cY].fieldType = FieldTypes.WAREHOUSE;
                    break;
            }
        }
    }

    draw() {
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                this.drawField(this.map[x][y], x, y);
            }
        }


        stroke(255);
        strokeWeight(0.1);

        // H
        for (let i = 0; i <= this.w; i++) {
            drawer.line(i, 0, i, this.h);
        }

        // V
        for (let i = 0; i <= this.h; i++) {
            drawer.line(0, i, this.w, i);
        }
        stroke(255, 0, 0);
        strokeWeight(3);
        fill(0, 0);

        // Draw cursor


    }

    /**
     * Generate map
     */
    private generateMap() {
        this.map = [];

        if(window.localStorage.getItem("wromap")){
            this.map = JSON.parse(window.localStorage.getItem("wromap"));
            return;
        }
        for (let i = 0; i < this.w; i++) {
            this.map.push([]);
            for (let j = 0; j < this.h; j++) {
                this.map[i].push(
                    new Field(
                        FieldTypes.ROAD,
                        [random(1) > 0.5, random(1) > 0.5, random(1) > 0.5, random(1) > 0.5]
                    )
                );
            }
        }
    }

    /**
     * Draw a single field
     * @param field
     * @param x
     * @param y
     */
    private drawField(field: Field, x: number, y: number) {

        noStroke();
        switch (field.fieldType) {
            case FieldTypes.ROAD: // Draw roads
                fill(50);
                let roads: boolean[] = field.openSides;
                if (roads[0]) { // UP
                    drawer.rectangle(x + 0.25, y, 0.5, 0.75);
                }

                if (roads[1]) { // RIGHT
                    drawer.rectangle(x + 0.25, y + 0.25, 0.75, 0.5);
                }

                if (roads[2]) { // DOWN
                    drawer.rectangle(x + 0.25, y + 0.25, 0.5, 0.75);
                }

                if (roads[3]) { // LEFT
                    drawer.rectangle(x, y + 0.25, 0.75, 0.5);
                }

                // Draw white cucces
                fill(200);
                if (roads[0]) { // UP
                    drawer.rectangle(x + 0.45, y, 0.1, 0.55);
                }

                if (roads[1]) { // RIGHT
                    drawer.rectangle(x + 0.45, y + 0.45, 0.55, 0.1);
                }

                if (roads[2]) { // DOWN
                    drawer.rectangle(x + 0.45, y + 0.45, 0.1, 0.55);
                }

                if (roads[3]) { // LEFT
                    drawer.rectangle(x, y + 0.45, 0.55, 0.1);
                }
                break;
            case FieldTypes.WAREHOUSE:
                stroke(0);
                strokeWeight(0.5);
                for (let i1 = 0.05; i1 <= 1; i1 += .1) {
                    drawer.line(x, y + i1, x + i1, y);
                }
                for (let i1 = 0.05; i1 <= 1; i1 += .1) {
                    drawer.line(x + i1, y + 1, x + 1, y + i1);
                }

                fill(30);
                drawer.rectangle(x + .2, y + .2, .6, .6);
                fill(40)
                drawer.rectangle(x + .3, y + .3, .4, .4);
                break;
            case FieldTypes.OBSTACLE:
                stroke(20, 200, 20);
                strokeWeight(0.5)
                for (let i1 = 0.05; i1 <= 1; i1 += .1) {
                    drawer.line(x, y + i1, x + i1, y);
                }
                for (let i1 = 0.05; i1 <= 1; i1 += .1) {
                    drawer.line(x + i1, y + 1, x + 1, y + i1);
                }
                break;
        }

    }

    save() {
        window.localStorage.setItem("wromap", JSON.stringify(this.map));
    }

    copy() {
        copyText(JSON.stringify(this.map));
    }

}
