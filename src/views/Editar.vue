<template>


  <div>
    <Header/>
     <div class="container">
      <form action="" class="form-horizontal">
         <div class="form-group">
           <label for="" class="control-label">

           </label>
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
    name: "Editar",
    components:{
      Header,
      Footer
    },
    data: function(){
      return {
        hamburguesasId:null,
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
    mounted: function(){
      this.hamburguesasId = this.$route.params.id;
      axios.get("https://prueba-hamburguesas.herokuapp.com/burger/"+ this.hamburguesasId)
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

</style>