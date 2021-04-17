//apply

Object.prototype.myApply=function(){
    //参数context对应传入的对象，args对应传入的参数数组
    let [context,args=[]]=[...arguments];

    context = context || window;//context为null

    context.fn=this;//为context对象定义方法fn,this指向调用myApply函数的对象

    result=context.fn(...args);//执行fn

    delete context.fn;//删除fn

    return result;
}

let obj={
    name:'zzg',
    say:function(){
        return this.name;
    }
}

let obj1={
    name:'wax',
}

console.log(obj.say.myApply(obj1));