$(function() {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		var tabId = tabs[0].id

		$('.rememberBtn').on('click',async function() {
			// 动态执行JS文件
			// chrome.tabs.executeScript(tabId, {file: 'js/globalData.js'});
			rememberValues(false)
		})

		$('.fillRememberBtn').on('click',async function() {
			fillRememberValues(false)
		})

	});

})
