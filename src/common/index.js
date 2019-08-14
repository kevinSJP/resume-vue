import Vue from 'vue'
import { Notify } from 'quasar'
import { axiosInstance } from '../boot/axios'

/* 提交前修改EmployeeInfo对象 */
export const modifyEmployeeInfo = (value) => {
  if (value) {
    Vue.delete(value, 'id')
    Vue.delete(value, 'createdTime')
    Vue.delete(value, 'modifiedTime')
    if (value.resumeNatural) {
      Vue.delete(value.resumeNatural, 'id')
      Vue.delete(value.resumeNatural, 'createdTime')
      Vue.delete(value.resumeNatural, 'modifiedTime')
    }
    if (value.resumeOtherInfo) {
      Vue.delete(value.resumeOtherInfo, 'id')
      Vue.delete(value.resumeOtherInfo, 'createdTime')
      Vue.delete(value.resumeOtherInfo, 'modifiedTime')
    }
    if (value.resumeCommunication) {
      Vue.delete(value.resumeCommunication, 'id')
      Vue.delete(value.resumeCommunication, 'createdTime')
      Vue.delete(value.resumeCommunication, 'modifiedTime')
    }
    if (!isEmptyObject(value.resumeEducation)) {
      value.resumeEducation.forEach(v => {
        Vue.delete(v, 'id')
        Vue.delete(v, 'createdTime')
        Vue.delete(v, 'modifiedTime')
      })
    }
    if (value.resumeFamily) {
      if (!isEmptyObject(value.resumeFamily)) {
        value.resumeFamily.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
      }
    }
    if (value.resumeInternship) {
      if (!isEmptyObject(value.resumeInternship)) {
        value.resumeInternship.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
      }
    }
    if (value.resumeLanguage) {
      if (!isEmptyObject(value.resumeLanguage)) {
        value.resumeLanguage.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
      }
    }
    if (value.resumeProject) {
      if (!isEmptyObject(value.resumeProject)) {
        value.resumeProject.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
      }
    }
    if (value.resumeQualification) {
      if (!isEmptyObject(value.resumeQualification)) {
        value.resumeQualification.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
      }
    }
    if (value.resumeReward) {
      if (!isEmptyObject(value.resumeReward)) {
        value.resumeReward.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
      }
    }
    if (value.resumeSchoolActivities) {
      if (!isEmptyObject(value.resumeSchoolActivities)) {
        value.resumeSchoolActivities.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
      }
    }
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

/* 提示成功 */
export const notiSuccess = () => {
  Notify.create({
    color: 'green-4',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-check-circle',
    message: '提交成功'
  })
}

/* 提示失败 */
export const notiFail = () => {
  Notify.create({
    color: 'red-5',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-exclamation-triangle',
    message: '提交失败'
  })
}

/* 发请求判断是否有简历 */
export const hasResume = () => {
  return axiosInstance.get('/hasResumeInfo', {})
}

/* 发请求获取简历信息 */
export const getResume = () => {
  return axiosInstance.get('/resumeInfo', {})
}

/* 获取当前用户 */
export const getUser = () => {
  return axiosInstance.post('/user/info', {})
}

/* 保存简历 */
export const putResume = (value) => {
  return axiosInstance.put('/resumeInfo', value)
}
