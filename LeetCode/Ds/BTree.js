let Node=function(start,end){//结点的构造函数
    this.start=start;//关键字start
    this.end=end;//关键字end
    this.left=null;//指针指向左边子节点
    this.right=null;//指向右边子节点
}

Node.prototype.insert=function(node){//插入子节点
    if(node.start>=this.end){
        if(!this.right){
            this.right=node;
            return true;
        }
        return this.right.insert(node);
    }
    else if(node.end<=this.start){
        if(!this.left){
            this.left=node;
            return true;
        }
        return this.left.insert(node);
    }
    else{
        return false;
    }
}

let MyCalendar=function(){
    this.root=null;
}

MyCalendar.prototype.book=function(start,end){
    if(!this.root){
        this.root=new Node(start,end);
        return true;
    }
    return this.root.insert(new Node(start,end));
}

const cal=new MyCalendar();
cal.book(97,100);
cal.book(33,51);
cal.book(89,100);
cal.book(83,100);
cal.book(75,92);