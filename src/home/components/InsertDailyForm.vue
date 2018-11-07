<template>
  <div class="component insert-daily-form">
    <h3>Insert Daily Form</h3>
    <form action="">
        <div>
            <label for="date">Date: </label>
            <input @change="EnableSubmition" type="date" id="date" :max="today" v-model="dailyForm.date" />
        </div>
        <br>
        <div>
            <label for="staff">Staff: </label>
            <select @change="EnableSubmition" id="staff" v-model="selectedId">
                <option disabled value="">Please select staff</option>
                <option v-for="staff in allStaff">{{ staff.id }}</option>
            </select>
        </div>

        <br>
        <label>Projects: </label>
        <div v-for="i in range(numberOfProject)" :id="getId(i)">
            <select v-model="selectedProjects[i].name">
                <option v-for="project in projects"> {{ project.name }} </option>
            </select>
            <label for="sptime"> Spent Time(h): </label>
            <input id="sptime" type="text" v-model="selectedProjects[i].spentTime">
        </div>
        <button @click.prevent="AddProject()">+</button>
        <button @click.prevent="PopProject">-</button>

        <br><br>
        <label for="idle">Idle(h): </label>
        <input id="idle" type="text" v-model="dailyForm.dailyStaff.idle">

        <br><br>
        <label for="absent">Absent(h): </label>
        <input id="absent" type="text" v-model="dailyForm.dailyStaff.absent">

        <br><br>
        <div class="submit-button" disabled @click.prevent="InsertDailyForm" id="submit-btn"><p>Insert / Update</p></div>
    </form>
    <h4>{{ message }}</h4>
  </div>
</template>

<script>
import Moment from 'moment'
export default {
  components: {
  },
  mounted: function () {
  },
  updated: function () {
    // this.EnableSubmition()
    console.log(this.dailyForm.dailyStaff.staff.id)
  },
  props: ['projects','allStaff'],
  methods: {
    InsertDailyForm: function () {
        var thisVue = this

        if (!thisVue.ValidateSpentTime()) {
            thisVue.message = 'Please enter time again! Make sure sum of all spent time equal to 8h'
            return
        }
        thisVue.ProcessData()
        //console.log(thisVue.dailyForm)
        thisVue.$http.post('/api/forms',thisVue.dailyForm).then( res => {
            console.log(res.data)
            document.getElementById('submit-btn').disabled = true
            thisVue.$emit('insert-form')
            thisVue.message = 'Successfully insert (update) daily form!'
        })
    },
    ValidateSpentTime: function () {
        var thisVue = this

        var sumOfSpentTime = 0
        thisVue.selectedProjects.forEach(project => {
            sumOfSpentTime += parseInt(project.spentTime)
        });
        console.log(sumOfSpentTime)

        sumOfSpentTime += parseInt(thisVue.dailyForm.dailyStaff.idle) + parseInt(thisVue.dailyForm.dailyStaff.absent)
        console.log(sumOfSpentTime)
        if(sumOfSpentTime != 8) {
            return false
        }
        return true
    },
    ProcessData: function () {
        var thisVue = this
        var allProjectNames = thisVue.selectedProjects.map(pr=>pr.name)

        thisVue.dailyForm.dailyStaff.projects = thisVue.projects
        //select projects from database that included in selected projects
        .filter (pr => 
            allProjectNames.includes(pr.name)
        )
        //convert to DailyProjectSchema
        .map(pr => {
                return {
                    project: pr,
                    spentTime: thisVue.selectedProjects
                                .filter(spr=>spr.name==pr.name)
                                .map(spr=>spr.spentTime)[0]
                }
            }
        ).filter (pr => 
            pr.spentTime > 0
        )

        thisVue.dailyForm.dailyStaff.staff = thisVue.allStaff
                                        .filter( st => st.id == thisVue.selectedId)[0]

        console.log(thisVue.allStaff)
        // thisVue.dailyForm.date = Moment(thisVue.dailyForm.date, 'YYYY-MM-DD').toDate()
    },
    EnableSubmition: function () {
        document.getElementById('submit-btn').disabled = false
        this.message = ''
    },
    AddProject: function () {
        this.selectedProjects[this.numberOfProject] = {}
        this.numberOfProject ++
        // var currentProjects = this.dailyForm.dailyStaff.projects
        
    },
    PopProject: function () {
        if (this.numberOfProject == 0) return
        this.selectedProjects.length --
        this.numberOfProject --
    },
    range: function(start, end, step) {
        var _end = end || start;
        var _start = end ? start : 0;
        var _step = step || 1;
        return Array((_end - _start) / _step).fill(0).map((v, i) => _start + (i * _step));
    },
    getId: function (i) {
        return `pr${i}`
    }
  },
  data () {
    return {
        today: Moment().format('YYYY-MM-DD'),
        selectedProjects: [],
        selectedId: '',
        numberOfProject: 0,
        message: '',
        dailyForm: {
            date: Moment().format('YYYY-MM-DD'),
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

</style>
