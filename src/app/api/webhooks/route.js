import { Webhook } from 'svix'
import { headers } from 'next/headers'
import {clerkClient, WebhookEvent} from '@clerk/nextjs/server'
import {createOrUpdateUser, deleteUser} from "@/lib/actions/user";

export async function POST(req) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    // Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data
    const eventType = evt?.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', body)

    if (eventType  === 'user.created' || eventType  === 'user.updated'){
        const {id, first_name, last_name, email_addresses, image_url, username} = evt?.data;
        try {
            await createOrUpdateUser(
                id,
                first_name,
                last_name,
                email_addresses,
                image_url,
                username,
            );
            if (user || eventType === 'user.created') {
                try {
                    await clerkClient.users.updateUserMetadata(id, {
                        publicMetadata: {
                            userMongoId: user.id,
                        }
                    });
                }catch (err){
                    console.error('Error creating user:', err);
                }
            }
        }catch (err) {
            console.error('Error creating webhook', err);
            return new Response('Error: Could not create webhook', {
                status: 400,
            })
        }
    }




    if (eventType  === 'user.deleted'){
        const {id} = evt?.data;
        try {
            await deleteUser(id);
        }catch (err) {
            console.error('Error deleting user:', err);
            return new Response('Error deleting user:', {
                status: 400,
            });
        }
    }

    return new Response('Webhook received', { status: 200 })
}