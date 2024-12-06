"use server";

import { prisma } from "@lib";

export const getTitle = async () => {
    const title = await prisma.conversation.findMany({
        select: {
            title: true
        }
    })
}