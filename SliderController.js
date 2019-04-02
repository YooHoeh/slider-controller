/**
 * 具有翻页器，页面指示器，自动播放功能的轮播图
 */
class Slider {
  constructor(options) {
    this.options = options;
    this.element = document.querySelector(this.options.selector);
    this.init();
  }

  //初始化轮播图
  init() {
    //根据单个内容宽度设定容器宽度
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
      this.autoPlay();
    }
  }

  //渲染轮播页指示器
  renderPager() {
    //渲染单个指示点，并绑定事件
    const renderItem = index => {
      const item = document.createElement("li");
      item.style.margin = "0 2px";
      item.innerText = "_";
      item.onclick = () => {
        this.go(index);
      };
      return item;
    };
    const pager = document.createElement("ul");
    pager.setAttribute("class", "slider-pager");
    for (let i = 0; i < this.length; i++) {
      pager.appendChild(renderItem(i));
    }
    this.element.appendChild(pager);
    this.pagerRefresh(); //首次渲染时激活active样式
  }

  //根据currentIndex渲染被激活的指示点
  pagerRefresh() {
    if (!this.options.pager) return;
    const items = this.element.querySelector(".slider-pager").children;
    Array.prototype.forEach.call(items, i => {
      i.classList.remove("active");
    });
    items[this.currentIndex].classList.add("active");
  }

  //渲染左右翻页器,默认按钮为“<>”
  renderControls(preDiv, nextDiv) {
    const preBtn = document.createElement("span");
    preBtn.setAttribute("class", "slider-pre");
    preBtn.innerText = preDiv || "<";
    preBtn.onclick = () => this.go(this.currentIndex - 1);
    const nextBtn = document.createElement("span");
    nextBtn.setAttribute("class", "slider-next");
    nextBtn.innerText = nextDiv || ">";
    nextBtn.onclick = () => this.go(this.currentIndex + 1);
    this.element.appendChild(preBtn);
    this.element.appendChild(nextBtn);
  }

  //使用定时器自动播放
  play() {
    console.log("play");
    this.timerID = setInterval(() => {
      this.go(this.currentIndex + 1);
    }, 2000);
  }

  //清除定时器，止自动播放
  stop() {
    console.log("stop");
    clearInterval(this.timerID);
  }

  //自动播放
  autoPlay() {
    this.play();
    this.element.addEventListener("mouseenter", () => this.stop());
    this.element.addEventListener("mouseleave", () => this.play());
  }

  //核心方法，跳转至指定页数
  go(index) {
    length = this.length;
    index = index >= length ? 0 : index < 0 ? length - 1 : index; //判断跳转的位置是否超出范围（边缘处理）
    console.log(index);
    this.element.querySelector(
      "ul"
    ).style.cssText = `transform:translateX(-${index * this.width}px)`;
    this.currentIndex = index;
    this.pagerRefresh();
  }
}

new Slider({
  selector: ".slider", //轮播组件的位置
  autoPlay: true, //自动播放
  pager: true, //是否显示页面跳转指示器
  controls: true //是否显示上一页下一页控制器
});
