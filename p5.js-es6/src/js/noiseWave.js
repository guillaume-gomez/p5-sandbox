import '../css/style.scss';

const noiseWave = p => {
  let canvas;
  let yoff = 0.0;
  const width = 640;
  const height = 360;

  p.preload = () => {
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
  };

  p.draw = () => {
    p.background(51);
    p.fill(255);

    p.beginShape();
    let xoff = 0;

    for(let x = 0; x <= width; x += 5) {
      const y = p.map(p.noise(xoff, yoff), 0, 1, 200, 300);

      p.vertex(x, y);
      xoff += 0.05;
    }
    yoff += 0.01;
    p.vertex(width, height);
    p.vertex(0, height);
    p.endShape(p.CLOSE);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

export default noiseWave;