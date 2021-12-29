/*!
 * Wlniao Control for Vue v2.1.3
 * (c) 2019 Wlniao Studio
 * Released under the MIT License.
 */
import axios from 'axios';
(function () {
	let msg = '请求正在处理中，请稍候';
	let o = axios.create({
		baseURL: '',
		withCredentials: false
	});
	window.ts = 0;
	window.ds = {
		key: '',
		page: 1,
		size: 10,
		total: 0,
		rows: [],
		list: [],
		query: { key: '', order: '', sortby: '', page: 1, size: 10 },
		message: '数据加载中'
	};
	window.asyncGet = (url, data) => {
		return new Promise(function (resolve, reject) {
			o.get(url, {
				params: data
			}).then(res => {
				resolve && resolve(res.data);
			}).catch(res => {
				hideLoading();
				reject && reject();
				Vue.prototype.$message && Vue.prototype.$message({ type: 'info', message: res.message });
			});
		});
	};
	window.asyncPost = (url, data) => {
		return new Promise(function (resolve, reject) {
			o.post(url, data).then(res => {
				resolve && resolve(res.data);
			}).catch(res => {
				hideLoading();
				reject && reject();
				Vue.prototype.$message && Vue.prototype.$message({ type: 'info', message: res.message });
			});
		});
	};
	window.get = (url, data, timeout) => {
		return new Promise(function (resolve, reject) {
			if (new Date().getTime() - ts < (timeout ? timeout : 10000)) {
				Vue.prototype.$message && Vue.prototype.$message({ type: 'info', message: msg });
			} else {
				ts = new Date().getTime();
				o.get(url, {
					params: data
				}).then(res => {
					ts = 0;
					hideLoading();
					resolve && resolve(res.data);
				}).catch(res => {
					ts = 0;
					reject && reject();
					Vue.prototype.$message && Vue.prototype.$message({ type: 'info', message: res.message });
				});
			}
		});
	};
	window.post = (url, data, timeout) => {
		return new Promise(function (resolve, reject) {
			if (new Date().getTime() - ts < (timeout ? timeout : 10000)) {
				Vue.prototype.$message && Vue.prototype.$message({ type: 'info', message: msg });
			} else {
				ts = new Date().getTime();
				o.post(url, data).then(res => {
					ts = 0;
					resolve && resolve(res.data);
				}).catch(res => {
					ts = 0;
					hideLoading();
					reject && reject();
					Vue.prototype.$message && Vue.prototype.$message({ type: 'info', message: res.message });
				});
			}
		});
	}
	window.downxls = (url, config) => {
		return new Promise(function (resolve, reject) {
			o.post(url, data).then(res => {
				resolve && resolve(res.data);
			}).catch(res => {
				hideLoading();
				reject && reject();
				Vue.prototype.$message && Vue.prototype.$message({ type: 'info', message: res.message });
			});
		});
	}
	window.uploader = (path, accept, fn) => {
		let _up = document.createElement('input');
		let _attType = document.createAttribute("type");
		_attType.nodeValue = "file"
		_up.setAttributeNode(_attType)

		if (accept) {
			var _attAccept = document.createAttribute("accept");
			_attAccept.nodeValue = accept
			_up.setAttributeNode(_attAccept)
		}
		_up.addEventListener('change', function () {
			if (!this.files || this.files.length !== 1) {
				return;
			} else {
				let file = this.files[0]
				let rdname = ''
				let chars = 'abcdefghijklmnoparstuvwxyz0123456789'
				for (let _fi = 0; _fi < 16; _fi++ ) {
					rdname += chars.charAt(Math.floor(Math.random() * chars.length))
				}
				let fd = new FormData()
				fd.append("key", file.name)
				fd.append("file", file)
				let xmlHttp;
				try {
					xmlHttp = new XMLHttpRequest()
				}
				catch (e) {
					try {
						xmlHttp = new ActiveXObject("Msxml2.XMLHTTP")
					} catch (e) {
						try {
							xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
						} catch (e) {
							fn({ success: false, message: '您的浏览器不支持AJAX！' })
							return false
						}
					}
				}
				xmlHttp.open("post", path, true)
				xmlHttp.onreadystatechange = function () {
					if (xmlHttp.readyState === 4) {
						if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
							fn({ success: true, message: xmlHttp.responseText })
						} else {
							fn({ success: false, message: xmlHttp.responseText || xmlHttp.statusText })
						}
					}
				}
				xmlHttp.send(fd)
			}
		})
		_up.click()
	}
	window.download = (url, data) => {
		showLoading()
		axios({ url: url, data: data, method: 'post', responseType: 'blob' }).then((res) => {
			hideLoading()
			if (res.data.type.indexOf('json') < 0) {
				let disposition = res.headers['content-disposition']
				if (disposition && disposition.indexOf('filename=') >= 0) {
					disposition = decodeURIComponent(disposition.substr(disposition.indexOf('filename=') + 9))
					let link = document.createElement('a');
					link.style.display = 'none'
					link.href = window.URL.createObjectURL(new Blob([res.data]));
					link.setAttribute('download', disposition);
					document.body.appendChild(link);
					link.click()
				} else {
					console.log('not response content-disposition')
				}
			} else {
				let reader = new FileReader();
				reader.addEventListener("loadend", function () {
					let res = JSON.parse(reader.result)
					if (res.message) {
						console.log(res.message)
						Vue.prototype.$message && Vue.prototype.$message({ type: 'info', message: res.message })
					} else {
						console.log(res)
					}
				});
				reader.readAsText(res.data, 'utf-8');
			}
		})
	}
	window.showLoading = (opts) => {
		if (typeof obj != "object") {
			opts = {}
		}
		if (!('lock' in opts)) { opts.lock = true }
		if (!('text' in opts)) { opts.text = 'Loading' }
		if (!('background' in opts)) { opts.background = 'rgba(0, 0, 0, 0)' }
		if (!('customClass' in opts)) { opts.customClass = 'wln-loading-mask' }		
		window._loading = Vue.prototype.$loading(opts)
	}
	window.hideLoading = () => {
		try {
			if (window._loading) {
				window._loading.close()
			}
		} catch (e) { }
	}

	window.openTab = (url, name) => {
		let origin = false
		try {
			window.parent !== window && typeof window.parent.openTab === 'function'
		} catch (e) {
			origin = true
		}
		if (origin) {
			xcOpenTab(url, name || '新窗口');
		} else if (window.parent !== window && window.parent.openTab) {
			window.parent.openTab(url, name || '新窗口');
		} else {
			location.href = url;
		}
	};
	window.backTab = (name) => {
		let origin = false
		try {
			window.parent !== window && typeof window.parent.openTab === 'function'
		} catch (e) {
			origin = true
		}
		if (origin) {
			xcBackTab(name);
		} else if (window.parent !== window && window.parent.activeTab) {
			window.parent.activeTab(name || document.title);
		} else {
			history.back();
		}
	};
	window.setTab = () => { window.parent !== window && window.parent.setTab && (window.parent.setTab(location.href, document.title)) };
})();