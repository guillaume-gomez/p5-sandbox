import '../css/style.scss';

// basic demo
const toThirdDimension = p => {
  let canvas;
  let img;
  const width = 200;
  const height = 200;
  const cellsize = 2;
  let cols;
  let rows;


  p.preload = () => {
    img = p.loadImage("assets/sunflower.jpg");
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.image(img, 0, 0);
    cols = width / cellsize;             // Calculate # of columns
    rows = height / cellsize;            // Calculate # of rows
    //p.noLoop();
  };

  p.draw = () => {
    p.background(0);
    img.loadPixels();
    // Begin loop for columns
    for ( let i = 0; i < cols;i++) {
      // Begin loop for rows
      for ( let j = 0; j < rows;j++) {
          let x = i*cellsize + cellsize/2; // x position
          let y = j*cellsize + cellsize/2; // y position
          let loc = x + y * width;           // Pixel array location
          const c = img.pixels[loc];       // Grab the color
          // Calculate a z position as a function of mouseX and pixel brightness
          const color = p.color(c, c, c);
          const z = (p.mouseX / width) * p.brightness(color) - 100.0;
          // Translate to the location, set fill and stroke, and draw the rect
          p.push();
          p.translate(x ,y , z);
          p.fill(c);
          p.noStroke();
          p.rectMode(p.CENTER);
          p.rect(0, 0, cellsize, cellsize);
          p.pop();
        }
      }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.image(img, 0, 0);
  };

  p.keyPressed = () => {
  };
};

export default toThirdDimension;