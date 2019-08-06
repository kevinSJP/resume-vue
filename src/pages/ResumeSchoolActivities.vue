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
      <div v-for="(item, index) in EmployeeInfo.resumeSchoolActivities" :key="index">
        <span class="text-h6">社会活动 {{ (index+1) | noFilter }}</span>
        <q-separator blue/>
        <q-input v-model="item.name" label="活动名称" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input clearable v-model="item.beginDate" label="开始日期(年-月)*" mask="####-##"
                 lazy-rules :rules="[val => !!val || '必填']" />
        <q-input clearable v-model="item.endDate" label="结束日期(年-月)*" mask="####-##"
                 lazy-rules :rules="[val => !!val || '必填']" />
        <q-input v-model="item.schoolName" label="所在单位" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input v-model="item.remark" label="职务和成果" lazy-rules :rules="[val => !!val || '必填']"/>
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
  name: 'schoolactivities',
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
        resumeSchoolActivities: [{ beginDate: '2015-01',
          cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          endDate: '2015-01',
          id: 19960,
          modifiedTime: '2019-06-05',
          name: '1',
          remark: '1',
          schoolName: '1' }, {
          beginDate: '2019-01',
          cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          endDate: '2019-01',
          id: 19961,
          modifiedTime: '2019-06-05',
          name: '55',
          remark: '5555',
          schoolName: '555' }, {
          beginDate: '2019-01',
          cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          endDate: '2019-01',
          id: 19962,
          modifiedTime: '2019-06-05',
          name: '111',
          remark: '1',
          schoolName: '1' }]
      },
      query: { beginDate: '2015-01',
        cardNo: '411102199009160075',
        createdTime: '2019-06-05',
        endDate: '2015-01',
        id: 19960,
        modifiedTime: '2019-06-05',
        name: '1',
        remark: '1',
        schoolName: '1' }
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
    getWebData () {
      axiosInstance.get('/resumeInfo', {
      }).then(res => {
        this.EmployeeInfo = res.data.data
      })
    },
    onBack () {
      console.log('back')
      this.$router.push({
        path: '/'
      })
    },
    increase () {
      this.EmployeeInfo.resumeSchoolActivities = this.EmployeeInfo.resumeSchoolActivities.concat(this.query)
    },
    decrease () {
      if (this.EmployeeInfo.resumeSchoolActivities.length > 1) {
        this.EmployeeInfo.resumeSchoolActivities = this.EmployeeInfo.resumeSchoolActivities.slice(0, -1)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
