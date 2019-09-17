<template>
  <div>
    <div id="container">
      <div id="depFile">
        <header id="header">
          <a href="javascript:void(0)" class="goBack" @click="routerBack"></a>
          <h1>USDT{{$t('充值')}}</h1>
          <div class="detail" @click="to_rechargeRecord">{{$t('充值明细')}}</div>
        </header>
        <article id="article" v-cloak style="margin-top:54px;">
            <section>
            <div class="moneyPart" v-cloak>
              <div class="payNum" v-cloak>
                USDT數量：
                <input type="text" pattern="[0-9]*" :placeholder="$t('请输入USDT数量')" v-model="usdtNum" style="width:60%;background-color:rgba(0,0,0,0);color:#fff;">
              </div>
              <div class="payNum" v-cloak>
                USDT地址：
                <input type="text" minlength="6" :placeholder="$t('请输入USDT地址')" v-model="usdtAddress" style="width:60%;background-color:rgba(0,0,0,0);color:#fff;">
              </div>
            </div>
            <div class="hint">
              <div>提示信息：</div>
              <p>
                <i></i>
                ※ {{$t('操作步骤')}}： <br/>  
                <!-- 1、{{$t('USDT兑换台币汇率以')}}{{usdtConfig.exchangePlatform}}{{$t('为准')}}<br/> -->
                1、{{$t('往下侧的平台地址转入您需要充值的USDT')}}<br/>
                2、{{$t('联系客服确认充值操作')}}<br/>
                <!-- 4、{{$t('每笔交易需要扣除')}}{{usdtConfig.amountFee}}{{$t('个')}}USDT -->
              </p>
            </div>
            <div class="adress" style="margin-top:5px;">平台USDT地址：
              <Copy :content="usdtConfig.usdtAddress" @copyCallback="copyCallback">
                  <span>复制USDT地址</span>
              </Copy>  
              <div style="margin-top:4px;word-break: break-all;">{{usdtConfig.usdtAddress}}</div>
            </div>
            <div class="adress">平台USDT二维码：
              <div id="qrcode">
                <img src="" alt="" id="image">
              </div>
            </div>
            <div class="subBtn" @click="saveApply">
              <a>{{$t('提交')}}</a>
            </div>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>


<script>
import QRCode from 'qrcode'
import Copy from 'vue-to-copy'
import Vue from 'vue'
Vue.use(Copy);
  //数据交互
export default {
	name: 'usdt',
	data() {
		return {
			payBlankDatas: [],
      allpayWay: [],
      payWay: [], //当前选择支付方式
      applies: [],
      usdtConfig:{},
      page_num: 5,
      usdtNum:'',
      usdtAddress:'',
      coinUnit:'元',
      agencyType: localStorage.agencyType ? localStorage.agencyType : 2,//用户类型
      chanel:1,
      secondTime:{
        min:'',
        sec:''
      },
      info: {}
		}
	},
	created() {
    this.getUsdtConfig();  
  },
  mounted(){
    var opts = {
      type: 'image/jpeg',
      margin:0,
      padding:0,
    }
    QRCode.toDataURL(this.usdtConfig.usdtAddress, opts, function (err, url) {
      if (err) throw err
      var img = document.getElementById('image')
      img.src = url
    })
  },
	//利用ajax来查询记录列表
	methods: {
		getUsdtConfig: function(){
      let _this  = this;
			var options = {
					type: 'post',
          data: {test:'1'},
          async: false,
					dataType: 'json',
					url:'/authApi/queryUsdtConfig',
					success:function(data) {
						if(data.code == 200) {
              _this.usdtConfig = data.body;
              // _this.usdtAddress = data.body.usdtAddress
						}else {
							mui.toast(data.msg);
						}
					},
					error: function(msg) {
						mui.toast("请求失败");
					}
				};
        this.base.callAuthApi(options);
    },

    copyCallback(){
      mui.toast("复制成功");
    },


    //保存提现
    saveApply:function(){
      console.log(this.usdtNum ,this.usdtAddress)
			if(this.usdtNum == "" || this.usdtNum<=0){
				mui.toast('请输入USDT数量');
				$("#usdtNum").css('background-color', 'peachpuff');
				return;
			}
			if(this.usdtAddress == ""){
				mui.toast('请输入usdt地址');
				$("#usdtAddress").css('background-color', 'peachpuff');
				return;
			}else if(this.usdtAddress.length<5){
				mui.toast('请填写格式正确的usdt地址', 2000);
				$("#usdtAddress").css('background-color', 'peachpuff');
				return;
			}
			let usdtNum = this.usdtNum;
			let usdtAddress = this.usdtAddress;
      let obj = {
        type: 'post',
        data: {
          "usdtNum": usdtNum,
          "usdtAddress": usdtAddress
        },
        dataType: 'json',
        url: '/authApi/saveUsdtRechargeApply',
        success: function (data) {
          if (data.code == 200) {
            mui.toast(data.msg, 2000);
          } else {
            mui.toast(data.msg, 2000);
          }
        },
        error: function (msg) {
            mui.toast("请求失败", 2000);
        }
      };
      this.base.callAuthApi(obj);
    },

    //路由跳转返回
		routerBack: function() {
			if(localStorage.turnPathName && localStorage.turnPathName != "login") {
				// this.$router.push({ name: localStorage.turnPathName });
				this.$router.go(-1)
			} else {
				this.$router.push({
					name: "index"
				});
			}

		},
    
    //跳转充值明细
    to_rechargeRecord(){
			this.$router.push('/myCenter/usdtrecord');
		},
	},
};


