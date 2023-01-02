/* eslint-disable import/no-anonymous-default-export */
import { prisma } from "../../config/prisma";
import authOptions from "./auth/[...nextauth]" ;
import { unstable_getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { PostCategorySchema } from "../../types/postCategory";
import { useSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
    }
    if (req.method === 'POST') {
        const {name} = req.body;
        const response = PostCategorySchema.safeParse(req.body);
        if (!response.success) {
            res.status(400).json({ message: response.error.issues });
        }
        try {
            const category = await prisma.category.create({
                data: {
                    name,
                    userId: "987"
                    // userId: session?.user?.id,
                },
            });
            res.status(201).json(category);
        } catch (e) {
            // console.log(e);
            res.status(500).json({ message: "Category Post Error" });
        }
    }
    res.end();
}