//实现call

Object.prototype.myCall=function(){
    let [context,...args]=[...arguments];
    
    context=context||window;

    context.fn=this;

    let result=context.fn(...args);

    delete context.fn;

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

console.log(obj.say.myCall(obj1));
