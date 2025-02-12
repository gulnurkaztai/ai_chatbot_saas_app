'use server'

import prisma from '@/lib/prisma'


async function createUser(user) {
    try {
        console.log("⏳ Inserting user into DB:", user);

        await prisma.user.create({
            data: {
                id: user.id,
                email: user.email_addresses?.[0]?.email_address || "",
                name: `${user.first_name} ${user.last_name}`,
            },
        });

        console.log("✅ User successfully inserted into DB");
    } catch (error) {
        console.error("❌ Database Insert Error:", error);
    }
}
