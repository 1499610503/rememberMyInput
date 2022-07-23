function getWindowEval(str) {
	return new Promise(function(resolve, reject) {
		chrome.devtools.inspectedWindow.eval(str, function(result, isException) {
			resolve(result)
		});
	})
}
$(async function() {
	updateAside()
	$('.aside ul').on('click', 'li', function(e) {
		var url = $(this).text()
		changeUrl(url)
		$(this).addClass('active').siblings().removeClass('active')
	})
	$('.attrItem input').on('change', async function() {
		var index = $(this).attr('data-index')
		var key = $(this).attr('data-key')
		var url = $('.urlText').text()
		var value = $(this).val();
		var rememberData = await getStorage('rememberData').then()
		// alert(url)
		// alert(index)
		// alert(key)
		// alert(value)
		// alert(rememberData[url].inputData[index][key])
		rememberData[url].inputData[index][key] = value
		chrome.storage.sync.set({
			rememberData
		}, function() {
			alert('保存成功')
		});
	})
	$('.content').on('click', '.delbtn', async function() {
		var rememberData = await getStorage('rememberData').then()
		var url = $('.urlText').text()
		delete rememberData[url]
		chrome.storage.sync.set({
			rememberData: rememberData
		}, async function() {
			alert('删除成功')
			updateAside()
		});
	})
	async function updateAside() {
		var rememberData = await getStorage('rememberData').then()
		var url = await getWindowEval("window.location.href").then()
		var asideHtml = ''
		for (var key in rememberData) {
			asideHtml += '<li class=\"' + (url == key ? 'active' : '') + '\">' + key + '</li>'
		}
		$('.aside ul').html(asideHtml)
		if (rememberData[url]) {
			changeUrl(url)
		} else {
			if (Object.keys(rememberData).length > 0) {
				changeUrl(Object.keys(rememberData)[0])
				$('.aside ul li').eq(0).addClass('active')
			}
		}
	}
	async function changeUrl(url) {
		var rememberData = await getStorage('rememberData').then()
		if (rememberData[url]) {
			var inputData = rememberData[url].inputData
			var fieldBoxHtml =
				`
			<div class="url">
				<span>url:</span>
				<span class="urlText">${url}</span>
			</div>
			<div class="delbtn">删除该网页保存的数据</div>
			`
			if (inputData.length > 0) {
				inputData.forEach(function(item, i) {
					fieldBoxHtml += '<div class="fieldBox"><div class="fieldTitle">field' + i + '(文本数据' + i +
						'):</div><div class="attrBox">'
					for (var key in item) {
						fieldBoxHtml +=
							`
						<div class="attrItem">
							<label>${key}:</label>
							<input class="${key=='nodeValue'?'nodeValue':''}" data-index="${i}" data-key="${key}" ${key=='nodeValue'?'':'readonly'} type="text" value="${key=='nodeValue'?item[key]:item[key]==''?'空':item[key]}" placeholder="${key=='nodeValue'?'表单value值（可编辑）':''}" />
						</div>`
					}
					fieldBoxHtml += '</div></div>'

				})
			} else {
				fieldBoxHtml += '<div>该页面无已保存数据</div>'
			}

			$('.content').html(fieldBoxHtml)
		}
	}
})
