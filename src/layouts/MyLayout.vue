<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          个人简历
        </q-toolbar-title>

        <q-btn round>
          <q-avatar size="42px">
            <img src="https://imc.bii.com.cn/rect/file/download/avatar" :onerror="defaultImg">
          </q-avatar>
        </q-btn>
        <!--<div>v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>简历项目</q-item-label>
        <q-item clickable tag="a" target="_blank" @click="goApply" >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>申请职位</q-item-label>
            <q-item-label caption>填写您要申请的职位</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click="goNatural">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>基本信息</q-item-label>
            <q-item-label caption>个人基本信息</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click="goEducation">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>教育信息</q-item-label>
            <q-item-label caption>填写从高中开始的所有教育经历</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click="goInternship">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>工作/实习经历</q-item-label>
            <q-item-label caption>填写全部的工作、实习经历</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click="goQualification">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>资格证书</q-item-label>
            <q-item-label caption>填写通过各类考试获得的证书</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click="goFamily">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>家庭信息</q-item-label>
            <q-item-label caption>填写父母配偶的信息</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click="goReward">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>奖励信息</q-item-label>
            <q-item-label caption>获得的各类奖项</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click="goProject">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>项目经验</q-item-label>
            <q-item-label caption>参加过的项目经历</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click="goSchoolActivities">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>社会活动</q-item-label>
            <q-item-label caption>参加过的社工活动经历</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" @click="goOtherInfo">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>其他信息</q-item-label>
            <q-item-label caption>个人简评及推荐人</q-item-label>
          </q-item-section>
        </q-item>
        <!--<q-item clickable tag="a" target="_blank" href="https://facebook.quasar.dev">-->
          <!--<q-item-section avatar>-->
            <!--<q-icon name="public" />-->
          <!--</q-item-section>-->
          <!--<q-item-section>-->
            <!--<q-item-label>简历附件</q-item-label>-->
            <!--<q-item-label caption>上传简历</q-item-label>-->
          <!--</q-item-section>-->
        <!--</q-item>-->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    defaultImg () {
      return 'this.src="' + require('../assets/default_avatar.jpeg') + '"'
    }
  },
  methods: {
    openURL,
    goApply () {
      this.$router.push({
        path: '/apply',
        name: 'apply'
      })
    },
    goNatural () {
      this.$router.push({
        path: '/natural',
        name: 'natural'
      })
    },
    goEducation () {
      this.$router.push({
        path: '/education',
        name: 'education'
      })
    },
    goInternship () {
      this.$router.push({
        path: '/internship',
        name: 'internship'
      })
    },
    goQualification () {
      this.$router.push({
        path: '/qualification',
        name: 'qualification'
      })
    },
    goFamily () {
      this.$router.push({
        path: '/family',
        name: 'family'
      })
    },
    goReward () {
      this.$router.push({
        path: '/reward',
        name: 'reward'
      })
    },
    goProject () {
      this.$router.push({
        path: '/project',
        name: 'project'
      })
    },
    goSchoolActivities () {
      this.$router.push({
        path: '/schoolActivities',
        name: 'schoolActivities'
      })
    },
    goOtherInfo () {
      this.$router.push({
        path: '/otherInfo',
        name: 'otherInfo'
      })
    }
  }
}
</script>

<style>
</style>
