<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎使用 CAT</view>
			<u-input class="u-border-bottom" type="text" :focus="true" v-model="user.email" placeholder="请输入帐户" />
			<u-input class="u-border-bottom" style="margin-top: 20px;" type="password" v-model="user.password"
				placeholder="请输入密码" />
			<view class="tips">如果您是第一次使用，请先设置服务器</view>
			<button @tap="login()" :style="[inputStyle]" class="getCaptcha">登陆</button>
			<button @tap="setServer()" style="margin-top: 20px; background-color: #71D5A1;color: #FFFFFF;"
				class="getCaptcha">设置服务器</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					email: '',
					password: '',
					name: ''
				},
				token: ''
			}
		},
		onLoad() {
			this.getServer();
			this.getAccessToken();
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.user.code) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			getServer() {
				let that = this;
				uni.getStorage({
					key: 'server',
					success(res) {
						that.api = res.data
					}
				})
			},
			setServer() {
				let that = this;
				uni.scanCode({
					success(res) {
						console.log(res.result);
						uni.setStorage({
							key: 'server',
							data: res.result,
							success() {
								uni.showModal({
									title: '设置成功！',
									showCancel: false,
									success(res) {
										if (res.confirm) {
											uni.reLaunch({
												url: 'login'
											})
										}
									}
								})
							},
							fail() {
								uni.showModal({
									title: '设置失败，请重新尝试！'
								})
							}
						})
					}
				})
			},
			getAccessToken() {
				let that = this;
				console.log(that.api);
				uni.getStorage({
					key: 'token',
					success(res) {
						uni.reLaunch({
							url: '../index/index'
						})
					},
					fail() {
						uni.reLaunch({
							url: 'login'
						})
					}
				})
			},
			login() {
				let that = this;
				console.log(that.api);
				uni.showLoading({
					title: '正在与服务器通信'
				})
				uni.request({
					method: 'POST',
					data: {
						email: that.user.email,
						password: that.user.password,
						device_name: "dev-device"
					},
					url: that.api + '/api/auth/login',
					success: function(res) {
						console.log(res);
						if (res.statusCode == 200) {
							that.token = res.data.token;
							uni.setStorage({
								key: 'token',
								data: 'bearer ' + that.token,
								success: function(res) {
									uni.reLaunch({
										url: 'login'
									})
								},
								fail: function(res) {
									uni.showModal({
										title: res.data.message
									})
								}
							})
						} else if (res.statusCode == 401) {
							uni.showModal({
								title: '提示',
								content: '用户密码不匹配',
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

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			u-input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>