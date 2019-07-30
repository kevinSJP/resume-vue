<template>

<div  class="q-pa-md">
  <div  class="q-gutter-md" style="max-width: 600px">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
      <q-input filled readonly  v-model="EmployeeInfo.resumeNatural.name" label="姓名" />
      <q-select filled v-model="EmployeeInfo.resumeNatural.cardType" :options="cardType" emit-value map-options label="证件类型" />
      <q-input filled readonly  v-model="EmployeeInfo.resumeNatural.cardNo" label="证件号码" />
      <q-select  v-model="EmployeeInfo.resumeNatural.sex" :options="genderType" emit-value map-options label="性别" />
      <q-input  v-model="EmployeeInfo.resumeNatural.birthDate" mask="date" :rules="['date']" label="出生日期">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="EmployeeInfo.resumeNatural.birthDate" @input="() => $refs.qDateProxy.hide()" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-select  v-model="EmployeeInfo.resumeNatural.nativePlace" :options="areaType" emit-value map-options label="籍贯" />
      <q-select  v-model="EmployeeInfo.resumeNatural.hukouPlace" :options="areaType" emit-value map-options label="户口所在地" />
      <q-select  v-model="EmployeeInfo.resumeNatural.polity" :options="polityType" emit-value map-options label="政治面貌" />
      <q-select  v-model="EmployeeInfo.resumeNatural.maritalStatus" :options="maritalType" emit-value map-options label="婚姻状况" />
      <q-input  type="number" v-model.number="EmployeeInfo.resumeNatural.height" label="身高(cm)" />
      <q-input  type="number" v-model.number="EmployeeInfo.resumeNatural.weight" label="体重(kg)" />
      <q-input  readonly  v-model="EmployeeInfo.resumeCommunication.tel" label="电话" />
      <q-input  readonly  v-model="EmployeeInfo.resumeCommunication.email" label="邮箱" />
      <q-input  readonly  v-model="EmployeeInfo.resumeNatural.currentPlace" label="通讯地址" />
      <div>
        <q-btn label="提交" @click="onSave"  color="primary"/>
        <q-btn label="保存" type="submit"  color="primary" flat class="q-ml-sm" />
        <q-btn label="返回" @click="onBack" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</div>

</template>

<script>
import { cardType, areaType, genderType, polityType, maritalType } from '../constant/index'

export default {
  name: 'natural',
  mounted () {
    this.EmployeeInfo = this.$route.params.EmployeeInfo
    // console.log(this.$route.params.jobApply)
  },
  data () {
    return {
      EmployeeInfo: {
        resumeNatural: { age: null,
          birthDate: '1990-07-09',
          cardNo: '411102199009160075',
          cardType: '1',
          createdTime: '2018-10-14',
          currentPlace: '1',
          height: '175',
          hukouPlace: '411100',
          id: 78,
          maritalStatus: '1',
          modifiedTime: '2019-06-05',
          name: '邵金鹏',
          nativePlace: '110000',
          photoId: '411102199009160075',
          polity: '12',
          sex: '1',
          weight: '65' },
        resumeCommunication: { address: null,
          cardNo: '411102199009160075',
          createdTime: '2018-10-14',
          email: '1@2',
          id: 52,
          modifiedTime: '2019-06-05',
          tel: '13222222222' }
      },
      cardType,
      areaType,
      genderType,
      polityType,
      maritalType
    }
  },
  methods: {
    onSubmit () {
      console.log(this.EmployeeInfo.resumeNatural)
      // if (this.accept !== true) {
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'fas fa-exclamation-triangle',
      //     message: 'You need to accept the license and terms first'
      //   })
      // } else {
      //   this.$q.notify({
      //     color: 'green-4',
      //     textColor: 'white',
      //     icon: 'fas fa-check-circle',
      //     message: 'Submitted'
      //   })
      // }
    },
    onBack () {
      console.log('back')
      this.$router.push({
        path: '/'
      })
    },
    onSave () {
      console.log('save')
      this.onSubmit()
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
