import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { verifyPassword, generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';
import * as table from '$lib/server/db/schema';

export async function POST({ request, cookies }) {
    try {
        const { username, email, password } = await request.json();

        // Check if either username or email is provided
        if (!password || (!username && !email)) {
            return json({ 
                error: 'Kérlek, add meg az email címet VAGY felhasználónevet és a jelszót!' 
            }, { status: 400 });
        }

        // Find user by username or email
        const user = await db.query.users.findFirst({
            where: username ? 
                eq(table.users.username, username) : 
                eq(table.users.email, email)
        });

        if (!user) {
            return json({ 
                error: 'Hibás felhasználónév/email vagy jelszó.' 
            }, { status: 401 });
        }

        // Verify password
        const isValidPassword = await verifyPassword(password, user.passwordHash);
        if (!isValidPassword) {
            return json({ 
                error: 'Hibás felhasználónév/email vagy jelszó.' 
            }, { status: 401 });
        }

        // Create session
        const token = generateSessionToken();
        const session = await createSession(token, user.id);

        // Set session cookie
        setSessionTokenCookie({ cookies }, token, session.expiresAt);

        return json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return json({ 
            error: 'Hiba történt a bejelentkezés során. Kérjük, próbáld újra később.' 
        }, { status: 500 });
    }
}
