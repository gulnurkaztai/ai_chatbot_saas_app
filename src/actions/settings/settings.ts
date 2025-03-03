"use server";
import { currentUser } from "@clerk/nextjs/server";
import { Plans } from '@prisma/client';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const onGetCurrentDomainInfo = async (domain: string) => {
  const user = await currentUser();
  if (!user) return { status: 401, message: "Unauthorized" };

  try {
    // TODO: Fetch the user's subscription and count their current domains.
    // TODO: Check if the domain already exists.
    // TODO: Check the subscription plan and enforce limits.
    // TODO: Create a new domain entry and link it to the user.
    const userDomain = await prisma.user.findUnique({
      where: { clerkId: user.id },
      select: {
        billings: {
          select: {
            plan: true
          }
        },
        domain: {
          where: {
            name: {
              contains: domain
            }
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            products: true,
            chatbot: {
              select: {
                id: true,
                welcomeMessage: true,
                icon: true,
              }
            }
          }  
        }
      }
    })

    if(userDomain){
      return userDomain
    } else {
      // If the domain does not exist, check the subscription plan and enforce limits.
      const userSubscription = await prisma.user.findUnique({
        where: { clerkId: user.id },
        select: {
          billings: {
            select: {
              plan: true
            }
          },
          domain: true
        }
      });

      if (!userSubscription) {
        return { status: 404, message: "User subscription not found" };
      }

      const currentDomainCount = userSubscription.domain.length;
      const subscriptionPlan = userSubscription.billings.plan;

      if (!checkSubscriptionLimits(subscriptionPlan, currentDomainCount)) {
        return { status: 403, message: "Subscription limit exceeded" };
      }

      const newDomain = await prisma.domain.create({
        data: {
          name: domain,
          userId: user.id,
        }
      });

      return newDomain;
    }

  } catch (error) {
    console.error(error);
  }
};

const checkSubscriptionLimits = (plan: string, currentCount: number) => {

  const subscriptionLimits = {
    "STANDARD": 1,
    "PRO": 5,
    "ULTIMATE": 10
  };

  return currentCount < subscriptionLimits[plan];
};

export const onCreateDomain = async (domain: string) => {
  const user = await currentUser();
  if (!user) return { status: 401, message: "Unauthorized" };

  try {
    const existingDomain = await prisma.domain.findFirst({
      where: { name: domain }
    });

    if (existingDomain) {
      return { status: 409, message: "Domain already exists" };
    }

    const newDomain = await prisma.domain.create({
      data: {
        name: domain,
        userId: user.id,
      }
    });

    return newDomain;
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
};
