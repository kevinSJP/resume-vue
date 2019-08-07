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
        <table>
          <tr> <td>期望职位：</td> <td>{{EmployeeInfo.jobApply}}</td> </tr>
          <tr> <td>求职意向：</td> <td>{{EmployeeInfo.jobApply2}}</td> </tr>
        </table>
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
        <table>
          <tr> <td>姓名：</td> <td>{{EmployeeInfo.resumeNatural.name}}</td>  </tr>
          <tr> <td>性别：</td> <td>{{EmployeeInfo.resumeNatural.sex | genderFilter}}</td> </tr>
          <tr> <td>证件类型：</td> <td>{{EmployeeInfo.resumeNatural.cardType | cardFilter}}</td> </tr>
          <tr> <td>证件号码：</td> <td>{{EmployeeInfo.resumeNatural.cardNo}}</td> </tr>
          <tr> <td>籍贯：</td> <td>{{EmployeeInfo.resumeNatural.nativePlace | areaFilter}}</td> </tr>
          <tr> <td>户口所在地：</td> <td>{{EmployeeInfo.resumeNatural.hukouPlace | areaFilter}}</td> </tr>
          <tr> <td>出生日期：</td> <td>{{EmployeeInfo.resumeNatural.birthDate | dateFilter}}</td> </tr>
          <tr> <td>政治面貌：</td> <td>{{EmployeeInfo.resumeNatural.polity | polityFilter}}</td> </tr>
          <tr> <td>婚姻状况：</td> <td>{{EmployeeInfo.resumeNatural.maritalStatus | maritalFilter}}</td> </tr>
          <tr> <td>身高：</td> <td>{{EmployeeInfo.resumeNatural.height}}cm</td> </tr>
          <tr> <td>体重：</td> <td>{{EmployeeInfo.resumeNatural.weight}}kg</td> </tr>
          <tr> <td>电话：</td> <td>{{EmployeeInfo.resumeCommunication.tel}} </td> </tr>
          <tr> <td>邮箱：</td> <td>{{EmployeeInfo.resumeCommunication.email}}</td> </tr>
          <tr><td>通讯地址：</td> <td>{{EmployeeInfo.resumeNatural.currentPlace}}</td> </tr>
        </table>
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
            <q-btn color="grey-7" round flat icon="edit" @click="goEducation"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <table style="width: 100%">
          <tr v-for="(item, index) in EmployeeInfo.resumeEducation" :key="index">
            <td style="text-align: center ; width: 10%">{{index+1}} </td>
            <td style="text-align: left">自{{item.beginDate | dateFilter}}至{{item.endDate | dateFilter}}
              就读于{{item.schoolName}}{{item.specialtyName}}专业获得{{item.certificateLevel | cerFilter}}学历</td>
          </tr>
        </table>
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
            <q-btn color="grey-7" round flat icon="edit" @click="goInternship"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <table style="width: 100%">
          <tr v-for="(item, index) in EmployeeInfo.resumeInternship" :key="index">
            <td style="text-align: center ; width: 10%">{{index+1}} </td>
            <td style="text-align: left">自{{item.beginDate | dateFilter}}至{{item.endDate | dateFilter}}在
              {{item.companyName}}{{item.departmentName}}工作，职位{{item.positionName }}</td>
          </tr>
        </table>
      </q-card-section>
    </q-card>
    <!--资格证书-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">资格证书</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit" @click="goQualification"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <table style="width: 100%">
          <tr v-for="(item, index) in EmployeeInfo.resumeQualification" :key="index">
            <td style="text-align: center ; width: 10%">{{index+1}} </td>
            <td style="text-align: left">{{item.getDate | dateFilter}}获得{{item.qualificationName}}证书，由{{item.qualificationOrg }}颁发</td>
          </tr>
        </table>
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
            <q-btn color="grey-7" round flat icon="edit" @click="goFamily"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <table style="width: 100%">
          <tr v-for="(item, index) in EmployeeInfo.resumeFamily" :key="index">
            <td style="text-align: center ; width: 10%">{{index+1}} </td>
            <td style="text-align: left">{{item.relationship | familyFilter}}是{{item.name }}在
              {{item.company}}工作，政治面貌{{item.polity | polityFilter}}</td>
          </tr>
        </table>
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
            <q-btn color="grey-7" round flat icon="edit" @click="goReward"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <table style="width: 100%">
          <tr v-for="(item, index) in EmployeeInfo.resumeReward" :key="index">
            <td style="text-align: center ; width: 10%">{{index+1}} </td>
            <td style="text-align: left">{{item.rewardDate | dateFilter}}获得{{item.rewardName}}({{item.rewardLevel | awardFilter}})奖励</td>
          </tr>
        </table>
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
            <q-btn color="grey-7" round flat icon="edit" @click="goProject"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <table style="width: 100%">
          <tr v-for="(item, index) in EmployeeInfo.resumeProject" :key="index">
            <td style="text-align: center ; width: 10%">{{index+1}} </td>
            <td style="text-align: left">自{{item.beginDate | dateFilter}}至{{item.endDate | dateFilter}}参与项目：
              {{item.projectName}}，在团队中担任{{item.projectRole}}角色</td>
          </tr>
        </table>
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
            <q-btn color="grey-7" round flat icon="edit" @click="goSchoolActivities"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <table style="width: 100%">
          <tr v-for="(item, index) in EmployeeInfo.resumeSchoolActivities" :key="index">
            <td style="text-align: center ; width: 10%">{{index+1}} </td>
            <td style="text-align: left">自{{item.beginDate | dateFilter}}至{{item.endDate | dateFilter}}参与
              {{item.name}}取得成果如下成果，{{item.remark}}</td>
          </tr>
        </table>
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
            <q-btn color="grey-7" round flat icon="edit" @click="goOtherInfo"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <table>
        <tr> <td>是否推荐：</td> <td>{{EmployeeInfo.resumeOtherInfo.isFamilymember | whetherFilter}} </td> </tr>
        <tr> <td>推荐人：</td> <td>{{EmployeeInfo.resumeOtherInfo.isFamilymemberName | NullFilter}} </td> </tr>
        <tr> <td>是否接受调配：</td> <td>{{EmployeeInfo.resumeOtherInfo.isPostDeployment | whetherFilter}} </td> </tr>
        <tr> <td>自我评价：</td> <td>{{EmployeeInfo.resumeOtherInfo.remark}}</td> </tr>
        </table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

