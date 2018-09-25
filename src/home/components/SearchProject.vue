<template>
  <div class="component search-project">
    <label for="date">Date: </label>
    <input type="date" id="date" :max="today" v-model="searchDate" />
    <div class="search-btn" @click="searchProjects" > 
      <p> Search </p> 
    </div>
    <h2>{{ notFoundMsg }}</h2>
    <div class="projects-container">
      <div class="project-block" v-for="project in allProjectsOfDay">
        <h3>{{ project.name }}</h3>
        <p v-for="dstaff in project.availableStaff"> {{ dstaff.staff.name }} ({{ dstaff.staff.id }}): {{ dstaff.idle/8*100 }}% idle </p>
        <p v-show="project.availableStaff.length==0">No staff available</p>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
export default {
  props: ['projects','allStaff'],
  methods: {
    searchProjects: function () {
      var thisVue = this

      thisVue.$http.get(`/api/forms?startDate=${thisVue.searchDate}`).then( res => {
        var dailyForm = res.data
        console.log(dailyForm)
        if (!dailyForm) {
          thisVue.notFoundMsg = 'No result found!'
          thisVue.allProjectsOfDay = []
        } else {
          thisVue.notFoundMsg = ''
          thisVue.allProjectsOfDay = thisVue.projects.map(project => {
            return {
              name: project.name,
              availableStaff: dailyForm.dailyStaff.filter( dstaff => {
                return (dstaff.idle > 0 && dstaff.staff.projects.map( pr => pr.name).includes(project.name))
              })
            }
          })
        }
        
        thisVue.$emit('search-forms')
      })
    }
  },
  data () {
    return {
      today: Moment().format('YYYY-MM-DD'),
      selectedStaff: {},
      selectedProjects: [],
      numberOfProject: 0,
      searchDate: Moment().format('YYYY-MM-DD'),
      allProjectsOfDay: [],
      notFoundMsg: '',
      dailyForm: {
          date: '',
          dailyStaff: {
              staff: {
                  id: '',
                  name: '',
                  projects: []
              },
              projects: [{
                  project: {
                      name: '',
                      isLyzon: false
                  },
                  spentTime: 0
              }],
              idle: 0,
              absent: 0
          },
      }
    }
  }
}
</script>

<style scoped>
/*====== Search Button  =====*/
.search-btn {
  font-family: 'Indie Flower', sans-serif;
  font-size: 17px;
  background: rgba(87, 45, 20, 0.685);
  color: rgb(204, 184, 159);
  height: 6vh;
  width: 7vw;
  position: relative;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 1px 10px 7px rgba(87, 45, 20, 0.438);
  overflow: hidden;
  will-change: transform;
  transition: all 0.3s ease-out;
}
.search-btn p {
  z-index: 2;
}
.search-btn:hover {
  transform: scale(0.97)
}

.search-btn::before {
  position: absolute;
  height: 200%;
  width: 200%;
  background: rgba(87, 45, 20, 0.685);
  content: '';
  transform: translate(100%,-100%);
  transition: all 0.4s ease-out;
  border-radius: 100%;
}
.search-btn:hover::before {
  transform: translate(0);
}

/*====== Projects  =====*/
.projects-container {
  position: relative;
  display: flex;
  flex-flow: row wrap;
  margin: 5%;
  /* padding-left: 20%; */
  justify-content: flex-start;
  align-items: stretch;
  /* align-content: space-between; */
}

.project-block {
  flex-basis:10%;
  margin: 4%;
  padding: 3%;
  background: rgba(87, 45, 20, 0.836);
  color: #C19E5C;
  text-align: left;
  font-family: 'Courier New', Courier, monospace
}
.project-block h3 {
  text-align: center;
  margin-bottom: 30%;
}
</style>
