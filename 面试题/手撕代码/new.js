//实现new方法

function myNew(){
    let obj={};//创建一个空对象

    let constructor=Array.prototype.shift.call(arguments);//取出构造函数
    //let constructor=[].shift.call(arguments)
    //let [constructor,...args]=[...arguments];

    obj.__proto__=constructor.prototype;//链接到原型链上

    let result=constructor.apply(obj,arguments);//绑定this到obj上

    return typeof result==='object' ? result : obj;//如果result是对象就返回，不是就返回obj
}

function People(name,age){
    this.name=name;
    this.age=age;
}

let p=myNew(People,'Bob',22);

console.log(p.name,p.age);