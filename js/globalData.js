function getStorage(key) {
	return new Promise(function(resolve, reject) {
		chrome.storage.sync.get(key, function(items) {
			// console.log(items[key]);
			value = items[key]
			resolve(value)
		});
	})
}

function getTabId() {
	return new Promise(function(resolve, reject) {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs) {
			var tabId = tabs[0].id
			resolve(tabId)
		});
	})
}

async function fillRememberValues(isOriginContent) {
	if (isOriginContent) {
		var currentUrl = window.location.href
		var rememberData = await getStorage('rememberData').then()
		rememberData = rememberData ? rememberData : {};
		console.log(rememberData)
		if (!rememberData[currentUrl]) {
			alert('当前页面无已保存数据')
			return
		}
		rememberData[currentUrl].inputData.forEach(function(item, index) {
			var classQueryStr = item.nodeClass ? '.' + (item.nodeClass.replace(/\s/mg, '.')) : ''
			var IdQueryStr = item.nodeId ? '#' + item.nodeId : ''
			var queryStr = item.nodeTagName + classQueryStr + IdQueryStr + `[name=\"${item.nodeName}\"]`
			// console.log(queryStr)
			$(queryStr).val(item.nodeValue)
		})
	} else {
		var tabId = await getTabId().then()
		var rememberDataStr = JSON.stringify(await getStorage('rememberData').then())
		chrome.tabs.executeScript(tabId, {
			code: `
			var currentUrl = window.location.href
			var rememberData = ${rememberDataStr}
			rememberData = rememberData ? rememberData : {};
			console.log(rememberData)
			if (!rememberData[currentUrl]) {
				alert('当前页面无已保存数据');
			}else{
				console.log(rememberData[currentUrl].inputData)
				rememberData[currentUrl].inputData.forEach(function(item, index) {
					var classQueryStr = item.nodeClass ? '.' + (item.nodeClass.replace(/\\s/mg, '.')) : ''
					var IdQueryStr = item.nodeId ? '#' + item.nodeId : ''
					var queryStr = item.nodeTagName + classQueryStr + IdQueryStr + '[name=\"'+item.nodeName+'\"]';
					$(queryStr).val(item.nodeValue)
				})
			}
			`
		});
	}
}

async function rememberValues(isOriginContent) {
	if (isOriginContent) {
		var currentUrl = window.location.href
		var rememberData = await getStorage('rememberData').then()
		rememberData = rememberData?rememberData:{currentUrl:{}}
		var inputData = []
		var selectData = []
		$(
			'input:not([type = "file"],[type = "hidden"],[type = "button"],[type = "image"],[type = "radio"],[type = "range"],[type = "reset"],[type = "submit"],[type = "checkbox"]),textarea'
		).each(function(i, item) {
			var nodeTagName = item.nodeName.toLowerCase()
			var nodeType = $(item).prop('type')
			var nodeClass = $(item).prop('class').trim()
			var nodeId = $(item).prop('id')
			var nodeName = $(item).prop('name')
			var nodeValue = $(item).val()
			inputData.push({
				nodeTagName,
				nodeType,
				nodeClass,
				nodeId,
				nodeName,
				nodeValue
			})
			// console.log(i, item)
			// console.log(nodeTagName, nodeType, nodeClass, nodeId, nodeName, nodeValue)
		})
		console.log(inputData)
		rememberData[currentUrl] = {
			inputData,
		}
		chrome.storage.sync.set({
			rememberData
		}, function() {
			alert('保存成功')
		});
	} else {
		var tabId = await getTabId().then()
		var rememberDataStr = JSON.stringify(await getStorage('rememberData').then())
		chrome.tabs.executeScript(tabId, {
			code: `
			console.log(${rememberDataStr})
			var rememberData = ${rememberDataStr}
			var currentUrl = window.location.href
			var inputData = []
			var selectData = []
			$(
				'input:not([type = "file"],[type = "hidden"],[type = "button"],[type = "image"],[type = "radio"],[type = "range"],[type = "reset"],[type = "submit"],[type = "checkbox"]),textarea'
			).each(function(i, item) {
				var nodeTagName = item.nodeName.toLowerCase()
				var nodeType = $(item).prop('type')
				var nodeClass = $(item).prop('class').trim()
				var nodeId = $(item).prop('id')
				var nodeName = $(item).prop('name')
				var nodeValue = $(item).val()
				inputData.push({
					nodeTagName,
					nodeType,
					nodeClass,
					nodeId,
					nodeName,
					nodeValue
				})
			})
			console.log(inputData)
			rememberData[currentUrl] = {
				inputData,
			}
			chrome.storage.sync.set({
				rememberData
			}, function() {
				alert('保存成功')
			});
			`
		});
	}
}
