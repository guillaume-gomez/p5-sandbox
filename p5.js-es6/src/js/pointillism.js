import p5 from 'p5';
import '../css/style.scss';

const pointillism = p => {
  let canvas;
  let width = 200;
  let height = 200;
  let img = null;
  const pointillize = 16;

  p.preload = () => {
    img = p.loadImage("assets/sunflower.jpg");
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.image(img, 0, 0);
    p.background(255);
    p.smooth();
  };

  p.draw = () => {
    // Pick a random point
    const x = parseInt(Math.random() * img.width);
    const y = parseInt(Math.random() * img.height);
    // Look up the RGB color in the source image
    img.loadPixels();
    const color = img.get(x, y);
    const r = p.red(color);
    const g = p.green(color);
    const b = p.blue(color);
    p.noStroke();

    // Draw an ellipse at that location with that color
    p.fill(r, g, b, 100);
    p.ellipse(x, y, pointillize, pointillize);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.image(img, p.windowWidth/2 - logoWidth/2, p.windowHeight/2 - logoHeight/2);
  };

};

export default pointillism;

