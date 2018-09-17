inlets = 1;
outlets = 2;

var buff = new Buffer("loop");
var passes = 0;

function randomWalk() {
    var k = buff.framecount() - 1;
    var j = Math.floor(Math.random() * k);
    var direction = 1;
    var tmp;
	var amp = 1;
	var instability = false;
    for (var i = 0; i < k; i++) {
        for (var channel = 1; channel <= buff.channelcount(); channel++) {
            tmp = buff.peek(channel, Math.round(j), 1);
            buff.poke(channel, i, (tmp * amp) + (buff.peek(channel, i, 1) * 0.7));
        }
		if (!instability) {
			if (amp < 1) {
				amp += 0.001;
			}
		} else {
			if (amp < 0.75) {
				amp += 0.001;
			}
		}
        j += direction;
        if (Math.random() <  0.00001) {
            direction *= -1;
			if (Math.random() < 0.25) {
				//direction *= (Math.random() < 0.5) ? 0.999 : 1.111;
				//direction *= (Math.random() < 0.5) ? 0.99 : 1.11;
			}
			
        }
		if (!instability) {
			if (Math.random() < 0.00015) {
				instability = true;
				amp = 0;
			} 
		}
		if (instability) {
			amp = 0.75;
			//direction += (Math.random() < 0.5) ? -1 : 1;
			//direction *= (Math.random() < 0.5) ? 0.9 : 1.1;
			if (Math.random() < 0.1) {
				direction *= (Math.random() < 0.5) ? 0.99 : 1.01;
				//direction *= (Math.random() < 0.75) ? 0.9999 : 1.0001;
			}
			if (Math.random() < 0.1) {
				//direction *= (Math.random() < 0.5) ? 0.999 : 1.111;
			}
			if (Math.random() < 0.00001) {
				instability = false;
				direction = (direction < 0) ? -1 : 1;
				amp = 1;
			}
		}
		//direction += (Math.random() < 0.5) ? -1 : 1;
		
        if (j <= 0) {
            //j = Math.floor(Math.random() * k);
			//j = 0;
			//direction = 1;
        } else if (j >= k) {
            //j = Math.floor(Math.random() * k);
			//j = k - 1;
			//direction = -1;
        }
		if (j <= 0) {
            j = Math.floor(Math.random() * k);
        }
        if (j >= k) {
            j = Math.floor(Math.random() * k);
        }
    }
    outlet(0, "bang");
    passes++;
    outlet(1, passes);
}