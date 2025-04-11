<template>
    <div class="profile-container">
      <h1>My Profile</h1>
      
      <div v-if="loading" class="loading">
        Loading Profile...
      </div>
      
      <div v-else-if="user" class="profile-info">
        <div class="info-item">
          <strong>Username:</strong> {{ user.username }}
        </div>
        <div class="info-item">
          <strong>Email:</strong> {{ user.email }}
        </div>
        <div class="info-item">
          <strong>Fullname:</strong> {{ user.full_name || 'Não informado' }}
        </div>
        <div class="info-item">
          <strong>Status:</strong> {{ user.is_active ? 'Ativo' : 'Inativo' }}
        </div>
      </div>
      
      <button @click="logout" class="logout-btn">
        Logout
      </button>
    </div>
</template>
  
<script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'ProfileView',
    
    setup() {
      const store = useStore();
      const router = useRouter();
      
      const user = computed(() => store.getters['auth/user']);
      const loading = computed(() => store.getters['auth/loading']);
      
      const logout = () => {
        store.dispatch('auth/logout');
        router.push('/login');
      };
      
      onMounted(() => {
        if (!user.value) {
          store.dispatch('auth/fetchUser').catch(error => {
            console.error('Error while loading profile:', error);
          });
        }
      });
      
      return {
        user,
        loading,
        logout,
      };
    },
  };
</script>
  
<style scoped>
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .profile-info {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  
  .info-item {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .info-item:last-child {
    border-bottom: none;
  }
  
  .loading {
    text-align: center;
    padding: 20px;
    color: #666;
  }
  
  .logout-btn {
    background-color: #f44336;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>