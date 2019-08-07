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
      <q-select filled readonly v-model="EmployeeInfo.resumeNatural.cardType" :options="cardType" emit-value map-options label="证件类型" />
      <q-input filled readonly  v-model="EmployeeInfo.resumeNatural.cardNo" label="证件号码" />
      <q-select filled readonly v-model="getGender" :options="genderType" emit-value map-options label="性别" />
      <q-input filled readonly v-model="getBirthDtae" mask="date" :rules="['date']" label="出生日期">
        <!--<template v-slot:append>-->
          <!--<q-icon name="event" class="cursor-pointer">-->
            <!--<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">-->
              <!--<q-date v-model="EmployeeInfo.resumeNatural.birthDate" @input="() => $refs.qDateProxy.hide()" />-->
            <!--</q-popup-proxy>-->
          <!--</q-icon>-->
        <!--</template>-->
      </q-input>
      <q-select ref="nativePlace" v-model="EmployeeInfo.resumeNatural.nativePlace" :options="areaType" emit-value map-options label="籍贯*" :rules="[val => !!val || '必填']" />
      <q-select ref="hukouPlace" v-model="EmployeeInfo.resumeNatural.hukouPlace" :options="areaType" emit-value map-options label="户口所在地*" :rules="[val => !!val || '必填']" />
      <q-select ref="polity" v-model="EmployeeInfo.resumeNatural.polity" :options="polityType" emit-value map-options label="政治面貌*" :rules="[val => !!val || '必填']" />
      <q-select ref="maritalStatus" v-model="EmployeeInfo.resumeNatural.maritalStatus" :options="maritalType" emit-value map-options label="婚姻状况*" :rules="[val => !!val || '必填']" />
      <q-input ref="height" type="number" v-model.number="EmployeeInfo.resumeNatural.height" label="身高(cm)*" lazy-rules :rules="[val => !!val || '必填']" />
      <q-input ref="weight" type="number" v-model.number="EmployeeInfo.resumeNatural.weight" label="体重(kg)*" lazy-rules :rules="[val => !!val || '必填']" />
      <q-input ref="tel" clearable v-model="EmployeeInfo.resumeCommunication.tel" label="手机*" mask="### - #### - ####"
               lazy-rules :rules="[val => !!val || '必填']"/>
      <q-input ref="email" clearable v-model="EmployeeInfo.resumeCommunication.email" label="邮箱*"  lazy-rules :rules="[val => !!val || '必填']"/>
      <q-input ref="currentPlace" clearable v-model="EmployeeInfo.resumeNatural.currentPlace" label="通讯地址*"  lazy-rules :rules="[val => !!val || '必填']"/>
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
import { axiosInstance } from '../boot/axios'

