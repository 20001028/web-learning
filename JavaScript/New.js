//手动实现new

function _new(Constructor,...args){

    //1.创建一个空对象
    const obj={};

    //2.连接原型链到构造函数
    obj.__proto__=Constructor.prototype;

    //3.改变this指向并实现函数
    let res=Constructor.apply(obj,args);

    //4.返回对象
    return res instanceof Object ? res : obj;
}

function Person(name,age){
    this.name=name;
    this.age=age;
}

let p=_new(Person,'zzg',18);
console.log(p);//Person { name: 'zzg', age: 18 }