export default class {
	static init() {
		//获取Android主Activity
		main = plus.android.runtimeMainActivity();
		//获取Android意图类
		let Intent = plus.android.importClass('android.content.Intent');
		//实例化意图
		let intent = new Intent();
		//定义意图，模拟按下L键，L键实际上是打开激光的物理键映射，由厂商提供
		intent.setAction("com.android.action.keyevent.KEYCODE_KEYCODE_SCAN_L_DOWN");
		//广播这个意图
		main.sendBroadcast(intent);
		//获取Android意图过滤类
		let IntentFilter = plus.android.importClass('android.content.IntentFilter');
		//实例化意图过滤
		filter = new IntentFilter();
		//获取扫码成功的意图广播
		filter.addAction("com.android.serial.BARCODEPORT_RECEIVEDDATA_ACTION");
	}

	static start() {
		main.registerReceiver(receiver, filter);
	}

	static stop() {
		main.unregisterReceiver(receiver);
	}
}