import { whetherType, cardType, genderType, polityType, maritalType, areaType, cerType, familyType, awardType } from '../constant/index'
import { axiosInstance } from '../boot/axios'
/*, axiosInstance, postRequest, putRequest, deleteRequest, uploadFileRequest */
export default {
  name: 'resume',
  created () {
    this.getWebData()
  },
  mounted () {
    // this.getWebData()
  },
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
  },
  filters: {
    //      return cardType.find(item => item.value === value[value.length - 1]).label
    whetherFilter (value) {
      if (value) {
        return whetherType.find(item => item.value === value).label
      }
    },
    cardFilter (value) {
      if (value) {
        return cardType.find(item => item.value === value).label
      }
    },
    genderFilter (value) {
      if (value) {
        return genderType.find(item => item.value === value).label
      }
    },
    polityFilter (value) {
      if (value) {
        return polityType.find(item => item.value === value).label
      }
    },
    maritalFilter (value) {
      if (value) {
        return maritalType.find(item => item.value === value).label
      }
    },
    cerFilter (value) {
      if (value) {
        return cerType.find(item => item.value === value).label
      }
    },
    familyFilter (value) {
      if (value) {
        return familyType.find(item => item.value === value).label
      }
    },
    awardFilter (value) {
      if (value) {
        return awardType.find(item => item.value === value).label
      }
    },
    areaFilter (value) {
      return areaType.find(item => item.value === value).label
    },
    dateFilter (value) {
      if (value) {
        if (value.length === 10) {
          return parseInt(value.substr(0, 4)) + '年' + parseInt(value.substr(5, 2)) + '月' + parseInt(value.substr(8, 2)) + '号'
        }
        if (value.length === 7) {
          return parseInt(value.substr(0, 4)) + '年' + parseInt(value.substr(5, 2)) + '月'
        }
      }
    },
    NullFilter (value) {
      if (!value) return '无'
      return value
    }
  },
  methods: {
    /* **** 页面跳转 ****/
    goNatural () {
      this.$router.push({
        path: '/natural',
        name: 'natural',
        params: {
          EmployeeInfo: this.EmployeeInfo
        }
      })
    },
    goEducation () {
      this.$router.push({
        path: '/education',
        name: 'education',
        params: {
          EmployeeInfo: this.EmployeeInfo
        }
      })
    },
    goInternship () {
      this.$router.push({
        path: '/internship',
        name: 'internship',
        params: {
          EmployeeInfo: this.EmployeeInfo
        }
      })
    },
    goQualification () {
      this.$router.push({
        path: '/qualification',
        name: 'qualification',
        params: {
          EmployeeInfo: this.EmployeeInfo
        }
      })
    },
    goFamily () {
      this.$router.push({
        path: '/family',
        name: 'family',
        params: {
          EmployeeInfo: this.EmployeeInfo
        }
      })
    },
    goReward () {
      this.$router.push({
        path: '/reward',
        name: 'reward',
        params: {
          EmployeeInfo: this.EmployeeInfo
        }
      })
    },
    goProject () {
      this.$router.push({
        path: '/project',
        name: 'project',
        params: {
          EmployeeInfo: this.EmployeeInfo
        }
      })
    },
    goSchoolActivities () {
      this.$router.push({
        path: '/schoolActivities',
        name: 'schoolActivities',
        params: {
          EmployeeInfo: this.EmployeeInfo
        }
      })
    },
    goOtherInfo () {
      this.$router.push({
        path: '/otherInfo',
        name: 'otherInfo',
        params: {
          EmployeeInfo: this.EmployeeInfo
        }
      })
    },
    goApply () {
      this.$router.push({
        path: '/apply',
        name: 'apply',
        params: {
          EmployeeInfo: this.EmployeeInfo
        }
      })
    },
    /* *****获取数据*******/
    getWebData () {
      axiosInstance.get('/resumeInfo', {
      }).then(res => {
        this.EmployeeInfo = res.data.data
        console.log(this.EmployeeInfo)
      }).catch((err) => { return err })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .my-card
    width 100%
</style>
