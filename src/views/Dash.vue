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
      <tr v-for="hamburguesas in listahamburguesas" :key="hamburguesas.id">
        <th scope="row">{{hamburguesas.id}}</th>
        <td>{{hamburguesas.nombre}}</td>
        <label v-for="ingredientes in hamburguesas.ingredientes">{{ingredientes}}&nbsp;</label>
        <td>{{hamburguesas.calorias}} </td>
        <td><button class="btn btn-info btn-block" @click="editar(hamburguesas.id)">Editar</button></td>
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
        <input type="number" v-model="hamburguesa.calorias" class="form-control" placeholder="calorias" minlenght="10" maxlenght="50" required/>
      </div>
      <div class="form-group">
        <input type="submit" class="btn btn-success btn-block text-dark" v-bind:value="Operation"/>
      </div>
      <div class="form-group">
        <input type="reset" class="btn btn-success btn-block text-block" value="clear"/>
      </div>
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
        calorias: null,
      },
      Operation: "enviar",
      hamburguesaIndex: -1
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

  mounted() {
    this.$refs.Name.focus()
  },
  methods: {
// Editando las hamburguesas
    editar(id){
     this.Operation = "editar"
     console.log(this.Operacion)
     const foundhamburguesa = this.listahamburguesas.find((hamburguesa, index)=>{
          this.hamburguesaIndex = index;
          return hamburguesa.id == id;
     });
     this.hamburguesa.nombre = foundhamburguesa.nombre
     this.hamburguesa.ingredientes = foundhamburguesa.ingredientes
     this.hamburguesa.calorias = foundhamburguesa.calorias
     },
// eliminando una hamburguesas
    deletehamburguesas(id, event){
     const confirmacion =confirm('quieres eliminar');
      if(confirmacion){
      this.listahamburguesas= this.listahamburguesas.filter(hambur => hambur.id != id)
      this.UpdateLocalStorage()
       } else{
      event.preventDefault();
      }
      },
// Recuperando el API
    ListHamburguesas: function(){
     let direccion = "https://prueba-hamburguesas.herokuapp.com/burger/";
      axios.get(direccion).then(data =>{
      this.listahamburguesas = data.data;
      this.UpdateLocalStorage()
      })
     },

    UpdateLocalStorage: function(){
      localStorage.setItem('hamburguesas', JSON.stringify(this.listahamburguesas))
    },

//condicionar el uso del boton "Operacion",  de esta manera se puede dar un doble uso (enviar o editar).
    process: function(event){
      event.preventDefault()
      if(this.Operation == "enviar"){
       this.hamburguesa.id = this.listahamburguesas.length+1;
       this.listahamburguesas.push({
        id: this.hamburguesa.id,
        nombre: this.hamburguesa.nombre,
        ingredientes: this.hamburguesa.ingredientes,
        calorias: this.hamburguesa.calorias
      })
      }else{
        this.listahamburguesas[this.hamburguesaIndex].nombre = this.hamburguesa.nombre;
        this.listahamburguesas[this.hamburguesaIndex].ingredientes = this.hamburguesa.ingredientes;
        this.listahamburguesas[this.hamburguesaIndex].calorias = this.hamburguesa.calorias;        
      }

      this.UpdateLocalStorage();
      this.LimpiarDocumento();
    },
// Limpiando los campos del formulario
    LimpiarDocumento: function(){
        this.hamburguesa.id= "";
        this.hamburguesa.nombre= "";
        this.hamburguesa.ingredientes= "";
        this.hamburguesa.calorias= "";
        this.Operation="enviar";
        this.$refs.Name.focus();
    }
  }


}
</script>