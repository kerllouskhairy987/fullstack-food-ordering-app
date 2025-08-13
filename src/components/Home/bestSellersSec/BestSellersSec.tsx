import Menu from '@/components/menu/Menu'
import Heading from '@/components/ui/Heading'

const BestSellersSec = () => {
    const bestSellers = [
        { id: crypto.randomUUID(), image: "/heroSecImg.png", name: "pizza", description: "this is pizza", basePrice: 12 },
        { id: crypto.randomUUID(), image: "/heroSecImg.png", name: "pizza", description: "this is pizza", basePrice: 12 },
        { id: crypto.randomUUID(), image: "/heroSecImg.png", name: "pizza", description: "this is pizza", basePrice: 12 },
    ]
    return (
        <section>
            <div className='container section-gap'>
                <div className='text-center'>
                    <Heading subTitle='check out' title='best sellers' />
                </div>

                <div className='section-gap'>
                    <Menu items={bestSellers} />
                </div>
            </div>
        </section>
    )
}

export default BestSellersSec