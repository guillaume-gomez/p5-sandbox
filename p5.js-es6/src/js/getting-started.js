import p5 from 'p5';
import '../css/style.scss';

const gettingStarted = p => {
  let canvas;
  let X, Y;
  let nX, nY;
  const delay = 16;
  let radius = 50.0;

  p.preload = () => {
  };

  p.setup = () => {
    p.strokeWeight(10);
    p.frameRate(15);
    X = p.windowWidth / 2;
    Y = p.windowHeight / 2;
    nX = X;
    nY = Y;

    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    radius = radius + Math.sin(p.frameCount / 4);
    X += (nX - X) / delay;
    Y += (nY - Y) / delay;
    // Fill canvas grey
    p.background( 100 );
    // Set fill-color to blue
    p.fill( 0, 121, 184 );
    // Set stroke-color white
    p.stroke(255);
    // Draw circle
    p.ellipse( X, Y, radius, radius );
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.image(logo, p.windowWidth/2 - logoWidth/2, p.windowHeight/2 - logoHeight/2);
  };

  p.keyPressed = () => {
  };

  p.mouseMoved = (event) => {
    nX = p.mouseX;
    nY = p.mouseY;
  };

};

export default gettingStarted;
