<template>
</template>

<script>
</script>

<style>
</style>
<template>
	<view>
		<u-notice-bar mode="vertical" :list="['当前版本：1.0.0']" type="success"></u-notice-bar>
		<view class="nav-wrap">
			<view class="nav-title">
				<image class="logo" src="../../static/logo.png" mode="widthFix"></image>
				<view class="nav-info">
					<view class="nav-title__text">
						{{user.name}}
					</view>
					<view class="nav-slogan">
						{{user.emial}}
					</view>
				</view>
			</view>

			<view class="logout" @tap="logout()">
				<image class="u-cell-icon" src="../../static/icons/guanbi.png" mode="widthFix"></image>
			</view>
		</view>

		<view class="list-wrap" style="padding: -20upx;">
			<u-grid :col="1">
				<u-grid-item @click="toAsset()">
					<image class="u-cell-icon" src="../../static/icons/saoma.png" mode="widthFix"></image>
					<view class="grid-text">查询</view>
				</u-grid-item>
			</u-grid>
		</view>

		<u-gap height="70"></u-gap>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: '用户未登录',
					email: '',
				},
				token: ''
			}
		},
		onLoad() {
			this.getServer();
			this.getAccessToken();
		},
		methods: {
			getServer() {
				let that = this;
				uni.getStorage({
					key: 'server',
					success(res) {
						console.log(res)
						that.server = res.data
					},
					complete(res){
						console.log(res)
					}
				})
			},
			getAccessToken() {
				let that = this;
				uni.getStorage({
					key: 'token',
					success(res) {
						that.token = res.data;
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
			toAsset() {
				let that = this;
				uni.scanCode({
					success(res) {
						console.log(res.result);
						uni.navigateTo({
							url: '../asset/asset?asset_number=' + res.result
						})
					},
				})
			},
			logout() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否注销登录',
					cancelText: '否',
					confirmText: '是',
					success: function(res) {
						if (res.confirm) {
							uni.removeStorage({
								key: 'token'
							});
							uni.reLaunch({
								url: '../login/login'
							});
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-wrap {
		padding: 15px;
		position: relative;
	}

	.lang {
		position: absolute;
		top: 15px;
		right: 15px;
	}

	.nav-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.nav-info {
		margin-left: 15px;
	}

	.nav-title__text {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		color: $u-main-color;
		font-size: 25px;
		font-weight: bold;
	}

	.logo {
		width: 70px;
		/* #ifndef APP-NVUE */
		height: auto;
		/* #endif */
	}

	.nav-slogan {
		color: $u-tips-color;
		font-size: 14px;
	}

	.nav-desc {
		margin-top: 10px;
		font-size: 14px;
		color: $u-content-color;
	}

	.u-cell-icon {
		width: 80upx;
		height: 80upx;
		// margin-right: 20rpx;
	}

	.logout {
		position: absolute;
		top: 15upx;
		right: 15upx;
	}

	.grid-text {
		font-size: 30upx;
		margin-top: 20upx;
		color: $u-type-info;
	}
</style>