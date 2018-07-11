import p5 from 'p5';
import "p5/lib/addons/p5.dom";

class colorPicker extends p5.Element {
  constructor(pInst) {
    var elt = document.createElement('input');
    super(elt, pInst);
    this.redSlider;
    this.greenSlider;
    this.blueSlider;
  }

  createColorPicker(x, y, color = "#FFFFFF"){
    // const red = color.slice(1, 3);
    // redSlider = p.createSlider(0, 255, parseInt(red));
    // redSlider.position(x, y);
    // redSlider.input(p.radiusSliderUpdated);

    // const green = color.slice(3, 5);
    // greenSlider = p.createSlider(0, 255, parseInt(green));
    // greenSlider.position(x, y + 30);
    // greenSlider.input(p.radiusSliderUpdated);

    // const blue = color.slice(5, 7);
    // blueSlider = p.createSlider(0, 255, parseInt(blue));
    // blueSlider.position(x, y + 60);
    // blueSlider.input(p.radiusSliderUpdated);
  }

  getColor(){
    // return `#${redSlider.value()}${greenSlider.value()}${blueSlider.value()}`
    return "#000000";
  }

};
export default colorPicker;