</script>

<style src="../../style/myCenter/centerGlobal.css" scoped></style>
<style lang="less" scoped>
.custome-ba142b #container{
    background: url(../../assets/images/base/black_bg.png);
    background-size: 100% 100%;
}
#depFile #article .moneyPart{
    margin: 0;
    padding: 0;
}
.adress{
  color: #fff;
  padding:0.4rem 1.2rem;
  div{
    color: #fff;
  }
}
.copy{
  display: inline-block;
  padding: 0 0.3rem;
  float: right;
  border: 0;
}
#qrcode{
  width: 8rem;
  height: 8rem;
  background: #fff;
  padding: 0.5rem;
  margin: 1rem;
  img{
    width: 100%;
    height: 100%;
  }
}
#depFile #article .choose{
    color: #000;
}
#header{
        .detail{
            position:absolute;
            right: 1rem;
            height: 22px;
            top: 11px;
            color: #ccc
        }
    }
#article {
    margin-top: 44px;

    .topNav {
        text-align: center;
        height: 3rem;
        line-height: 3rem;
        color: #a1a1a1;
        border-top: 1px solid#808080;
        span{
            display: inline-block;
            width: 33.3%;
            float: left;
            &.chooseYes{
                color: #fff;
                position: relative;

                .line{
                    background: #fff;
                    height: 2px;
                    width: 30%;
                    display: inline-block;
                    position: absolute;
                    bottom: 0;
                    left: 35%;
                }
            }
        }

    }
    section{
        .con_tit{
            color: #000;
            font-weight: 700;
            font-size: 1.1rem;
            text-indent: 1rem;
            line-height: 3rem;
            position: relative;
            .blue{
                background: #78d6d5;
                width: 1rem;
                height: 1rem;
                display: inline-block;
                position: absolute;
                left: -0.5rem;
                top: 1rem;
                border-radius: 25%;
            }
        }
        .navMes {
            padding-bottom: 1rem;
            .payBtn{
                text-align: center;
                margin-top: 1rem;
            }

        }
        .userInfo{
            color:#fff;
        }
    }
    .userInfo{
            padding: 1rem;
        .left{
            float: left;

            .blueBall{
                    width: 50px;
                height: 50px;
                background: #78d6d5;
                border-radius: 50%;
                position: relative;
                span{
                    position: absolute;
                    top: 50%;
                    font-size: 30px;
                    left: 50%;
                }
            }

        }
        .right{
            float: left;
            padding-left:10px;
        }
    }
}

#container #depFile #article .navMes .nav{
    background: none;
    padding: 0;
    margin: 0;
    padding-left: 1rem;
    .info{
        position:relative;
                padding: 20px 0;
                color: #fff;
        .mui-icon{
            position: absolute;
            right: 1rem;
            font-size: 2rem;
            color: #fff;
            top: 50%;
        margin-top: -1rem;
        }
    }
}

.subBtn>a{
    display: block;
    font-size: 1.2rem;
    margin: .83rem;
    line-height: 3.25rem;
    /* background-color: #ba142b; */
    -webkit-border-radius: .5rem;
    border-radius: .5rem;
    cursor: pointer;
    color: #fff;
    text-align: center;
}
.hint{
  width: calc(~'100% - 1.66rem');
  margin: 0 auto;
  padding: 1.2rem;
  background: gainsboro;
  font-size: 1.1rem;
  border-radius: 4px;
  margin-top: 0.83rem;
  p{
    line-height: 28px;
  }
}

</style>