export default {
  name: 'natural',
  computed: {
    getGender () {
      if (this.EmployeeInfo.resumeNatural.cardNo) {
        let i = (parseInt(this.EmployeeInfo.resumeNatural.cardNo.substr(16, 1)) % 2)
        if (i === 0) { i = '2' } else { i = '1' }
        return i
      }
      return '1'
    },
    getBirthDtae () {
      if (this.EmployeeInfo.resumeNatural.cardNo) {
        let yyyy = (this.EmployeeInfo.resumeNatural.cardNo.substr(6, 4))
        let mm = (this.EmployeeInfo.resumeNatural.cardNo.substr(10, 2))
        let dd = (this.EmployeeInfo.resumeNatural.cardNo.substr(12, 2))
        return yyyy + '/' + mm + '/' + dd
      }
      return '1990/01/01'
    }
  },
  watch: {

  },
  mounted () {
    if (this.$route.params.EmployeeInfo) {
      this.EmployeeInfo = this.$route.params.EmployeeInfo
      // console.log(this.$route.params.jobApply)
    } else {
      this.getWebData()
    }
  },
  data () {
    return {
      EmployeeInfo: {
        resumeNatural: { age: null,
          birthDate: '1990-07-09',
          cardNo: '411102199009160075',
          cardType: '1',
          currentPlace: '1',
          height: '175',
          hukouPlace: '110000',
          maritalStatus: '1',
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
          tel: '13222222222' }
      },
      putInfo: {},
      cardType,
      areaType,
      genderType,
      polityType,
      maritalType,
      hasError: ''
    }
  },
  methods: {
    onSubmit () {
      // console.log(this.EmployeeInfo.resumeNatural)
      this.$refs.height.validate()
      this.$refs.weight.validate()
      this.$refs.tel.validate()
      this.$refs.email.validate()
      this.$refs.currentPlace.validate()
      this.$refs.nativePlace.validate()
      this.$refs.hukouPlace.validate()
      this.$refs.polity.validate()
      this.$refs.maritalStatus.validate()
      if (this.$refs.height.hasError || this.$refs.weight.hasError || this.$refs.tel.hasError || this.$refs.nativePlace.hasError || this.$refs.hukouPlace.hasError ||
        this.$refs.email.hasError || this.$refs.currentPlace.hasError || this.$refs.polity.hasError || this.$refs.maritalStatus.hasError) {
        this.formHasError = true
        this.hasError = this.formHasError
      } else {
        this.hasError = false
      }
      this.modifyEmployeeInfo()
      // console.log(this.putInfo)
      axiosInstance.put('/resumeInfo', this.putInfo)
        .then(res => {
          console.log(res)
          return res
        })
        .catch((err) => { return err })
    },
    getWebData () {
      axiosInstance.get('/resumeInfo', {
      }).then(res => {
        this.EmployeeInfo = res.data.data
      }).catch((err) => { return err })
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
      if (!this.hasError) {
        this.$router.push({
          path: '/'
        })
      }
    },
    modifyEmployeeInfo () {
      if (this.EmployeeInfo.resumeNatural.cardNo) {
        let yyyy = (this.EmployeeInfo.resumeNatural.cardNo.substr(6, 4))
        let mm = (this.EmployeeInfo.resumeNatural.cardNo.substr(10, 2))
        let dd = (this.EmployeeInfo.resumeNatural.cardNo.substr(12, 2))
        this.EmployeeInfo.resumeNatural.birthDate = yyyy + '-' + mm + '-' + dd
      }
      this.putInfo = this.EmployeeInfo
      this.$delete(this.putInfo, 'id')
      this.$delete(this.putInfo, 'createdTime')
      this.$delete(this.putInfo, 'modifiedTime')
      this.$delete(this.putInfo.resumeNatural, 'id')
      this.$delete(this.putInfo.resumeNatural, 'createdTime')
      this.$delete(this.putInfo.resumeNatural, 'modifiedTime')
      this.$delete(this.putInfo.resumeOtherInfo, 'id')
      this.$delete(this.putInfo.resumeOtherInfo, 'createdTime')
      this.$delete(this.putInfo.resumeOtherInfo, 'modifiedTime')
      this.$delete(this.putInfo.resumeCommunication, 'id')
      this.$delete(this.putInfo.resumeCommunication, 'createdTime')
      this.$delete(this.putInfo.resumeCommunication, 'modifiedTime')
      this.putInfo.resumeEducation.forEach(v => {
        this.$delete(v, 'id')
        this.$delete(v, 'createdTime')
        this.$delete(v, 'modifiedTime')
      })
      this.putInfo.resumeFamily.forEach(v => {
        this.$delete(v, 'id')
        this.$delete(v, 'createdTime')
        this.$delete(v, 'modifiedTime')
      })
      this.putInfo.resumeInternship.forEach(v => {
        this.$delete(v, 'id')
        this.$delete(v, 'createdTime')
        this.$delete(v, 'modifiedTime')
      })
      this.putInfo.resumeLanguage.forEach(v => {
        this.$delete(v, 'id')
        this.$delete(v, 'createdTime')
        this.$delete(v, 'modifiedTime')
      })
      this.putInfo.resumeProject.forEach(v => {
        this.$delete(v, 'id')
        this.$delete(v, 'createdTime')
        this.$delete(v, 'modifiedTime')
      })
      this.putInfo.resumeQualification.forEach(v => {
        this.$delete(v, 'id')
        this.$delete(v, 'createdTime')
        this.$delete(v, 'modifiedTime')
      })
      this.putInfo.resumeReward.forEach(v => {
        this.$delete(v, 'id')
        this.$delete(v, 'createdTime')
        this.$delete(v, 'modifiedTime')
      })
      this.putInfo.resumeSchoolActivities.forEach(v => {
        this.$delete(v, 'id')
        this.$delete(v, 'createdTime')
        this.$delete(v, 'modifiedTime')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
