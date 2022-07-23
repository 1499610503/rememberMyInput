window.onload = async function() {
	function getStorage(key) {
		return new Promise(function(resolve, reject) {
			chrome.storage.sync.get(key, function(items) {
				// console.log(items[key]);
				value = items[key]
				resolve(value)
			});
		})
	}
	try {
		$('body').append($('<div class="rememberBtn">remember</div>'))
		$('body').append($('<div class="fillRememberBtn">fill</div>'))
		// console.log(window.location.href)
		// var currentUrl = window.location.href
		
		$('.fillRememberBtn').on('click',fillRememberValues.bind(this,true))
		// async function fillRememberValues() {
		// 	var rememberData = await getStorage('rememberData').then()
		// 	rememberData = rememberData ? rememberData : {};
		// 	console.log(rememberData)
		// 	if (!rememberData[currentUrl]){
		// 		alert('当前页面无已保存数据')
		// 		return
		// 	}
		// 	rememberData[currentUrl].inputData.forEach(function(item, index) {
		// 		var classQueryStr = item.nodeClass ? '.' + (item.nodeClass.replace(/\s/mg, '.')) : ''
		// 		var IdQueryStr = item.nodeId ? '#' + item.nodeId : ''
		// 		var queryStr = item.nodeTagName + classQueryStr + IdQueryStr + `[name=\"${item.nodeName}\"]`
		// 		// console.log(queryStr)
		// 		$(queryStr).val(item.nodeValue)
		// 	})
		// }


		$('.rememberBtn').on('click', rememberValues.bind(this,true))
		// async function rememberValues() {
		// 	var rememberData = await getStorage('rememberData').then()
		// 	var inputData = []
		// 	var selectData = []
		// 	$('input:not([type = "file"],[type = "hidden"],[type = "button"],[type = "image"],[type = "radio"],[type = "range"],[type = "reset"],[type = "submit"],[type = "checkbox"]),textarea').each(function(i, item) {
		// 		var nodeTagName = item.nodeName.toLowerCase()
		// 		var nodeType = $(item).prop('type')
		// 		var nodeClass = $(item).prop('class')
		// 		var nodeId = $(item).prop('id')
		// 		var nodeName = $(item).prop('name')
		// 		var nodeValue = $(item).val()
		// 		inputData.push({
		// 			nodeTagName,
		// 			nodeType,
		// 			nodeClass,
		// 			nodeId,
		// 			nodeName,
		// 			nodeValue
		// 		})
		// 		// console.log(i, item)
		// 		// console.log(nodeTagName, nodeType, nodeClass, nodeId, nodeName, nodeValue)
		// 	})
		// 	console.log(inputData)
		// 	rememberData[currentUrl] = {
		// 		inputData,
		// 	}
		// 	chrome.storage.sync.set({
		// 		rememberData
		// 	},function(){
		// 		console.log('保存成功')
		// 	});
		// }
	} catch (err) {
		console.log(err)
	}

}
