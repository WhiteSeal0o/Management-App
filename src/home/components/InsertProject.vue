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
      <label for="isLyzon">This Is Lyzon Project</label>
      <br>

      <button @click="InsertProject" disabled id="submit-btn" type="submit">Insert</button>
      <button @click="DeleteProject" disabled id="delete-btn" type="submit">Delete</button>
    </form>
    <h4>{{ message }}</h4>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: ['projects'],
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

</style>
