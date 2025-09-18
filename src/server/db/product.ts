import { cache } from "@/lib/cache"
import { db } from "@/lib/prisma"

// --------------------------Get Cached Best Sellers--------------------------------
export const getBestSellers = cache((limit?: number | undefined) => {
    const bestSellers = db.product.findMany({
        where: {
            orders: {
                some: {}
            }
        },
        orderBy: {
            orders: {
                _count: "desc"  // تنازلي
            }
        },
        include: {
            sizes: true,
            extras: true
        },
        take: limit,
    })
    return bestSellers
}, ["best-sellers"], { revalidate: 3600 })


// --------------------------Get Cached Product By Category--------------------------------
export const getProductByCategory = cache(() => {
    const products = db.category.findMany({
        include: {
            products: {
                include: {
                    sizes: true,
                    extras: true,
                }
            }
        }
    })
    return products
}, ["products-by-category"], { revalidate: 3600 })

// ---------------------------Get Products --------------------------------------
export const getProducts = cache(() => {
    const products = db.product.findMany({
        orderBy: {
            order: "asc"
        }
    })
    return products
}, ["products"], { revalidate: 3600 })

// ----------------------------Get Single Product------------------------
export const getProduct = cache((id: string) => {
    const product = db.product.findUnique({
        where: {
            id: id
        },
        include: {
            sizes: true,
            extras: true
        }
    })
    return product
}, [`product-${crypto.randomUUID()}`], { revalidate: 3600 })
