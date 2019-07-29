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
      <q-input filled  v-model="EmployeeInfo.jobApply" label="期望职位" />
      <q-input filled  v-model="EmployeeInfo.jobApply2" label="求职意向" />
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
export default {
  name: 'natural',
  mounted () {
    this.EmployeeInfo.jobApply = this.$route.params.jobApply
    this.EmployeeInfo.jobApply2 = this.$route.params.jobApply2
    // console.log(this.$route.params.jobApply)
  },
  data () {
    return {
      EmployeeInfo: {
        jobApply: '信息化',
        jobApply2: '信息化'
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.EmployeeInfo.jobApply)
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
    onBack () {
      console.log('back')
      this.$router.push({
        path: '/'
      })
    },
    onSave () {
      console.log('save')
      this.onSubmit()
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
