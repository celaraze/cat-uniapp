export default {
	initScan(main, filter, receiver, _codeQueryTag) {
		let _this = this;
		main = plus.android.runtimeMainActivity(); //获取activity  
		let IntentFilter = plus.android.importClass('android.content.IntentFilter');
		filter = new IntentFilter();
		filter.addAction("com.android.action.keyevent.KEYCODE_KEYCODE_SCAN_L_DOWN"); // 换你的广播动作  
		receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
			onReceive: function(context, intent) {
				plus.android.importClass(intent);
				let code = intent.getStringExtra("DATA"); // 换你的广播标签
				_this.queryCode(code, _codeQueryTag);
			}
		});
	},
	startScan() {
		main.registerReceiver(receiver, filter);
	},
	stopScan() {
		main.unregisterReceiver(receiver);
	},
	queryCode: function(code, _codeQueryTag) {
		//防重复  
		if (_codeQueryTag) return false;
		_codeQueryTag = true;
		setTimeout(function() {
			_codeQueryTag = false;
		}, 150);
		let id = code
		console.log('id:', id)
		uni.$emit('scancodedate', {
			code: id
		})
	}
}
