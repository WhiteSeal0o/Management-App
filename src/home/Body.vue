<template>
  <div>
    <p class="message"> {{ message }} </p>
    <div class="switch-btn-container"><div class="switch-btn" :key="req.id" v-for="req in requests" @click="SetComponent(req)">{{req.des}}</div></div>
    <keep-alive>
      <component :is="currentComponent" @insert-staff="updateStaff" @delete-project="updateProjects" @insert-project="updateProjects" :allStaff="allStaff" :projects="projects"></component>
    </keep-alive>
  </div>
</template>

<script>
import SearchProject from './components/SearchProject'
import SearchStaff from './components/SearchStaff'
import InsertStaff from './components/InsertStaff'
import InsertProject from './components/InsertProject'
import InsertDailyForm from './components/InsertDailyForm'

export default {
  mounted: function () {
    var thisVue = this
    thisVue.$http.get('/api/projects').then(res => {
      thisVue.projects = res.data
    })
    thisVue.$http.get('/api/staff').then(res => {
      thisVue.allStaff = res.data
    })
  },
  components: {
    'search-project': SearchProject,
    'search-staff': SearchStaff,
    'insert-staff': InsertStaff,
    'insert-project': InsertProject,
    'insert-daily-form': InsertDailyForm
  },
  data () {
    return {
      message: 'What you wanna do?',
      projects: [],
      allStaff: [],
      currentComponent: '',
      requests: [
        {
          id: 1,
          comp: 'search-project',
          des: 'Search idle time via project'
        },
        {
          id: 2,
          comp: 'search-staff',
          des: 'Search forms via staff'
        },
        {
          id: 3,
          comp: 'insert-staff',
          des: 'Insert or update a staff'
        },
        {
          id: 4,
          comp: 'insert-project',
          des: 'Insert or update a project'
        },
        {
          id: 5,
          comp: 'insert-daily-form',
          des: 'Insert or update a daily form'
        }
      ]
    }
  },
  methods: {
    SetComponent: function (req) {
      this.currentComponent = req.comp
    },
    updateProjects: function() {
      var thisVue = this
      thisVue.$http.get('/api/projects').then(res => {
          thisVue.projects = res.data
        })
    },
    updateStaff: function () {
      var thisVue = this
      thisVue.$http.get('/api/staff').then(res => {
          thisVue.allStaff = res.data
        })
    }
  }
}
</script>

<style scoped>
.message {
  color: #7C3314;
  font-size: 3em;
  font-family: 'Indie Flower', cursive;
}
</style>
