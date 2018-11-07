<template>
<div>
  <div>
    <p class="message">{{ authenticated?`Hi ${usr},`:`Hi vistor,` }} {{ message }} </p>
    <div class="switch-btn-container">
      <div class="switch-btn" :key="req.id" v-for="req in requests" @click="SetComponent(req)">{{req.des}}</div>
      <div class="switch-btn" v-if="authenticated" @click="Logout">Logout</div>
      <div class="switch-btn" v-else @click="ShowLoginPopup">Login</div>
    </div>
    <keep-alive>
      <component :is="currentComponent" @delete-staff="updateStaff" @insert-staff="updateStaff" @delete-project="updateProjects" @insert-project="updateProjects" :allStaff="allStaff" :projects="projects"></component>
    </keep-alive>
  </div>
  <div class="login-container" v-if="!authenticated" :class="loginDisplay">
    <div class="login-bg"></div>
    <form class="login-area" action="/login" method="post">
      <div>
        {{loginMessage}}
      </div>
      <div>
          <label>Username:</label>
          <input v-model="usr" type="text" name="username"/>
      </div>
      <div>
          <label>Password:</label>
          <input v-model="pass" type="password" name="password"/>
      </div>
      <div>
          <input @click="athenticate" type="button" value="Log In"/>
          <input @click="ClosePopup" type="button" value="Close"/>
      </div>
    </form>
  </div>
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

    thisVue.$http.get('/api/authenticate').then(res => {
      thisVue.authenticated = res.data.success
      thisVue.usr = res.data.userName
      console.log(res.data)
      thisVue.authorize()
    })
    thisVue.$http.get('/api/projects').then(res => {
      thisVue.projects = res.data
    })
    thisVue.$http.get('/api/staff').then(res => {
      thisVue.allStaff = res.data
    })

    thisVue.authorize()
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
      loginDisplay: {
        'hide': true
      },
      projects: [],
      allStaff: [],
      usr: '',
      pass: '',
      loginMessage: '',
      currentComponent: '',
      authenticated: false,
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
        }
      ]
    }
  },
  methods: {
    ClosePopup: function () {
      this.loginDisplay['hide'] = true
    },
    ShowLoginPopup: function () {
      this.loginDisplay['hide'] = false
    },
    Logout: function () {
      window.location.href = '/api/logout'
    },
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
    },
    athenticate: function () {
      var thisVue = this

      thisVue.$http.post('/api/login', {UserName: thisVue.usr, Password: thisVue.pass}).then( res => {
        if(res.data) {
          thisVue.authenticated = true
          thisVue.userName = thisVue.usr
          thisVue.authorize()
        } else {
          thisVue.loginMessage = 'Incorrect username or password!'
        }
      })
    },
    authorize: function () {
      var thisVue = this

      if (thisVue.authenticated) {
        thisVue.requests = thisVue.requests.concat([
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
        }])
      } 
    }
  }
}
</script>

<style scoped>
.message {
  color: rgb(124, 51, 20);
  font-size: 3em;
  font-family: 'Indie Flower', cursive;
}
.login-container {
  color: antiquewhite;
  position: relative;
  width: 50vw;
  height: 36vh;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  transition: transform 0.5s ease-out;
  transform: translateY(-100%) scale(1);
  box-shadow: 1px 21px 21px rgba(124, 51, 20, 0.637);
  border-radius: 100px;
}
.login-container.hide {
  transform: translateY(-100%) scale(0);
}
.login-bg {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 99;
  background: url('../assets/image.jpg');
  background: rgba(124, 51, 20, 1);
}
.login-area {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.login-area >* {
  flex-basis: 100%;
}
</style>
