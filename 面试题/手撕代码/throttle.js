//节流：n秒内只执行一次，稀释函数的执行频率

function throttle(fn,delay){
    let timer=null;//定义定时器
    return function(){
        if(timer) return;//timer不为null，说明正在计时，直接退出
        timer=setTimeout(fn,delay);//没有计时，启动计时器
    }
}