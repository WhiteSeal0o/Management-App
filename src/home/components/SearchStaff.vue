<template>
  <div class="component search-staff">
    <label for="staffId">Staff Id: </label>
    <select id="staffId" v-model="selectedId">
      <option value="all">All</option>
      <option v-for="staff in allStaff" :value="staff.id">{{ staff.id }}</option>
    </select>
    <label for="sDate">Start Date: </label>
    <input type="date" id="sDate" :max="today" v-model="startDate" />
    <label for="eDate">End Date:</label>
    <input type="date" id="eDate" :max="today" v-model="endDate" />
    <div class="search-btn" @click="searchStaff" > 
      <p>Search</p>
    </div>

    <br>
    <div v-show="clicked == true" id="resultAll">
      <div class="staff-area" v-for="form in dailyForms">
        <div class="date-block"><h3>Date: {{ getDateFormat(form.date) }}</h3></div>
        <div class="staff-block" v-for="dStaff in form.dailyStaff" v-if="dStaff.staff.id == selectedId || selectedId == 'all'">
          <h4 class="staff-name">{{ dStaff.staff.name }}:</h4>
          <div v-for="pr in dStaff.projects">
            <p>{{pr.project.name}}: {{pr.spentTime}}</p>
          </div>
          <p class="idle"> Idle: {{dStaff.idle}}</p>
          <p class="absent"> Absent: {{dStaff.absent}}</p>
        </div>
      </div>

      <div class="idle-summary">
        <h2 class="summary-title" v-show="dailyForms.length>0">Summary of idle time: </h2>
        <h2> {{ notFoundMsg }} </h2>
        <div class="staff-name" v-show="getIdleTime(staff.id)>0 && (staff.id==selectedId || selectedId=='all')" style="font-weight: bold" v-for="staff in allStaff">
          {{ staff.name }}: {{ getIdleTime(staff.id) }}%
        </div>
      </div>
    </div>

    <div v-show="selectedId != 'all'" id="result">

    </div>
  </div>
</template>

<script>
import Moment from 'moment'
export default {
  props: ['projects','allStaff'],
  data () {
    return {
      clicked: false,
      selectedId: 'all',
      startDate: Moment().format('YYYY-MM-DD'),
      endDate: Moment().format('YYYY-MM-DD'),
      today: Moment().format('YYYY-MM-DD'),
      dailyForms: [],
      notFoundMsg: ''
    }
  },
  methods: {
    searchStaff: function () {
      var thisVue = this

      thisVue.clicked = true

      console.log(this.selectedId)

      thisVue.$http.get(`/api/forms?startDate=${thisVue.startDate}&endDate=${thisVue.endDate}`).then( res => {
        thisVue.dailyForms = res.data
      }).then( () => {
        if (thisVue.dailyForms.length == 0) {
          thisVue.notFoundMsg = 'No result found!'
        } else {
          thisVue.notFoundMsg = ''
        }
      })

      console.log(this.selectedId)
    },
    getDateFormat: function (date) {
      return Moment(date).format('DD-MM-YYYY')
    },
    getIdleTime: function (staffId) {
      var thisVue = this

      var sumIdle = 0, sumAbsent = 0, workingDays = 0
      thisVue.dailyForms.forEach(dForm => {
        var currentStaff = dForm.dailyStaff.filter( dStaff => dStaff.staff.id == staffId)[0]
        if (currentStaff == null) {
          return
        }
        workingDays ++
        sumIdle += parseInt(currentStaff.idle)
        sumAbsent += parseInt(currentStaff.absent)
      });
    
      if (workingDays == 0) return 0
      var idleTime = sumIdle/(8*workingDays - sumAbsent)*100
      return Math.round(idleTime * 100) / 100
    }
  }
}
</script>

<style scoped>
.idle {
  color: rgb(197, 53, 53);
  color: rgba(87, 45, 20, 0);
}
.absent {
  color: rgb(115, 134, 118)
}
.staff-area {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.date-block {
  flex-basis: 100%
}
.staff-block {
  color: #C19E5C;
  font-style: italic;
  background: rgba(87, 45, 20, 0.836);
  flex-basis: auto;
  margin: 2%;
  padding: 3%;
  transition: all 0.3s ease-out;
}
.staff-block:hover {
  transform: scale(1.07);
  transform: translateY(-4%);
  box-shadow: 1px 12px 9px rgba(87, 45, 20, 0.685);
}

.staff-name {
  font-family: "Playfair Display", sans-serif;
}
.staff-block .staff-name {
  font-style: normal;
  color: rgb(204, 184, 159);
}

.idle-summary .staff-name {
  font-size: 20px;
  margin: 1%;
}
.idle-summary .summary-title {
  font-size: 70px;
  font-family: 'Indie Flower', sans-serif;
}

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
</style>
