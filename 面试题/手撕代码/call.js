//实现call

Function.prototype.myCall=function(context){
    //context=context||window;//兼容传入null
    console.log(this);//this指向本函数
    context.fn=this;//绑定this
    let args=[...arguments].slice(1);
    let result=context.fn(...args);
    return result;
}

Array.prototype.shift.myCall(null);