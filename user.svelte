<script>
  let user = {
    username: "Felhasználó",
    email: "user@example.com",
    joinDate: "2025-03-16",
    level: 1,
    experience: 0,
    achievements: [
      { name: "Első bejelentkezés", description: "Sikeresen bejelentkeztél!", icon: "🎉" },
      { name: "Kezdő lépések", description: "Kitöltötted a profilodat", icon: "📝" }
    ]
  };
</script>

<div class="user-container">
  <div class="profile-header">
    <div class="avatar">
      {user.username[0].toUpperCase()}
    </div>
    <h2>{user.username}</h2>
    <p class="email">{user.email}</p>
  </div>

  <div class="stats-container">
    <div class="stat-card">
      <h3>Szint</h3>
      <div class="stat-value">{user.level}</div>
      <div class="progress-bar">
        <div class="progress" style="width: {(user.experience % 100)}%"></div>
      </div>
    </div>
    <div class="stat-card">
      <h3>Csatlakozás</h3>
      <div class="stat-value">{user.joinDate}</div>
    </div>
  </div>

  <div class="achievements-section">
    <h3>Eredmények</h3>
    <div class="achievements-grid">
      {#each user.achievements as achievement}
        <div class="achievement-card">
          <div class="achievement-icon">{achievement.icon}</div>
          <h4>{achievement.name}</h4>
          <p>{achievement.description}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .user-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .profile-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: var(--neon-green);
    color: var(--bg-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    margin: 0 auto 1rem;
  }

  .email {
    opacity: 0.7;
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    border: 2px solid var(--neon-green);
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .stat-value {
    font-size: 2rem;
    margin: 1rem 0;
    color: var(--neon-green);
  }

  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: rgba(0, 255, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
  }

  .progress {
    height: 100%;
    background-color: var(--neon-green);
    transition: width 0.3s ease;
  }

  .achievements-section {
    margin-top: 2rem;
  }

  .achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .achievement-card {
    border: 2px solid var(--neon-green);
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    transition: all 0.3s ease;
  }

  .achievement-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 15px var(--neon-green);
  }

  .achievement-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3, h4 {
    color: var(--neon-green);
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
</style>
