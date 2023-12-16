<template>
	<view id="container">
		<u-table id="table" align="left">
			<u-tr>
				<u-th width="25%">字段</u-th>
				<u-th>值</u-th>
			</u-tr>
			<u-tr>
				<u-td width="25%">资产编号</u-td>
				<u-td>{{asset.asset_number}}</u-td>
			</u-tr>
			<u-tr>
				<u-td width="25%">名称</u-td>
				<u-td>{{asset.name}}</u-td>
			</u-tr>
			<u-tr>
				<u-td width="25%">序列号</u-td>
				<u-td>{{asset.sn}}</u-td>
			</u-tr>
			<u-tr>
				<u-td width="25%">规格</u-td>
				<u-td>{{asset.specification}}</u-td>
			</u-tr>
			<u-tr>
				<u-td width="25%">品牌</u-td>
				<u-td>{{asset.brand.name}}</u-td>
			</u-tr>
			<u-tr>
				<u-td width="25%">分类</u-td>
				<u-td>{{asset.category.name}}</u-td>
			</u-tr>
		</u-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				asset_number: '',
				token: '',
				asset: {
					brand: {
						name: ''
					},
					category: {
						name: ''
					}
				},
			}
		},
		onLoad(option) {
			this.asset_number = option.asset_number;
			this.getServer();
			this.getAccessToken();
		},
		methods: {
			getServer() {
				let that = this;
				uni.getStorage({
					key: 'server',
					success(res) {
						that.server = res.data
						console.log(that.server)
					}
				})
			},
			getAccessToken() {
				let that = this;
				uni.getStorage({
					key: 'token',
					success(res) {
						that.token = res.data;
						that.getAsset();
					},
					fail(res) {
						uni.reLaunch({
							url: '../login/login'
						})
					},
					complete(res) {
						console.log(res);
					}
				})
			},
			getAsset() {
				let that = this;
				uni.request({
					method: 'GET',
					header: {
						Authorization: that.token
					},
					url: that.server + '/api/assets/' + that.asset_number,
					success: function(res) {
						console.log(res);
						if (res.statusCode == 200) {
							that.asset = res.data.data;
						} else if (res.statusCode == 404) {
							uni.showModal({
								title: '提示',
								content: '未找到此资产信息',
								showCancel: false
							})

						} else {
							uni.showModal({
								title: '提示',
								content: '服务器返回了一个未知错误',
								showCancel: false
							})
						}
					},
					fail: function(res) {
						console.log(res);
						uni.showModal({
							title: '提示',
							content: '网络故障，无法连接到服务器',
							showCancel: false
						})
					},
					complete: function() {
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>
	#container {
		padding: 1rem 1rem;
	}
</style>