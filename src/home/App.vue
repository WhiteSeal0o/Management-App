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
body {
  margin: 0;
  overflow: visible;
}

.body::-webkit-scrollbar {
  display: none;
}
.body {
  position: absolute;
  overflow-x: hidden;
  overflow-y: visible;
  height: 100%;
  width: 100%;
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

/*=================== SUBMIT BUTTON =======================*/
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

/*=================== Date time area =======================*/
input[type=date] {
  height: 35px;
  margin: 0 auto;
  /* width: 100%; */
  font-family: arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: rgba(87, 45, 20, 0.685);
  margin-left: 1%;
  outline: none;
  border: 0;
  border-radius: 3px;
  padding: 0 3px;
  color: antiquewhite;
}
input[type=date]::-webkit-inner-spin-button {
  display: none;
  height: 30px;
}
input[type=date]::-webkit-calendar-picker-indicator {
  background-color: transparent;
  font-size: 18px;
}
input[type=date]::-webkit-clear-button {
  display: none;
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