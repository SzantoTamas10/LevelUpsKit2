<script>
  import { goto } from '$app/navigation';

  let fullName = '';
  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let errorMessages = {};
  let showPassword = false;
  let isSubmitting = false;

  // Automatically sync password fields
  $: confirmPassword = password;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  // Real-time password validation
  $: {
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        errorMessages.confirmPassword = 'A jelszavak nem egyeznek.';
      } else {
        delete errorMessages.confirmPassword;
      }
    }
  }

  function validateForm() {
    errorMessages = {};

    if (!fullName) errorMessages.fullName = 'A teljes név megadása kötelező.';
    if (!username) errorMessages.username = 'A felhasználónév megadása kötelező.';
    if (!email) errorMessages.email = 'Az email megadása kötelező.';
    if (!password) errorMessages.password = 'A jelszó megadása kötelező.';
    if (password.length < 8) errorMessages.password = 'A jelszónak legalább 8 karakter hosszúnak kell lennie.';
    if (password !== confirmPassword) errorMessages.confirmPassword = 'A jelszavak nem egyeznek.';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errorMessages.email = 'Érvénytelen email cím formátum.';
    }

    return Object.keys(errorMessages).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm() || isSubmitting) return;
    
    isSubmitting = true;
    errorMessages = {};

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Hiba történt a regisztráció során.');
      }

      // Registration successful
      await goto('/login');
    } catch (error) {
      errorMessages.general = error.message;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="container">
  <h2>Regisztráció</h2>
  <form on:submit={handleSubmit}>
    <div>
      <label for="fullName">Teljes név</label>
      <input 
        type="text" 
        id="fullName" 
        bind:value={fullName} 
        required 
        placeholder="Add meg a teljes neved"
        disabled={isSubmitting}
      />
      {#if errorMessages.fullName}
        <p class="error">{errorMessages.fullName}</p>
      {/if}
    </div>

    <div>
      <label for="username">Felhasználónév</label>
      <input 
        type="text" 
        id="username" 
        bind:value={username} 
        required 
        placeholder="Válassz egy felhasználónevet"
        disabled={isSubmitting}
      />
      {#if errorMessages.username}
        <p class="error">{errorMessages.username}</p>
      {/if}
    </div>

    <div>
      <label for="email">Email</label>
      <input 
        type="email" 
        id="email" 
        bind:value={email} 
        required 
        placeholder="Add meg az email címed"
        disabled={isSubmitting}
      />
      {#if errorMessages.email}
        <p class="error">{errorMessages.email}</p>
      {/if}
    </div>

    <div>
      <label for="password">Jelszó</label>
      <div class="input-group">
        <input 
          type={showPassword ? 'text' : 'password'} 
          id="password" 
          bind:value={password} 
          required 
          placeholder="Add meg a jelszavad (min. 8 karakter)"
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
      {#if errorMessages.password}
        <p class="error">{errorMessages.password}</p>
      {/if}
    </div>

    <div>
      <label for="confirmPassword">Jelszó megerősítése</label>
      <div class="input-group">
        <input 
          type={showPassword ? 'text' : 'password'} 
          id="confirmPassword" 
          bind:value={confirmPassword} 
          required 
          placeholder="Add meg újra a jelszavad"
          disabled={true}
          readonly
        />
      </div>
      {#if errorMessages.confirmPassword}
        <p class="error">{errorMessages.confirmPassword}</p>
      {/if}
    </div>

    {#if errorMessages.general}
      <p class="error general-error">{errorMessages.general}</p>
    {/if}

    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Regisztrálás...' : 'Regisztrálás'}
    </button>
  </form>
</div>

<style>
  .container {
    background-color: rgba(0, 0, 0, 0.8);
    border: 2px solid var(--neon-green);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 15px var(--neon-green);
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
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
    gap: 1.5rem;
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    text-align: left;
    font-size: 1.1rem;
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
