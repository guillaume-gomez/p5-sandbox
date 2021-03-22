import '../css/style.scss';

// basic demo
const grid = p => {
  let canvas;
  let width = 600;
  let height = 600;
  const videoScale = 8;
  let cols;
  let rows;

  p.preload = () => {
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    cols = width / videoScale;
    rows = height / videoScale;
  };

  p.draw = () => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * videoScale;
        const y = j * videoScale;
        p.fill(255);
        p.stroke(0);
        p.rect(x, y, videoScale, videoScale);
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
  };
};

export default grid;