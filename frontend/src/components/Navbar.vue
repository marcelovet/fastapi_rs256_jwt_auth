<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/">RS256 JWT App</router-link>
      </div>
      
      <div class="navbar-menu">
        <div v-if="isAuthenticated">
          <router-link to="/users" class="navbar-item">Usuários</router-link>
          <router-link to="/profile" class="navbar-item">Perfil</router-link>
          <a @click.prevent="logout" class="navbar-item">Sair</a>
        </div>
        <div v-else>
          <router-link to="/login" class="navbar-item">Login</router-link>
        </div>
      </div>
    </nav>
</template>
  
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'NavbarComponent',
    
    setup() {
      const store = useStore();
      const router = useRouter();
      
      const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
      
      const logout = () => {
        store.dispatch('auth/logout');
        router.push('/login');
      };
      
      return {
        isAuthenticated,
        logout,
      };
    },
  };
</script>
  
<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #333;
    color: white;
  }
  
  .navbar-brand a {
    color: white;
    font-size: 1.2em;
    text-decoration: none;
    font-weight: bold;
  }
  
  .navbar-menu {
    display: flex;
  }
  
  .navbar-item {
    color: white;
    text-decoration: none;
    margin-left: 20px;
    cursor: pointer;
  }
  
  .navbar-item:hover {
    text-decoration: underline;
  }
</style>