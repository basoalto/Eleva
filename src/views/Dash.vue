<template>
<div>
  <Header/>
   <div>
    <table class="table table-hover">
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
        <label v-for="ingredientes in hamburguesas.ingredientes">{{ingredientes}}&nbsp;</label>
        <td>{{hamburguesas.calorias}} </td>
        <td><button class="btn btn-info btn-block">Editar</button></td>
        <td><button v-on:click="deletehamburguesas(hamburguesas.id, $event)" class="btn btn-danger btn-block">Eliminar</button></td>
      </tr>
    </tbody>
  </table>
  </br>
 </div>

  <div class="card card-body">
    <form ref="uFor" v-on:submit="process">
      <div class="form-group">
        <input type="text" ref="Name" v-model="hamburguesa.nombre" class="form-control" placeholder="Nombre" minlenght="10" maxlenght="50" required/>
      </div>
      <div class="form-group">
        <input type="text" v-model="hamburguesa.ingredientes" class="form-control" placeholder="Ingredientes" minlenght="10" maxlenght="50" required/>
      </div>
      <div class="form-group">
        <input type="text" v-model="hamburguesa.calorias" class="form-control" placeholder="calorias" minlenght="10" maxlenght="50" required/>
      </div>
      <button type="submit" class="btn btn-primary">Enviar</button>
      <button type="reset" class="btn btn-secondary">Restablecer</button>
    </form>
 
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
      listahamburguesas: [],
      hamburguesa:{
        nombre: '',
        ingredientes:[],
        calorias: null
      }

    }
  },

  created() {
     if(localStorage.getItem('hamburguesas') != null){
      this.listahamburguesas = JSON.parse(localStorage.getItem('hamburguesas'))
      console.log(this.listahamburguesas)
     }else{
      this.ListHamburguesas()
     }
    // this.$refs.useName.focus()
  },

  components: {
    Header,
    Footer
  },
  methods: {
   editar(id){
      this.idhAmburguesas = this.id
    },

   deletehamburguesas(id, event){
    const confirmacion =confirm('quieres eliminar');
    if(confirmacion){
     this.listahamburguesas= this.listahamburguesas.filter(hambur => hambur.id != id)
     this.UpdateLocalStorage()
    } else{
     event.preventDefault();
    }
    },
    ListHamburguesas: function(){
     let direccion = "https://prueba-hamburguesas.herokuapp.com/burger/";
      axios.get(direccion).then(data =>{
      this.listahamburguesas = data.data;
      this.UpdateLocalStorage()
      })
//foco del Nombre, al renderizar la pagina
     },
    UpdateLocalStorage: function(){
      localStorage.setItem('hamburguesas', JSON.stringify(this.listahamburguesas))
    },

    process: function(event){
      event.preventDefault()
      this.hamburguesa.id = this.listahamburguesas.length+1;
      this.listahamburguesas.push({
        id: this.hamburguesa.id,
        nombre: this.hamburguesa.nombre,
        ingredientes: this.hamburguesa.ingredientes,
        calorias: this.hamburguesa.calorias,
      })
      this.UpdateLocalStorage()
    }
  }


}
</script>