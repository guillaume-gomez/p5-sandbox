import '../css/style.scss';

const terrain = p => {
  let canvas;
  const width = 600;
  const height = 600;
  const scl = 20;
  const cols = height / scl;
  const rows = width / scl; 

  p.preload = () => {
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height, p.P3D);
  };

  p.draw = () => {
    p.background(0);
    for(let x = 0; x < rows; x++) {
      for(let y= 0; y < cols; y++) {
        p.stroke(255);
        p.noFill();
        p.rect(x * scl, y * scl, scl, scl);
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(width, height);
  };

  p.keyPressed = () => {
  };
};

export default terrain;