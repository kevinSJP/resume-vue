<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          简历查询
        </q-toolbar-title>

        <q-avatar size="42px" >
          <img  src="../assets/default_avatar.jpeg" >
        </q-avatar>
        <!--<div>v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md row items-start q-gutter-md">
          <q-splitter v-model="splitterModel" :limits="[20, 40]" style="height: 660px; width: 100%">
            <template v-slot:before>
              <div class="q-pa-md">
                <div class="text-h4 q-mb-md">查询条件</div>
                <div class="q-pa-md">
                  <q-btn color="primary" label="查询" style="width: 100%" @click="queryResumeList"/>
                  <q-input filled clearable v-model="ResName" label="姓名(如多个以空格分隔)" />
                  <q-select  filled v-model="ResCertificate" multiple :options="cerTypeName" label="学历" emit-value map-options  >
                    <template v-if="ResCertificate" v-slot:append>
                      <q-icon name="cancel" @click.stop="ResCertificate = null" class="cursor-pointer" />
                    </template>
                  </q-select>
                  <q-select filled v-model="ResGender" multiple :options="genderType" label="性别"  emit-value map-options>
                    <template v-if="ResGender" v-slot:append>
                      <q-icon name="cancel" @click.stop="ResGender = null" class="cursor-pointer" />
                    </template>
                  </q-select>
                  <q-input filled clearable v-model="ResBirthday" mask="date"  label="出生日期晚于">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="ResBirthday" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-select filled v-model="ResPolity" multiple :options="polityType" label="政治面貌"  emit-value map-options>
                    <template v-if="ResPolity" v-slot:append>
                      <q-icon name="cancel" @click.stop="ResPolity = null" class="cursor-pointer" />
                    </template>
                  </q-select>
                  <q-input filled clearable v-model="ResCollege" label="学校(如多个以空格分隔)" />
                  <q-input filled clearable v-model="ResSpecialty" label="专业(如多个以空格分隔)" />
                  <q-select filled v-model="ResSpecial" multiple :options="SpecialTypeName" label="专业类别"  emit-value map-options>
                    <template v-if="ResSpecial" v-slot:append>
                      <q-icon name="cancel" @click.stop="ResSpecial = null" class="cursor-pointer" />
                    </template>
                  </q-select>
                  <q-badge color="secondary">
                     {{ ResDay }} 天内更新简历
                  </q-badge>
                  <q-slider v-model="ResDay" label :min="0" :max="90" class="on-right" style="width: 80%"/>
                  <!--<q-badge color="secondary" multi-line>-->
                    <!--Model: "{{ ResCertificate }}"-->
                  <!--</q-badge>-->
                </div>
              </div>
            </template>

            <template v-slot:after style=" width: 100%">
              <div class="q-pa-md">
                <div class="text-h4 q-mb-md">查询结果</div>
                <div class="q-pa-md">
                  <q-table
                    class="my-sticky-column-table"
                    title="人员列表"
                    :data="data"
                    :columns="columns"
                    row-key="cardNo"
                    :filter="filter"
                    :loading="loading"
                    selection="single"
                    :selected.sync="selected"
                  >

                    <template v-slot:top>
                      <q-btn flat dense color="primary" :disable="loading" label="删除" @click="removeRow" />&nbsp;&nbsp;&nbsp;&nbsp;
                      <q-btn flat dense class="on-right" color="primary" :disable="loading" label="查看简历" @click="queryDetail" />
                      <q-space />
                      <download-excel
                        class   = "btn"
                        :data   = "data"
                        :fields = "json_fields"
                        worksheet = "My Worksheet"
                        name    = "filename.xls"
                      >
                        导出列表数据
                        <q-icon name="save" />
                      </download-excel>&nbsp;&nbsp;&nbsp;&nbsp;
                      <q-input borderless dense debounce="300" color="primary" v-model="filter">
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>

                  </q-table>
                  <!--<div class="q-mt-md">-->
                    <!--Selected: {{ JSON.stringify(selected) }}-->
                  <!--</div>-->
                </div>
              </div>
            </template>

          </q-splitter>
      </q-page>

      <q-dialog v-model="viewDetail" >
        <q-card class="my-card bg-grey-1" style="width: 80%">
          <q-card-section class="row items-center">
            <div class="text-h6">简历信息</div>
            <q-badge color="primary" @click="downloadResume" v-show="EmployeeInfo.resumeAttachment ? true : false">
              <q-icon name="download" color="white" />下载原简历
            </q-badge>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-separator white/>
          <q-card-section>
            <div class="text-subtitle2">申请职位</div>
            <table>
              <tr> <td>期望职位：</td> <td>{{EmployeeInfo.jobApply}}</td> </tr>
              <tr> <td>求职意向：</td> <td>{{EmployeeInfo.jobApply2}}</td> </tr>
            </table>
          </q-card-section>
          <q-separator white/>
          <q-card-section>
            <div class="text-subtitle2">基本信息</div>
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
          <q-separator white/>
          <q-card-section>
            <div class="text-subtitle2">教育信息</div>
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
          <q-separator white/>
          <q-card-section>
            <div class="text-subtitle2">工作实习经历</div>
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
          <q-separator white/>
          <q-card-section>
            <div class="text-subtitle2">等级证书</div>
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
          <q-separator white/>
          <q-card-section>
            <div class="text-subtitle2">家庭成员</div>
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
          <q-separator white/>
          <q-card-section>
            <div class="text-subtitle2">奖励信息</div>
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
          <q-separator white/>
          <q-card-section>
            <div class="text-subtitle2">项目经历</div>
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
          <q-separator white/>
          <q-card-section>
            <div class="text-subtitle2">社会活动</div>
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
          <q-separator white/>
          <q-card-section>
            <div class="text-subtitle2">其他信息</div>
            <table>
              <tr> <td style="width: 15%">是否推荐：</td> <td>{{EmployeeInfo.resumeOtherInfo.isFamilymember | whetherFilter}} </td> </tr>
              <tr> <td>推荐人：</td> <td>{{EmployeeInfo.resumeOtherInfo.isFamilymemberName | NullFilter}} </td> </tr>
              <tr> <td>是否接受调配：</td> <td>{{EmployeeInfo.resumeOtherInfo.isPostDeployment | whetherFilter}} </td> </tr>
              <tr> <td>自我评价：</td> <td>{{EmployeeInfo.resumeOtherInfo.remark}}</td> </tr>
            </table>
          </q-card-section>
        </q-card>

      </q-dialog>

    </q-page-container>
  </q-layout>
