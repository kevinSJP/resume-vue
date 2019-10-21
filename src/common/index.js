import Vue from 'vue'
import { Notify } from 'quasar'
import { domainName, axiosInstance } from '../boot/axios'

/* 提交前修改EmployeeInfo对象 */
export const modifyEmployeeInfo = (value) => {
  if (value) {
    Vue.delete(value, 'id')
    Vue.delete(value, 'createdTime')
    Vue.delete(value, 'modifiedTime')
    value.editStatus = 'editStatus'
    value.applyStatus = 'applyStatus'
    value.employStatus = 'employStatus'
    value.integrity = 'integrity'
    value.name = value.resumeNatural.name
    if (value.resumeNatural) {
      Vue.delete(value.resumeNatural, 'id')
      Vue.delete(value.resumeNatural, 'createdTime')
      Vue.delete(value.resumeNatural, 'modifiedTime')
      value.resumeNatural.cardType = '1'
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
      if (!value.resumeEducation[0].beginDate) {
        Vue.delete(value.resumeEducation, 0)
      }
    }
    if (value.resumeFamily) {
      if (!isEmptyObject(value.resumeFamily)) {
        value.resumeFamily.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
        if (!value.resumeFamily[0].name) {
          Vue.delete(value.resumeFamily, 0)
        }
      }
    }
    if (value.resumeInternship) {
      if (!isEmptyObject(value.resumeInternship)) {
        value.resumeInternship.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
        if (!value.resumeInternship[0].beginDate) {
          Vue.delete(value.resumeInternship, 0)
        }
      }
    }
    if (value.resumeLanguage) {
      if (!isEmptyObject(value.resumeLanguage)) {
        value.resumeLanguage.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
        if (!value.resumeLanguage[0].name) {
          Vue.delete(value.resumeLanguage, 0)
        }
      }
    }
    if (value.resumeProject) {
      if (!isEmptyObject(value.resumeProject)) {
        value.resumeProject.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
        if (!value.resumeProject[0].beginDate) {
          Vue.delete(value.resumeProject, 0)
        }
      }
    }
    if (value.resumeQualification) {
      if (!isEmptyObject(value.resumeQualification)) {
        value.resumeQualification.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
        if (!value.resumeQualification[0].getDate) {
          Vue.delete(value.resumeQualification, 0)
        }
      }
    }
    if (value.resumeReward) {
      if (!isEmptyObject(value.resumeReward)) {
        value.resumeReward.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
        if (!value.resumeReward[0].rewardDate) {
          Vue.delete(value.resumeReward, 0)
        }
      }
    }
    if (value.resumeSchoolActivities) {
      if (!isEmptyObject(value.resumeSchoolActivities)) {
        value.resumeSchoolActivities.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
        if (!value.resumeSchoolActivities[0].beginDate) {
          Vue.delete(value.resumeSchoolActivities, 0)
        }
      }
    }
    if (value.resumeAttachment) {
      if (!isEmptyObject(value.resumeAttachment)) {
        value.resumeAttachment.forEach(v => {
          Vue.delete(v, 'id')
          Vue.delete(v, 'createdTime')
          Vue.delete(v, 'modifiedTime')
        })
        if (!value.resumeAttachment[0].type) {
          Vue.delete(value.resumeAttachment, 0)
        }
      }
    }
    if (value.resumeLanguage) {
      if (!isEmptyObject(value.resumeLanguage)) {
        value.resumeLanguage.forEach(v => {
          if (v.id) { Vue.delete(v, 'id') }
          if (v.createdTime) { Vue.delete(v, 'createdTime') }
          if (v.modifiedTime) { Vue.delete(v, 'modifiedTime') }
        })
        if (!value.resumeLanguage[0].languageType) {
          Vue.delete(value.resumeLanguage, 0)
        }
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

/* 保存成功 */
export const notiSuccess = () => {
  Notify.create({
    color: 'green-4',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-check-circle',
    message: '保存成功'
  })
}

/* 保存失败 */
export const notiFail = () => {
  Notify.create({
    color: 'red-5',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-exclamation-triangle',
    message: '保存失败'
  })
}

/* 无权限 */
export const notAllow = () => {
  Notify.create({
    color: 'red-5',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-exclamation-triangle',
    message: '您没有权限'
  })
}

/* 提交成功 */
export const subSuccess = () => {
  Notify.create({
    color: 'green-4',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-check-circle',
    message: '提交成功'
  })
}

/* 提交失败 */
export const subFail = () => {
  Notify.create({
    color: 'red-5',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-exclamation-triangle',
    message: '提交失败'
  })
}

/* 文件太大 */
export const overMax = () => {
  Notify.create({
    color: 'red-5',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-exclamation-triangle',
    message: '文件大于1M，请压缩后上传'
  })
}

/* 信息不完整 */
export const lackInfo = () => {
  Notify.create({
    color: 'red-5',
    textColor: 'white',
    position: 'top',
    icon: 'fas fa-exclamation-triangle',
    message: '填写了职位信息、基本信息、教育信息后才可提交申请'
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

/* 保存文件 */
export const postFile = (value) => {
  return axiosInstance.post('/file/upload', value)
}

/* 发请求获取简历列表信息 */
export const getResumeList = (value) => {
  return axiosInstance.post('/queryResumeList', value)
}

/* 发请求获取指定简历信息 */
export const getResumeByNo = (value) => {
  return axiosInstance.get(`/queryResumeInfo/${value}`)
}

/* 发请求获取指定简历信息 */
export const getResumeFile = domainName + `file/download/attachment/`
