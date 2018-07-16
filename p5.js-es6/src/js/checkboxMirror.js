import '../css/styleCheckboxMirror.scss';

const checkboxMirror = p => {
  let canvas;
  let img;
  let slider;
  const vScale = 4;
  const width = 200;
  const height = 200;

  let rows = width / vScale;
  let cols = height / vScale;
  let checkboxes = [];

  p.preload = () => {
    img = p.loadImage("assets/sunflower.jpg");
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.image(img, 0, 0);
    p.noStroke();
    p.noLoop();
    slider = p.createSlider(0, 255, 127);
    slider.input(p.onThresholdChange);

    for(let y = 0; y < cols; y++) {
      for(let x = 0; x < rows; x++) {
        const box = p.createCheckbox();
        box.parent("my-container");
        checkboxes.push(box);
      }
      const linebreak = p.createSpan('</br>');
      linebreak.parent("my-container");
    }
  };

  p.draw = () => {
    p.background(255);
    img.loadPixels();
    console.log(img.width * img.height)
    for (let y = 0; y < cols; y++) {
      for (let x = 0; x < rows; x++) {
        const index = (img.width - x + 1 + (y * img.width)) * vScale;
        const indexCheckbox = y * rows + x;
        const r = img.pixels[index * 4];
        const g = img.pixels[(index * 4) + 1];
        const b = img.pixels[(index * 4) + 2];

        const bright = (r + g + b) / 3;
        const threshold = slider.value();
        if(bright > threshold) {
          p.fill(255);
          checkboxes[indexCheckbox].checked(false);
        } else {
          p.fill(0);
          checkboxes[indexCheckbox].checked(true);
        }

        p.noStroke();
        p.rectMode(p.CENTER);
        p.rect(x * vScale, y * vScale, vScale, vScale);
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

export default checkboxMirror;