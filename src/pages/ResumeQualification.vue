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
      <div v-for="(item, index) in EmployeeInfo.resumeQualification" :key="index">
        <span class="text-h6">资格证书 {{ (index+1) | noFilter }}</span>
        <q-separator blue/>
        <q-input clearable v-model="item.getDate" label="获得日期(年-月)*" mask="####-##"
                 lazy-rules :rules="[val => !!val || '必填']" />
        <q-input v-model="item.qualificationName" label="证书名称" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input v-model="item.qualificationNo" label="证书编号" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input v-model="item.qualificationOrg" label="颁发机构" lazy-rules :rules="[val => !!val || '必填']"/>
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

export default {
  name: 'qualification',
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
        resumeQualification: [{ cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          getDate: '2019-01',
          id: 42654,
          modifiedTime: '2019-06-05',
          qualificationLevel: 'CODE_Other',
          qualificationName: '1',
          qualificationNo: '2',
          qualificationOrg: '3' }]
      },
      query: { cardNo: '411102199009160075',
        createdTime: '2019-06-05',
        getDate: '2019-01',
        id: 42654,
        modifiedTime: '2019-06-05',
        qualificationLevel: 'CODE_Other',
        qualificationName: '1',
        qualificationNo: '2',
        qualificationOrg: '3' }
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
      return this.EmployeeInfo
    },
    onBack () {
      console.log('back')
      this.$router.push({
        path: '/'
      })
    },
    increase () {
      this.EmployeeInfo.resumeQualification = this.EmployeeInfo.resumeQualification.concat(this.query)
    },
    decrease () {
      if (this.EmployeeInfo.resumeQualification.length > 1) {
        this.EmployeeInfo.resumeQualification = this.EmployeeInfo.resumeQualification.slice(0, -1)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
