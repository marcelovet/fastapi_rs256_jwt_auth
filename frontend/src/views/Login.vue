<template>
    <div class="login-container">
      <h1>Login</h1>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            required 
            placeholder="myemail@email.com"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            required 
            placeholder="Your password"
          />
        </div>
        
        <button type="submit" :disabled="loading">
          {{ loading ? 'Loading...' : 'Sign in' }}
        </button>
      </form>
    </div>
</template>
  
<script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    name: 'LoginView',
    
    setup() {
      const store = useStore();
      const router = useRouter();
      const route = useRoute();
      
      const email = ref('');
      const password = ref('');
      
      const loading = computed(() => store.getters['auth/loading']);
      const error = computed(() => store.getters['auth/error']);
      
      const handleLogin = async () => {
        try {
          await store.dispatch('auth/login', {
            email: email.value,
            password: password.value,
          });
          
          // redirects to origin or home
          const redirectPath = route.query.redirect || '/';
          router.push(redirectPath);
        } catch (err) {
          console.error('Login error:', err);
        }
      };
      
      return {
        email,
        password,
        loading,
        error,
        handleLogin,
      };
    },
  };
</script>
  
<style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #cccccc;
  }
  
  .error-message {
    color: red;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #ffebee;
    border-radius: 4px;
  }
</style>