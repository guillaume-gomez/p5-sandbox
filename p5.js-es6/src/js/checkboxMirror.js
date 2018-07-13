import '../css/style.scss';


const checkboxMirror = p => {
  let canvas;

  p.preload = () => {
  };

  p.setup = () => {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
  };
};

export default checkboxMirror;