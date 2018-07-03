import '../css/style.scss';

// basic demo
const pixelise = p => {
  let canvas;
  let slider;
  let img;
  const slidderHeight = 35;

  p.preload = () => {
    img = p.loadImage("assets/worldcup.jpg");
  };

  p.setup = () => {
    canvas = p.createCanvas(img.width, img.height + slidderHeight);
    slider = p.createSlider(4, 20, 10);
    slider.position(5, img.height + 5);
    slider.input(p.sliderUpdated);
    p.image(img, 0, 0);
    canvas.drop(p.gotFile);
    p.noLoop();
  };

  p.draw = () => {
    p.background(255);
    img.loadPixels();
    const stepSize = p.round(slider.value());
    console.log(img.height)
    for (let y = 0; y < img.height; y += stepSize) {
      for (let x = 0; x < img.width; x += stepSize) {
        const i = y * img.width + x;
        const darkness = (255 - img.pixels[i * 4]) / 255;
        const radius = stepSize * darkness;
        p.ellipse(x, y, radius, radius);
      }
    }
    p.text("radius", slider.x * 3 + slider.width, img.height + slidderHeight - 15);
  };

  p.sliderUpdated = () => {
    p.redraw();
  }

  p.reload = () => {
    p.resizeCanvas(img.width, img.height + slidderHeight);
    slider.position(5, img.height + 5);
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
      setTimeout(()=> {
        p.reload();
        p.redraw();
      }, 2500);
    } else {
      println('Not an image file!');
    }
  }
};

export default pixelise;