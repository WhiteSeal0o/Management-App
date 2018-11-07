<template>
  <div class="component insert-project">
    <h3>Available Project</h3>
    <div>
      <li v-for="project in projects">
        {{ project.name }} {{ `${project.isLyzon?'(Lyzon project)':''}` }}
      </li>
    </div>
    <h3>Insert Project</h3>
    <form action="" @submit.prevent>
      <label for="name"> Name:</label>
      <input @keyup="EnableSubmition" id="name" type="text" v-model="project.name">
      <br>
      
      <input id="isLyzon" type="checkbox" v-model="project.isLyzon">
      <div class="label">Lyzon Project</div>
      <br>

      <div class="submit-button" @click="InsertProject" disabled id="submit-btn" type="submit"><p>Insert</p> </div>
      <div class="submit-button" @click="DeleteProject" disabled id="delete-btn" type="submit"><p>Delete</p></div>
    </form>
    <h4>{{ message }}</h4>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: ['projects'],
  mounted: function () {
    document.querySelector('input#isLyzon + .label').addEventListener('click', function () {
      this.classList.toggle('selected')
      document.querySelector('input#isLyzon').click()
    })
  },
  methods: {
    InsertProject: function () {
      var thisVue = this
      if ( thisVue.projects.map(pr => pr.name).includes(thisVue.project.name)) {
        alert('Existed Project')
        return
      }
      thisVue.$http.post('/api/projects',thisVue.project).then( res => {
        console.log(res.data)
        document.getElementById('submit-btn').disabled = "disabled"
        thisVue.$emit('insert-project')
      })
    },
    EnableSubmition: function () {
      document.getElementById('submit-btn').disabled = false
      document.getElementById('delete-btn').disabled = false
    },
    DeleteProject: function () {
      var thisVue = this

      thisVue.$http.delete('api/projects',{body: thisVue.project}).then( res => {
        this.message = `Deleted ${thisVue.project.name}`
        thisVue.$emit('delete-project')
      })
    }
  },
  data () {
    return {
      message: '',
      project: {
        name: '',
        isLyzon: false
      }
    }
  }
}
</script>

<style scoped>
input#isLyzon {
  /* display: none; */
  opacity: 0;
}
input#isLyzon + .label {
  padding: 0.5%;
  width: 5%;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
  background: rgba(53, 53, 53, 0.6);
  color: rgb(204, 184, 159);
  cursor: pointer;
  border: rgba(204, 184, 159, 0) solid 3px;
  transition: all 0.2s linear;
}
input#isLyzon + .label.selected,
input#isLyzon + .label:hover {
  border: rgba(204, 184, 159, 1) solid 3px;
}
input#isLyzon + .label.selected {
  color: aliceblue;
  background: rgba(53, 53, 53, 0.82);
}
.label label {
  cursor: pointer;
  z-index: -1;
}
</style>
