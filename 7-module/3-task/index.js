import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = this.render();
    this.onClick();
    this.value = value;
    this.steps = steps;
  }

  render () {
    const slider = createElement(`
    <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
      <span class="slider__step-active"></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    </div>
    `);
    return slider;
  }

  onClick () {
    this.elem.addEventListener('click', this.makeMore);
  }

  makeMore = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left; // event - событие
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    const sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = value;

    const sliderStep = this.elem.querySelector('.slider__steps');
    const activeSteps = sliderStep.querySelectorAll('span');

    // преобразование в массив
    [...activeSteps].forEach((element, index) => {
      if(index === value) {
        element.classList.add('slider__step-active')
      }
      else {
        element.classList.remove('slider__step-active')
      }
    });

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }))
  }
}
