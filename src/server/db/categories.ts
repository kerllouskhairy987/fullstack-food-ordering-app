import { cache } from "@/lib/cache"
import { db } from "@/lib/prisma"


// ------------------------------------Get Cashed Categories--------------------------------------
export const getCategories = cache(() => {
    const categories = db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })
    return categories
}, ["categories"], { revalidate: 3600 })