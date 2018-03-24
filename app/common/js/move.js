// 缓冲运动
function move(obj, json, callback){
	// 清空定时器，保证运动框架只有一个定时器在运行
	// 给节点对象，添加一个timer属性
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		var state = 'ready'; // 假设都到了
		
		for (var attr in json){
			var cur = parseInt(getStyle(obj, attr));
			
			// 处理速度  ->  越来越小
			var speed = (json[attr] - cur) / 8;
			
			// 对速度取整
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			
			if (json[attr] != cur){ // 当前的样式没到
				state = 'stop';
			}
			
			if (attr == 'opacity'){
				// chrome, FF
				obj.style.opacity = (cur + speed)/100;
				// IE
				obj.style.filter = 'alpha(opacity: '+ (cur + speed) +')';
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
			
		}
		
		if (state == 'ready'){ // 真的全到了
			clearInterval(obj.timer);
			callback && callback();
		}
		
	}, 20);
}

// 获取元素的样式，兼容所有浏览器
function getStyle(obj, attr){
	var res = 0;
	if (window.getComputedStyle){ // chrome, FF
		res = window.getComputedStyle(obj, false)[attr];
	} else { // IE
		res = obj.currentStyle[attr];
	}
	if (attr == 'opacity'){
		res *= 100;
	}
	return res;
}