var player=(function(){
    var oImg=document.getElementsByClassName('rotate')[0];
    var flag=0;
    var timer;
    var deg=0;
    var songs=[
        'assets/music/1.mp3',
        'assets/music/2.mp3',
        'assets/music/3.mp3'];
    var index=0;
    var oStart=document.getElementsByClassName('play')[0];
    var oAudio=document.getElementById('audio');
    var oBack=document.getElementsByClassName('previous')[0];
    var oNext=document.getElementsByClassName('next')[0];
    //图片旋转
    function rotate(){
        clearInterval(timer);
        timer=setInterval(function(){
                flag=1;
                oImg.style.transform="rotate("+deg+"deg)";
                deg+=0.3;
                if(deg>360){
                deg=0;
                console.log(1)
            }
        },20);
    }
    //图片停止旋转
    function norotate(){
        clearInterval(timer);
        flag=0;
    }
    //歌曲播放
    function start(){
        if(oAudio.getAttribute('src')!=songs[index])
        oAudio.setAttribute('src',songs[index]);
        oAudio.play();
    };
    //循环
    function cycle(){
        if(index>songs.length-1){
            index=0;
        }
        if(index<0){
            index=songs.length-1
        }
    };
    //上一首
    function previous(){
        index--;
        cycle();
    }
    //下一首
    function next(){
        index++;
        cycle();
    }
    // //图标更改
    // fuction change(oDiv,target){
    //     oDiv.style.background=' url(assets/images/'+target+'.png) no-repeat ';
    //     oDiv.style.backgroundSize='1rem';
    //     oDiv.style.backgroundPosition='center top';
    // }
    //播放按钮事件
    var bindStartEvent=function(){
        oStart.onclick=function(){
            
            if(!flag){
                oStart.style.background=' url(assets/images/pause.png) no-repeat ';
                oStart.style.backgroundSize='1rem';
                oStart.style.backgroundPosition='center top';
                rotate();
                start();
                console.log(oAudio)
            }
            else{
                oStart.style.background=' url(assets/images/play.png) no-repeat '
                oStart.style.backgroundSize='1rem';
                oStart.style.backgroundPosition='center top';
                norotate();
                oAudio.pause();
            }
            console.log(flag)
        }
    }
    //上一首按钮事件
    var bindPreviousEvent=function(){
        oBack.onclick=function(){
            deg=0;
            oStart.style.background=' url(assets/images/pause.png) no-repeat ';
            oStart.style.backgroundSize='1rem';
            oStart.style.backgroundPosition='center top';
            previous();
            start();
            rotate()
            console.log(flag)
        }
    };
    //下一首按钮事件
    var bindNextEvent=function(){
        oNext.onclick=function(){
            deg=0;
            oStart.style.background=' url(assets/images/pause.png) no-repeat ';
            oStart.style.backgroundSize='1rem';
            oStart.style.backgroundPosition='center top';
            next();
            start();
            rotate()
            console.log(flag)
        }
    };
    var init=function(){
        bindStartEvent();
        bindPreviousEvent();
        bindNextEvent();
        
    };
    return init;
})();