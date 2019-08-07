import Vue from 'vue'
export const modifyEmployeeInfo = (value) => {
  Vue.delete(value, 'id')
  Vue.delete(value, 'createdTime')
  Vue.delete(value, 'modifiedTime')
  Vue.delete(value.resumeNatural, 'id')
  Vue.delete(value.resumeNatural, 'createdTime')
  Vue.delete(value.resumeNatural, 'modifiedTime')
  Vue.delete(value.resumeOtherInfo, 'id')
  Vue.delete(value.resumeOtherInfo, 'createdTime')
  Vue.delete(value.resumeOtherInfo, 'modifiedTime')
  Vue.delete(value.resumeCommunication, 'id')
  Vue.delete(value.resumeCommunication, 'createdTime')
  Vue.delete(value.resumeCommunication, 'modifiedTime')
  value.resumeEducation.forEach(v => {
    Vue.delete(v, 'id')
    Vue.delete(v, 'createdTime')
    Vue.delete(v, 'modifiedTime')
  })
  value.resumeFamily.forEach(v => {
    Vue.delete(v, 'id')
    Vue.delete(v, 'createdTime')
    Vue.delete(v, 'modifiedTime')
  })
  value.resumeInternship.forEach(v => {
    Vue.delete(v, 'id')
    Vue.delete(v, 'createdTime')
    Vue.delete(v, 'modifiedTime')
  })
  value.resumeLanguage.forEach(v => {
    Vue.delete(v, 'id')
    Vue.delete(v, 'createdTime')
    Vue.delete(v, 'modifiedTime')
  })
  value.resumeProject.forEach(v => {
    Vue.delete(v, 'id')
    Vue.delete(v, 'createdTime')
    Vue.delete(v, 'modifiedTime')
  })
  value.resumeQualification.forEach(v => {
    Vue.delete(v, 'id')
    Vue.delete(v, 'createdTime')
    Vue.delete(v, 'modifiedTime')
  })
  value.resumeReward.forEach(v => {
    Vue.delete(v, 'id')
    Vue.delete(v, 'createdTime')
    Vue.delete(v, 'modifiedTime')
  })
  value.resumeSchoolActivities.forEach(v => {
    Vue.delete(v, 'id')
    Vue.delete(v, 'createdTime')
    Vue.delete(v, 'modifiedTime')
  })
  return value
}
