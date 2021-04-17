//ES5的继承

//1.原型链继承：子类的原型链连接到父类型
function SuperType(){
    this.property=true;
}

SuperType.prototype.getSuperValue=function(){
    return this.property;
};

function SubType(){
    this.subproperty=false;
}

SubType.prototype=new SuperType();

SubType.prototype.getSubValue=function(){
    return this.subproperty;
};

var sub=new SubType();

//console.log(sub.getSuperValue());

//2.构造函数继承：在子类的构造函数里用子类实例的this去调用父类的构造函数
//只能继承父类构造函数中的实例属性，没有继承父类原型的属性和方法
function SuperType(){
    this.colors=['red','blue','green'];
}

function SubType(){
    SuperType.call(this);
}

const sub2=new SubType();
//console.log(sub2.colors);

//3.组合继承:Man的原型中已经有了name属性，之后创建的man1实例串给构造函数的name是通过this重新定义了一个name属性
//只是覆盖了原型的name属性，原型中name依然存在
function Person(name){
    this.name=name||'default name';
    this.className='person';
}

Person.prototype.getName=function(){
    console.log(this.name);
}

function Man(name){
    Person.apply(this,arguments);
}

Man.prototype=new Person();

const man1=new Man('zzg');
//console.log(man1.name);

const man2=new Man('wax');
//console.log(man2.name);

//console.log(Man.prototype);//

//4.分离组合继承
Man.prototype=Object.create(Person.prototype);

//以上会把Man实例的constructor指向Person，下面修改指向
Man.constructor.prototype=Man

//ES6继承
class Person1{
    constructor(name){
        console.log(name);
        this.name=name;
    }
    getName(){
        return this.name;
    }
}

class children extends Person1{
    constructor(args){
        super(args);
    }
    getName(){
        super.getName();
    }
}

let ch1=new children('zzg');
console.log(ch1.name);
