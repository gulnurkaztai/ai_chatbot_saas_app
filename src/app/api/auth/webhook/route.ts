import prisma from '@/lib/prisma'
import { NextResponse } from "next/server"
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing CLERK_WEBHOOK_SECRET' }, 
      { status: 500 }
    )
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Missing svix headers' }, 
      { status: 400 }
    )
  }

  try {
    const payload = await req.json()
    const body = JSON.stringify(payload)
    
    const wh = new Webhook(WEBHOOK_SECRET)
    const evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent

    if (evt.type === 'user.created') {
      const { id, first_name, last_name } = evt.data

      await prisma.user.create({
        data: {
          clerkId: id,
          fullname: `${first_name || ""} ${last_name || ""}`.trim(),
          type: "user",
          stripeId: "pending"  // If required by your schema
        },
      })
    }

    return NextResponse.json(
      { message: "User created successfully" }, 
      { status: 201 }
    )
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    )
  }
}
