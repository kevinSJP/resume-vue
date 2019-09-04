<template>
  <q-page class="q-pa-md row items-start q-gutter-md">
    <q-btn flat glossy unelevated  style="margin: 0 auto ;width: 100%"  text-color="primary">
        请依次填写各项信息完成简历投递
    </q-btn>
    <!--申请职位-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <q-icon class="avatar q-pa-xs" name="img:statics/icons/job.svg" />
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
          <q-icon class="avatar q-pa-xs" name="img:statics/icons/psn.svg" />
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
          <!--<tr> <td>证件类型：</td> <td>{{EmployeeInfo.resumeNatural.cardType | cardFilter}}</td> </tr>-->
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
          <q-icon class="avatar q-pa-xs" name="img:statics/icons/edu.svg" />
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
        <div v-show="eduEmpty">
          <table style="width: 100%">
            <tr v-for="(item, index) in EmployeeInfo.resumeEducation" :key="index">
              <td style="text-align: center ; width: 10%">
                <q-icon class="q-pa-auto" :name="iconMethod(index+1)" />
              </td>
              <td style="text-align: left"> 自{{item.beginDate | dateFilter}}至{{item.endDate | dateFilter}}
                就读于{{item.schoolName}}{{item.specialtyName}}专业获得{{item.certificateLevel | cerFilter}}学历</td>
            </tr>
          </table>
        </div>
      </q-card-section>
    </q-card>
    <!--工作经历-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <q-icon class="avatar q-pa-xs" name="img:statics/icons/work.svg" />
          <div class="col">
            <div class="text-h6">工作实习经历</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit" @click="goInternship"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div v-show="internshipEmpty">
          <table style="width: 100%">
            <tr v-for="(item, index) in EmployeeInfo.resumeInternship" :key="index">
              <td style="text-align: center ; width: 10%">
                <q-icon class="q-pa-auto" :name="iconMethod(index+1)" />
              </td>
              <td style="text-align: left">自{{item.beginDate | dateFilter}}至{{item.endDate | dateFilter}}在
                {{item.companyName}}{{item.departmentName}}工作，职位{{item.positionName }}</td>
            </tr>
          </table>
        </div>
      </q-card-section>
    </q-card>
    <!--资格证书-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <q-icon class="avatar q-pa-xs" name="img:statics/icons/qualify.svg" />
          <div class="col">
            <div class="text-h6">等级证书</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="edit" @click="goQualification"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator white/>
      <q-card-section>
        <div v-show="qualificationEmpty">
          <table style="width: 100%">
            <tr v-for="(item, index) in EmployeeInfo.resumeQualification" :key="index">
              <td style="text-align: center ; width: 10%">
                <q-icon class="q-pa-auto" :name="iconMethod(index+1)" />
              </td>
              <td style="text-align: left">{{item.getDate | dateFilter}}获得{{item.qualificationName}}证书，由{{item.qualificationOrg }}颁发</td>
            </tr>
          </table>
        </div>
      </q-card-section>
    </q-card>
    <!--家庭成员-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <q-icon class="avatar q-pa-xs" name="img:statics/icons/family.svg" />
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
        <div v-show="familyEmpty">
          <table style="width: 100%">
            <tr v-for="(item, index) in EmployeeInfo.resumeFamily" :key="index">
              <td style="text-align: center ; width: 10%">
                <q-icon class="q-pa-auto" :name="iconMethod(index+1)" />
              </td>
              <td style="text-align: left">{{item.relationship | familyFilter}}是{{item.name }},
                {{item.company}}工作，政治面貌{{item.polity | polityFilter}}</td>
            </tr>
          </table>
        </div>
      </q-card-section>
    </q-card>
    <!--奖励信息-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <q-icon class="avatar q-pa-xs" name="img:statics/icons/award.svg" />
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
        <div v-show="rewardEmpty">
          <table style="width: 100%">
            <tr v-for="(item, index) in EmployeeInfo.resumeReward" :key="index">
              <td style="text-align: center ; width: 10%">
                <q-icon class="q-pa-auto" :name="iconMethod(index+1)" />
              </td>
              <td style="text-align: left">{{item.rewardDate | dateFilter}}获得{{item.rewardName}}({{item.rewardLevel | awardFilter}})奖励</td>
            </tr>
          </table>
        </div>
      </q-card-section>
    </q-card>
    <!--项目经历-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <q-icon class="avatar q-pa-xs" name="img:statics/icons/project.svg" />
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
        <div v-show="projectEmpty">
          <table style="width: 100%">
            <tr v-for="(item, index) in EmployeeInfo.resumeProject" :key="index">
              <td style="text-align: center ; width: 10%">
                <q-icon class="q-pa-auto" :name="iconMethod(index+1)" />
              </td>
              <td style="text-align: left">自{{item.beginDate | dateFilter}}至{{item.endDate | dateFilter}}参与项目：
                {{item.projectName}}，在团队中担任{{item.projectRole}}角色</td>
            </tr>
          </table>
        </div>
      </q-card-section>
    </q-card>
    <!--社会活动-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <q-icon class="avatar q-pa-xs" name="img:statics/icons/active.svg" />
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
        <div v-show="schoolActivitiesEmpty">
          <table style="width: 100%">
            <tr v-for="(item, index) in EmployeeInfo.resumeSchoolActivities" :key="index">
              <td style="text-align: center ; width: 10%">
                <q-icon class="q-pa-auto" :name="iconMethod(index+1)" />
              </td>
              <td style="text-align: left">自{{item.beginDate | dateFilter}}至{{item.endDate | dateFilter}}参与
                {{item.name}}取得成果如下成果，{{item.remark}}</td>
            </tr>
          </table>
        </div>
      </q-card-section>
    </q-card>
    <!--其他信息-->
    <q-card inline class="my-card bg-grey-1">
      <q-card-section  class="q-py-none">
        <div class="row items-center no-wrap">
          <q-icon class="avatar q-pa-xs" name="img:statics/icons/other.svg" />
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
        <tr> <td style="width: 15%">是否推荐：</td> <td>{{EmployeeInfo.resumeOtherInfo.isFamilymember | whetherFilter}} </td> </tr>
        <tr> <td>推荐人：</td> <td>{{EmployeeInfo.resumeOtherInfo.isFamilymemberName | NullFilter}} </td> </tr>
        <tr> <td>是否接受调配：</td> <td>{{EmployeeInfo.resumeOtherInfo.isPostDeployment | whetherFilter}} </td> </tr>
        <tr> <td>自我评价：</td> <td>{{EmployeeInfo.resumeOtherInfo.remark}}</td> </tr>
        </table>
      </q-card-section>
    </q-card>
    <q-btn color="primary" icon="save" icon-right="send" label=" 提   交   申   请 " @click="submitResume" style="width: 100%"/>
  </q-page>
