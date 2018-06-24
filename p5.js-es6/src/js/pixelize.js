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
    p.image(img, 0, 0);
  };

  p.draw = () => {
    p.background(255);
    img.loadPixels();
    const stepSize = p.round(slider.value());
    for (let y = 0; y < img.height; y += stepSize) {
      for (let x = 0; x < img.width; x += stepSize) {
        const i = y * img.width + x;
        const darkness = (255 - img.pixels[i * 4]) / 255;
        const radius = stepSize * darkness;
        p.ellipse(x, y, radius, radius);
      }
    }
    p.text("radius", slider.x * 3 + slider.width, 320);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.image(img, 0, 0);
  };
};

export default pixelise;