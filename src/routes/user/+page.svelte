<!-- USER PROFILE PAGE -->
<script>
    let activeMenuItem = 'settings';

    // Preview data
    let rating = 0;
    let comment = "";
    let reviews = [
        { username: "Player1", rating: 5, comment: "Nagyon jó játék!", timestamp: new Date() },
        { username: "Player2", rating: 4, comment: "Tetszik a grafika és a játékmenet.", timestamp: new Date() }
    ];

    // Settings data
    let username = "current_user";
    let currentEmail = "user@example.com";
    let newEmail = "";
    let currentPassword = "";
    let newPassword = "";
    let confirmPassword = "";
    let showCurrentPassword = false;
    let showNewPassword = false;
    let errorMessages = {};

    $: confirmPassword = newPassword;

    function validatePasswords() {
        errorMessages = {};
        if (newPassword && newPassword.length < 8) {
            errorMessages.newPassword = "A jelszónak legalább 8 karakter hosszúnak kell lennie";
        }
    }

    function togglePasswordVisibility(field) {
        if (field === 'current') {
            showCurrentPassword = !showCurrentPassword;
        } else if (field === 'new') {
            showNewPassword = !showNewPassword;
        }
    }

    function updateSettings() {
        if (Object.keys(errorMessages).length > 0) {
            return;
        }

        if (newEmail && newEmail !== currentEmail) {
            // TODO: Implement actual API call to update email
            currentEmail = newEmail;
            alert('Email cím sikeresen módosítva!');
            newEmail = '';
        }

        if (newPassword) {
            // TODO: Implement actual API call to update password
            alert('Jelszó sikeresen módosítva!');
            currentPassword = '';
            newPassword = '';
            confirmPassword = '';
            showCurrentPassword = false;
            showNewPassword = false;
        }
    }

    // Chat data
    let messages = [
        { id: 1, username: "user1", text: "Szia!", timestamp: new Date(), isEditing: false },
        { id: 2, username: "user2", text: "Hello!", timestamp: new Date(), isEditing: false }
    ];
    let editingMessageId = null;
    let editedMessage = "";
    let newMessage = "";

    function setActiveMenuItem(item) {
        activeMenuItem = item;
    }

    function handleKeyDown(item, event) {
        if (event.key === 'Enter' || event.key === ' ') {
            setActiveMenuItem(item);
        }
    }

    function sendMessage() {
        if (newMessage.trim()) {
            messages = [
                ...messages,
                {
                    id: messages.length + 1,
                    username,
                    text: newMessage.trim(),
                    timestamp: new Date(),
                    isEditing: false
                }
            ];
            newMessage = "";
        }
    }

    function updateMessage(id) {
        messages = messages.map(msg => 
            msg.id === id 
                ? { ...msg, text: editedMessage, isEditing: false }
                : msg
        );
        editingMessageId = null;
        editedMessage = "";
    }

    function deleteMessage(id) {
        messages = messages.filter(msg => msg.id !== id);
    }
</script>

