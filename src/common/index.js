import Vue from 'vue'
import { Notify } from 'quasar'
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
  if (!isEmptyObject(value.resumeEducation)) {
    value.resumeEducation.forEach(v => {
      Vue.delete(v, 'id')
      Vue.delete(v, 'createdTime')
      Vue.delete(v, 'modifiedTime')
    })
  }
  if (!isEmptyObject(value.resumeFamily)) {
    value.resumeFamily.forEach(v => {
      Vue.delete(v, 'id')
      Vue.delete(v, 'createdTime')
      Vue.delete(v, 'modifiedTime')
    })
  }
  if (!isEmptyObject(value.resumeInternship)) {
    value.resumeInternship.forEach(v => {
      Vue.delete(v, 'id')
      Vue.delete(v, 'createdTime')
      Vue.delete(v, 'modifiedTime')
    })
  }
  if (!isEmptyObject(value.resumeLanguage)) {
    value.resumeLanguage.forEach(v => {
      Vue.delete(v, 'id')
      Vue.delete(v, 'createdTime')
      Vue.delete(v, 'modifiedTime')
    })
  }
  if (!isEmptyObject(value.resumeProject)) {
    value.resumeProject.forEach(v => {
      Vue.delete(v, 'id')
      Vue.delete(v, 'createdTime')
      Vue.delete(v, 'modifiedTime')
    })
  }
  if (!isEmptyObject(value.resumeQualification)) {
    value.resumeQualification.forEach(v => {
      Vue.delete(v, 'id')
      Vue.delete(v, 'createdTime')
      Vue.delete(v, 'modifiedTime')
    })
  }
  if (!isEmptyObject(value.resumeReward)) {
    value.resumeReward.forEach(v => {
      Vue.delete(v, 'id')
      Vue.delete(v, 'createdTime')
      Vue.delete(v, 'modifiedTime')
    })
  }
  if (!isEmptyObject(value.resumeSchoolActivities)) {
    value.resumeSchoolActivities.forEach(v => {
      Vue.delete(v, 'id')
      Vue.delete(v, 'createdTime')
      Vue.delete(v, 'modifiedTime')
    })
  }
  // if (!isEmptyObject(value.resumeAttachment)) {
  //   value.resumeAttachment.forEach(v => {
  //     Vue.delete(v, 'id')
  //     Vue.delete(v, 'createdTime')
  //     Vue.delete(v, 'modifiedTime')
  //   })
  // }
  return value
}

function isEmptyObject (obj) {
  var name
  for (name in obj) {
    return false
  }
  return true
}

export const notiSuccess = () => {
  Notify.create({
    color: 'green-4',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-check-circle',
    message: '提交成功'
  })
}

export const notiFail = () => {
  Notify.create({
    color: 'red-5',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-exclamation-triangle',
    message: '提交失败'
  })
}
