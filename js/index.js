//获取子弹发射位置
//注册键盘按下事件 按下移动飞机
//定时器自动创建子弹,使用jq动画实现子弹移动
let index = sessionStorage.getItem('index');
let i = index ? JSON.parse(index) : 0;

let that;
class Box {
    constructor(ele) {
        that = this;
        this.box = document.querySelector(ele); //大盒子
        this.aircraft = document.querySelector('.aircraft'); //飞机盒子
        this.small = document.querySelector('.small'); //子弹发射点
        //获取血量
        this.h1Blood1 = document.querySelector('.blood1');
        this.h2Blood2 = document.querySelector('.blood2');
        //获取大盒子最大宽度
        this.maxWidth = $(this.box).innerWidth();
        this.maxHeight = $(this.box).innerHeight();
        //记录飞机  和 怪 的位置
        this.aircraftLeft = this.aircraft.offsetLeft;
        this.aircraftTop = this.aircraft.offsetTop;
        // console.log(this.aircraftLeft, this.aircraftTop);
        // 怪
        this.bigMonsterLeft = 0;
        this.bigMonsterTop = 0;
        //飞机 和 怪物的血量
        this.blood1 = 100;
        this.blood2 = arr[i];
        //存飞机子弹数组 和  怪子弹数组
        // this.aircraftArr = [];
        // this.bigMonsterArr = [];
        this.keyboard(); //按键事件
        this.bullet(); //子弹发射
        this.monster(data[i]); //生成大怪
        // this.monsterBullet() //怪发射子弹函数
    }
    keyboard() { //按键移动函数
        window.onkeydown = function(e) {
            let code = e.keyCode || e.charCode || e.which;
            // console.log(code);
            //获取当前飞机位置
            let x = that.aircraft.offsetLeft;
            let y = that.aircraft.offsetTop;

            // console.log(x, y);
            //边界检测
            x = x >= that.maxWidth - that.aircraft.offsetWidth ? that.maxWidth - that.aircraft.offsetWidth : x;
            y = y >= that.maxHeight - that.aircraft.offsetHeight ? that.maxHeight - that.aircraft.offsetHeight : y;
            x = x <= 0 ? 0 : x;
            y = y <= 0 ? 0 : y;
            // console.log(x, y);

            //上 38 下 40 左 37 右 39
            if (code == 38) {
                y -= 15;
                that.aircraft.style.top = y + 'px';
            } else if (code == 40) {
                y += 15;
                that.aircraft.style.top = y + 'px';
            } else if (code == 37) {
                x -= 15;
                that.aircraft.style.left = x + 'px';
            } else if (code == 39) {
                x += 15;
                that.aircraft.style.left = x + 'px';
            }
            //获取 飞机移动后的位置
            that.aircraftLeft = that.aircraft.offsetLeft;
            that.aircraftTop = that.aircraft.offsetTop;
            // console.log(that.aircraftLeft, that.aircraftTop);
        }
    }
    bullet() { //发射子弹函数
        let timeID = setInterval(() => {
            //获取子弹发射位置
            let launchX = that.aircraft.offsetLeft + that.small.offsetLeft;
            let launchY = that.aircraft.offsetTop + that.small.offsetTop;
            let span = document.createElement('span');
            let rgb = `rgb(${Math.round(Math.random() * 254)},${Math.round(Math.random() * 254)},${Math.round(Math.random() * 254)})`;
            span.style.backgroundColor = rgb;
            span.style.position = 'absolute';
            span.style.left = launchX + 'px';
            span.style.top = launchY + 'px';
            // that.aircraftArr.push(span);
            that.box.appendChild(span);
            // $(span).animate({
            //     left: '100%'
            // }, 3000, () => {
            //     $(span).remove();
            //     that.aircraftArr.shift();
            // });
            that.animationMove(span, that.maxWidth, () => {
                span.remove();
                // that.aircraftArr.shift();
            })

        }, 200);


    }
    monsterBullet(obj) { //怪发射子弹函数

        let timeID = setInterval(() => {
            //获取大盒子 和子弹口
            let bigMonster = document.querySelector('.bigMonster');
            let smallDiv = document.querySelector('.smallDiv');
            //获取子弹发射位置
            let launchX = bigMonster.offsetLeft + smallDiv.offsetLeft;
            let launchY = bigMonster.offsetTop + smallDiv.offsetTop;
            // console.log(launchX, launchY);
            let i = document.createElement('i');
            let rgb = `rgb(${Math.round(Math.random() * 254)},${Math.round(Math.random() * 254)},${Math.round(Math.random() * 254)})`;
            i.style.width = obj.iWidth;
            i.style.height = obj.iHeight;
            i.style.borderRadius = obj.iRadius;
            i.style.backgroundColor = rgb;
            i.style.position = 'absolute';
            i.style.left = launchX + 'px';
            i.style.top = launchY + 'px';
            // that.bigMonsterArr.push(i)
            that.box.appendChild(i);
            that.animationMove1(i, 0, () => {
                i.remove();
            })

        }, obj.time)
    }
    monster(obj) { //生成大怪
        let div = document.createElement('div'); //大怪物
        div.classList.add('bigMonster');
        div.style.width = obj.width;
        div.style.height = obj.height;
        div.style.position = 'absolute';
        div.style.right = '10px';
        div.style.top = '300px';
        // div.style.backgroundColor = 'blue';
        // div.style.transform = 'rotate((90deg))';
        let img = document.createElement('img');
        img.src = obj.imgSrc;
        img.style.width = '100%';
        img.style.height = '100%';
        div.appendChild(img);
        let smallDiv = document.createElement('div'); //子弹口
        smallDiv.style.width = '20px';
        smallDiv.style.height = '20px';
        smallDiv.style.position = 'absolute';
        smallDiv.style.top = obj.smallTop;
        smallDiv.style.left = '0';
        // smallDiv.style.backgroundColor = 'red';
        smallDiv.classList.add('smallDiv');
        div.appendChild(smallDiv);
        that.box.appendChild(div);
        that.monsterBullet(data[i]);
        //大怪物随机上下移动
        let step = 15;
        let timeID = setInterval(() => {
            //获取当前大怪物的top1
            let bigTop = div.offsetTop;
            div.style.top = bigTop + step + 'px';
            //边界检测
            if (bigTop >= that.maxHeight - div.offsetHeight) {
                step *= -1;
                // 距离纠正
                div.style.top = that.maxHeight - div.offsetHeight - 1 + 'px';
            } else if (bigTop <= 0) {
                step *= -1;
                div.style.top = 1 + 'px';
            }
            //获取怪 当前位置
            that.bigMonsterLeft = div.offsetLeft;
            that.bigMonsterTop = div.offsetTop;
            // console.log(that.bigMonsterLeft, that.bigMonsterTop);

        }, obj.bigTime)
    }

