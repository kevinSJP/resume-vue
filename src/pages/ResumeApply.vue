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
      <q-select ref="applyType" v-model="EmployeeInfo.applyType" :options="applyType" emit-value map-options label="招聘类型*" :rules="[val => !!val || '必填']" />
      <q-badge color="grey-6">
        校园招聘请在期望职位中填写管培职位类别。<br>
        社会招聘请在期望职位中填写具体职位名称。
      </q-badge>
      <q-input ref="jobApply" clearable  v-model="EmployeeInfo.jobApply" label="期望职位*" lazy-rules :rules="[val => !!val || '必填']" />
      <q-badge color="grey-6">
        在求职意向中填写具体期望的工作内容。<br>
        如校招请注明应届生。
      </q-badge>
      <q-input ref="jobApply2" clearable  v-model="EmployeeInfo.jobApply2" label="求职意向*" lazy-rules :rules="[val => !!val || '必填']" />
      <!--<q-uploader-->
        <!--url="http://localhost:8083/file/upload/avatar"-->
        <!--label="上传照片 "-->
        <!--auto-upload-->
        <!--accept=".jpg, image/jpeg"-->
        <!--style="max-width: 300px"-->
        <!--form-field= "() => [{ name: 'file', value: file[0] }]"-->
      <!--/>-->
      <!--<q-uploader-->
        <!--url="http://localhost:8083/file/upload/attachment"-->
        <!--label="上传简历 ( <2k size)"-->
        <!--auto-upload-->
        <!--:max-file-size="2048"-->
        <!--style="max-width: 300px"-->
      <!--/>-->
      <div>
        <!--<q-btn label="提交" @click="onSave"  color="primary"/>-->
        <q-btn label="保存" style="width: 45%" type="submit"  color="primary" />
        <q-btn label="返回" style="width: 45%" @click="onBack" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</div>

</template>

<script>
import { applyType } from '../constant/index'
import { modifyEmployeeInfo, notiSuccess, notiFail, hasResume, getResume, getUser, putResume } from '../common/index'

export default {
  name: 'apply',
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
        jobApply: '',
        jobApply2: '',
        applyStatus: 'applyStatus',
        editStatus: 'editStatus',
        employStatus: 'employStatus',
        hasResume: 0,
        integrity: 'integrity',
        applyType: '',
        isEntry: '0',
        name: ''
      },
      applyType,
      hasError: ''
    }
  },
  watch: {

  },
  methods: {
    onSubmit () {
      this.$refs.jobApply.validate()
      this.$refs.jobApply2.validate()
      this.$refs.applyType.validate()
      if (this.$refs.jobApply.hasError || this.$refs.jobApply2.hasError || this.$refs.applyType.hasError) {
        this.formHasError = true
        this.hasError = this.formHasError
      } else {
        this.hasError = false
      }
      console.log(modifyEmployeeInfo(this.EmployeeInfo))
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
      console.log(this.hasError)
      if (!this.hasError) {
        this.$router.push({
          path: '/'
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped></style>
