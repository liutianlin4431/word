// ==UserScript==
// @name        国开刷题
// @namespace   Violentmonkey Scripts
// @match       http://beijing.ouchn.cn/course/*
// @match       http://beijing.ouchn.cn/mod/*
// @grant       none
// @version     1.0
// @author      -
// @description 2021/6/29 上午10:41:42
// ==/UserScript==
$(function() {
	myInit();
});
var oldCourse = [];
/**
 * 初始化方法
 */
function myInit() {
	$.get('', function(result) {
		//获取当前url地址
		var urlStr = window.location.href;
		var sign = $('.wkc');
		if (sign != undefined && sign.length > 0 && urlStr.indexOf('id=') > -1) {
			//课程首页
			var courseList = $('a');
			var num = 0;
			for (var i = 0; i < courseList.length; i++) {
				var course = $(courseList[i]);
				var classAttr = course.attr("class");
				if (classAttr == 'aalink') {
					//获取a标签得父级节点
					var courseParent = course.parent();
					//获取父级节点得下一级节点
					var parentNext = courseParent.next();
					//节点不为空时判断为需要点击得课时
					if (parentNext.length > 0) {
						var sonNode = parentNext.find('img');
						//判断是否已经完成课时
						var imgAlt = sonNode.attr('alt');
						if (imgAlt.indexOf('未完成：') > -1) {
							sleep(3000);
							$(course).removeAttr('onclick')
							$(course)[0].click();
							// console.log("跳转了");
							// var href = course.attr('href');
							// oldCourse[num] = href;
							// num++;
							// sleep(3500);
							// window.location = href;

						}
					}
				}
			}
		} else {
			//课程页
			// sleep(3000);
			// window.history.back();
		}
	});
}
/**
 * 自定义睡眠
 * @param {Object} second 毫秒
 */
function sleep(second) {
	//起始时间
	var timeS = new Date().getTime();
	//结束时间
	var timeE = timeS + second;
	stop: while (true) {
		if (new Date().getTime() >= timeE) {
			console.log('时间到了');
			break stop;
		}
	}
}
