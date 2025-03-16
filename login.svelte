<script>
  import { navigate } from "svelte-routing";

  let username = "";
  let password = "";

  function handleSubmit() {
    // TODO: Implement login logic
    console.log("Login attempt:", { username });
  }
</script>

<div class="login-container">
  <h2>Bejelentkezés</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="username">Felhasználónév:</label>
      <input type="text" id="username" bind:value={username} required />
    </div>
    <div class="form-group">
      <label for="password">Jelszó:</label>
      <input type="password" id="password" bind:value={password} required />
    </div>
    <button type="submit" class="app-button">Bejelentkezés</button>
  </form>
</div>

<style>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 2px solid var(--neon-green);
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.8);
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--neon-green);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--neon-green);
  }

  input {
    width: 100%;
    padding: 0.5rem;
    background-color: rgba(0, 255, 0, 0.1);
    border: 1px solid var(--neon-green);
    color: var(--neon-green);
    font-family: inherit;
  }

  input:focus {
    outline: none;
    box-shadow: 0 0 5px var(--neon-green);
  }

  button {
    width: 100%;
    margin-top: 1rem;
  }
</style>
