let drawer: Drawer;
let myMap: WROMap;

function setup() {
    //createCanvas(windowWidth, windowHeight);
    let w = 7;
    let h = 7;
    let u = 100;

    drawer = new Drawer(u, w, h);
    myMap = new WROMap(w, h);
}

function mousePressed() {
    myMap.changeFields();
}

function keyPressed() {
    myMap.changeFieldsOnKeyPress();
}
/*function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}*/

function draw() {
    background(20, 80, 20);
    myMap.draw();
}


function copyText(text: string) {
    function fallbackCopyTextToClipboard(text: string) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(
        function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });

}
