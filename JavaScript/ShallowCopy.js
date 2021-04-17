//浅拷贝实现

//for...in
function clone1(obj){
    const cloneObj={};
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            cloneObj[key]=obj[key];
        }
    }
    return cloneObj;
}

//Object.keys()
function clone2(obj){
    const cloneObj={};
    for(let key of Object.keys(obj)){
        cloneObj[key]=obj[key];
    }
    return cloneObj;
}

//Object.assign()
function clone3(obj){
    return Object.assign(obj,{});
}

const obj={name:'zzg',age:18};
console.log(clone1(obj));
console.log(clone2(obj));
console.log(clone3(obj));

