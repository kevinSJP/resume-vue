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
      <div v-for="(item, index) in EmployeeInfo.resumeEducation" :key="index">
        <span class="text-h6">教育经历 {{(index+1) | noFilter }}</span>
        <q-separator blue/>
        <q-input ref="beginDate" clearable v-model="item.beginDate" label="开始日期(年-月)*" mask="####-##"
                 lazy-rules :rules="[val => !!val || '必填']" />
        <q-input ref="endDate" clearable v-model="item.endDate" label="毕业日期(年-月)*" mask="####-##"
                 lazy-rules :rules="[val => !!val || '必填']" />
        <q-input ref="schoolName" clearable v-model="item.schoolName" label="学校名称" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input ref="collegeName" clearable v-model="item.collegeName" label="所在院系" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input ref="specialtyName" clearable v-model="item.specialtyName" label="所学专业" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-select ref="studyStyle" v-model="item.studyStyle" :options="studyStyle" emit-value map-options label="学习方式" :rules="[val => !!val || '必填']"/>
        <q-select ref="specialClass" v-model="item.specialClass" :options="SpecialType" emit-value map-options label="专业类别" :rules="[val => !!val || '必填']"/>
        <q-select ref="certificateLevel" v-model="item.certificateLevel" :options="cerType" emit-value map-options label="学历" :rules="[val => !!val || '必填']"/>
        <q-select ref="degree" v-model="item.degree" :options="degreeType" emit-value map-options label="学位" :rules="[val => !!val || '必填']"/>
        <q-select ref="isOverseasStudy" v-model="item.isOverseasStudy" :options="whetherType" emit-value map-options label="是否海外留学" :rules="[val => !!val || '必填']"/>
        <q-select ref="isHighestDegree" v-model="item.isHighestDegree" :options="whetherType" emit-value map-options label="是否最高学历" :rules="[val => !!val || '必填']"/>
      </div>
      <div>
        <q-btn-group push>
          <q-btn push label="增" icon="+" @click="increase"/>
          <q-btn push label="减" icon="-" @click="decrease"/>
        </q-btn-group>
      </div>
      <div>
        <q-btn label="保存" type="submit"  color="primary"/>
        <!--<q-btn label="保存" type="submit"  color="primary" flat class="q-ml-sm" />-->
        <q-btn label="返回" @click="onBack" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</div>
</template>

<script>
import { studyStyle, SpecialType, cerType, degreeType, whetherType, NoType } from '../constant/index'
import { axiosInstance } from '../boot/axios'

export default {
  name: 'education',
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
        resumeEducation: [{ beginDate: '2011-02',
          cardNo: '411102199009160075',
          certificateLevel: '12',
          collegeName: '机械',
          createdTime: '2019-06-05',
          degree: '2',
          degreeSecond: '4',
          endDate: '2013-03',
          id: 66013,
          isHighestDegree: '0',
          isOverseasStudy: '0',
          modifiedTime: '2019-06-05',
          schoolName: '贝壳',
          specialClass: '8',
          specialClassSecond: '2',
          specialtyName: '工程',
          studyStyle: '1' }, { beginDate: '2011-02',
          cardNo: '411102199009160075',
          certificateLevel: '12',
          collegeName: '机械',
          createdTime: '2019-06-05',
          degree: '2',
          degreeSecond: '4',
          endDate: '2013-03',
          id: 66013,
          isHighestDegree: '0',
          isOverseasStudy: '0',
          modifiedTime: '2019-06-05',
          schoolName: '贝壳',
          specialClass: '8',
          specialClassSecond: '2',
          specialtyName: '工程',
          studyStyle: '1' }]
      },
      query: { beginDate: '',
        cardNo: '411102199009160075',
        certificateLevel: '',
        collegeName: '',
        createdTime: '2019-06-05',
        degree: '',
        degreeSecond: '',
        endDate: '',
        id: 66013,
        isHighestDegree: '',
        isOverseasStudy: '',
        modifiedTime: '',
        schoolName: '',
        specialClass: '',
        specialClassSecond: '',
        specialtyName: '',
        studyStyle: '' },
      studyStyle,
      SpecialType,
      cerType,
      degreeType,
      whetherType,
      Array: ['1', '2', '3', '4', '5']
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
      // this.$refs.beginDate.validate()
      // this.$refs.endDate.validate()
      // this.$refs.schoolName.validate()
      // this.$refs.collegeName.validate()
      // this.$refs.specialtyName.validate()
      // this.$refs.studyStyle.validate()
      // this.$refs.specialClass.validate()
      // this.$refs.certificateLevel.validate()
      // this.$refs.degree.validate()
      // this.$refs.isOverseasStudy.validate()
      // this.$refs.isHighestDegree.validate()
      // if (this.$refs.beginDate.hasError || this.$refs.endDate.hasError || this.$refs.schoolName.hasError || this.$refs.collegeName.hasError || this.$refs.specialtyName.hasError ||
      //   this.$refs.studyStyle.hasError || this.$refs.specialClass.hasError || this.$refs.certificateLevel.hasError || this.$refs.degree.hasError || this.$refs.isOverseasStudy.hasError || this.$refs.isHighestDegree.hasError) {
      //   this.formHasError = true
      //   this.hasError = this.formHasError
      // } else {
      //   this.hasError = false
      // }
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
    // onSave () {
    //   console.log('save')
    //   this.onSubmit()
    //   this.$router.push({
    //     path: '/'
    //   })
    // },
    increase () {
      this.EmployeeInfo.resumeEducation = this.EmployeeInfo.resumeEducation.concat(this.query)
    },
    decrease () {
      if (this.EmployeeInfo.resumeEducation.length > 1) {
        this.EmployeeInfo.resumeEducation = this.EmployeeInfo.resumeEducation.slice(0, -1)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
