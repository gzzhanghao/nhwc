var penSize = 3;
var halfPenSize = penSize >> 1;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var isHost = false;
var promo = document.querySelector('.promo');
var color = 'black';

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.lineWidth = penSize;

var questions = ['家润', '玉皇大帝', '剑豪', '柯南', '怪盗基德', '桃园结义', '诸葛亮', '刘备', '张飞', '勇基', '古妹妹', '镝文', '成吉思汗', '白鸽', '布娃娃', '餐巾', '仓库', 'CD', '瓷器', '长江三峡', '长颈漏斗', '赤壁', '除草剂', '大树', '大头鱼', '刀', '冬瓜', '豆沙包', '耳', '耳机', '飞碟', '工资', '荷花', '烘干机', '老虎', '蝴蝶', '护膝', '花朵', '环保', '欢乐谷', '击剑', '监狱', '教师', '结婚证', '狙击步枪', '空格键', 'KTV', '篮球架', '老爷车', '刘翔', '落地灯', '棉花', '母亲', 'NBA', '内裤', '牛奶糖', '牛肉干', '牛肉面', '排插', '秦始皇兵马俑', '全家桶', '沙僧', '圣经', '升旗', '实验室', '狮子座', '守门员', '首饰', '手套', '水波', '土豆', '丸子', '网址', '鲜橙多', '鲜花', '小霸王', '腰带', '烟斗', '扬州炒饭', '衣橱', '医生', '音响', '鹦鹉', '油', '语文书', '针筒', '纸杯', '钻戒', '长颈鹿', '猫', '牙膏', '篮球', '毽子', '垃圾桶', '书', '蜡烛', '床', '杯子', '跑步', '摔跤', '燕子', '电脑', '地球', '滑板', '画板', '洋葱', '围巾', '狗', '火车', '风筝', '圣诞老人', '海绵宝宝', '魔方', '电饭锅', '兔子', '茉莉', '千纸鹤', '画笔', '鸭', '尿布', '中秋', '洗头水', '脖子', '香炉', '洗碗机', '电鳗', '变色龙', '纸', '绿茶', '网球王子', '皮带', '电车', '沙漠', '棒子', '鸡', '兔', '轰炸机', '面包', '理发师', '佛珠', '公园', '礼帽'];
var hints = ['13级惟一的程序猿', '神仙', '叫女票买皮肤的孩子', '人名', '人名', '典故', '人名', '人名', '人名', 'KM段子手', '美女部长', '一个嘴上说着不要缺一直在敲代码的全栈', '人名', '动物', '玩具', '餐具', '建筑物', '存储介质', '器具', '地名', '化学实验用具', '地名', '化学药剂', '植物', '动物', '厨房器具', '蔬菜', '食物', '人体器官', '电子设备', '交通工具', '报酬', '植物', '工具', '动物', '动物', '运动物品', '植物器官', '行为', '地名', '运动项目', '建筑', '职业', '证明', '武器', '按键', '娱乐场所', '运动器材', '交通工具', '人名', '家具', '植物', '称谓', '组织名称', '衣物', '食物', '食物', '食物', '日用品', '古代遗迹', '食物', '人名', '宗教经典', '动作', '建筑', '星座', '运动角色', '装饰品', '服饰', '物理现象', '植物', '食物', '互联网用语', '饮料名', '植物', '游戏机', '服饰', '道具', '食物', '家具', '职业', '电子设备', '动物', '厨房原料', '课堂用品', '道具', '生活用品', '生活用品', '动物', '动物', '生活用品', '运动项目', '体育器材', '家具', '道具', '生活用品', '家具', '生活用品', '运动项目', '运动项目', '动物', '电子设备', '行星', '体育器材', '绘画用品', '食物', '服饰', '动物', '交通工具', '玩具', '人物', '人物', '玩狙', '电子设备', '动物', '植物', '手工制品', '工具', '动物', '生活用品', '节日', '生活用品', '人体器官', '宗教道具', '家用设备', '动物', '动物', '办公用品', '饮料', '动画', '服饰', '交通工具', '地貌名称', '工具', '动物', '动物', '军用武器', '食物', '职业', '道具', '公共场所', '服饰'];

var client = new WebSocket('ws://' + location.host + ':6372');

var endPoint = null;

client.onmessage = function (message) {
	var data = JSON.parse(message.data);
  if (data === 'host') {
    return setHost();
  } else if (data === 'start') {
		return endPoint = null;
	} else if (data === 'change-host') {
    promo.innerHTML = '';
    canvas.width = canvas.width;
    return context.lineWidth = penSize;
  } else if (typeof data === 'string') {
    return promo.innerHTML += '<span>' + data + '&nbsp;&nbsp;</span>';
  }
  var rate = windowHeight / data[3];
  if (windowWidth * data[3] < windowHeight * data[2]) {
    rate = windowWidth / data[2];
  }
	data[0] = data[0] * rate;
	data[1] = data[1] * rate;
  context.beginPath();
	if (!endPoint) {
    context.arc(data[0], data[1], halfPenSize, 2 * Math.PI, false);
    context.fillStyle = data[4];
    context.fill();
	} else {
    context.strokeStyle = data[4];
    context.moveTo(endPoint[0], endPoint[1]);
		context.lineTo(data[0], data[1]);
		context.stroke();
	}
  endPoint = data;
  context.closePath();
};

client.onopen = function () {
	on(window, 'mousedown', function (event) {
    event.preventDefault();
    start(event.pageX, event.pageY);
  });
	on(window, 'touchstart', function (event) {
    event.preventDefault();
    start(event.touches[0].pageX, event.touches[0].pageY);
  });
};

client.onclose = function () {
  isHost = false;
	alert('You are now offline');
};

on(window, 'mousemove', function (event) {
	event.preventDefault();
	draw(event.pageX, event.pageY);
});
on(window, 'touchmove', function (event) {
	event.preventDefault();
	draw(event.touches[0].pageX, event.touches[0].pageY);
});

on(window, 'touchend', end);
on(window, 'mouseup', end);

var drawing = false;

function start (x, y) {
  if (!isHost) {
    return;
  }
	event.preventDefault();
	drawing = true;
	client.send('"start"');
  draw(x, y);
}

var pickers = [].slice.call(document.querySelectorAll('.color'));
pickers.forEach(function (picker) {
  picker.addEventListener('click', function () {
    color = picker.getAttribute('color');
    pickers.forEach(function (picker) {
      picker.classList.remove('active');
    });
    picker.classList.add('active');
  });
});

function draw (x, y) {
	if (!drawing) {
		return;
	}
	client.send(JSON.stringify([x, y, windowWidth, windowHeight, color]));
}

function end () {
	drawing = false;
}

function on (target, event, handler) {
	target.addEventListener(event, handler);
}

function off (target, event, handler) {
	target.removeEventListener(event, handler);
}

function setHost () {
  isHost = true;
  document.body.classList.add('host');
  var question = Math.random() * questions.length | 0;
  promo.innerHTML = questions[question] + '&nbsp;&nbsp;';
  setTimeout(function() { client.send(JSON.stringify(questions[question].length + '个字')); }, 10000);
  setTimeout(function() { client.send(JSON.stringify(hints[question])); }, 20000);
}

