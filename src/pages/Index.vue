<template>
  <q-page class="q-pa-md row items-start q-gutter-md">
    <!--申请职位-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">申请职位</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit" @click="goApply"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div>期望职位：{{EmployeeInfo.jobApply}} </div>
        <div>求职意向：{{EmployeeInfo.jobApply2}} </div>
      </q-card-section>
    </q-card>
    <!--基本信息-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">基本信息</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit"  @click="goNatural"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div>姓名：{{EmployeeInfo.resumeNatural.name}}  </div>
        <div>证件类型：{{EmployeeInfo.resumeNatural.cardType}} </div>
        <div>证件号码：{{EmployeeInfo.resumeNatural.cardNo}} </div>
      </q-card-section>
    </q-card>
    <!--通讯信息-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">通讯信息</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div>电话：{{EmployeeInfo.resumeCommunication.tel}} </div>
        <div>  邮箱：{{EmployeeInfo.resumeCommunication.email}}</div>
      </q-card-section>
    </q-card>
    <!--教育信息-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">教育信息</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div v-for="(item, index) in EmployeeInfo.resumeEducation" :key="index">学校：{{item.schoolName}} &nbsp;
          专业：{{item.collegeName}}</div>
      </q-card-section>
    </q-card>
    <!--工作经历-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">工作经历</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div v-for="(item, index) in EmployeeInfo.resumeInternship" :key="index">公司：{{item.companyName}} &nbsp;
          部门：{{item.departmentName}}</div>
      </q-card-section>
    </q-card>
    <!--家庭成员-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">家庭成员</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div v-for="(item, index) in EmployeeInfo.resumeFamily" :key="index">姓名：{{item.name}} &nbsp;
          工作单位：{{item.company}}</div>
      </q-card-section>
    </q-card>
    <!--奖励信息-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">奖励信息</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div v-for="(item, index) in EmployeeInfo.resumeReward" :key="index">奖励名称：{{item.rewardName}} &nbsp;
          奖励等级：{{item.rewardLevel}}</div>
      </q-card-section>
    </q-card>
    <!--项目经历-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">项目经历</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div v-for="(item, index) in EmployeeInfo.resumeProject" :key="index">项目名称：{{item.projectName}} &nbsp;
          团队角色角色：{{item.projectRole}}</div>
      </q-card-section>
    </q-card>
    <!--社会活动-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">社会活动</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div v-for="(item, index) in EmployeeInfo.resumeSchoolActivities" :key="index">名称：{{item.name}} &nbsp;
          说明：{{item.remark}}</div>
      </q-card-section>
    </q-card>
    <!--其他信息-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">其他信息</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div >是否推荐：{{EmployeeInfo.resumeOtherInfo.isFamilymember}} </div>
        <div >  自我评价：{{EmployeeInfo.resumeOtherInfo.remark}}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'resume',
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
      },
      cardType: [
        {
          label: '大陆身份证',
          value: '0'
        }, {
          label: '港澳台',
          value: '1'
        }, {
          label: '外籍身份证',
          value: '2'
        }
      ]
    }
  },
  methods: {
    goNatural () {
      this.$router.push({
        path: '/natural'
      })
    },
    goApply () {
      this.$router.push({
        path: '/apply'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .my-card
    width 100%
</style>