</template>

<script>

import { whetherType, cardType, genderType, polityType, maritalType, areaType, cerType, familyType, awardType } from '../constant/index'
import { modifyEmployeeInfo, subSuccess, subFail, lackInfo, hasResume, getResume, getUser, putResume } from '../common/index'

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
      // EmployeeInfo: {},
      EmployeeInfo: { applyStatus: '',
        cardNo: '',
        createdTime: '',
        editStatus: '',
        editTime: null,
        employStatus: '',
        hasResume: 0,
        hasSubmitted: '0',
        id: 33,
        integrity: '',
        jobApply: '',
        jobApply2: '',
        modifiedTime: '',
        name: '',
        resumeAttachment: null,
        resumeNatural: { age: null,
          birthDate: '',
          cardNo: '',
          cardType: '',
          createdTime: '',
          currentPlace: '',
          height: '',
          hukouPlace: '',
          id: 78,
          maritalStatus: '',
          modifiedTime: '',
          name: '',
          nativePlace: '',
          photoId: '',
          polity: '',
          sex: '',
          weight: '' },
        resumeOtherInfo: { cardNo: '',
          createdTime: '',
          id: 0,
          isFamilymember: '0',
          isFamilymemberName: null,
          isPostDeployment: '0',
          modifiedTime: '',
          remark: '' },
        resumeCommunication: { address: null,
          cardNo: '',
          createdTime: '',
          email: '',
          id: 52,
          modifiedTime: '',
          tel: '' },
        resumeEducation: [{ beginDate: null,
          cardNo: '',
          certificateLevel: '',
          collegeName: '',
          createdTime: '',
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
          studyStyle: '' }],
        resumeFamily: [{ cardNo: '',
          company: '',
          createdTime: '',
          id: 48412,
          modifiedTime: '',
          name: '',
          polity: '',
          relationship: '',
          tel: '' }],
        resumeInternship: [{ beginDate: '',
          cardNo: '',
          certTel: '',
          companyName: '',
          createdTime: '',
          departmentName: '',
          endDate: '',
          id: 36400,
          modifiedTime: '',
          positionName: '',
          remark: '' }],
        resumeLanguage: [{ cardNo: '',
          createdTime: '',
          id: 33468,
          languageType: '',
          modifiedTime: '',
          name: '' }],
        resumeProject: [{ beginDate: null,
          cardNo: '',
          createdTime: '',
          endDate: '',
          id: 19669,
          modifiedTime: '',
          projectName: '',
          projectRole: '',
          remark: null,
          teamSize: '' }],
        resumeQualification: [{ cardNo: '',
          createdTime: '',
          getDate: null,
          id: 42654,
          modifiedTime: '',
          qualificationLevel: '',
          qualificationName: '',
          qualificationNo: '',
          qualificationOrg: '' }],
        resumeReward: [{ cardNo: '',
          createdTime: '',
          id: 55456,
          modifiedTime: '',
          remark: '',
          rewardDate: '',
          rewardLevel: '',
          rewardName: '',
          rewardORG: '' }],
        resumeSchoolActivities: [{ beginDate: null,
          cardNo: '',
          createdTime: '',
          endDate: '',
          id: 19960,
          modifiedTime: '',
          name: '',
          remark: '',
          schoolName: '' }]
      },
      isNewResume: '1'
    }
  },
  computed: {
    eduEmpty () {
      // if (this.isNewResume === '0') {
      if (this.EmployeeInfo.resumeEducation && this.EmployeeInfo.resumeEducation.length !== 0) {
        if (this.EmployeeInfo.resumeEducation[0].beginDate && this.EmployeeInfo.resumeEducation[0].beginDate.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
      // } else {
      //   if (this.EmployeeInfo.resumeEducation[0].beginDate && this.EmployeeInfo.resumeEducation[0].beginDate.length !== 0) {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    },
    internshipEmpty () {
      // if (this.isNewResume === '0') {
      if (this.EmployeeInfo.resumeInternship && this.EmployeeInfo.resumeInternship.length !== 0) {
        if (this.EmployeeInfo.resumeInternship[0].beginDate && this.EmployeeInfo.resumeInternship[0].beginDate.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
      // } else {
      //   if (this.EmployeeInfo.resumeInternship[0].beginDate && this.EmployeeInfo.resumeInternship[0].beginDate.length !== 0) {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    },
    qualificationEmpty () {
      // if (this.isNewResume === '0') {
      if (this.EmployeeInfo.resumeQualification && this.EmployeeInfo.resumeQualification.length !== 0) {
        if (this.EmployeeInfo.resumeQualification[0].getDate && this.EmployeeInfo.resumeQualification[0].getDate.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
      // } else {
      //   if (this.EmployeeInfo.resumeQualification[0].getDate && this.EmployeeInfo.resumeQualification[0].getDate.length !== 0) {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    },
    familyEmpty () {
      // if (this.isNewResume === '0') {
      if (this.EmployeeInfo.resumeFamily && this.EmployeeInfo.resumeFamily.length !== 0) {
        if (this.EmployeeInfo.resumeFamily[0].name && this.EmployeeInfo.resumeFamily[0].name.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
      // } else {
      //   if (this.EmployeeInfo.resumeFamily[0].name && this.EmployeeInfo.resumeFamily[0].name.length !== 0) {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    },
    rewardEmpty () {
      // if (this.isNewResume === '0') {
      if (this.EmployeeInfo.resumeReward && this.EmployeeInfo.resumeReward.length !== 0) {
        if (this.EmployeeInfo.resumeReward[0].rewardDate && this.EmployeeInfo.resumeReward[0].rewardDate.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
      // } else {
      //   if (this.EmployeeInfo.resumeReward[0].rewardDate && this.EmployeeInfo.resumeReward[0].rewardDate.length !== 0) {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    },
    projectEmpty () {
      // if (this.isNewResume === '0') {
      if (this.EmployeeInfo.resumeProject && this.EmployeeInfo.resumeProject.length !== 0) {
        if (this.EmployeeInfo.resumeProject[0].projectName && this.EmployeeInfo.resumeProject[0].projectName.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
      // } else {
      //   if (this.EmployeeInfo.resumeProject[0].projectName && this.EmployeeInfo.resumeProject[0].projectName.length !== 0) {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    },
    schoolActivitiesEmpty () {
      // if (this.isNewResume === '0') {
      if (this.EmployeeInfo.resumeSchoolActivities && this.EmployeeInfo.resumeSchoolActivities.length !== 0) {
        if (this.EmployeeInfo.resumeSchoolActivities[0].beginDate && this.EmployeeInfo.resumeSchoolActivities[0].beginDate.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
      // } else {
      //   if (this.EmployeeInfo.resumeSchoolActivities[0].beginDate && this.EmployeeInfo.resumeSchoolActivities[0].beginDate.length !== 0) {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    }
  },
  filters: {
    whetherFilter (value) {
      if (value) {
        console.log(whetherType.find(item => item.value === value))
        if (whetherType.find(item => item.value === value)) {
          return whetherType.find(item => item.value === value).label
        }
      }
    },
    cardFilter (value) {
      if (value) {
        if (cardType.find(item => item.value === value)) {
          return cardType.find(item => item.value === value).label
        }
      }
    },
    genderFilter (value) {
      if (value) {
        if (genderType.find(item => item.value === value)) {
          return genderType.find(item => item.value === value).label
        }
      }
    },
    polityFilter (value) {
      if (value) {
        if (polityType.find(item => item.value === value)) {
          return polityType.find(item => item.value === value).label
        }
      }
    },
    maritalFilter (value) {
      if (value) {
        if (maritalType.find(item => item.value === value)) {
          return maritalType.find(item => item.value === value).label
        }
      }
    },
    cerFilter (value) {
      if (value) {
        if (cerType.find(item => item.value === value)) {
          return cerType.find(item => item.value === value).label
        }
      }
    },
    familyFilter (value) {
      if (value) {
        if (familyType.find(item => item.value === value)) {
          return familyType.find(item => item.value === value).label
        }
      }
    },
    awardFilter (value) {
      if (value) {
        if (awardType.find(item => item.value === value)) {
          return awardType.find(item => item.value === value).label
        }
      }
    },
    areaFilter (value) {
      if (value) {
        if (areaType.find(item => item.value === value)) {
          return areaType.find(item => item.value === value).label
        }
      }
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
    iconMethod (value) {
      return 'img:statics/icons/' + value + '.ico'
    },
    /* *****获取数据*******/
    getWebData () {
      hasResume().then(res => {
        console.log(res.data)
        if (res.data.data === 1) {
          this.isNewResume = '0'
          getResume().then(res => {
            this.EmployeeInfo = res.data.data
            console.log(this.EmployeeInfo)
          }).catch((err) => { return err })
        } else {
          this.isNewResume = '1'
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
    submitResume () {
      if (this.EmployeeInfo.jobApply && this.EmployeeInfo.jobApply.length !== 0 &&
        this.EmployeeInfo.resumeNatural.polity && this.EmployeeInfo.resumeNatural.polity.length !== 0 &&
        this.EmployeeInfo.resumeEducation && this.EmployeeInfo.resumeEducation.length !== 0) {
        console.log(modifyEmployeeInfo(this.EmployeeInfo))
        this.EmployeeInfo.hasSubmitted = '1'
        putResume(modifyEmployeeInfo(this.EmployeeInfo))
          .then(res => {
            subSuccess()
            return res
          })
          .catch((err) => {
            subFail()
            return err
          })
      } else {
        console.log(this.EmployeeInfo)
        console.log(this.EmployeeInfo.jobApply)
        console.log(this.EmployeeInfo.jobApply.length)
        lackInfo()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .my-card
    width 100%
</style>
