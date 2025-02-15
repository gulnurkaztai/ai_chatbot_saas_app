import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from 'svix';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  console.log("webhook received");
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("missing clerk webhook");
    throw new Error("add clerk webhook secret to env");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log("Headers received:", { svix_id, svix_timestamp, svix_signature });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.log("Missing svix headers");
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json().catch(() => null);
  if (!payload) {
    console.error('Invalid or empty payload received');
    return new Response('Invalid payload', { status: 400 });
  }

  const body = JSON.stringify(payload);
  console.log("Webhook body:", body);

  const webhook = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("webhook verified successfully");
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;
  console.log("Event type:", eventType);

  if (eventType === "user.created") {
    const { id, first_name, last_name, email_addresses } = evt.data;

    try {
      const user = await prisma.user.create({
        data: {
          clerkId: id,
          fullname: `${first_name || ""} ${last_name || ""}`.trim() || "User",
          type: "user",
          email: email_addresses[0].email_address,
          stripeId: null,
        },
      });
      
      console.log("User created successfully:", user);
      return new Response(
        JSON.stringify({ success: true, user }), 
        { status: 201 }
      );
    } catch (error: any) {
      console.error("Error creating user in db:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error.message || "Failed to create user" 
        }), 
        { status: 500 }
      );
    }
  }

  return new Response("Webhook processed", { status: 200 });
}
