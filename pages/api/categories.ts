/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse} from "next";
import { prisma } from "../../config/prisma";
import { unstable_getServerSession } from "next-auth";
import authOptions from "./auth/[...nextauth]";
import { useSession } from "next-auth/react"; 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    const { data } = useSession();

    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const categories = await prisma.category.findMany({
            where: {
                userId: data?.user?.id,
            },
            select: {
                products: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        lastUpdate: true,
                        date: {
                            select: {
                                stock: true,
                            },
                            take: 1,
                        },
                    },
                },
                name: true,
                id: true,
            },
        });
        console.log(categories);
        res.status(200).json(categories);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