<main class="user-page">
    <div class="menu" role="tablist">
        <button 
            class="menu-item {activeMenuItem === 'settings' ? 'active' : ''}" 
            on:click={() => setActiveMenuItem('settings')}
            on:keydown={(e) => handleKeyDown('settings', e)}
            role="tab"
            aria-selected={activeMenuItem === 'settings'}>
            Beállítások
        </button>
        <button 
            class="menu-item {activeMenuItem === 'chat' ? 'active' : ''}" 
            on:click={() => setActiveMenuItem('chat')}
            on:keydown={(e) => handleKeyDown('chat', e)}
            role="tab"
            aria-selected={activeMenuItem === 'chat'}>
            Chat
        </button>
        <button 
            class="menu-item {activeMenuItem === 'highscore' ? 'active' : ''}" 
            on:click={() => setActiveMenuItem('highscore')}
            on:keydown={(e) => handleKeyDown('highscore', e)}
            role="tab"
            aria-selected={activeMenuItem === 'highscore'}>
            Highscore
        </button>
        <button 
            class="menu-item {activeMenuItem === 'preview' ? 'active' : ''}" 
            on:click={() => setActiveMenuItem('preview')}
            on:keydown={(e) => handleKeyDown('preview', e)}
            role="tab"
            aria-selected={activeMenuItem === 'preview'}>
            Preview
        </button>
    </div>

    <div class="content" role="tabpanel">
        {#if activeMenuItem === 'settings'}
            <div class="settings-content">
                <h2>Beállítások</h2>
                <div class="settings-form" on:submit|preventDefault={updateSettings}>
                    <div class="form-group">
                        <label for="currentEmail">Jelenlegi email cím:</label>
                        <div class="input-group">
                            <input 
                                type="email"
                                id="currentEmail"
                                bind:value={currentEmail}
                                disabled
                            />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="newEmail">Új email cím:</label>
                        <div class="input-group">
                            <input 
                                type="email"
                                id="newEmail"
                                bind:value={newEmail}
                                placeholder="Új email cím"
                            />
                        </div>
                    </div>

                    <hr class="settings-divider" />

                    <div class="form-group">
                        <label for="currentPassword">Jelenlegi jelszó:</label>
                        <div class="input-group">
                            <input 
                                type={showCurrentPassword ? "text" : "password"}
                                id="currentPassword"
                                bind:value={currentPassword}
                                placeholder="Jelenlegi jelszó"
                            />
                            <button 
                                type="button"
                                class="toggle-password"
                                on:click={() => togglePasswordVisibility('current')}
                            >
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/159/159604.png" 
                                    alt="Jelszó mutatása/elrejtése"
                                    class="password-eye-icon"
                                />
                            </button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="newPassword">Új jelszó:</label>
                        <div class="input-group">
                            <input 
                                type={showNewPassword ? "text" : "password"}
                                id="newPassword"
                                bind:value={newPassword}
                                on:input={validatePasswords}
                                placeholder="Új jelszó"
                            />
                            <button 
                                type="button"
                                class="toggle-password"
                                on:click={() => togglePasswordVisibility('new')}
                            >
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/159/159604.png" 
                                    alt="Jelszó mutatása/elrejtése"
                                    class="password-eye-icon"
                                />
                            </button>
                        </div>
                        {#if errorMessages.newPassword}
                            <span class="error">{errorMessages.newPassword}</span>
                        {/if}
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">Új jelszó megerősítése:</label>
                        <div class="input-group">
                            <input 
                                type={showNewPassword ? "text" : "password"}
                                id="confirmPassword"
                                bind:value={confirmPassword}
                                placeholder="Új jelszó megerősítése"
                                disabled
                            />
                        </div>
                    </div>

                    <button type="submit" class="save-button" disabled={Object.keys(errorMessages).length > 0}>
                        {newEmail ? 'Email módosítása' : 'Jelszó módosítása'}
                    </button>
                </div>
            </div>
        {:else if activeMenuItem === 'chat'}
            <div class="chat-content">
                <h2>Chat</h2>
                <div class="chat-messages">
                    {#each messages as message (message.id)}
                        <div class="message" class:my-message={message.username === username}>
                            <span class="username">{message.username}:</span>
                            {#if editingMessageId === message.id}
                                <input
                                    type="text"
                                    bind:value={editedMessage}
                                    on:keydown={(e) => {
                                        if (e.key === 'Enter') {
                                            updateMessage(message.id);
                                        } else if (e.key === 'Escape') {
                                            editingMessageId = null;
                                            editedMessage = '';
                                        }
                                    }}
                                />
                            {:else}
                                <span class="message-text">{message.text}</span>
                            {/if}
                            {#if message.username === username}
                                <div class="message-actions">
                                    {#if editingMessageId === message.id}
                                        <button 
                                            class="action-link cancel" 
                                            on:click={() => {
                                                editingMessageId = null;
                                                editedMessage = '';
                                            }}
                                            on:keydown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    editingMessageId = null;
                                                    editedMessage = '';
                                                }
                                            }}>
                                            Mégse
                                        </button>
                                    {:else}
                                        <button 
                                            class="action-link" 
                                            on:click={() => {
                                                editingMessageId = message.id;
                                                editedMessage = message.text;
                                            }}
                                            on:keydown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    editingMessageId = message.id;
                                                    editedMessage = message.text;
                                                }
                                            }}>
                                            Módosít
                                        </button>
                                        <button 
                                            class="action-link delete" 
                                            on:click={() => deleteMessage(message.id)}
                                            on:keydown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    deleteMessage(message.id);
                                                }
                                            }}>
                                            Törlés
                                        </button>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
                <div class="chat-input">
                    <input 
                        type="text" 
                        bind:value={newMessage} 
                        placeholder="Írj egy üzenetet..."
                        on:keydown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                    />
                    <button on:click={sendMessage}>Küldés</button>
                </div>
            </div>
        {:else if activeMenuItem === 'highscore'}
            <div class="highscore-content">
                <h2>Highscore</h2>
                <div class="highscore-list">
                    <!-- Highscore content will go here -->
                </div>
            </div>
        {:else if activeMenuItem === 'preview'}
            <div class="preview-content">
                <h2>Játék értékelése</h2>
                <div class="rating-section">
                    <div class="rating-input">
                        <label for="rating">Értékelés:</label>
                        <div class="star-rating">
                            {#each Array(5) as _, i}
                                <button 
                                    type="button"
                                    id="rating"
                                    class="star {i < rating ? 'active' : ''}"
                                    on:click={() => rating = i + 1}
                                    aria-label="{i + 1} csillag">
                                    ★
                                </button>
                            {/each}
                        </div>
                    </div>
                    <div class="comment-input">
                        <label for="comment">Vélemény:</label>
                        <textarea 
                            id="comment"
                            bind:value={comment}
                            placeholder="Írd le a véleményed a játékról..."
                            rows="4"
                        ></textarea>
                        <button 
                            class="submit-review" 
                            on:click={() => {
                                if (rating > 0 && comment.trim()) {
                                    reviews = [{ username, rating, comment: comment.trim(), timestamp: new Date() }, ...reviews];
                                    rating = 0;
                                    comment = '';
                                } else {
                                    alert('Kérlek adj meg értékelést és véleményt is!');
                                }
                            }}
                        >
                            Értékelés küldése
                        </button>
                    </div>
                </div>
                <div class="reviews-section">
                    <h3>Vélemények</h3>
                    {#each reviews as review}
                        <div class="review-item">
                            <div class="review-header">
                                <span class="review-username">{review.username}</span>
                                <div class="review-stars">
                                    {#each Array(5) as _, i}
                                        <span class="star {i < review.rating ? 'active' : ''}">★</span>
                                    {/each}
                                </div>
                            </div>
                            <p class="review-comment">{review.comment}</p>
                            <span class="review-date">{review.timestamp.toLocaleDateString()}</span>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</main>

<style>
    .user-page {
        display: flex;
        min-height: 100vh;
        background-color: #1a1a1a;
        color: #ffffff;
        padding-top: 0.5rem;
    }

    .menu {
        width: 200px;
        background-color: #2a2a2a;
        padding-top: 10px;
    }

    .menu-item {
        width: 100%;
        padding: 15px 20px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 16px;
        background: none;
        border: none;
        color: #ffffff;
        text-align: left;
    }

    .menu-item:hover {
        background-color: #3a3a3a;
    }

    .menu-item.active {
        background-color: #4a4a4a;
        border-left: 4px solid #00ff00;
    }

    .menu-item:focus {
        outline: 2px solid #00ff00;
        outline-offset: -2px;
    }

    .content {
        flex: 1;
        width: 600px;
        margin: 0 auto;
    }

    h2 {
        text-align: center;
        color: #00ff00;
        margin-bottom: 1rem;
        font-size: 24px;
    }

    /* Settings styles */
    .settings-content,
    .chat-content,
    .highscore-content,
    .preview-content {
        width: 600px;
        margin: 0 auto;
        background-color: #2a2a2a;
        padding: 15px;
        border-radius: 6px;
    }

    .settings-form,
    .chat-messages,
    .highscore-list,
    .rating-section {
        width: 100%;
        padding: 15px;
        background: rgba(0, 255, 0, 0.05);
        border: 1px solid #00ff00;
        border-radius: 4px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 6px;
        color: #00ff00;
        font-size: 14px;
    }

    .input-group {
        position: relative;
        width: 100%;
    }

    .input-group input {
        width: 100%;
        padding: 6px;
        padding-right: 35px;
        background: #2a2a2a;
        border: 1px solid #00ff00;
        color: #ffffff;
        border-radius: 4px;
        font-size: 14px;
    }

    .input-group input:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .toggle-password {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .password-eye-icon {
        width: 20px;
        height: 20px;
        filter: invert(100%) sepia(100%) saturate(100%) hue-rotate(100deg) brightness(100%) contrast(100%);
    }

    .settings-divider {
        border: none;
        border-top: 1px solid #00ff00;
        margin: 1.5rem 0;
        opacity: 0.3;
    }

    .error {
        color: #ff3e3e;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        text-align: left;
        text-shadow: 0 0 5px rgba(255, 62, 62, 0.5);
    }

    .save-button {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
        font-size: 14px;
    }

    .save-button:hover {
        background: #0056b3;
    }

    .save-button:disabled {
        background: #6c757d;
        cursor: not-allowed;
    }

    /* Chat styles */
    .chat-messages {
        margin-bottom: 20px;
        height: 400px;
        overflow-y: auto;
    }

    .message {
        display: flex;
        align-items: center;
        gap: 3px;
        margin-bottom: 6px;
        padding: 5px 6px;
        border-radius: 4px;
        background: rgba(0, 255, 0, 0.05);
        position: relative;
        font-size: 14px;
    }

    .message-text {
        flex: 1;
        margin-left: 0;
    }

    .message input {
        flex: 1;
        background: #2a2a2a;
        border: 1px solid #00ff00;
        color: #ffffff;
        padding: 3px 5px;
        border-radius: 4px;
        margin-left: 0;
        font-size: 14px;
    }

    .message-actions {
        display: none;
        position: absolute;
        right: 6px;
        gap: 10px;
        font-size: 13px;
    }

    .action-link {
        color: #00ff00;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
        text-decoration: none;
        background: none;
        border: none;
        padding: 0;
        font: inherit;
    }

    .action-link:hover {
        opacity: 1;
    }

    .action-link.delete {
        color: #ff3e3e;
    }

    .action-link.cancel {
        color: #6c757d;
    }

    .my-message:hover .message-actions {
        display: flex;
    }

    .username {
        color: #00ff00;
        font-weight: bold;
        white-space: nowrap;
        margin-right: 0;
    }

    .chat-input {
        width: 100%;
        display: flex;
        gap: 8px;
        margin-top: 20px;
        background: rgba(0, 255, 0, 0.05);
        border: 1px solid #00ff00;
        border-radius: 4px;
        padding: 15px;
    }

    .chat-input input {
        flex: 1;
        padding: 6px;
        background: #2a2a2a;
        border: 1px solid #00ff00;
        color: #ffffff;
        border-radius: 4px;
        font-size: 14px;
    }

    .chat-input button {
        padding: 6px 15px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 14px;
    }

    .chat-input button:hover {
        background: #0056b3;
    }

    /* Highscore styles */
    .highscore-list {
        width: 100%;
        padding: 15px;
        background: rgba(0, 255, 0, 0.05);
        border: 1px solid #00ff00;
        border-radius: 4px;
    }

    /* Preview styles */
    .rating-input {
        margin-bottom: 15px;
    }

    .rating-input label {
        display: block;
        color: #00ff00;
        margin-bottom: 8px;
        font-size: 14px;
    }

    .star-rating {
        display: flex;
        gap: 10px;
    }

    .star {
        background: none;
        border: none;
        font-size: 20px;
        color: #444;
        cursor: pointer;
        transition: color 0.3s;
    }

    .star.active {
        color: #00ff00;
    }

    .comment-input {
        margin-top: 20px;
    }

    .comment-input label {
        display: block;
        color: #00ff00;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .comment-input textarea {
        width: 100%;
        padding: 8px;
        background: #2a2a2a;
        border: 1px solid #00ff00;
        color: #ffffff;
        border-radius: 4px;
        resize: vertical;
        margin-bottom: 12px;
        font-size: 14px;
    }

    .submit-review {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
        font-size: 14px;
    }

    .submit-review:hover {
        background: #0056b3;
    }

    .reviews-section {
        margin-top: 30px;
    }

    .review-item {
        background: rgba(0, 255, 0, 0.05);
        border: 1px solid #00ff00;
        border-radius: 4px;
        padding: 12px;
        margin-bottom: 12px;
        font-size: 14px;
    }

    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .review-username {
        color: #00ff00;
        font-weight: bold;
    }

    .review-stars {
        display: flex;
        gap: 5px;
    }

    .review-stars .star {
        font-size: 14px;
    }

    .review-comment {
        color: #ffffff;
        margin: 10px 0;
    }

    .review-date {
        display: block;
        color: #666;
        font-size: 11px;
        text-align: right;
    }
</style>
