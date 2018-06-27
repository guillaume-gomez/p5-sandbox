import '../css/style.scss';

// basic demo
const spirograph = p => {
  let canvas;
  const width = 710;
  const height = 400;
  let NUMSINES = 20; // how many of these things can we do at once?
  let sines = new Array(NUMSINES); // an array to hold all the current angles
  let rad; // an initial radius value for the central sine

  // play with these to get a sense of what's going on:
  const fund = 0.005; // the speed of the central sine
  const ratio = 1; // what multiplier for speed is each additional sine?
  const alpha = 50; // how opaque is the tracing system

  let trace = false; // are we tracing?


  p.preload = () => {
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    rad = height/4; // compute radius for central circle
    p.background(204); // clear the screen

    for (let i = 0; i<sines.length; i++) {
      sines[i] = Math.PI; // start EVERYBODY facing NORTH
    }
  };

  p.draw = () => {
    if (!trace) {
      p.background(204); // clear screen if showing geometry
      p.stroke(0, 255); // black pen
      p.noFill(); // don't fill
    }

    // MAIN ACTION
    p.push(); // start a transformation matrix
    p.translate(width/2, height/2); // move to middle of screen

    for (let i = 0; i<sines.length; i++) {
      let erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
      // setup for tracing
      if (trace) {
        p.stroke(0, 0, 255*(float(i)/sines.length), alpha); // blue
        p.fill(0, 0, 255, alpha/2); // also, um, blue
        erad = 5.0*(1.0-float(i)/sines.length); // pen width will be related to which sine
      }
      let radius = rad/(i+1); // radius for circle itself
      p.rotate(sines[i]); // rotate circle
      if (!trace) {
        p.ellipse(0, 0, radius*2, radius*2); // if we're simulating, draw the sine
      }
      p.push(); // go up one level
      p.translate(0, radius); // move to sine edge
      if (!trace) {
        p.ellipse(0, 0, 5, 5); // draw a little circle
      }
      if (trace) {
        p.ellipse(0, 0, erad, erad); // draw with erad if tracing
      }
      p.pop(); // go down one level
      p.translate(0, radius); // move into position for next sine
      sines[i] = (sines[i]+(fund+(fund*i*ratio)))%TWO_PI; // update angle based on fundamental
    }

    p.pop(); // pop down final transformation

  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
    if ( key == ' ') {
      trace = !trace;
      p.background(255);
    }
  };
};

export default spirograph;