import '../css/style.scss';

const brightness = p => {
  let canvas;
  let img;
  const width = 600;
  const height = 400;
  const imgWidth = 532;
  const imgHeight = 355;

  p.preload = () => {
    img = p.loadImage("assets/the_exorcist.jpg");
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.image(img, width/2 - imgWidth/2, height/2 - imgHeight/2);
    p.pixelDensity(1);
    img.loadPixels();
    p.loadPixels();
  };

  p.draw = () => {
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++ ) {
        // Calculate the 1D location from a 2D grid
        const loc = (x + y*img.width)*4;
        // Get the R,G,B values from image
        let r,g,b;
        r = img.pixels[loc];
        // Calculate an amount to change brightness based on proximity to the mouse
        const maxdist = 50;
        const d = p.dist(x, y, p.mouseX, p.mouseY);
        const adjustbrightness = 255 * (maxdist - d) / maxdist;
        r += adjustbrightness;
        // Constrain RGB to make sure they are within 0-255 color range
        r = p.constrain(r, 0, 255);
        // Make a new color and set pixel in the window
        //color c = color(r, g, b);
        const pixloc = (y * width + x) * 4;
        p.pixels[pixloc] = r;
        p.pixels[pixloc + 1] = r;
        p.pixels[pixloc + 2] = r;
        p.pixels[pixloc + 3] = 255;
      }
    }
    p.updatePixels();
  };

  p.windowResized = () => {
    p.resizeCanvas(width, height);
    p.image(img, width - imgWidth/2, height/2 - imgHeight/2);
  };
};

export default brightness;