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
      <div v-for="(item, index) in EmployeeInfo.resumeFamily" :key="index">
        <span class="text-h6">家庭成员 {{ (index+1) | noFilter }}</span>
        <q-separator blue/>
        <q-input  v-model="item.name" label="姓名" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-select  v-model="item.relationship" :options="familyType" emit-value map-options label="与本人关系" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input  v-model="item.tel" label="联系电话" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input  v-model="item.company" label="工作单位及职务" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-select  v-model="item.polity" :options="polityType" emit-value map-options label="政治面貌" lazy-rules :rules="[val => !!val || '必填']"/>
      </div>
      <div>
        <q-btn-group style="width: 90%" push>
          <q-btn push label="新增" icon="+" style="width: 50%" @click="increase"/>
          <q-btn push label="删除" icon="-" style="width: 50%" @click="decrease"/>
        </q-btn-group>
      </div>
      <div>
        <q-btn label="保存" style="width: 45%" type="submit"  color="primary"/>
        <q-btn label="返回" style="width: 45%" @click="onBack" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</div>

</template>

<script>
import { familyType, polityType, NoType } from '../constant/index'
import { modifyEmployeeInfo, notiSuccess, notiFail, hasResume, getResume, getUser, putResume } from '../common/index'

export default {
  name: 'family',
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
        resumeFamily: [{ cardNo: '',
          company: '',
          createdTime: '',
          id: 48412,
          modifiedTime: '',
          name: '',
          polity: '',
          relationship: '',
          tel: '' }]
      },
      query: { cardNo: '',
        company: '',
        createdTime: '',
        id: 48412,
        modifiedTime: '',
        name: '',
        polity: '',
        relationship: '',
        tel: '' },
      familyType,
      polityType
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
      this.EmployeeInfo.resumeFamily = this.EmployeeInfo.resumeFamily.concat(this.query)
    },
    decrease () {
      if (this.EmployeeInfo.resumeFamily.length > 1) {
        this.EmployeeInfo.resumeFamily = this.EmployeeInfo.resumeFamily.slice(0, -1)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
