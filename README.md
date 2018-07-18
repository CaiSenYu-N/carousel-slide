# 无限轮播组件

* 面向对象方法实现无限轮播组件

* [预览](https://caisenyu-n.github.io/carousel-slide/)

### 实现功能

* 自动轮播

* 左右按钮点击切换上一张、下一张

* 底部状态随轮播索引变化

* 鼠标移入/移除，轮播停止/继续

### 实现思路

* 面向对象方法编程

* 初始化

* 绑定事件

* 为事件添加方法

* 调用

### 难点

* 该组件为无限轮播组件，CSS把图片并排，当向左滚动到最后一张或向右滚动到第一张时，继续滚动显示空白图片。

### 解决方法

* 使用JS在第一张图片前添加最后一张图片，在最后一张图片后添加第一张图片。

```
this.$imgCt.append(this.$imgs.first().clone())
this.$imgCt.prepend(this.$imgs.last().clone())
this.$imgCt.width((this.imgCount + 2) * this.imgWidth)
this.$imgCt.css('left', -this.imgWidth)
```

* 向左滚动至最后一张

```
playNext: function(len) {
        if(this.isAnimate) return
        this.isAnimate = true
        var _this = this
        this.$imgCt.animate({
            left: '-=' + this.imgWidth*len
        },function() {
          _this.index += len
          if(_this.index === _this.imgCount) {
            _this.$imgCt.css('left', -_this.imgWidth)
            _this.index = 0
          }
          _this.setBullet()
          _this.isAnimate = false
        })
    },
```

* 向右滚动至第一张

```
playPre: function(len) {
        if(this.isAnimate) return
        this.isAnimate = true
        var _this = this
        this.$imgCt.animate({
            left: '+=' + this.imgWidth*len
        },function() {
          _this.index -= len
          if(_this.index < 0) {
            _this.$imgCt.css('left', -_this.imgWidth * _this.imgCount)
            _this.index = _this.imgCount - 1
          }
          _this.setBullet()
          _this.isAnimate = false
        })
    },
```
