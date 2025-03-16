<script>
  import { goto } from '$app/navigation';

  let username = '';
  let email = '';
  let password = '';
  let showPassword = false;
  let errorMessages = {};
  let isSubmitting = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  async function handleLogin(event) {
    event.preventDefault();
    if (isSubmitting) return;

    errorMessages = {};
    
    // Validate inputs
    if ((email === '' && username === '') || password === '') {
      errorMessages.general = 'Kérlek, add meg az email címet VAGY felhasználónevet és a jelszót!';
      return;
    }

    isSubmitting = true;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sikertelen bejelentkezés. Kérjük, ellenőrizd az adataidat.');
      }

      // Login successful
      await goto('/dashboard');
    } catch (error) {
      errorMessages.general = error.message;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="login-container">
  <h2>Bejelentkezés</h2>
  <form on:submit={handleLogin}>
    <div>
      <label for="username">Felhasználónév (opcionális):</label>
      <input 
        type="text" 
        id="username" 
        bind:value={username} 
        placeholder="Add meg a felhasználóneved"
        disabled={isSubmitting}
      />
    </div>
    
    <div>
      <label for="email">Email (opcionális):</label>
      <input 
        type="email" 
        id="email" 
        bind:value={email} 
        placeholder="Add meg az email címed"
        disabled={isSubmitting}
      />
    </div>
    
    <div>
      <label for="password">Jelszó:</label>
      <div class="input-group">
        <input 
          type={showPassword ? 'text' : 'password'} 
          id="password" 
          bind:value={password} 
          required 
          placeholder="Add meg a jelszavad"
          disabled={isSubmitting}
        />
        <button 
          type="button" 
          class="toggle-password" 
          on:click={togglePasswordVisibility}
          disabled={isSubmitting}
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/159/159604.png" 
            alt={showPassword ? 'Jelszó elrejtése' : 'Jelszó mutatása'} 
            class="password-eye-icon"
          >
        </button>
      </div>
    </div>

    {#if errorMessages.general}
      <p class="error general-error">{errorMessages.general}</p>
    {/if}

    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Bejelentkezés...' : 'Bejelentkezés'}
    </button>
  </form>
</div>

<style>
  .login-container {
    background-color: rgba(0, 0, 0, 0.8);
    border: 2px solid var(--neon-green);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 15px var(--neon-green);
    text-align: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    position: relative;
    top: -2rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 10px var(--neon-green), 0 0 20px var(--neon-green);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    text-align: left;
    letter-spacing: 1px;
  }

  .input-group {
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid var(--neon-green);
    background-color: rgba(0, 0, 0, 0.5);
    color: var(--neon-green);
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  input:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  input:focus {
    outline: none;
    border-color: var(--neon-green);
    box-shadow: 0 0 10px var(--neon-green);
  }

  .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--neon-green);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .toggle-password:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .toggle-password:hover:not(:disabled) {
    color: #fff;
    text-shadow: 0 0 5px var(--neon-green);
  }

  .password-eye-icon {
    width: 24px;
    height: 24px;
    filter: invert(100%) sepia(100%) saturate(100%) hue-rotate(100deg) brightness(100%) contrast(100%);
  }

  .error {
    color: #ff3e3e;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    text-align: left;
    text-shadow: 0 0 5px rgba(255, 62, 62, 0.5);
  }

  .general-error {
    text-align: center;
    padding: 0.5rem;
    background-color: rgba(255, 62, 62, 0.1);
    border-radius: 5px;
  }

  button[type="submit"] {
    background-color: var(--neon-green);
    color: var(--bg-dark);
    padding: 1rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
  }

  button[type="submit"]:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  button[type="submit"]:hover:not(:disabled) {
    background-color: transparent;
    color: var(--neon-green);
    border: 2px solid var(--neon-green);
    box-shadow: 0 0 15px var(--neon-green);
  }
</style>
