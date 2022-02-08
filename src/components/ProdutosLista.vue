<template>
  <section class="produtos_container">
    <div v-for="produto in produtos" :key="produto.id">
      <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo">
      <p class="preco">{{ produto.preco }}</p>
      <h2 class="titulo">{{ produto.nome }}</h2>
      <p class="">{{ produto.descricao }}</p>
      {{ url }}
    </div>
  </section>
</template>

<script>
import {api} from '@/services.js'
import {serialize} from "@/helpers";

export default {
  name: "ProdutosLista",
  data() {
    return {
      produtos: null,
      produtosPorPagina: 9
    }
  },
  computed: {
    url() {
      const queryString = serialize(this.$route.query) // Tomar cuidado pq existe route e router
      return `/produto?_limit=${this.produtosPorPagina}${queryString}`
    }
  },
  methods: {
    getProdutos() {
      api.get(this.url).then(response => {
        this.produtos = response.data
      })
    }
  },
  watch: {
    url() {
      this.getProdutos()
    }
  },
  created() {
    this.getProdutos()
  }
}
</script>

<style scoped>

</style>