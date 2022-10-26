<template>


  <div>
    <Header/>
     <div class="container">
      <form action="" class="form-horizontal">
         <div class="form-group left">
           <label for="" class="control-label col-sm-2" >Nombre</label>
           <div>
            <input type="text" class="form-control" name="nombre" id="nombre" v-model="form.nombre">
           </div>
         </div>
      </form>

      <form action="" class="form-horizontal">
         <div class="form-group left">
           <label for="" class="control-label col-sm-2" >Ingredientes</label>
           <div>
            <input type="text" class="form-control" name="nombre" id="nombre" v-model="form.ingredientes">
           </div>
         </div>

      </form>
            <form action="" class="form-horizontal">
         <div class="form-group left">
           <label for="" class="control-label col-sm-2" >Calorias</label>
           <div>
            <input type="text" class="form-control" name="nombre" id="nombre" v-model="form.calorias">
           </div>
         </div>
      </form>
            
      <div action="" class="form-group">

       <button type="button" class="btn btn-primary" v-on:click="editar()">Editar</button>
       <button type="button" class="btn btn-danger margen">Eliminar</button>
       <button type="button" class="btn btn-dark margen">Salir</button>
      
      </div>

     </div>
    <Footer/>
  </div>
</template>


<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
export default {
    name: "Editar",
    components:{
      Header,
      Footer
    },
    data: function(){
      return {
        form:{
          "id": null,
          "nombre": "",
          "ingredientes": [
          "",
          "",
          "",
          "",
          "",
          ""
          ],
          "calorias": null
        }
      }
    },
    methods:{
      editar(){
        axios.put("https://prueba-hamburguesas.herokuapp.com/burger/", this.form)
        .then(dat =>{ 
          console.log(dat)
        })
      }
    },
    mounted: function(){
      this.form.id = this.$route.params.id;
      axios.get("https://prueba-hamburguesas.herokuapp.com/burger/"+ this.form.id)
      .then(datos => {
        console.log(datos)
        this.form.id = datos.data.id;
        this.form.nombre = datos.data.nombre;
        this.form.ingredientes = datos.data.ingredientes;
        this.form.calorias = datos.data.calorias;
        console.log(this.form)
      })
    }
}
</script>

<style>
.left{
  text-align: left;
}
</style>