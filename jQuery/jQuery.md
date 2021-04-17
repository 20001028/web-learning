# jQuery

### jQuery使用

**添加jQuery库**

```html
<head>
	<script type="text/javascript" src="jquery.js"></script>
    //Google CDN
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs
/jquery/1.4.0/jquery.min.js"></script>
    //Microsoft CDN
    <script type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery
/jquery-1.4.min.js"></script>
</head>
```

**文档就绪函数**

所有jQuery函数位于一个document ready函数中，防止文档在完全加载之前运行jQuery代码

```javascript
$(document).ready(function(){
	//jQuery functions
});
```

**jQuery语法实例**

$(selector).action()

$美元符号定义jQuery

selector选择符查询和查找HTML元素

jQuery的action()执行对元素的操作

### jQuery选择器

选择器允许对元素组或单个元素进行操作

**元素选择器**

```javascript
$('p')//选取所有p标签元素
$('p.intro')//选取所有class为intro的p元素
$('p#demo')//选取所有id为demo的p元素
```

**属性选择器**：使用XPath表达式选择带有给定属性的元素

```javascript
$('[href]')//选取所有带有href属性的元素
$('[href="#"]')//选取所有带有href值等于#的元素
$('[href!="#"]')//不等于#
$('[href$=".jpg"]')//以.jpg结尾
```

**CSS选择器**

改变HTML元素的CSS属性

```javascript
$('p').css('background-color',red);//把所有p元素背景颜色改为红色
```

### **jQuery事件**

事件处理程序是指当HTML中发生某些事件时所调用的方法

通常把jQuery代码放到head标签内部的script中或队里的js文件

```javascript
$('button').click(function(){
	$('p').hide();
})
```

**jQuery名称冲突**

使用noConflict()方法解决

```javascript
var jq=jQuery.noConflict()//利用jq代替$符号
$(document).ready(function)//函数绑定到文档的就绪事件
$(selector).click(function)//单击
$(selector).dbclick(function)//双击
$(selector).focus(function)//获得焦点
$(selector).mouseover(function)//鼠标悬停
```

### **jQuery效果**

**隐藏和显示**

```javascript
$('#hide').click(fucntion(){
	$('p').hide(speed);//speed是可选参数，规定隐藏的速度，可以取slow、fast、毫秒
})

$('#hide').click(fucntion(){
	$('p').show(speed);
})

$('#hide').click(fucntion(){
	$('p').toggle(speed);//切换隐藏和显示
})
```

**淡入淡出**

```javascript
$('#fadeIn').click(fucntion(){
	$('div').fadeIn(speed);//淡入
})

$('#fadeOut').click(fucntion(){
	$('div').fadeOut(speed);//淡出
})

$('#toggle').click(fucntion(){
	$('div').toggle(speed);//切换淡入淡出
})

$('#fadeTo').click(fucntion(){
	$('div').fadeTo(speed,opacity);//渐变为给定的透明度（0-1）
})
```

**滑动**

```javascript
$('#slideDown').click(fucntion(){
	$('div').slideDown(speed);//向下滑动
});

$('#slideUp').click(fucntion(){
	$('div').slideUp(speed);//向上滑动
});

$('#slideToggle').click(fucntion(){
	$('div').slideToggle(speed);//切换上下滑动
})
```

**动画**

```javascript
$('animate').click(function(){
    $('div').animate({params},speed);//params参数必需定义形成动画的CSS属性
});
//操作多个属性
$("button").click(function(){
  $("div").animate({
    left:'250px',//对于padding-left采用驼峰命名法paddingLeft
    opacity:'0.5',
    height:'+=150px',//使用相对值
    width:'toggle',//使用预定义值
  });
});
//动画队列
$("button").click(function(){
  var div=$("div");
  div.animate({height:'300px',opacity:'0.4'},"slow");
  div.animate({width:'300px',opacity:'0.8'},"slow");
  div.animate({height:'100px',opacity:'0.4'},"slow");
  div.animate({width:'100px',opacity:'0.8'},"slow");
});
//stop停止动画
$("#stop").click(function(){
  $("#panel").stop(stopAll,goToEnd);//stopAll规定是否应该清楚动画队列，goToEnd规定是否立即完成当前动画
});
```

**Callback回调函数**

**Chaining**

```javascript
$("#p1").css("color","red")//在相同元素上运行多条jQuery命令
    .slideUp(2000)
    .slideDown(2000);
```

### jQuery HTML

**获取内容和属性**

```javascript
$('#test').text();//返回元素的文本内容
$('#test').html();//返回元素的内容（包括HTML标签）
$('#test').val();//获得输入字段的值，用于input标签
$('#w3s').attr('href');//获取href属性值
```

