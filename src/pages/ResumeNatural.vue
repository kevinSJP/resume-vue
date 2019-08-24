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
      <!--<q-select filled readonly v-model="EmployeeInfo.resumeNatural.cardType" :options="cardType" emit-value map-options label="证件类型" />-->
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
      <q-select ref="nativePlace" use-input input-debounce="0" v-model="EmployeeInfo.resumeNatural.nativePlace" :options="areaType" emit-value map-options @filter="filterFn" label="籍贯*" :rules="[val => !!val || '必填']" >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              无选项
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select ref="hukouPlace" use-input input-debounce="0" v-model="EmployeeInfo.resumeNatural.hukouPlace" :options="areaType" emit-value map-options @filter="filterFn" label="户口所在地*" :rules="[val => !!val || '必填']" >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              无选项
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select ref="polity" v-model="EmployeeInfo.resumeNatural.polity" :options="polityType" emit-value map-options label="政治面貌*" :rules="[val => !!val || '必填']" />
      <q-select ref="maritalStatus" v-model="EmployeeInfo.resumeNatural.maritalStatus" :options="maritalType" emit-value map-options label="婚姻状况*" :rules="[val => !!val || '必填']" />
      <q-input ref="height" type="number" v-model.number="EmployeeInfo.resumeNatural.height" label="身高(cm)*" lazy-rules :rules="[val => !!val || '必填']" />
      <q-input ref="weight" type="number" v-model.number="EmployeeInfo.resumeNatural.weight" label="体重(kg)*" lazy-rules :rules="[val => !!val || '必填']" />
      <q-input ref="tel" clearable v-model="EmployeeInfo.resumeCommunication.tel" label="手机*" mask="### - #### - ####"
               lazy-rules :rules="[val => !!val || '必填']"/>
      <q-input ref="email" clearable v-model="EmployeeInfo.resumeCommunication.email" label="邮箱*"  lazy-rules :rules="[val => !!val || '必填']"/>
      <q-input ref="currentPlace" clearable v-model="EmployeeInfo.resumeNatural.currentPlace" label="通讯地址*"  lazy-rules :rules="[val => !!val || '必填']"/>
      <div>
        <!--<q-btn label="提交" @click="onSave"  color="primary"/>-->
        <q-btn label="保存" type="submit" style="width: 45%" color="primary" />
        <q-btn label="返回" @click="onBack" style="width: 45%" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</div>

</template>

<script>
import { cardType, areaType, genderType, polityType, maritalType } from '../constant/index'
import { modifyEmployeeInfo, notiSuccess, notiFail, hasResume, getResume, getUser, putResume } from '../common/index'

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
          birthDate: '',
          cardNo: '',
          cardType: '',
          currentPlace: '',
          height: '',
          hukouPlace: '',
          maritalStatus: '',
          name: '',
          nativePlace: '',
          photoId: '',
          polity: '',
          sex: '',
          weight: '' },
        resumeCommunication: { address: null,
          cardNo: '',
          createdTime: '',
          email: '',
          tel: '' }
      },
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
      if (this.EmployeeInfo.resumeNatural.cardNo) {
        let yyyy = (this.EmployeeInfo.resumeNatural.cardNo.substr(6, 4))
        let mm = (this.EmployeeInfo.resumeNatural.cardNo.substr(10, 2))
        let dd = (this.EmployeeInfo.resumeNatural.cardNo.substr(12, 2))
        this.EmployeeInfo.resumeNatural.birthDate = yyyy + '-' + mm + '-' + dd
      }
      if (this.EmployeeInfo.resumeNatural.cardNo) {
        let i = (parseInt(this.EmployeeInfo.resumeNatural.cardNo.substr(16, 1)) % 2)
        if (i === 0) { i = '2' } else { i = '1' }
        this.EmployeeInfo.resumeNatural.sex = i
      }
      putResume(modifyEmployeeInfo(this.EmployeeInfo))
        .then(res => {
          notiSuccess()
          return res
        })
        .catch((err) => {
          notiFail()
          return err
        })
    },
    getWebData () {
      hasResume().then(res => {
        console.log(res.data)
        if (res.data.data === 1) {
          getResume().then(res => {
            this.EmployeeInfo = res.data.data
            console.log(this.EmployeeInfo)
          }).catch((err) => { return err })
        } else {
          getUser().then(res => {
            this.EmployeeInfo.resumeNatural.cardNo = res.data.data.cardNo
            this.EmployeeInfo.resumeNatural.name = res.data.data.name
            this.EmployeeInfo.resumeCommunication.email = res.data.data.email
            this.EmployeeInfo.resumeCommunication.tel = res.data.data.tel
            console.log(this.EmployeeInfo)
          }).catch((err) => { return err })
        }
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
    filterFn (val, update, abort) {
      update(() => {
        this.areaType = areaType.filter(v => v.label.indexOf(val) > -1)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
