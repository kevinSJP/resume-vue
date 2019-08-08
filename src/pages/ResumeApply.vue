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
      <q-input ref="jobApply" clearable  v-model="EmployeeInfo.jobApply" label="期望职位*" lazy-rules :rules="[val => !!val || '必填']" />
      <q-input ref="jobApply2" clearable  v-model="EmployeeInfo.jobApply2" label="求职意向*" lazy-rules :rules="[val => !!val || '必填']" />
      <q-uploader
        url="http://localhost:4444/upload"
        label="上传照片 "
        auto-upload
        accept=".jpg, image/jpeg"
        style="max-width: 300px"
      />
        <q-uploader
          url="http://localhost:4444/upload"
          label="上传简历 ( <2k size)"
          auto-upload
          :max-file-size="2048"
          style="max-width: 300px"
        />
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
import { axiosInstance } from '../boot/axios'
import { modifyEmployeeInfo } from '../common/index'

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
        jobApply: '信息化',
        jobApply2: '信息化'
      },
      hasError: ''
    }
  },
  methods: {
    onSubmit () {
      this.$refs.jobApply.validate()
      this.$refs.jobApply2.validate()
      if (this.$refs.jobApply.hasError || this.$refs.jobApply2.hasError) {
        this.formHasError = true
        this.hasError = this.formHasError
      } else {
        this.hasError = false
      }
      axiosInstance.put('/resumeInfo', modifyEmployeeInfo(this.EmployeeInfo))
        .then(res => { return res })
        .catch((err) => { return err })
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
