var Slider = (function() {
    // 变量的提升(作用范围)
    var params = {};

    var setParams = function(optins) {
        params.$sliderWrapper = optins.$sliderWrapper;
        params.$sliderDotWrapper = optins.$sliderDotWrapper || null;
        params.$sliderArrowArr = optins.$sliderArrowArr || [];
        params.autoPlay = optins.autoPlay;
        params.callback = optins.callback || null;

        params.curIndex = 0;
        params.timer = null;

        if (!params.$sliderWrapper) {
            throw new Error('组件调用有误~~~');
        }
        params.moveWrapper = params.$sliderWrapper.children('ul');
        params.liList = params.moveWrapper.find('li');
        params.moveLength = params.$sliderWrapper.innerWidth();
    };

    var setSliderStyle = function() {
        params.$sliderWrapper.css({
            'overflow': 'hidden',
            'position': 'relative'
        }).children('ul').css({
            'width': 10000,
            'position': 'absolute',
            'left': -1 * params.curIndex * params.moveLength,
            'top': 0
        });
        // 节点的克隆和添加
        params.moveWrapper.append(params.liList.eq(0).clone(true));
    };

    var setSliderDot = function() {
        if (!params.$sliderDotWrapper) {
            return;
        }
        var str = '';
        for (var i = 0; i < params.liList.length; i++) {
            if (i == params.curIndex) {
                str += '<dd class="selected"></dd>';
            } else {
                str += '<dd></dd>';
            }
        }
        params.$sliderDotWrapper.append(str);
    };

    var bindArrowEvent = function() {
        if (params.$sliderArrowArr.length == 0) {
            return;
        }
        params.$sliderArrowArr[1].off('click.xdd').on('click.xdd', function(ev) {
            ev.stopPropagation();
            moveLeft();
        });
        params.$sliderArrowArr[0].off('click.xdd').on('click.xdd', function(ev) {
            ev.stopPropagation();
            if (--params.curIndex < 0) {
                params.curIndex = params.liList.length - 1;
                params.moveWrapper.css('left', -1 * params.liList.length * params.moveLength);
            }
            move();
        });
    };

    var moveLeft = function() {
        if (++params.curIndex > params.liList.length - 1) {
            params.curIndex = 0;
        }
        if (params.curIndex == 1) {
            params.moveWrapper.css('left', 0);
        }
        if (params.curIndex == 0) { // 应该显示克隆的那个节点
            move(-1 * params.liList.length * params.moveLength);
        } else {
            move();
        }
    };

    var move = function(len) {
        params.moveWrapper.velocity({
            left: len ? len : -1 * params.curIndex * params.moveLength
        }, {
            duration: 400,
            easing: [.14, .44, .63, 1.53],
            complete: function() {
                params.callback && params.callback(params.curIndex);
            }
        });
        // 同步小圆点儿
        syncDotFunc();
    };

    var syncDotFunc = function() {
        if (!params.$sliderDotWrapper) {
            return;
        }
        params.$sliderDotWrapper.find('dd').eq(params.curIndex).addClass('selected')
            .siblings().removeClass('selected');
    };

    var bindDotEvent = function() {
        if (!params.$sliderDotWrapper) {
            return;
        }
        params.$sliderDotWrapper.off('mouseenter.xdd').on('mouseenter.xdd', 'dd', function() {
            params.curIndex = $(this).index();
            move();
        });
    };

    var bindWrapperEvent = function() {
        params.$sliderWrapper.off('mouseenter.xdd').on('mouseenter.xdd', function() {
            stop();
            showArrowFunc();
        });
        params.$sliderWrapper.off('mouseleave.xdd').on('mouseleave.xdd', function() {
            play();
            hideArrowFunc();
        });
    };

    var showArrowFunc = function() {
        if (params.$sliderArrowArr.length == 0) {
            return;
        }
        params.$sliderArrowArr[0].animate({
            left: 0
        }, 200);
        params.$sliderArrowArr[1].animate({
            right: 0
        }, 200);
    };

    var hideArrowFunc = function() {
        if (params.$sliderArrowArr.length == 0) {
            return;
        }
        params.$sliderArrowArr[0].animate({
            left: -1 * params.$sliderArrowArr[0].outerWidth()
        }, 200);
        params.$sliderArrowArr[1].animate({
            right: -1 * params.$sliderArrowArr[1].outerWidth()
        }, 200);
    };

    var play = function() {
        if (!params.autoPlay) {
            return;
        }
        params.timer = setInterval(function() {
            moveLeft();
        }, 3000);
    };

    var stop = function() {
        if (!params.autoPlay) {
            return;
        }
        clearInterval(params.timer);
    };

    var init = function(optins) {
        console.log(optins);
        setParams(optins);
        setSliderStyle();
        setSliderDot();
        bindArrowEvent();
        bindDotEvent();
        bindWrapperEvent();
        play();
    };

    return init;
})();