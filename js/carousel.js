function Carousel($ct) {
    this.init($ct)
    this.bind()
    this.autoPlay()
}


Carousel.prototype = {
    //初始化
    init: function($ct) {
        this.$ct = $ct
        this.$imgCt = this.$ct.find('.img-ct')
        this.$imgs = this.$ct.find('.img-ct > li')
        this.$preBtn = this.$ct.find('.pre')
        this.$nextBtn = this.$ct.find('.next')
        this.$bullets = this.$ct.find('.bullet li')

        this.imgWidth = this.$imgs.width()
        this.imgCount = this.$imgs.length
        this.index = 0
        this.inAnimate = false

        //在最前、最后，分别添加最后一张、第一张图片
        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.prepend(this.$imgs.last().clone())
        this.$imgCt.width((this.imgCount + 2) * this.imgWidth)
        this.$imgCt.css('left', -this.imgWidth)
    },
    //绑定点击事件
    bind: function() {
        var _this = this
        //点击上一张调用playPre()
        this.$preBtn.on('click', function() {
            _this.playPre(1)
        })
        //点击下一张，调用playNext()
        this.$nextBtn.on('click', function() {
            _this.playNext(1)
        })
        //底部状态
        this.$bullets.on('click', function() {
            var index = $(this).index()
            if(_this.index > index){
              _this.playPre(_this.index - index)
            }else{
              _this.playNext(index - _this.index)
            }
        })
    },

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

    setBullet: function() {
      this.$bullets.eq(this.index).addClass('active')
          .siblings().removeClass('active')
    },

    //自动轮播
    autoPlay: function() {
      var _this = this
      this.autoClock = setInterval(function() {
        _this.playNext(1)
      },2000)
    },

    stopAuto: function() {
      clearINterval(this.autoClock)
    }
}

var a = new Carousel($('.carousel').eq(0))
var b = new Carousel($('.carousel').eq(1))
