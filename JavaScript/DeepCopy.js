//深拷贝

//JSON.stringfy()与JSON.parse()
function deepClone1(obj){
    return JSON.parse(JSON.stringify(obj));
}
//遇到函数，undefined，Symbol，Date对象自动忽略，遇到正则返回空对象

//递归
//for...in
function deepClone2(obj){
    //obj为空对象或不是对象
    if(obj===null || typeof obj !='object') return obj;
    //正则
    if(obj instanceof RegExp) return new RegExp(obj);
    const cloneObj=new obj.constructor;
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            cloneObj[key]=deepClone2(obj[key]);//对属性值是对象的进行递归
        }
    }
    return cloneObj;
}

//Object.keys()
function deepClone3(obj){
    if(!obj || typeof obj ==='object') return obj;
    if(obj instanceof RegExp) return new RegExp(obj);
    let cloneObj=new obj.constructor;
    for(let key of Object.keys(obj)){
        cloneObj[key]=deepClone3(obj[key]);
    }
    return cloneObj;
}

//Object.entries()
function deepClone4(obj){
    if(!obj || typeof obj==='object') return obj;
    if(obj instanceof RegExp) return new RegExp(obj);
    const cloneObj=new obj.constructor;
    for(let [key,value] of Object.entries(obj)){
        cloneObj[key]=deepClone4(value);
    }
    return cloneObj;
}

const obj={name:{first:'zg',last:'z'},age:18,};
console.log(deepClone1(obj));
console.log(deepClone2(obj));
console.log(deepClone3(obj));
console.log(deepClone4(obj));