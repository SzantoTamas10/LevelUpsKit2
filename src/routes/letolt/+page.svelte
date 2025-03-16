<script>
  let downloadItems = [
    {
      name: "LevelUps Desktop App",
      version: "1.0.0",
      description: "Asztali alkalmazás Windows rendszerre",
      size: "45 MB",
      link: "#"
    },
    {
      name: "LevelUps Mobile",
      version: "1.0.0",
      description: "Android és iOS alkalmazás",
      size: "25 MB",
      link: "#"
    }
  ];
</script>

<div class="letolt-container">
  <h2>Letöltések</h2>
  <div class="downloads-grid">
    {#each downloadItems as item}
      <div class="download-card">
        <h3>{item.name}</h3>
        <div class="version">Verzió: {item.version}</div>
        <p>{item.description}</p>
        <div class="size">Méret: {item.size}</div>
        <button class="app-button">Letöltés</button>
      </div>
    {/each}
  </div>
</div>

<style>
  .letolt-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  h2 {
    text-align: center;
    color: var(--neon-green);
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .downloads-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .download-card {
    border: 2px solid var(--neon-green);
    border-radius: 10px;
    padding: 1.5rem;
    background-color: rgba(0, 0, 0, 0.8);
    transition: all 0.3s ease;
  }

  .download-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 15px var(--neon-green);
  }

  h3 {
    color: var(--neon-green);
    margin-bottom: 1rem;
  }

  .version {
    color: var(--neon-green);
    opacity: 0.8;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .size {
    margin-bottom: 1rem;
    font-size: 0.9em;
    opacity: 0.8;
  }

  button {
    width: 100%;
  }
</style>
