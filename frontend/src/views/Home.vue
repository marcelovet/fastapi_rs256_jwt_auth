<template>
    <div class="home-container">
      <h1>Welcome to JWT System with RS256</h1>
      
      <div class="content">
        <p class="intro">
          This is a demo application that uses JWT authentication with RS256 algorithm, developed with FastAPI on the backend and Vue.js on the frontend.
        </p>
        
        <div v-if="isAuthenticated" class="authenticated-content">
          <h2>You are authenticated!</h2>
          <p>
            Hi, <strong>{{ user?.username || 'usuário' }}</strong>! You are authenticated
            and can access all protected areas of the application.
          </p>
          
          <div class="actions">
            <router-link to="/profile" class="btn btn-primary">View my profile</router-link>
            <router-link to="/users" class="btn btn-secondary">View other users</router-link>
          </div>
          
          <div class="token-info">
            <h3>Token information</h3>
            <div class="token-container">
              <p><strong>Access token:</strong> <span class="token">{{ displayToken }}</span></p>
              <button @click="toggleShowFullToken" class="btn btn-sm">
                {{ showFullToken ? 'Show less' : 'Show complete token' }}
              </button>
            </div>
            <p>
              <small>This token uses the RS256 algorithm, which employs asymmetric encryption based on a public/private key pair, offering greater security than algorithms based on symmetric keys such as HS256.</small>
            </p>
          </div>
        </div>
        
        <div v-else class="guest-content">
          <h2>Authentication with JWT using RS256</h2>
          <p>
            To access the protected areas of this application, you must first authenticate yourself. The system uses JSON Web Tokens (JWT) with the RS256 algorithm to ensure the security of communications.
          </p>
          <router-link to="/login" class="btn btn-primary">Fazer login</router-link>
        </div>
        
        <div class="tech-overview">
          <h2>Tech stack</h2>
          <div class="tech-cards">
            <div class="tech-card">
              <h3>Backend (FastAPI)</h3>
              <ul>
                <li>FastAPI for creating RESTful API</li>
                <li>python-jose for token generation and validation</li>
                <li>PassLib for secure password hashing</li>
                <li>RSA algorithm for token signing</li>
              </ul>
            </div>
            <div class="tech-card">
              <h3>Frontend (Vue.js)</h3>
              <ul>
                <li>Vue 3 with Composition API</li>
                <li>Vuex for state management</li>
                <li>Vue Router for navigation</li>
                <li>Axios HTTP requests</li>
                <li>Automatic token renewal system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'HomeView',
    
    setup() {
      const store = useStore();
      const showFullToken = ref(false);
      
      const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
      const user = computed(() => store.getters['auth/user']);
      const accessToken = computed(() => store.getters['auth/accessToken']);
      
      const displayToken = computed(() => {
        if (!accessToken.value) return '';
        
        return showFullToken.value 
          ? accessToken.value 
          : `${accessToken.value.substring(0, 20)}...`;
      });
      
      const toggleShowFullToken = () => {
        showFullToken.value = !showFullToken.value;
      };
      
      onMounted(() => {
        // if user is authenticated but we dont have its data
        if (isAuthenticated.value && !user.value) {
          store.dispatch('auth/fetchUser').catch(error => {
            console.error('Erro ao carregar dados do usuário:', error);
          });
        }
      });
      
      return {
        isAuthenticated,
        user,
        displayToken,
        showFullToken,
        toggleShowFullToken,
      };
    },
  };
  </script>
  
  <style scoped>
  .home-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .content {
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .intro {
    font-size: 1.1em;
    line-height: 1.6;
    color: #555;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
  }
  
  .authenticated-content, .guest-content {
    margin-bottom: 30px;
  }
  
  .actions {
    margin: 25px 0;
    display: flex;
    gap: 15px;
  }
  
  .token-info {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    margin-top: 20px;
  }
  
  .token-container {
    background-color: #272822;
    color: #f8f8f2;
    padding: 10px 15px;
    border-radius: 4px;
    font-family: monospace;
    overflow-x: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .token {
    word-break: break-all;
  }
  
  .tech-overview {
    margin-top: 40px;
  }
  
  .tech-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  
  .tech-card {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  }
  
  .tech-card h3 {
    margin-top: 0;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  
  .tech-card ul {
    padding-left: 20px;
    margin-bottom: 0;
  }
  
  .tech-card li {
    margin-bottom: 8px;
  }
  
  .btn {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    border: none;
  }
  
  .btn-primary {
    background-color: #4CAF50;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #45a049;
  }
  
  .btn-secondary {
    background-color: #2196F3;
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #0b7dda;
  }
  
  .btn-sm {
    padding: 5px 10px;
    font-size: 0.8em;
    background-color: #6c757d;
    color: white;
  }
  
  .btn-sm:hover {
    background-color: #5a6268;
  }
  
  @media (max-width: 768px) {
    .tech-cards {
      grid-template-columns: 1fr;
    }
    
    .token-container {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .token-container button {
      margin-top: 10px;
    }
    
    .actions {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
      text-align: center;
    }
  }
  </style>