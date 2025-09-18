import { Locale } from '@/i18n.config'
import { getCategories } from '@/server/db/categories';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import getTrans from '@/lib/translation';
import Form from './_components/Form';
import CategoryItems from './_components/CategoryItems';

const CategoryPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const locale = (await params).locale
    const translations = await getTrans(locale)
    const categories = await getCategories();

    console.log(categories)
    return (
        <main className='grow'>
            <div className="container flex items-center justify-center">
                <div className='w-full backdrop-blur-sm bg-accent p-5 rounded-4xl flex flex-col md:flex-row gap-4 mb-5'>
                    <div className='flex-1 md:max-w-[500px]'>
                        <Form translations={translations} />
                    </div>
                    <div className='flex-1'>
                        {
                            categories && categories.length > 0
                                ? <>
                                    <Table className=' border'>
                                        <TableCaption>{translations.category.table.title}</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-start">
                                                    {translations.category.table.head.name}
                                                </TableHead>
                                                <TableHead className="text-end">
                                                    {translations.category.table.head.actions}
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {categories.map((category) => (
                                                <CategoryItems key={category.id} category={category} translations={translations} />
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TableCell colSpan={1} className='text-start'>
                                                    {translations.category.total}
                                                </TableCell>
                                                <TableCell className="text-end">{categories.length}</TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </>
                                : <span>{translations.messages.noCategoriesFound}</span>
                        }
                    </div>
                </div>
            </div>

        </main>
    )
}

export default CategoryPage