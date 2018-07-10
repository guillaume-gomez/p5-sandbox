const colorPicker = (p) => {
  let redSlider;
  let greenSlider;
  let blueSlider;

  p.createColorPicker = (x, y, color = "#FFFFFF") => {
    const red = color.slice(1, 3);
    redSlider = p.createSlider(0, 255, parseInt(red));
    redSlider.position(x, y);
    redSlider.input(p.radiusSliderUpdated);

    const green = color.slice(3, 5);
    greenSlider = p.createSlider(0, 255, parseInt(green));
    greenSlider.position(x, y + 30);
    greenSlider.input(p.radiusSliderUpdated);

    const blue = color.slice(5, 7);
    blueSlider = p.createSlider(0, 255, parseInt(blue));
    blueSlider.position(x, y + 60);
    blueSlider.input(p.radiusSliderUpdated);
  }

  p.getColor = () => {
    return `#${redSlider.value()}${greenSlider.value()}${blueSlider.value()}`
  }


};
export default colorPicker;