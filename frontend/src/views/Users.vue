<template>
    <div class="users-container">
      <h1>Users</h1>
      
      <div v-if="loading" class="loading">
        Loading users...
      </div>
      
      <div v-else-if="error" class="error-message">
        Error while loading users: {{ error }}
      </div>
      
      <div v-else-if="users.length === 0" class="no-users">
        No user found.
      </div>
      
      <div v-else class="users-list">
        <div v-for="user in users" :key="user.id" class="user-card">
          <div class="user-info">
            <h3>{{ user.username }}</h3>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Name:</strong> {{ user.full_name || 'Not informed' }}</p>
            <p><strong>Status:</strong> {{ user.is_active ? 'Active' : 'Inactive' }}</p>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  import { ref, onMounted } from 'vue';
  import authService from '@/services/authService';
  
  export default {
    name: 'UsersView',
    
    setup() {
      const users = ref([]);
      const loading = ref(true);
      const error = ref(null);
      
      const fetchUsers = async () => {
        loading.value = true;
        error.value = null;
        
        try {
          const response = await authService.getUsers();
          users.value = response.data;
        } catch (err) {
          error.value = err.response?.data?.detail || 'Unknown error';
          console.error('Error while loading users:', err);
        } finally {
          loading.value = false;
        }
      };
      
      onMounted(() => {
        fetchUsers();
      });
      
      return {
        users,
        loading,
        error,
      };
    },
  };
</script>
  
<style scoped>
  .users-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .users-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .user-card {
    background-color: #f9f9f9;
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .loading, .no-users {
    text-align: center;
    padding: 30px;
    color: #666;
  }
  
  .error-message {
    color: red;
    padding: 15px;
    background-color: #ffebee;
    border-radius: 4px;
    margin-bottom: 20px;
  }
</style>