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
        <q-input clearable v-model="item.getDate" label="获得日期(年-月)*" mask="####-##" fill-mask="#"
                 lazy-rules :rules="[val => !!val || '必填', val => val.indexOf('#') === -1 ||'未填写完整', val => ( parseInt(val.substr(0,4)) >=1900  && parseInt(val.substr(0,4)) <=2100  && parseInt(val.substr(5,2)) >=1  && parseInt(val.substr(5,2)) <=12) || '日期格式不对']" />
        <q-input v-model="item.qualificationName" label="证书名称" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input v-model="item.qualificationNo" label="证书编号" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input v-model="item.qualificationOrg" label="颁发机构" lazy-rules :rules="[val => !!val || '必填']"/>
      </div>
      <div>
        <q-btn-group style="width: 90%" push>
          <q-btn push label="新增" icon="+" style="width: 50%" @click="increase"/>
          <q-btn push label="删除" icon="-" style="width: 50%" @click="decrease"/>
        </q-btn-group>
      </div>
      <div>
        <q-btn label="保存" type="submit" style="width: 45%" color="primary"/>
        <q-btn label="返回" @click="onBack" style="width: 45%" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</div>

</template>

<script>
import { NoType } from '../constant/index'
import { modifyEmployeeInfo, notiSuccess, notiFail, hasResume, getResume, getUser, putResume } from '../common/index'

export default {
  name: 'qualification',
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
        resumeQualification: [{ cardNo: '',
          createdTime: '',
          getDate: '',
          id: 42654,
          modifiedTime: '',
          qualificationLevel: '',
          qualificationName: '',
          qualificationNo: '',
          qualificationOrg: '' }]
      },
      query: { cardNo: '',
        createdTime: '',
        getDate: '',
        id: 42654,
        modifiedTime: '',
        qualificationLevel: '',
        qualificationName: '',
        qualificationNo: '',
        qualificationOrg: '' }
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
