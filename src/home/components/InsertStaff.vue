<template>
  <div class="component insert-staff">
    <h3>Available Staff</h3>
    <div class="staff-container">
      <div v-for="staff in allStaff">
        {{ staff.id }}: {{ staff.projects.map(pr => pr.name).join(' - ') }}
      </div>
    </div>
    <h3>Insert Staff</h3>
    <form action="" @submit.prevent="InsertStaff">
      <label for="staff-id">Staff ID</label>
      <input @keyup="EnableSubmition" id="staff-id" type="text" v-model="staff.id">
      <label for="name"> Name:</label>
      <input id="name" type="text" v-model="staff.name">
      <br>
      <label for="projectss"> Projects:</label>
      <div id="projectss">
        <template v-for="project in projects">
          <label :for="project.name"> {{ project.name }} </label>
          <input :id="project.name" :value="project.name" type="checkbox" v-model="selectedProjects">
        </template>
      </div>
      <div class="submit-button" disabled id="submit-btn" type="submit">
        <p>Insert/Update</p>
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
    EnableSubmition: function () {
      document.getElementById('submit-btn').disabled = false
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
/*====== Search Button  =====*/
.submit-button {
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
.submit-button p {
  z-index: 2;
}
.submit-button:hover {
  transform: scale(0.97)
}

.submit-button::before {
  position: absolute;
  height: 200%;
  width: 200%;
  background: rgba(87, 45, 20, 0.685);
  content: '';
  transform: translate(100%,-100%);
  transition: all 0.4s ease-out;
  border-radius: 100%;
}
.submit-button:hover::before {
  transform: translate(0);
}
</style>
