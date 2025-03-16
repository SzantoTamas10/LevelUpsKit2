<script>
  let showMenu = false;

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function closeMenu() {
    showMenu = false;
  }
</script>

<div class="app-container">
  <button class="menu-toggle app-button" on:click={toggleMenu} class:hidden={showMenu}>☰ Menü</button>
  
  <nav class="overlay" class:show={showMenu}>
    <button class="close-btn app-button" on:click={closeMenu}>&times;</button>
    <a href="/" class="nav-link" on:click={closeMenu}>Főoldal</a>
    <a href="/rolunk" class="nav-link" on:click={closeMenu}>Rólunk</a>
    <a href="/letolt" class="nav-link" on:click={closeMenu}>Letöltés</a>
    <a href="/user" class="nav-link" on:click={closeMenu}>Felhasználó</a>
    <a href="/login" class="nav-link" on:click={closeMenu}>Bejelentkezés</a>
    <a href="/register" class="nav-link" on:click={closeMenu}>Regisztráció</a>
  </nav>

  <div id="wrapper">
    <div class="viewport">
      <div class="cube">
        <div><div class="cube-image">L</div></div>
        <div><div class="cube-image">E</div></div>
        <div><div class="cube-image">V</div></div>
        <div><div class="cube-image">E</div></div>
        <div><div class="cube-image">L</div></div>
        <div><div class="cube-image">⬆</div></div>
      </div>
    </div>
  </div>

  <main class="main-content">
    <div class="welcome-section">
      <h1>Üdvözöljük a LevelUps-nál!</h1>
      <p>Korlátokat csak a korlátolt ismer.</p>
    </div>
  </main>
</div>

<style>
  /* Global styles */
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: black;
    color: #00ff00;
    font-family: 'Courier New', Courier, monospace;
    min-height: 100vh;
    font-size: 16px;
    line-height: 1.5;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(:root) {
    --neon-green: #00ff00;
    --bg-dark: #000000;
  }

  /* Component specific styles */
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    background-color: var(--bg-dark);
    color: var(--neon-green);
    font-family: 'Courier New', Courier, monospace;
  }

  .main-content {
    flex: 1;
    padding: 2rem;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .welcome-section {
    text-align: center;
    padding: 2rem;
    border: 2px solid var(--neon-green);
    border-radius: 10px;
    background-color: rgba(0, 255, 0, 0.05);
    margin: 2rem;
    max-width: 600px;
    animation: glow 2s infinite alternate;
  }

  .welcome-section h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .welcome-section p {
    font-size: 1.2rem;
    opacity: 0.9;
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 10px var(--neon-green);
    }
    to {
      box-shadow: 0 0 20px var(--neon-green), 0 0 30px var(--neon-green);
    }
  }

  /* Gombok stílusai */
  .app-button {
    background-color: transparent;
    border: 2px solid var(--neon-green);
    color: var(--neon-green);
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    margin: 10px;
    transition: all 0.3s ease;
  }

  .app-button:hover {
    background-color: var(--neon-green);
    color: var(--bg-dark);
    box-shadow: 0 0 15px var(--neon-green);
  }

  /* Menü stílusok */
  .menu-toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    background-color: var(--neon-green);
    color: var(--bg-dark);
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.3s ease;
    z-index: 100;
  }

  .menu-toggle:hover {
    box-shadow: 0 0 15px var(--neon-green);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    display: flex;
    flex-direction: column;
    z-index: 90;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding-top: 80px;
    box-shadow: 2px 0 20px rgba(0, 255, 0, 0.2);
  }

  .overlay.show {
    transform: translateX(0);
  }

  :global(.nav-link) {
    color: var(--neon-green);
    padding: 1.5rem;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 255, 0, 0.2);
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.9rem;
  }

  :global(.nav-link:hover) {
    background-color: rgba(0, 255, 0, 0.1);
    padding-left: 2rem;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    background-color: transparent;
    color: var(--neon-green);
    font-size: 30px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .close-btn:hover {
    transform: rotate(90deg);
    color: #fff;
  }

  .hidden {
    display: none;
  }

  /* Kocka animáció */
  #wrapper {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 5%;
    width: 150px;
    opacity: 0.7;
    pointer-events: none;
  }

  .viewport {
    perspective: 800px;
    perspective-origin: 50% 200px;
    transform: scale(0.6, 0.6);
  }

  .cube {
    position: relative;
    margin: 0 auto;
    height: 200px;
    width: 200px;
    transform-style: preserve-3d;
    animation: rotateCube 30s infinite linear;
  }

  @keyframes rotateCube {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }

  .cube > div {
    position: absolute;
    opacity: 0.8;
    height: 200px;
    width: 200px;
    background-color: rgba(0, 0, 0, 0.9);
    border: 2px solid var(--neon-green);
    box-shadow: 0 0 10px var(--neon-green);
  }

  .cube > div > div.cube-image {
    width: 200px;
    height: 200px;
    transform: rotate(180deg);
    line-height: 200px;
    font-size: 80px;
    text-align: center;
    color: var(--neon-green);
    transition: color 0.6s;
  }

  .cube > div:nth-child(1) { transform: translateZ(100px); }
  .cube > div:nth-child(2) { transform: rotateY(180deg) translateZ(100px); }
  .cube > div:nth-child(3) { transform: rotateY(90deg) translateZ(100px); }
  .cube > div:nth-child(4) { transform: rotateY(-90deg) translateZ(100px); }
  .cube > div:nth-child(5) { transform: rotateX(90deg) translateZ(100px); }
  .cube > div:nth-child(6) { transform: rotateX(-90deg) translateZ(100px); }
</style>
