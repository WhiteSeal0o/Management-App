<template>
  <div class="body">
    <!-- <img src="./assets/logo.png"> -->
    <p class="title">{{ title }}</p>
    <home-body></home-body>
  </div>
</template>

<script>
import Body from './Body.vue'
export default {
  name: 'management-app',
  components: {
    'home-bodys': Body 
  },
  data () {
    return {
      title: "Welcome To Div 5 Management App"
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700i|Raleway|Indie+Flower');
.body {
  background: #C19E5C;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-align: center;
}

.component {
  color: #572D14;
}

.body .switch-btn {
  /* border: solid #4A564C 2px; */
  background: #4A564C;
  color: antiquewhite;
  font-family: 'Indie Flower', sans-serif;
  margin: 2%;
  height: 5em;
  width: 7vw;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
  padding-left: 2%;
  padding-right: 2%;
  border: solid 2px antiquewhite;
  border-radius: 50%;
  box-shadow: 0.5px 5px 7px rgba(74, 86, 76, 0.603);
  transition: all 0.2s ease-out;
}
.body .switch-btn:hover {
  box-shadow: 1px 12px 9px rgba(74, 86, 76, 0.603);
  transform: scale(1.1)
}

.body .switch-btn-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>

<style scoped>
.title {
  font-family: "Playfair Display", sans-serif;
  font-size: 90px;
  text-shadow: 1px 12px 9px rgba(74, 86, 76, 0.603);
  font-style: italic;
  font-weight: bold;
  color: #572D14;
  transition: all 0.2s ease-out;
}
.title:hover {
  transform: skew(8deg)
}
</style>