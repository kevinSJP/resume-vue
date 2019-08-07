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
      <div v-for="(item, index) in EmployeeInfo.resumeInternship" :key="index">
        <span class="text-h6">工作经历 {{ (index+1) | noFilter }}</span>
        <q-separator blue/>
        <q-input ref="beginDate" clearable v-model="item.beginDate" label="开始日期(年-月)*" mask="####-##"
                 lazy-rules :rules="[val => !!val || '必填']" />
        <q-input ref="endDate" clearable v-model="item.endDate" label="结束日期(年-月)*" mask="####-##"
                 lazy-rules :rules="[val => !!val || '必填']" />
        <q-input  v-model="item.companyName" label="公司" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input  v-model="item.departmentName" label="部门" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input  v-model="item.positionName" label="职位" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input  v-model="item.certTel" label="证明人电话" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input  v-model="item.remark" label="说明" lazy-rules :rules="[val => !!val || '必填']"/>
      </div>
      <div>
        <q-btn-group push>
          <q-btn push label="增" icon="+" @click="increase"/>
          <q-btn push label="减" icon="-" @click="decrease"/>
        </q-btn-group>
      </div>
      <div>
        <q-btn label="保存" type="submit"  color="primary"/>
        <q-btn label="返回" @click="onBack" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</div>

</template>

<script>
import { NoType } from '../constant/index'
import { axiosInstance } from '../boot/axios'

export default {
  name: 'internship',
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
          tel: '13222222222' },
        resumeInternship: [{ beginDate: '2015-01',
          cardNo: '411102199009160075',
          certTel: '1',
          companyName: '1',
          createdTime: '2019-06-05',
          departmentName: '1',
          endDate: '2015-01',
          id: 36400,
          modifiedTime: '2019-06-05',
          positionName: '1',
          remark: '1' }, {
          beginDate: '2019-01',
          cardNo: '411102199009160075',
          certTel: '2',
          companyName: '2',
          createdTime: '2019-06-05',
          departmentName: '2',
          endDate: '2019-01',
          id: 36401,
          modifiedTime: '2019-06-05',
          positionName: '2',
          remark: null }]
      },
      query: {
        beginDate: '2019-01',
        cardNo: '411102199009160075',
        certTel: '2',
        companyName: '2',
        createdTime: '2019-06-05',
        departmentName: '2',
        endDate: '2019-01',
        id: 36401,
        modifiedTime: '2019-06-05',
        positionName: '2',
        remark: null },
      putInfo: {}
    }
  },
  filters: {
    noFilter (value) {
      let num = ''
      NoType.forEach((item, index) => {
        if (item.value === value) { num = item.label }
      })
      return num
    }
  },
  methods: {
    onSubmit () {
      this.modifyEmployeeInfo()
      axiosInstance.put('/resumeInfo', this.EmployeeInfo)
        .then(res => { return res })
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
    increase () {
      this.EmployeeInfo.resumeInternship = this.EmployeeInfo.resumeInternship.concat(this.query)
    },
    decrease () {
      if (this.EmployeeInfo.resumeInternship.length > 1) {
        this.EmployeeInfo.resumeInternship = this.EmployeeInfo.resumeInternship.slice(0, -1)
      }
    },
    modifyEmployeeInfo () {
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