**添加属性**

```javascript
$('p').append('some appended text');//在元素结尾插入内容
$('p').prepend('some appended text');//在元素开头插入内容
function appendText()//追加元素
{
var txt1="<p>Text.</p>";               // 以 HTML 创建新元素
var txt2=$("<p></p>").text("Text.");   // 以 jQuery 创建新元素
var txt3=document.createElement("p");  // 以 DOM 创建新元素
txt3.innerHTML="Text.";
$("p").append(txt1,txt2,txt3);         // 追加新元素
}
$('img').after('some text after');//在元素之后插入内容
$('img').before('some text before');//在元素之前插入内容
function afterText()//在后面插入新元素
{
var txt1="<b>I </b>";                    // 以 HTML 创建新元素
var txt2=$("<i></i>").text("love ");     // 通过 jQuery 创建新元素
var txt3=document.createElement("big");  // 通过 DOM 创建新元素
txt3.innerHTML="jQuery!";
$("img").after(txt1,txt2,txt3);          // 在 img 之后插入新元素
}
```

**删除**

```javascript
$('#div1').remove();//删除元素及其子元素
$('#div1').empty();//删除元素的子元素
$('p').remove(.italic);//删除class为italoc的所有p元素
```

**操作CSS类**

```javascript
$('div,p').addClass('important blue');//为多个元素添加多个类
$('div,p').removeClass('important');//删除class属性
$('div,p').toggleClass('important');//添加删除的切换操作
```

**css方法**

```javascript
$('p').css('background-color');//返回首个p元素的背景颜色
$('p').css('background-color','color');//为所有p元素设置背景颜色
$("p").css({"background-color":"yellow","font-size":"200%"});//设置多个属性
```

**尺寸**

```javascript
$('#div1').widh();//不包括padding、border、margin
$('#div1').height();//
$('#div1').innerWidh();//包括padding
$('#div1').innerHeight();//
$('#div1').outerWidh();//包括padding、border
$('#div1').outerHeight();//
$(document).width();//HTML文档的宽度
$(document).height();//
$(window).width();//浏览器窗口的宽度
$(window).height();//
$('#div1').width(500).height(500);//设置元素宽度和高度
```

### jQuery遍历

**祖先**

```javascript
$('span').parent();//返回元素的直接父元素
$('span').parents();//返回元素的所有祖先元素，直到文档根元素html
$('span').parents('ul');//是ul元素
$('span').parentsUtil('div');//返回介于span和div之间的所有祖先元素
```

**后代**

```javascript
$('div').children();//返回元素的所有直接子元素
$('div').find('span');//返回div后代的所有span元素
$('div').find('*');//返回div元素的所有后代
```

**同胞**

```javascript
$('h2').siblings();//返回元素的所有同胞元素
$('h2').siblings('p');//p元素
$('h2').next();//返回元素的下一个同胞元素
$('h2').nextAll();//返回元素的所有跟随的同胞元素
$('h2').nextUntil('h6');//返回h2和h6之间的所有同胞元素
$('h2').prev();
$('h2').prevAll();
$('h2').nextUntil('h6');
```

**过滤**

```javascript
$('div p').first();///返回首个div元素内部的第一个p元素
$('div p').last();//返回最后一个div元素中的最后一个p元素
$('p').eq(1);//返回元素中带有指定索引号的元素，索引号从0开始
$('p').filter('.intro');//返回带有类名intro的所有p元素
$('p').not('.intro');//返回不带有类名intro的所有p元素
```

### jQuery AJAX

**load()方法**：从服务器加载数据，$(selector).load(URL,data,callback)

URL必需，data可选（查询字符串键值对集合），callback可选（回调函数）

```javascript
$('#div1').load('demo_test.txt');//把文件demo_test.txt的内容加载到div1元素中
$('#div1').load('demo_test.txt #p1');//加载id为p1的元素的内容
$("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
      alert("外部内容加载成功！");
    if(statusTxt=="error")
      alert("Error: "+xhr.status+": "+xhr.statusText);
  });
```

**get()和post()方法**

```javascript
//GET：从指定的资源请求数据，可能会缓存数据
//POST：向指定的资源提交要处理的数据，不会缓存数据
$.get('demo_test.asp',function(data,status){
    
});
$.post('demo_test_post.asp',{name:'zzg'},function(data,status){
    
});
```

### jQuery杂项

**noConflict()方法**

```javascript
//释放对$标识符的控制
$.noConflict();//全名替代简写
jQuery('button').click(function(){});
var jq=$.noConflict();//自己的简写
jq('button').click(function(){});
//$符号作为变量传递给ready方法
$.noConflict();
jQuery(document).ready(function($){
    $('button').click(function(){});
});
```

