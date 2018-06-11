// from http://processingjs.org/learning/custom/molten/
import p5 from 'p5';
import '../css/style.scss';

// basic demo
const moltenBarChart = p => {
  let canvas;
  const xspacing = 16;   // How far apart should each horizontal location be spaced
  let w;              // Width of entire wave
  const maxwaves = 4;   // total # of waves to add together
  let total = 0;

  let theta = 0.0;
  let amplitude = [];   // Height of wave
  let dx = [];          // Value for incrementing X, to be calculated as a function of period and xspacing
  let yvalues;                           // Using an array to store height values for the wave (not entirely necessary)
  let last;

  let pos;
  let rel;
  let numLines;
  let idealLines;
  let idealSpacing;
  let targetX;

  p.preload = () => {
  };

  p.setup = () => {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    size(580, 150);
    //frameRate(24);
    colorMode(RGB,255,255,255,100);
    //background(0);
    smooth();
    w = width+16;

    for (let i = 0; i < maxwaves; i++) {
      amplitude[i] = random(20,30);
      let period = random(100,300); // How many pixels before the wave repeats
      dx[i] = (TWO_PI / period) * xspacing;
    }

    last = [];
    idealLines = numLines = (w / xspacing);
    idealSpacing = xspacing;
    yvalues = [];
  };

  p.draw = () => {
    pos = constrain(mouseX, 75, width-75);
    rel = 1 - ((pos - 75) / (width - 150));

    //background(0);
    fill(0, 10 + ((1 - rel) * 100));
    rect(0, 0, width, height);

    //numLines = idealLines + ((1 - rel) * idealLines);
    //xspacing = idealSpacing - (((1 - rel) * idealSpacing) / 2);

    calcWave();
    renderWave();
    renderChart();
    };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  renderChart = () => {
    let h = 0;

    for (let i=0; i<last.length; i++){
      last[i] = Math.abs(last[i]);
      h += last[i];
    }

    let lastAng = 0;
    let tmprel = 1 - rel;

    for (let i=0; i<last.length; i++){
      let pct = (last[i] / h) * 360;
      stroke(0, 100 * tmprel);
      fill(255, 255/(i+1), 0, 200 * tmprel);
      arc(pos, 75, 225 * tmprel, 225 * tmprel, lastAng, lastAng+radians(pct));
      lastAng += radians(pct);
    }
  }

  calcWave = () => {
    // Increment theta (try different values for 'angular velocity' here
    theta += 0.02;

    // Set all height values to zero
    for (let i = 0; i < numLines; i++) {
      yvalues[i] = 0.0;
    }
    total = 0;
    // Accumulate wave height values
    for (let j = 0; j < maxwaves; j++) {
      let x = theta;
      last[j] = 0;

      for (let i = 0; i < numLines; i++) {
        // Every other wave is cosine instead of sine
        let diff = j % 2 == 0 ? sin(x) : cos(x);
        let add = diff*amplitude[j];

        last[j] += add;

        yvalues[i] += add;

        total += add;

        x+=dx[j]; // - (((1 - rel) * dx[j]) / 2);
      }
    }
  }

  renderWave = () => {
    noStroke();

    fill(254,60,0, 120 * rel);
    beginShape();
    vertex(0,height);
    for (let x = 0; x < numLines; x++) {
      vertex(x*xspacing,height/2+yvalues[x]+-5);
      vertex((x*xspacing) + 10,height/2+yvalues[x]-5);
    }
    vertex(width,height);
    endShape(CLOSE);

    fill(255,0,0, 120 * rel);
    beginShape();
    vertex(0,height);
    for (let x = 0; x < numLines; x++) {
      vertex(x*xspacing,height/2+yvalues[x]);
      vertex((x*xspacing) + 10,height/2+yvalues[x]);
    }
    vertex(width,height);
    endShape(CLOSE);

    //fill(255,0,0,255 - ((x/numLines)*200));
    //rect(x*xspacing,height/2+yvalues[x],10,height*2);
    // - ((1-rel) * 4)

    for (let x = 0; x < numLines; x++) {
      fill(255,0,0,255 - ((x/numLines)*200));
      rect(x*xspacing,height/2+yvalues[x],10,height*2);
      // - ((1-rel) * 4)
    }
  }

};

new p5(moltenBarChart);