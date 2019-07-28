<template>

<div  class="q-pa-md">
  <div  class="q-gutter-md" style="max-width: 600px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
      <q-input filled  v-model="EmployeeInfo.jobApply" label="期望职位" />
      <q-input filled  v-model="EmployeeInfo.jobApply2" label="求职意向" />
      <div>
        <q-btn label="提交" type="submit" color="primary"/>
        <q-btn label="保存" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="返回" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</div>

</template>

<script>
export default {
  name: 'natural',
  data () {
    return {
      EmployeeInfo: { applyStatus: 'applyStatus',
        cardNo: '411102199009160075',
        createdTime: '2018-10-14',
        editStatus: 'editStatus',
        editTime: null,
        employStatus: 'employStatus',
        hasResume: 1,
        hasSubmitted: '1',
        id: 33,
        integrity: 'integrity',
        jobApply: '信息化',
        jobApply2: '信息化',
        modifiedTime: '2019-06-05',
        name: '邵金鹏',
        resumeAttachment: null,
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
        resumeOtherInfo: { cardNo: '411102199009160075',
          createdTime: '2018-10-14',
          id: 0,
          isFamilymember: '0',
          isFamilymemberName: null,
          isPostDeployment: '0',
          modifiedTime: '2019-06-05',
          remark: '123' },
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
          studyStyle: '1' }],
        resumeFamily: [{ cardNo: '411102199009160075',
          company: '1',
          createdTime: '2019-06-05',
          id: 48412,
          modifiedTime: '2019-06-05',
          name: '123',
          polity: '13',
          relationship: '11',
          tel: '12313' }],
        resumeInternship: [{ beginDate: '2015-01',
          cardNo: '411102199009160075',
          certTel: '1',
          companyName: '1',
          createdTime: '2019-06-05',
          departmentName: '1',
          endDate: '2015-01',
          id: 36400,
          modifiedTime: '2019-06-05',
          positionName: '1',
          remark: '1' }, {
          beginDate: '2019-01',
          cardNo: '411102199009160075',
          certTel: '2',
          companyName: '2',
          createdTime: '2019-06-05',
          departmentName: '2',
          endDate: '2019-01',
          id: 36401,
          modifiedTime: '2019-06-05',
          positionName: '2',
          remark: null }],
        resumeLanguage: [{ cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          id: 33468,
          languageType: 'en',
          modifiedTime: '2019-06-05',
          name: '1' }],
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
        }],
        resumeQualification: [{ cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          getDate: '2019-01',
          id: 42654,
          modifiedTime: '2019-06-05',
          qualificationLevel: 'CODE_Other',
          qualificationName: '1',
          qualificationNo: '2',
          qualificationOrg: '3' }],
        resumeReward: [{ cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          id: 55456,
          modifiedTime: '2019-06-05',
          remark: '1',
          rewardDate: '2015-01-01',
          rewardLevel: '1',
          rewardName: '1',
          rewardORG: '1' }],
        resumeSchoolActivities: [{ beginDate: '2015-01',
          cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          endDate: '2015-01',
          id: 19960,
          modifiedTime: '2019-06-05',
          name: '1',
          remark: '1',
          schoolName: '1' }, {
          beginDate: '2019-01',
          cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          endDate: '2019-01',
          id: 19961,
          modifiedTime: '2019-06-05',
          name: '55',
          remark: '5555',
          schoolName: '555' }, {
          beginDate: '2019-01',
          cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          endDate: '2019-01',
          id: 19962,
          modifiedTime: '2019-06-05',
          name: '111',
          remark: '1',
          schoolName: '1' }]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .my-card
    width 100%
</style>
