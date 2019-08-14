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
      <q-select ref="isPostDeployment" v-model="EmployeeInfo.resumeOtherInfo.isPostDeployment" :options="whetherType" emit-value map-options label="是否接受调配" :rules="[val => !!val || '必填']"/>
      <q-select ref="isFamilymember" v-model="EmployeeInfo.resumeOtherInfo.isFamilymember" :options="whetherType" emit-value map-options label="是否推荐" :rules="[val => !!val || '必填']"/>
      <q-input clearable v-model="EmployeeInfo.resumeOtherInfo.isFamilymemberName" label="推荐人" error-message="请输入推荐人" :error="!isFamily"/>
      <q-input ref="remark" v-model="EmployeeInfo.resumeOtherInfo.remark" type="textarea" label="自我评价" :rules="[val => !!val || '必填']"/>
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
import { whetherType } from '../constant/index'
import { modifyEmployeeInfo, notiSuccess, notiFail, hasResume, getResume, getUser, putResume } from '../common/index'

export default {
  name: 'otherInfo',
  computed: {
    isFamily () {
      return !(this.EmployeeInfo.resumeOtherInfo.isFamilymember === '1' && !this.EmployeeInfo.resumeOtherInfo.isFamilymemberName)
    }
  },
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
        resumeOtherInfo: { cardNo: '411102199009160075',
          createdTime: '2018-10-14',
          id: 0,
          isFamilymember: '0',
          isFamilymemberName: null,
          isPostDeployment: '0',
          modifiedTime: '2019-06-05',
          remark: '123' }
      },
      whetherType,
      hasError: ''
    }
  },
  methods: {
    onSubmit () {
      this.$refs.isPostDeployment.validate()
      this.$refs.isFamilymember.validate()
      this.$refs.remark.validate()
      if (this.$refs.isPostDeployment.hasError || this.$refs.isFamilymember.hasError || this.$refs.remark.hasError) {
        this.formHasError = true
        this.hasError = this.formHasError
      } else {
        this.hasError = false
      }
      putResume('/resumeInfo', modifyEmployeeInfo(this.EmployeeInfo))
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
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
