//防抖

function debounce(fn,delay){//延迟调用fn方法
    let timer=null;//存放定时器
    return function(){
        clearTimeout(timer);//清空计时器（不需要判断是否非空，不会报错）
        timer=setTimeout(fn,delay);//重新启动计时器
    };
}