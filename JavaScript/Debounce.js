//防抖和节流

//防抖
function debounce(fn,delay){
    let timer=null;
    return function(){
        if(timer){//再次触发
            clearTimeout(timer)//重新计时
        }
        timer=setTimeout(fn,delay);
    }
}

//节流:在短时间内不断触发事件，回调函数永远不会执行
function throttle(fn,delay){
    let timer=null;
    return function(){
        if(timer) return false;//
        timer=setTimeout(()=>{
            fn();
            timer=null;
        },delay);
    }
}