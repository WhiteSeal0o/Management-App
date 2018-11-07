<template>
  <div class="component insert-staff">
    <h3>Available Staff</h3>
    <div class="staff-container">
      <div v-for="staff in allStaff">
        {{ staff.id }}: {{ staff.projects.map(pr => pr.name).join(' - ') }}
      </div>
    </div>
    <h3>Insert Staff</h3>
    <form action="" @submit.prevent>
      <label for="staff-id">Staff ID</label>
      <input @keyup="EnableSubmition" id="staff-id" type="text" v-model="staff.id">
      <label for="name"> Name:</label>
      <input id="name" type="text" v-model="staff.name">
      <br>
      <label for="projects"> Projects:</label>
      <div id="projects">
        <template v-for="project in projects">
          <label :for="project.name"> {{ project.name }} </label>
          <input :id="project.name" :value="project.name" type="checkbox" v-model="selectedProjects">
        </template>
      </div>
      <div class="submit-button" @click="InsertStaff" disabled id="submit-btn">
        <p>Insert/Update</p>
      </div>
      <div class="submit-button" @click="DeleteProject" disabled id="delete-btn">
        <p>Delete</p>
      </div>
    </form>
    <h4>{{ message }}</h4>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: ['projects','allStaff'],
  mounted: function () {
    var thisVue = this;

    thisVue.$nextTick(function () {
      thisVue.toggleProjectProcessing()
    })
  },
  methods: {
    InsertStaff: function () {
      var thisVue = this

      thisVue.staff.projects = this.projects.filter( pr => thisVue.selectedProjects.includes(pr.name))
      thisVue.$http.post('/api/staff',thisVue.staff)
      .then( res => {
        console.log(res)
        thisVue.$emit('insert-staff')
        document.getElementById('submit-btn').disabled = "disabled"
        thisVue.message = `Successfully insert (update) ${thisVue.staff.id}`
      })
    },
    DeleteProject: function () {
      var thisVue = this

      thisVue.$http.delete('api/staff',{body: thisVue.staff}).then( res => {
        this.message = `Deleted ${thisVue.staff.name} - ${thisVue.staff.id}`
        thisVue.$emit('delete-staff')
      })
    },
    EnableSubmition: function () {
      document.getElementById('submit-btn').disabled = false
    },
    toggleProjectProcessing: function () {
      document.querySelectorAll('#projects label').forEach(element => {
        console.log(document.getElementById('projects'));
        element.addEventListener('click', function () {
          this.classList.toggle("selected");
        })
      })
    }
  },
  data () {
    return {
      selectedProjects: [],
      message: '',
      currentId: '',
      staff: {
        id: 0,
        name: '',
        projects: []
      }
    }
  }
}
</script>

<style scoped>
#projects {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: stretch;
}
#projects input {
  display: none;
}
#projects label {
  padding: 1%;
  margin: 1%;
  background: rgba(53, 53, 53, 0.6);
  flex-basis: 4%;
  color: rgb(204, 184, 159);
  cursor: pointer;
  border: rgba(204, 184, 159, 0) solid 3px;
  transition: all 0.2s linear;
}
#projects label.selected,
#projects label:hover {
  border: rgba(204, 184, 159, 1) solid 3px;
}
#projects label.selected {
  color: aliceblue;
  background: rgba(53, 53, 53, 0.82);
}
</style>
