var Drawer = (function () {
    function Drawer(u, w, h) {
        this.u = u;
        this.w = w;
        this.h = h;
        createCanvas(this.u * this.w, this.u * this.h);
    }
    Drawer.prototype.rectangle = function (x, y, w, h) {
        rect(x * this.u, y * this.u, w * this.u, h * this.u);
    };
    Drawer.prototype.line = function (x1, y1, x2, y2) {
        line(x1 * this.u, y1 * this.u, x2 * this.u, y2 * this.u);
    };
    Drawer.prototype.shape = function (vertexes) {
        var _this = this;
        beginShape();
        vertexes.forEach(function (value) {
            vertex(value.x * _this.u, value.y * _this.u);
        });
        endShape(CLOSE);
    };
    return Drawer;
}());
var FieldTypes;
(function (FieldTypes) {
    FieldTypes[FieldTypes["WAREHOUSE"] = 0] = "WAREHOUSE";
    FieldTypes[FieldTypes["ROAD"] = 1] = "ROAD";
    FieldTypes[FieldTypes["OBSTACLE"] = 2] = "OBSTACLE";
})(FieldTypes || (FieldTypes = {}));
var Field = (function () {
    function Field(fieldType, openSides) {
        this.fieldType = fieldType;
        this.openSides = openSides;
    }
    return Field;
}());
var Map = (function () {
    function Map(w, h) {
        this.w = w;
        this.h = h;
        this.cX = 0;
        this.cY = 0;
        this.generateMap();
    }
    Map.prototype.changeFields = function () {
        var mX = mouseX / drawer.u;
        var mY = mouseY / drawer.u;
        if (mX >= 0 && mX <= this.w && mY >= 0 && mY <= this.h) {
            this.cX = int(mX);
            this.cY = int(mY);
            if (this.map[this.cX][this.cY].fieldType !== FieldTypes.ROAD)
                return;
            if (mX - this.cX < mY - this.cY) {
                if (1 - mX + this.cX > mY - this.cY) {
                    this.map[this.cX][this.cY].openSides[3] = !this.map[this.cX][this.cY].openSides[3];
                }
                else {
                    this.map[this.cX][this.cY].openSides[2] = !this.map[this.cX][this.cY].openSides[2];
                }
            }
            else {
                if (1 - mX + this.cX > mY - this.cY) {
                    this.map[this.cX][this.cY].openSides[0] = !this.map[this.cX][this.cY].openSides[0];
                }
                else {
                    this.map[this.cX][this.cY].openSides[1] = !this.map[this.cX][this.cY].openSides[1];
                }
            }
        }
    };
    Map.prototype.changeFieldsOnKeyPress = function () {
        var mX = mouseX / drawer.u;
        var mY = mouseY / drawer.u;
        if (mX >= 0 && mX <= this.w && mY >= 0 && mY <= this.h) {
            this.cX = int(mX);
            this.cY = int(mY);
            switch (keyCode) {
                case 79:
                    this.map[this.cX][this.cY].fieldType = FieldTypes.OBSTACLE;
                    break;
                case 82:
                    this.map[this.cX][this.cY].fieldType = FieldTypes.ROAD;
                    break;
                case 87:
                    this.map[this.cX][this.cY].fieldType = FieldTypes.WAREHOUSE;
                    break;
            }
        }
    };
    Map.prototype.draw = function () {
        for (var x = 0; x < this.w; x++) {
            for (var y = 0; y < this.h; y++) {
                Map.drawField(this.map[x][y], x, y);
            }
        }
        stroke(255);
        strokeWeight(0.1);
        for (var i = 0; i <= this.w; i++) {
            drawer.line(i, 0, i, this.h);
        }
        for (var i = 0; i <= this.h; i++) {
            drawer.line(0, i, this.w, i);
        }
        stroke(255, 0, 0);
        strokeWeight(3);
        fill(0, 0);
    };
    Map.prototype.generateMap = function () {
        this.map = [];
        if (window.localStorage.getItem("wromap")) {
            this.map = JSON.parse(window.localStorage.getItem("wromap"));
            return;
        }
        for (var i = 0; i < this.w; i++) {
            this.map.push([]);
            for (var j = 0; j < this.h; j++) {
                this.map[i].push(new Field(FieldTypes.ROAD, [random(1) > 0.5, random(1) > 0.5, random(1) > 0.5, random(1) > 0.5]));
            }
        }
    };
    Map.drawField = function (field, x, y) {
        noStroke();
        switch (field.fieldType) {
            case FieldTypes.ROAD:
                fill(50);
                var roads = field.openSides;
                if (roads[0]) {
                    drawer.rectangle(x + 0.25, y, 0.5, 0.75);
                }
                if (roads[1]) {
                    drawer.rectangle(x + 0.25, y + 0.25, 0.75, 0.5);
                }
                if (roads[2]) {
                    drawer.rectangle(x + 0.25, y + 0.25, 0.5, 0.75);
                }
                if (roads[3]) {
                    drawer.rectangle(x, y + 0.25, 0.75, 0.5);
                }
                fill(200);
                if (roads[0]) {
                    drawer.rectangle(x + 0.45, y, 0.1, 0.55);
                }
                if (roads[1]) {
                    drawer.rectangle(x + 0.45, y + 0.45, 0.55, 0.1);
                }
                if (roads[2]) {
                    drawer.rectangle(x + 0.45, y + 0.45, 0.1, 0.55);
                }
                if (roads[3]) {
                    drawer.rectangle(x, y + 0.45, 0.55, 0.1);
                }
                break;
            case FieldTypes.WAREHOUSE:
                stroke(0);
                strokeWeight(0.5);
                for (var i1 = 0.05; i1 <= 1; i1 += .1) {
                    drawer.line(x, y + i1, x + i1, y);
                }
                for (var i1 = 0.05; i1 <= 1; i1 += .1) {
                    drawer.line(x + i1, y + 1, x + 1, y + i1);
                }
                fill(30);
                drawer.rectangle(x + .2, y + .2, .6, .6);
                fill(40);
                drawer.rectangle(x + .3, y + .3, .4, .4);
                break;
            case FieldTypes.OBSTACLE:
                stroke(20, 200, 20);
                strokeWeight(0.5);
                for (var i1 = 0.05; i1 <= 1; i1 += .1) {
                    drawer.line(x, y + i1, x + i1, y);
                }
                for (var i1 = 0.05; i1 <= 1; i1 += .1) {
                    drawer.line(x + i1, y + 1, x + 1, y + i1);
                }
                break;
        }
    };
    Map.prototype.save = function () {
        window.localStorage.setItem("wromap", JSON.stringify(this.map));
    };
    Map.prototype.copy = function () {
        copyText(JSON.stringify(this.map));
    };
    return Map;
}());
var drawer;
var myMap;
function setup() {
    var w = 7;
    var h = 7;
    var u = 100;
    drawer = new Drawer(u, w, h);
    myMap = new Map(w, h);
}
function mousePressed() {
    myMap.changeFields();
}
function keyPressed() {
    myMap.changeFieldsOnKeyPress();
}
function draw() {
    background(20, 80, 20);
    myMap.draw();
}
function copyText(text) {
    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        }
        catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}
//# sourceMappingURL=build.js.map