import { json } from '@sveltejs/kit';
import { generateSessionToken, createSession, setSessionTokenCookie, createUser } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';

export async function POST({ request, cookies }) {
    try {
        const userData = await request.json();

        // Basic validation
        if (!userData.fullName || !userData.username || !userData.email || !userData.password) {
            return json({ 
                error: 'Minden mező kitöltése kötelező.' 
            }, { status: 400 });
        }

        if (userData.password.length < 8) {
            return json({ 
                error: 'A jelszónak legalább 8 karakter hosszúnak kell lennie.' 
            }, { status: 400 });
        }

        // Check if username or email already exists
        const existingUser = await db.query.users.findFirst({
            where: (users) => 
                eq(users.username, userData.username) || 
                eq(users.email, userData.email)
        });

        if (existingUser) {
            return json({ 
                error: 'A felhasználónév vagy email cím már foglalt.' 
            }, { status: 400 });
        }

        // Create user
        const { id: userId } = await createUser(userData);

        // Create session
        const token = generateSessionToken();
        const session = await createSession(token, userId);

        // Set session cookie
        setSessionTokenCookie({ cookies }, token, session.expiresAt);

        return json({ success: true });
    } catch (error) {
        console.error('Registration error:', error);
        return json({ 
            error: 'Hiba történt a regisztráció során. Kérjük, próbáld újra később.' 
        }, { status: 500 });
    }
}
