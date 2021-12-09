// ==UserScript==
// @name         国开自动刷课
// @namespace    稳定版
// @version      2021.12.08
// @description  国家开放大学自动刷课
// @author       456
// @match        *://*.ouchn.cn/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	var i;
	var href = location.href;
	var isxyzt = true;
	if (href.indexOf("&j=1") != -1) {
		//为课时跳转详情页面，进入后关闭即可
		setTimeout(function() {
			window.close();
		}, 3000);
	} else if (href.indexOf("sectionid=") != -1) {
		var nextsection = function() {
			var listinfo = $('.listinfo').find('a');
			var tt = $('#tt').html();
			for (var i = 0; i < listinfo.length; i++) {
				var info = $(listinfo[i]);
				console.log(info.html());
				if (info.html().indexOf(tt) != -1) {
					var nextOne = info.next();
					location.href = nextOne.attr("href")
					break;
				}
			}
		};
		setTimeout(function() {
			//不跳转下一课题
			isxyzt = false;
			//点击下一个课时
			var liArray = $('li');
			for (i = 0; i < liArray.length; i++) {
				var liOne = $(liArray[i]);
				if (liOne.attr('class') == "act") {
					//当前课时被点亮跳转下一课时
					if (liOne.attr('is_com') == 1 || liOne.attr('is_com') == 0) {
						if (i < (liArray.length - 1)) {
							//点击下一课时
							$(liArray[i + 1]).click();
						} else {
							//如果当前课时被点亮，并且是最后课时，则停止循环。跳转课题
							isxyzt = true;
						}
					} else {
						// 当前课时为被点亮，考虑是否需要跳转
						var aL = $('a');
						for (var i = 0; i < aL.length; i++) {
							var oneA = $(aL[i]);
							if (oneA.html() == '点击进入') {
								var aHref = oneA.attr("href");
								if (aHref != '' && aHref != undefined) {
									window.open(aHref);
									location.reload();
								}
							}
						}
					}
				}
			}
			//是否跳转下一个课题
			if (isxyzt) {
				nextsection();
			}
		}, 5000);
	}
})();