    animationMove(ele, target, callback) { //飞机子弹函数
        //1.先清除之前的定时器，以本次为准
        clearInterval(ele.timeID);
        //2.开始本次移动
        ele.timeID = setInterval(function() {
            //2.1 获取元素当前位置
            var currentLeft = ele.offsetLeft;
            //2.2 开始移动
            var isLeft = currentLeft <= target ? true : false;
            isLeft ? currentLeft += 15 : currentLeft -= 15;
            ele.style.left = currentLeft + 'px';
            //检测是否碰撞到
            // 获取当前小球距离

            let spanLeft = ele.offsetLeft;
            let spanTop = ele.offsetTop;
            let bigMonster = document.querySelector('.bigMonster');
            let minSpanTop = that.bigMonsterTop;
            let maxSpanTop = that.bigMonsterTop + bigMonster.offsetHeight;
            if (spanLeft >= that.bigMonsterLeft && (spanTop <= maxSpanTop && spanTop >= minSpanTop)) {
                ele.remove();
                that.blood2 -= 1;
                that.h2Blood2.innerHTML = `血量:${that.blood2}`;
                if (that.blood2 == 0) {
                    alert('你赢了,进入下一关');
                    index++;
                    sessionStorage.setItem('index', index);
                    location.reload()
                        // document.querySelector('.bigMonster').remove();
                        // $('span').remove();
                        // $('i').remove();
                        // // console.log($('span'), $('i'));
                        // that.monster(arrObj[1]);
                        // that.blood2 = 200;
                        // that.h2Blood2.innerHTML = `血量:${that.blood2}`;
                        // // that.monsterBullet();
                        // // that.bullet();
                        // clearInterval(ele.timeID);
                }
            }
            //2.3 边界检测
            if (isLeft ? currentLeft >= target : currentLeft <= target) {
                //(1)停止定时器
                clearInterval(ele.timeID);
                //(2)元素复位
                ele.style.left = target + 'px';
                if (typeof callback == 'function') callback();
            };
        }, 50);
    };
    animationMove1(ele, target, callback) { //怪物子弹函数
        //1.先清除之前的定时器，以本次为准
        clearInterval(ele.timeID);
        //2.开始本次移动
        ele.timeID = setInterval(function() {
            //2.1 获取元素当前位置
            var currentLeft = ele.offsetLeft;
            //2.2 开始移动
            var isLeft = currentLeft <= target ? true : false;
            isLeft ? currentLeft += 15 : currentLeft -= 15;
            ele.style.left = currentLeft + 'px';
            //检测是否碰撞到
            // 获取当前小球距离

            let iLeft = ele.offsetLeft;
            let iTop = ele.offsetTop;
            // let bigMonster = document.querySelector('.bigMonster');
            let minITop = that.aircraftTop;
            let maxITop = that.aircraftTop + that.aircraft.offsetHeight;
            if (iLeft <= that.aircraftLeft + that.aircraft.offsetWidth && (iTop <= maxITop && iTop >= minITop)) {
                ele.remove();
                that.blood1 -= 5;
                that.h1Blood1.innerHTML = `血量:${that.blood1}`;
                if (that.blood1 == 0) {
                    alert('你输了,请重新来过');
                    location.reload();
                }

            }
            //2.3 边界检测
            if (isLeft ? currentLeft >= target : currentLeft <= target) {
                //(1)停止定时器
                clearInterval(ele.timeID);
                //(2)元素复位
                ele.style.left = target + 'px';
                if (typeof callback == 'function') callback();
            };
        }, 50);
    };
}

//实例化对象
let box = new Box('.box');
// console.log(box);