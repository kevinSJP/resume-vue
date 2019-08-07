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
      <div v-for="(item, index) in EmployeeInfo.resumeReward" :key="index">
        <span class="text-h6">奖惩信息 {{ (index+1) | noFilter }}</span>
        <q-separator blue/>
        <q-input  v-model="item.rewardName" label="名称" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-select v-model="item.rewardLevel" :options="awardType" emit-value map-options label="奖惩级别" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input clearable v-model="item.rewardDate" label="奖励日期(年-月-日)*" mask="####-##-##"
                 lazy-rules :rules="[val => !!val || '必填']" />
        <q-input  v-model="item.rewardORG" label="奖励单位" lazy-rules :rules="[val => !!val || '必填']"/>
        <q-input  v-model="item.remark" label="说明" lazy-rules :rules="[val => !!val || '必填']"/>
      </div>
      <div>
        <q-btn-group push>
          <q-btn push label="增" icon="+" @click="increase"/>
          <q-btn push label="减" icon="-" @click="decrease"/>
        </q-btn-group>
      </div>
      <div>
        <q-btn label="保存" type="submit"  color="primary"/>
        <q-btn label="返回" @click="onBack" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</div>

</template>

<script>
import { awardType, NoType } from '../constant/index'
import { axiosInstance } from '../boot/axios'
import { modifyEmployeeInfo } from '../common/index'

export default {
  name: 'reward',
  mounted () {
    if (this.$route.params.EmployeeInfo) {
      this.EmployeeInfo = this.$route.params.EmployeeInfo
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
        resumeReward: [{ cardNo: '411102199009160075',
          createdTime: '2019-06-05',
          id: 55456,
          modifiedTime: '2019-06-05',
          remark: '1',
          rewardDate: '2015-01-01',
          rewardLevel: '1',
          rewardName: '1',
          rewardORG: '1' }]
      },
      query: { cardNo: '411102199009160075',
        createdTime: '2019-06-05',
        id: 55456,
        modifiedTime: '2019-06-05',
        remark: '1',
        rewardDate: '2015-01-01',
        rewardLevel: '1',
        rewardName: '1',
        rewardORG: '1' },
      awardType
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
      axiosInstance.put('/resumeInfo', modifyEmployeeInfo(this.EmployeeInfo))
        .then(res => { return res })
        .catch((err) => { return err })
    },
    getWebData () {
      axiosInstance.get('/resumeInfo', {
      }).then(res => {
        this.EmployeeInfo = res.data.data
      }).catch((err) => { return err })
    },
    onBack () {
      console.log('back')
      this.$router.push({
        path: '/'
      })
    },
    increase () {
      this.EmployeeInfo.resumeReward = this.EmployeeInfo.resumeReward.concat(this.query)
    },
    decrease () {
      if (this.EmployeeInfo.resumeReward.length > 1) {
        this.EmployeeInfo.resumeReward = this.EmployeeInfo.resumeReward.slice(0, -1)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
