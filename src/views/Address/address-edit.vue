<template>
  <div class="address-wrapper">
    <div class="address">
      <div class="border-1px-e8">
        <input type="text" placeholder="收件人姓名（请使用真实姓名）" v-model="name">
      </div>
      <div class="border-1px-e8">
        <input type="text" placeholder="手机号码" v-model="phone">
      </div>
      <div class="area border-1px-e8">
        <input type="text" placeholder="所在地区" readonly v-model="area" @click="show">
        <span class="icon-next"></span>
      </div>
      <group>
        <x-address style="display:none;" :popup-title="'请选择地址'" :title="'title'" v-model="value"
                   :list="addressData" placeholder="请选择地址" :show.sync="showAddress" :show-name="true"
                   @on-hide="onHide"></x-address>
      </group>
      <div>
        <textarea name="" id="" cols="30" rows="10" placeholder="详细地址（街道、小区、门牌号等）" v-model="address"></textarea>
      </div>
    </div>
    <div class="save">
      <div class="save-wrapper">
        <div @click="save">保存</div>
      </div>
    </div>
  </div>

</template>

<script>
  import {XAddress, Group, ChinaAddressV4Data} from 'vux'
  import GoodsModel from '../../models/goods-model'

  export default {
    components: {
      XAddress,
      Group
    },
    data: function () {
      return {
        showAddress: false,
        value: [['1']],
        addressData: ChinaAddressV4Data,
        city: [],
        area: '',
        name: '',
        phone: '',
        address: ''
      }
    },
    methods: {
      show: function () {
        this.showAddress = true
      },
      onHide: function (type) {
        if (type) {
          for (let i = 0; i < this.addressData.length; i++) {
            if (this.addressData[i].value === this.value[0]) {
              this.city[0] = (this.addressData[i].name)
            } else if (this.addressData[i].value === this.value[1]) {
              this.city[1] = (this.addressData[i].name)
            } else if (this.addressData[i].value === this.value[2]) {
              this.city[2] = (this.addressData[i].name)
            }
          }
          this.area = this.city.join('')
        }
      },
      save: function () {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!this.name) {
          this.$vux.toast.show({
            text: '请输入收件人姓名！',
            time: 3000,
            type: 'cancel'
          })
          return 0
        } else if (!this.phone) {
          this.$vux.toast.show({
            text: '请输入您的手机号！',
            time: 3000,
            type: 'cancel'
          })
          return 0
        } else if (!reg.test(this.phone)) {
          this.$vux.toast.show({
            text: '请输入正确手机号！',
            time: 3000,
            type: 'cancel'
          })
          return 0
        } else if (!this.area) {
          this.$vux.toast.show({
            text: '请选择你所在的地区！',
            time: 3000,
            type: 'cancel'
          })
        } else if (!this.address) {
          this.$vux.toast.show({
            text: '请输入您的详细地址！',
            time: 3000,
            type: 'cancel'
          })
          return 0
        } else {
          let params = {
            'user_id': '0340d49a98ea4017b5523433d8627212',
            'IS_DEFAULT': 1,
            'ADDR_REALNAME': this.name,
            'ADDR_PHONE': this.phone,
            'ADDR_CITY': this.area,
            'ADDRESS': this.address,
            'PROVINCE': this.city[0],
            'CITY': this.city[1],
            'AREA': this.city[2]
          }
          GoodsModel.addressAdd(params, (res) => {
            console.log(res)
            if (res.data.result === 1) {
              this.$vux.toast.show({
                text: '保存成功！',
                time: 3000,
                type: 'success'
              })
              history.back()
            }
          }, () => {
          }, sessionStorage.getItem('token'))
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .address-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .area {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .address {
    padding: 0 30/@rem;
    background: @white;
    input {
      height: 90/@rem;
      width: 100%;
      .dpr-font(14px);
      color: #333333;
    }
    input::placeholder {
      color: #cccccc;
    }
    textarea {
      height: 140/@rem;
      width: 100%;
      .dpr-font(14px);
      color: #333333;
      resize: none;
    }
    textarea::placeholder {
      color: #cccccc;
    }
  }

  .save {
    position: absolute;
    bottom: 0;
    background: @white;
    width: 100%;
    .save-wrapper {
      padding: 20/@rem 30/@rem;
      div {
        height: 80/@rem;
        line-height: 80/@rem;
        text-align: center;
        border-radius: 40/@rem;
        color: @white;
        .dpr-font(17px);
        background: linear-gradient(to right, #ff3963, @red);
      }
    }
  }
</style>
