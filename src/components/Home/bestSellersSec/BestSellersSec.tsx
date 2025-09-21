import Menu from '@/components/menu/Menu'
import Heading from '@/components/ui/Heading'
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';
import { getBestSellers } from '@/server/db/product'
import { ProductWithRelations } from '@/types/product';

const BestSellersSec = async () => {

    const bestSellers = await getBestSellers(3);

    const locale = await getCurrentLocale();
    const { home } = await getTrans(locale);
    const { bestSellers: bestSellersTrans } = home
    
    return (
        <section>
            <div className='container section-gap'>
                <div className='text-center'>
                    <Heading subTitle={bestSellersTrans.subTitle} title={bestSellersTrans.title} />
                </div>

                <div className='section-gap'>
                    <Menu items={bestSellers as ProductWithRelations[]} />
                </div>
            </div>
        </section>
    )
}

export default BestSellersSec