import '../css/style.scss';


const thresholdMixer = p => {
  let canvas;
  let img;
  let slider;
  const vScale = 4;
  const width = 600;
  const height = 300;

  p.preload = () => {
    img = p.loadImage("assets/worldcup.jpg");
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.image(img, 0, 0);
    p.noStroke();
    p.noLoop();
    slider = p.createSlider(0, 255, 127);
    slider.input(p.onThresholdChange);
  };

  p.draw = () => {
    p.background(255);
    img.loadPixels();
    for (let y = 0; y < img.height; y += vScale) {
      for (let x = 0; x < img.width; x += vScale) {
        const index = y * img.width + x;
        const r = img.pixels[index * 4];
        const g = img.pixels[(index * 4) + 1];
        const b = img.pixels[(index * 4) + 2];

        const bright = (r + g + b) / 3;
        const threshold = slider.value();
        if(bright > threshold) {
          p.fill(255);
        } else {
          p.fill(0);
        }

        p.noStroke();
        p.rectMode(p.CENTER);
        p.rect(x, y, vScale, vScale);
      }
    }
  };

  p.onThresholdChange = () => {
    p.redraw();
  }

  p.windowResized = () => {
    //p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
  };
};

export default thresholdMixer;