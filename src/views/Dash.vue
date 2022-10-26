<template>
<div>
  <Header/>
   <div>

    <table class="container">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">nombre</th>
        <th scope="col">ingredientes</th>
        <th scope="col">calorias</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="hamburguesas in listahamburguesas" :key="hamburguesas.id"  v-on:click="editar(hamburguesas.id)">
        <th scope="row">{{hamburguesas.id}}</th>
        <td>{{hamburguesas.nombre}}</td>
        <label v-for="ingredientes in hamburguesas.ingredientes">{{ingredientes}}</label>
        <td>{{hamburguesas.calorias}}</td>
      </tr>
    </tbody>
  </table>

   </div>
  <Footer/>
</div>
</template>


<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
export default {
  name: 'Dash',
  data(){
    return{
      listahamburguesas: null,
      ingredientes: null
    }
  },
  components: {
    Header,
    Footer
  },
  methods: {
    editar(id){
      console.log(id)
    }
  },
  mounted: 
  
  async function (){
  let direccion = "https://prueba-hamburguesas.herokuapp.com/burger/";
  axios.get(direccion).then(data =>{
    this.listahamburguesas = data.data;
    this.ingredientes
  })


    const data = await axios.get(direccion)
    const mishamburguesas = data.data

    const ingre = mishamburguesas.ingredientes
      console.log(ingre)
      console.log(mishamburguesas)
  }





}
</script>