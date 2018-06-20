import '../css/style.scss';

// basic demo
const sketch = p => {
  let canvas;
  let logo;
  let logoWidth = 250;
  let logoHeight = 114;

  p.preload = () => {
    logo = p.loadImage("assets/p5js.svg");
  };

  p.setup = () => {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.image(logo, p.windowWidth/2 - logoWidth/2, p.windowHeight/2 - logoHeight/2);
  };

  p.draw = () => {
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.image(logo, p.windowWidth/2 - logoWidth/2, p.windowHeight/2 - logoHeight/2);
  };

  p.keyPressed = () => {
  };
};

export default sketch;

