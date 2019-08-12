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
      <div v-for="(item, index) in EmployeeInfo.resumeProject" :key="index">
        <span class="text-h6">项目经历 {{ (index+1) | noFilter }}</span>
        <q-separator blue/>
        <q-input v-model="item.projectName" label="项目名称" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input v-model="item.teamSize" label="团队规模" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input v-model="item.projectRole" label="团队角色" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input clearable v-model="item.beginDate" label="开始日期(年-月)*" mask="####-##"
                 lazy-rules :rules="[val => !!val || '必填']" />
        <q-input clearable v-model="item.endDate" label="结束日期(年-月)*" mask="####-##"
                 lazy-rules :rules="[val => !!val || '必填']" />
        <q-input v-model="item.remark" label="项目描述" lazy-rules :rules="[val => !!val || '必填']"/>
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
import { modifyEmployeeInfo, notiSuccess, notiFail } from '../common/index'

export default {
  name: 'project',
  mounted () {
    if (this.$route.params.EmployeeInfo) {
      this.EmployeeInfo = this.$route.params.EmployeeInfo
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
        resumeProject: [{ beginDate: '2019-01',
          cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          endDate: '2019-01',
          id: 19669,
          modifiedTime: '2019-06-05',
          projectName: '3',
          projectRole: '3',
          remark: null,
          teamSize: '3' }, {
          beginDate: '2019-01',
          cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          endDate: '2019-01',
          id: 19670,
          modifiedTime: '2019-06-05',
          projectName: '3',
          projectRole: '3',
          remark: '3',
          teamSize: '3'
        }]
      },
      query: {
        beginDate: '2019-01',
        cardNo: '411102199009160075',
        createdTime: '2019-06-05',
        endDate: '2019-01',
        id: 19670,
        modifiedTime: '2019-06-05',
        projectName: '3',
        projectRole: '3',
        remark: '3',
        teamSize: '3'
      }
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
      axiosInstance.put('/resumeInfo', modifyEmployeeInfo(this.EmployeeInfo))
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
      this.EmployeeInfo.resumeProject = this.EmployeeInfo.resumeProject.concat(this.query)
    },
    decrease () {
      if (this.EmployeeInfo.resumeProject.length > 1) {
        this.EmployeeInfo.resumeProject = this.EmployeeInfo.resumeProject.slice(0, -1)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
