const Property = require('./PropertyIntegerView');

module.exports = Property.extend({

  events: {
    'change [type=range]': 'inputValueChanged',
    'input [type=range]': 'inputValueChangedSoft',
  },


  templateInput(model) {
    const ppfx = this.ppfx;
    return `
      <div class="${ppfx}field ${ppfx}field-range">
        <input type="range"
          min="${model.get('min')}"
          max="${model.get('max')}"
          step="${model.get('step')}"/>
      </div>
    `;
  },


  getSliderEl() {
    if (!this.slider) {
      this.slider = this.el.querySelector('input[type=range]');
    }

    return this.slider;
  },


  inputValueChanged() {
    const model = this.model;
    const step = model.get('step');
    this.getInputEl().value = this.getSliderEl().value;
    const value = this.getInputValue() - step;
    model.set('value', value, {avoidStore: 1}).set('value', value + step);
    this.elementUpdated();
  },


  inputValueChangedSoft() {
    this.getInputEl().value = this.getSliderEl().value;
    this.model.set('value', this.getInputValue(), {avoidStore: 1});
    this.elementUpdated();
  },


  setValue(value) {
    this.getSliderEl().value = value;
    this.inputInst.setValue(value, {silent: 1});
  },


  onRender() {
    Property.prototype.onRender.apply(this, arguments);

    if (!this.model.get('showInput')) {
      this.inputInst.el.style.display = 'none';
    }
  }
});
