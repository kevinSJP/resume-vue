
const routes = [
  {
    path: '/',
    // name: 'home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'apply', name: 'apply', component: () => import('pages/ResumeApply.vue') },
      { path: 'natural', name: 'natural', component: () => import('pages/ResumeNatural.vue') },
      { path: 'education', name: 'education', component: () => import('pages/ResumeEducation.vue') },
      { path: 'internship', name: 'internship', component: () => import('pages/ResumeInternship.vue') },
      { path: 'qualification', name: 'qualification', component: () => import('pages/ResumeQualification.vue') },
      { path: 'family', name: 'family', component: () => import('pages/ResumeFamily.vue') },
      { path: 'reward', name: 'reward', component: () => import('pages/ResumeReward.vue') },
      { path: 'project', name: 'project', component: () => import('pages/ResumeProject.vue') },
      { path: 'schoolActivities', name: 'schoolActivities', component: () => import('pages/ResumeSchoolActivities.vue') },
      { path: 'otherInfo', name: 'otherInfo', component: () => import('pages/ResumeOtherInfo.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
