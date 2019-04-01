class Slider {
  constructor(options) {
    this.options = options;
    this.element = document.querySelector(this.options.selector);
    this.init();
  }
  init() {
    this.width = this.element.querySelector("li").clientWidth;
    this.length = this.element.querySelectorAll("li").length;
    this.element.style.width = this.width + "px";
    this.currentIndex = 0;
    if (this.options.controls) {
      this.renderControls();
    }
    if (this.options.pager) {
      this.renderPager();
    }
    if (this.options.autoPlay) {
      this.play();
    }
  }
  renderPager() {
    const renderItem = index => {
      const item = document.createElement("li");
      item.innerText = "。";
      item.onclick = () => this.go(index);
      return item;
    };
    const pager = document.createElement("ul");
    pager.setAttribute("class", "slider-pager");
    for (let i = 0; i < this.length; i++) {
      pager.appendChild(renderItem(i));
    }
    this.element.appendChild(pager);
  }
  renderControls() {
    const preBtn = document.createElement("span");
    preBtn.setAttribute("class", "slider-pre");
    preBtn.innerText = "<";
    preBtn.onclick = () => this.go(this.currentIndex - 1);
    const nextBtn = document.createElement("span");
    nextBtn.setAttribute("class", "slider-next");
    nextBtn.innerText = ">";
    nextBtn.onclick = () => this.go(this.currentIndex + 1);
    this.element.appendChild(preBtn);
    this.element.appendChild(nextBtn);
  }
  play() {}
  stop() {}
  bindEvents() {}
  go(index) {
    length = this.length;
    index = index >= length ? 0 : index < 0 ? length - 1 : index; //判断跳转的位置是否超出范围（边缘处理）
    console.log(index);
    this.element.querySelector(
      "ul"
    ).style.cssText = `transform:translateX(-${index * this.width}px)`;
    this.currentIndex = index;
  }
}

new Slider({
  selector: ".slider", //轮播组件的位置
  autoPlay: false, //自动播放
  pager: true, //是否显示页面跳转指示器
  controls: true //是否显示上一页下一页控制器
});