</template>

<script>
import Vue from 'vue'
import downloadExcel from 'vue-json-excel'
import { whetherType, cardType, genderType, polityType, maritalType, areaType, cerType, familyType, awardType, SpecialType } from '../constant/index'
import { getResumeList, getResumeByNo, notAllow } from '../common/index'

Vue.component('downloadExcel', downloadExcel)

export default {
  name: 'queryResume',
  created () {
  },
  mounted () {
    this.queryResumeList()
  },
  data () {
    return {
      ResName: null,
      ResGender: null,
      ResCertificate: null,
      ResBirthday: '1993/01/01',
      ResPolity: null,
      ResCollege: null,
      ResSpecialty: null,
      ResSpecial: null,
      ResDay: 30,

      cerType,
      genderType,
      polityType,
      SpecialType,

      viewDetail: false,

      splitterModel: 30,
      selected: [],
      loading: false,
      filter: '',
      columns: [
        {
          name: 'cardNo',
          required: true,
          label: '姓名',
          align: 'center',
          field: row => row.empName,
          format: val => `${val}`
        },
        { name: 'empGender', align: 'center', label: '性别', field: 'empGender' },
        { name: 'empBirthday', align: 'center', label: '出生日期', field: 'empBirthday' },
        { name: 'empApply', align: 'left', label: '求职意向', field: 'empApply' },
        { name: 'empEdu', align: 'left', label: '教育经历', field: 'empEdu' },
        { name: 'empTel', align: 'left', label: '联系电话', field: 'empTel' }
      ],
      data: [],

      json_fields: {
        '姓名': 'empName',
        '性别': 'empGender',
        '生日': 'phone.mobile',
        '身份证号': {
          field: 'cardNo',
          callback: (value) => {
            return `'  ${value}`
          }
        },
        '求职意向': 'empApply',
        '联系电话': 'empTel',
        '邮箱': 'empEmail',
        '教育经历': 'empEdu',
        '工作经历': 'empInter'
      },
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ],

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
      }
    }
  },
  watch: {
  },
  computed: {
    eduEmpty () {
      if (this.EmployeeInfo.resumeEducation && this.EmployeeInfo.resumeEducation.length !== 0) {
        if (this.EmployeeInfo.resumeEducation[0].beginDate && this.EmployeeInfo.resumeEducation[0].beginDate.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    internshipEmpty () {
      if (this.EmployeeInfo.resumeInternship && this.EmployeeInfo.resumeInternship.length !== 0) {
        if (this.EmployeeInfo.resumeInternship[0].beginDate && this.EmployeeInfo.resumeInternship[0].beginDate.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    qualificationEmpty () {
      if (this.EmployeeInfo.resumeQualification && this.EmployeeInfo.resumeQualification.length !== 0) {
        if (this.EmployeeInfo.resumeQualification[0].getDate && this.EmployeeInfo.resumeQualification[0].getDate.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    familyEmpty () {
      if (this.EmployeeInfo.resumeFamily && this.EmployeeInfo.resumeFamily.length !== 0) {
        if (this.EmployeeInfo.resumeFamily[0].name && this.EmployeeInfo.resumeFamily[0].name.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    rewardEmpty () {
      if (this.EmployeeInfo.resumeReward && this.EmployeeInfo.resumeReward.length !== 0) {
        if (this.EmployeeInfo.resumeReward[0].rewardDate && this.EmployeeInfo.resumeReward[0].rewardDate.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    projectEmpty () {
      if (this.EmployeeInfo.resumeProject && this.EmployeeInfo.resumeProject.length !== 0) {
        if (this.EmployeeInfo.resumeProject[0].projectName && this.EmployeeInfo.resumeProject[0].projectName.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    schoolActivitiesEmpty () {
      if (this.EmployeeInfo.resumeSchoolActivities && this.EmployeeInfo.resumeSchoolActivities.length !== 0) {
        if (this.EmployeeInfo.resumeSchoolActivities[0].beginDate && this.EmployeeInfo.resumeSchoolActivities[0].beginDate.length !== 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    cerTypeName () {
      let cerTypeName = []
      cerType.forEach(v => { cerTypeName.push(v.label) })
      return cerTypeName
    },
    SpecialTypeName () {
      let SpecialTypeName = []
      SpecialType.forEach(v => { SpecialTypeName.push(v.label) })
      return SpecialTypeName
    }
  },
  filters: {
    whetherFilter (value) {
      if (value) {
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
    // emulate fetching data from server
    removeRow () {
      this.loading = true
      if (this.selected && this.selected.length !== 0) {
        for (let i = this.data.length - 1; i >= 0; i--) {
          if (this.data[i].cardNo === this.selected[0].cardNo) {
            // this.data.splice(i, 1)
            this.data = [...this.data.slice(0, i), ...this.data.slice(i + 1)]
          }
        }
      }
      this.loading = false
    },
    iconMethod (value) {
      return 'img:statics/icons/' + value + '.ico'
    },
    queryResumeList () {
      let formData = new FormData()
      if (this.ResName) {
        formData.append('ResName', '(' + this.ResName.trim().replace(/\s+|&nbsp;/ig, '|') + ')')
      }
      if (this.ResCertificate) {
        formData.append('ResCertificate', JSON.stringify(this.ResCertificate).replace(/","/g, '|').replace('["', '(').replace('"]', ')'))
      }
      if (this.ResGender) {
        formData.append('ResGender', JSON.stringify(this.ResGender).replace(/","/g, '|').replace('["', '(').replace('"]', ')'))
      }
      if (this.ResBirthday) {
        formData.append('ResBirthday', this.ResBirthday.trim())
      }
      if (this.ResPolity) {
        formData.append('ResPolity', JSON.stringify(this.ResPolity).replace(/","/g, '|').replace('["', '(').replace('"]', ')'))
      }
      if (this.ResCollege) {
        formData.append('ResCollege', '(' + this.ResCollege.trim().replace(/\s+|&nbsp;/ig, '|') + ')')
      }
      if (this.ResSpecialty) {
        formData.append('ResSpecialty', '(' + this.ResSpecialty.trim().replace(/\s+|&nbsp;/ig, '|') + ')')
      }
      if (this.ResSpecial) {
        formData.append('ResSpecial', JSON.stringify(this.ResSpecial).replace(/","/g, '|').replace('["', '(').replace('"]', ')'))
      }
      formData.append('ResDay', this.ResDay)
      this.filter = ''
      getResumeList(formData)
        .then(res => {
          if (res.data.code === 200) {
            this.data = res.data.data
          } else if (res.data.code === 500) {
            notAllow()
          }
          return res
        })
        .catch((err) => {
          return err
        })
    },
    queryDetail () {
      if (this.selected && this.selected.length !== 0) {
        getResumeByNo(this.selected[0].cardNo)
          .then(res => {
            this.viewDetail = true
            this.EmployeeInfo = res.data.data
            return res
          })
          .catch((err) => {
            return err
          })
      }
    },
    downloadResume () {
      window.open('https://imc.bii.com.cn/rect/download/attachment/' + this.selected[0].cardNo)
    }
  }
}
</script>

<style lang="stylus" >
  .my-sticky-column-table
    width 100%
    max-width 1500px
    thead tr:first-child th:first-child
      background-color #fff
      opacity 1
    td:first-child
      background-color #fff

    thead tr:first-child  th:first-child td:first-child
      position sticky
      left 0
      z-index 1
</style>
