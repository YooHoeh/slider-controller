class Slider {
  constructor(options) {
    const { selector } = options;
    this.element = document.querySelector(selector);
    console.log(this.element.style.width);
  }
  play() {}
  stop() {}
  init() {}
  bindEvents() {}
  go() {}
}

new Slider({
  selector: "", //轮播组件的位置
  autoPlay: false, //自动播放
  pager: false, //是否显示页面跳转指示器
  controls: false //是否显示上一页下一页控制器
});
