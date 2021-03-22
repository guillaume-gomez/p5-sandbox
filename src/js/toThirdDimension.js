import '../css/style.scss';

// basic demo
const toThirdDimension = p => {
  let canvas;
  let img;
  const width = 200;
  const height = 200;
  const cellsize = 4;
  let cols;
  let rows;


  p.preload = () => {
    img = p.loadImage("assets/sunflower.jpg");
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height, p.WEBGL);
    cols = width / cellsize;             // Calculate # of columns
    rows = height / cellsize;            // Calculate # of rows
    p.noLoop();
  };

  p.draw = () => {
    p.background(0);
    img.loadPixels();
    for ( let i = 0; i < cols;i++) {
      for ( let j = 0; j < rows;j++) {
          let x = i * cellsize + cellsize/2;
          let y = j * cellsize + cellsize/2;
          let loc = (x + y * img.width) * 4;
          const r = img.pixels[loc];
          const g = img.pixels[loc + 1 ];
          const b = img.pixels[loc + 2 ];
          const color = p.color(r,g, b);
          const z = (p.mouseX / width) * p.brightness(color) - 100.0;
          p.push();
          p.translate(x - width/2 ,y - height/2 , z);
          p.fill(color);
          p.noStroke();
          p.rectMode(p.CENTER);
          p.rect(0, 0, cellsize, cellsize);
          p.pop();
        }
      }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.mouseMoved = () => {
    p.redraw();
  }


  p.keyPressed = () => {
  };
};

export default toThirdDimension;