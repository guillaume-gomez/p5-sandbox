import '../css/style.scss';

const terrain = p => {
  let canvas;
  const width = 800;
  const height = 800;
  const scl = 20;
  const cols = height / scl;
  const rows = width / scl;
  let terrain = [];
  let flying = 0;

  p.preload = () => {
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height, p.WEBGL);
    for (let x = 0; x < cols; x++) {
      terrain[x] = [];
      for(let y = 0; y < rows; y++) {
        terrain[x][y] = 0;
      }
    }
  };

  p.draw = () => {
    p.background(50);
    p.translate(0, 50);
    p.rotateX(-p.PI/3.5);
    p.translate(-width/2, -height/2);

    flying -= 0.1;
    let yoff = flying;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.2;
      }
      yoff += 0.2;
    }


    for (let y = 0; y < rows-1; y++) {
      p.beginShape(p.LINES);
      p.fill(255);
      p.stroke(0);
      for (let x = 0; x < cols; x++) {
        p.push();
        p.translate(x*scl, y*scl, terrain[x][y]);
        p.vertex(x*scl, y*scl, terrain[x][y]);
        p.vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
        if(x !== 0) {
          p.vertex(x*scl, y*scl, terrain[x][y]);
          p.vertex((x-1)*scl, y*scl, terrain[x-1][y]);
        }
        p.pop();
      }
      p.endShape();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(width, height);
  };

  p.keyPressed = () => {
  };
};

export default terrain;