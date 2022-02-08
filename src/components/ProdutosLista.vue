<template>
  <section class="produtos_container">
    <!--  Verifica se tem produtos  -->
    <div v-if="produtos && produtos.length > 0" class="produtos">
      <!-- Percorre os produtos -->
      <div class="produto" v-for="(produto, index) in produtos" :key="index">
        <router-link to="/">
          <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo">
          <p class="preco">{{ produto.preco }}</p>
          <h2 class="titulo">{{ produto.nome }}</h2>
          <p class="">{{ produto.descricao }}</p>
        </router-link>
      </div>
      <!-- Paginação -->
      <ProdutosPaginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina"/>
    </div>
    <!-- Não tem produtos -->
    <div v-else-if="produtos && produtos.length === 0">
      <p class="sem-resultados">Busca sem resultados. Tente buscar outro termo.</p>
    </div>
  </section>
</template>

<script>
import ProdutosPaginar from "@/components/ProdutosPaginar";
import {api} from '@/services.js'
import {serialize} from "@/helpers";

export default {
  name: "ProdutosLista",
  components: {
    ProdutosPaginar
  },
  data() {
    return {
      produtos: null,
      produtosPorPagina: 3,
      produtosTotal: 0
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
        this.produtosTotal = Number(response.headers['x-total-count'])
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
.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
}
</style>