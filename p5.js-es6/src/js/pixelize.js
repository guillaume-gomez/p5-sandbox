import '../css/style.scss';
import { saveImage } from "./toPng";

// basic demo
const pixelise = p => {
  let canvas;
  let radiusSlider;
  let exportButton;
  let img;
  const slidderHeight = 35;
  const helperHeight = 30;

  p.preload = () => {
    img = p.loadImage("assets/worldcup.jpg");
  };

  p.setup = () => {
    canvas = p.createCanvas(img.width, img.height + slidderHeight + helperHeight);
    radiusSlider = p.createSlider(4, 20, 10);
    radiusSlider.position(5, img.height + 10);
    radiusSlider.input(p.radiusSliderUpdated);

    exportButton = p.createButton('export to png');
    exportButton.position(300, img.height + 10);
    exportButton.mousePressed(p.exportImage);

    p.image(img, 0, 0);
    canvas.drop(p.gotFile);
    p.noLoop();
    p.textSize(18);
  };

  p.draw = () => {
    p.background(255);
    img.loadPixels();
    const stepSize = p.round(radiusSlider.value());
    for (let y = 0; y < img.height; y += stepSize) {
      for (let x = 0; x < img.width; x += stepSize) {
        const i = y * img.width + x;
        const darkness = (255 - img.pixels[i * 4]) / 255;
        const radius = stepSize * darkness;
        p.ellipse(x, y, radius, radius);
      }
    }
    p.text("radius", radiusSlider.x * 3 + radiusSlider.width, img.height + slidderHeight - 15);
    p.text("Please drag and drog new image", 10, img.height + slidderHeight + helperHeight - 10);
  };

  p.radiusSliderUpdated = () => {
    p.redraw();
  }

  p.reload = () => {
    p.resizeCanvas(img.width, img.height + slidderHeight);
    radiusSlider.position(5, img.height + 5);
    exportButton.position(300, img.height + 5);
    p.redraw();
  }

  p.windowResized = () => {
    console.log("windowResized")
    p.reload();
  };

  p.gotFile = (file) => {
    // If it's an image file
    if (file.type === 'image') {
      // Create an image DOM element but don't show it
      p.background(255);
      img = p.loadImage(file.data);
      p.image(img, 0, 0);
      p.text("processing...", canvas.width / 2, canvas.height / 2);
      p.text("radius", radiusSlider.x * 3 + radiusSlider.width, canvas.height + slidderHeight - 15);
      setTimeout(() => {
        p.reload();
        p.redraw();
      }, 2500);
    } else {
      println('Not an image file!');
    }
  }

  p.exportImage = () => {
    let pg = p.createGraphics(img.width, img.height);
    pg.background(255);
    pg.fill(0,0,0);
    img.loadPixels();
    const stepSize = p.round(radiusSlider.value());
    // add one iteration in each axis to make sure there are not 'blank' spaces
    for (let y = 0; y < img.height + stepSize; y += stepSize) {
      for (let x = 0; x < img.width + stepSize; x += stepSize) {
        const i = y * img.width + x;
        const darkness = (255 - img.pixels[i * 4]) / 255;
        const radius = stepSize * darkness;
        pg.ellipse(x, y, radius, radius);
      }
    }
    p.save(pg, "export.png");
  }
};

export default pixelise;