import '../css/style.scss';

const cubeWaveBee = p => {
  let canvas;
  const width = 400;
  const height = 400;
  let angle = 0;
  let minWidth = 24;
  let magicAngle = p.atan(p.cos(p.QUARTER_PI));
  let maxDistance = p.dist(0, 0, 200, 200);

  p.preload = () => {
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height, p.WEBGL);
  };

  p.draw = () => {
    p.background(100);
    p.ortho(-400, 400, 400, -400, 0, 1000);
    p.rotateX(-magicAngle);
    p.rotateY(-p.QUARTER_PI);

    for(let z = 0; z < height; z += minWidth) {
      for(let x = 0; x < width; x += minWidth) {
        p.push();
        let d = p.dist(x, z, width / 2, height / 2);
        let offset = p.map(d, 0, maxDistance, -p.PI, p.PI);
        let a = angle + offset;
        let h = p.floor(p.map(p.sin(a), - 1, 1, 100, 300));
        p.translate(x - width / 2, 0, z - height / 2);
        p.normalMaterial();
        p.box(minWidth, h, minWidth);
        p.pop();
      }
    }
    angle += 0.05;
  };

  p.windowResized = () => {
    p.resizeCanvas(width, height);
  };

  p.keyPressed = (e) => {
    console.log(e.key)
    if( e.key === "ArrowUp") {
      if(minWidth < 50) {
        minWidth = minWidth + 1;
      }
    } else if (e.key === "ArrowDown") {
      if(minWidth > 10) {
        minWidth = minWidth - 1;
      }
    }
  };
};

export default cubeWaveBee;