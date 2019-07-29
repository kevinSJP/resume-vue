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
      <q-input filled readonly  v-model="EmployeeInfo.resumeNatural.name" label="姓名" />
      <q-input filled type="number" v-model.number="EmployeeInfo.resumeNatural.height" label="身高" />
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
    this.EmployeeInfo.resumeNatural = this.$route.params.resumeNatural
    this.EmployeeInfo.resumeCommunication = this.$route.params.resumeCommunication
    // console.log(this.$route.params.jobApply)
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
          tel: '13222222222' }
      }
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

<style lang="stylus" scoped>

</style>
