inlets = 1;
outlets = 2;

var buff = new Buffer("loop");
var passes = 0;

function randomWalk() {
    var k = buff.framecount() - 1;
    var j = Math.floor(Math.random() * k);
    var direction = 1;
    var tmp;
    for (var i = 0; i < k; i++) {
        for (var channel = 1; channel <= buff.channelcount(); channel++) {
            tmp = buff.peek(channel, j, 1);
            buff.poke(channel, i, tmp + buff.peek(channel, i, 1) * 0.9);
        }
        j += direction;
        if (Math.random() <  0.000001) {
            direction *= -1;
        }
        if (j <= 0) {
            j = Math.floor(Math.random() * k);
        } else if (j >= k) {
            j = Math.floor(Math.random() * k);
        }
    }
    outlet(0, "bang");
    passes++;
    outlet(1, passes);
}