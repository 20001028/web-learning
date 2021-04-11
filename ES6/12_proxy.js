//Proxy

//一、概述
//Proxy用于修改某些操作的默认行为，在语言层面做出修改，对编程语言进行编程

//Proxy在目标对象前架设一层拦截，外界对该对象的访问都必须先通过这层拦截
//提供一种对外界访问继续过滤和改写的机制
//Proxy代理某些操作，称为代理器

//重载点运算符的Proxy实例
var obj=new Proxy({},{
    get:function(target,propKey,receiver){
        console.log(`getting ${propKey}`);
        return Reflect.get(target,propKey,receiver);
    },
    set:function(target,propKey,value,receveiver){
        console.log(`setting ${propKey}`);
        return Reflect.set(target,propKey,value,receveiver);
    }
});//重定义属性的get和set行为
//obj.count=1;//setting
//console.log(++obj.count);//getting+setting

//生成Proxy实例：var proxy=new Proxy(target,handler)
//target表示所要拦截的目标对象，handler定制拦截行为
var proxy=new Proxy({},{
    get:function(target,propKey){
        return 35;
    }
});
// console.log(proxy.time);//35
// console.log(proxy.name);//35
// console.log(proxy.title);//35

//要使Proxy起作用，必须针对Proxy实例进行操作而不是目标对象

//如果handler没有任何拦截，直接通向源对象
var target={};
var handler={};
var proxy=new Proxy(target,handler);
proxy.a='b';
//console.log(target.a)//'b'

//可以将Porxy对象设置到object.proxy属性，从而可以调用

//Proxy实例也可以作为其他对象的原型对象
var proxy=new Proxy({},{
    get:function(target,propKey){
        return 35;
    }
});
let obj1=Object.create(proxy);
//console.log(obj1.time);//35，obj1本身没有time属性，会在原型链上读取到proxy实例的属性

//同一个拦截器函数可以设置拦截多个操作

//二、Proxy实例的方法

//1.get()
//get方法用于拦截某个属性的读取操作，接受三个参数：目标对象、属性名和proxy实例
//proxy实例参数可选

//get方法可以继承

//1）get拦截实现数组读取负数的索引
function createArray(...elements){
    let handler={
        get(target,propKey,receiver){
            let index=Number(propKey);
            if(index<0){
                propKey=String(target.length+index);
            }
            return Reflect.get(target,propKey,receiver);
        }
    }
    let target=[];
    target.push(...elements);
    return new Proxy(target,handler);
}

let arr=createArray('a','b','c');
//console.log(arr[-1]);//'c'

//2）利用Proxy，可以将get转变为执行某个函数，实现属性链式操作

//3）实现一个生成各种DOM节点的通用函数DOM

//4）总是指向原始的读操作所在的那个对象

//5）如果属性不可配置和不可写，Proxy不能修改该属性，否则通过Proxy对象访问该属性会报错

//2.set
//拦截某个属性的赋值操作，可以接受四个参数：目标对象、属性名、属性值和Proxy实例本身
//Proxy实例可选

//1）判断属性值的赋值是否符合要求

//2）防止内部属性（下划线开头）被外部读写
const handler1={
    get(target,key){
        invariant(key,'get');
        return target[key];
    },
    set(target,key,value){
        invariant(key,'set');
        target[key]=value;
        return true;
    }
}
function invariant(key,action){
    if(key[0]==='_'){
        throw new Error(`Invalid attempt tp ${action} private "${key}" poperty`);
    }
}

const target1={};
const proxy1=new Proxy(target,handler1);
//console.log(proxy1._prop);//报错
//proxy1._prop='c';//报错

//3）如果目标对象的某个属性不可写，set方法不起作用

//4）严格模式下，set代理如果不返回true将报错

//3.apply
//apply方法拦截参数的调用、call和apply操作
//接受三个参数：目标对象，目标对象的上下文对象（this），目标对象的参数数组

var target2=function(){
    return 'I am the target';
}
var handler2={
    apply:function(){
        return 'I am the proxy';
    }
};

var p=new Proxy(target2,handler2);//p是Proxy的实例，作为函数调用时会被apply方法拦截
//console.log(p());//'I am the proxy'

var twice={
    apply(target,ctx,args){
        return Reflect.apply(...arguments)*2;
    }
};
function sum(left,right){
    return left+right;
};
var proxy=new Proxy(sum,twice);
//每当执行proxy函数（直接调用或call和apply调用）就会被apply方法拦截
// console.log(proxy(1,2));//6
// console.log(proxy.call(null,5,6));//22
// console.log(proxy.apply(null,[7,8]));//30

//直接调用reflect.apply方法也会被拦截
//console.log(Reflect.apply(proxy,null,[9,10]));//38

//4.has
//拦截HasProperty操作，判断对象是否有某个属性时，方法会生效，典型的是in运算符
//has方法接受两个参数：目标对象，需查询的属性名

//1）has方法隐藏某些属性，不被运算符发现

//2）如果原对象禁止扩展或属性不可配置，使用has拦截会报错，has方法不得隐藏目标对象的该属性

//3）has方法拦截HasProperty操作而不是HasOwnProperty操作，即has方法不判断属性是自身属性还是继承的属性
//has方法对象for...in循环不生效

//5.deleteproperty
//用于拦截delete操作，如果抛出错误或者返回false，表示无法删除
var handler3={
    deleteProperty(target,key){
        invariant(key,'delete');
        delete target[key];
        return true;
    }
}

var target3={_prop:'foo'};
var proxy3=new Proxy(target3,handler3);
//delete proxy3._prop;//报错

//目标对象自身的不可配置（configurable）属性，不能被deleteProperty方法删除

//6.defineProperty()
//拦截Object.defineProperty操作
var handler4={
    defineProperty(target,key,descriptor){
        return false;
    },
};
var target4={};
var proxy4=new Proxy(target,handler4);
proxy4.foo='bar';
console.log(proxy4.foo);//undefined
//如果目标对象不可扩展，则degineProperty不能增加不存在的属性
//如果目标对象某个属性不可写（writable）或不可配置（configurable），则defineProperty不得改变两个设置

//7.getOwnPropertyDescriptor
//拦截Object.getOwnPropertyDescriptor

//8.getPrototypeOf
//拦截获取对象原型

//9.isExtensible
//拦截Object.isExtensible

//10.ownKeys
//拦截对象自身属性的读取操作

//11.preventExtensions
//拦截Object.preventExtensions

//12.setPrototypeOf
//拦截Object.setPrototypeOf

//三、Proxy.revocable

//四、this问题

//五、Web服务的客户端