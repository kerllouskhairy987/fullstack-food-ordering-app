
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Category } from '../../../../../../generated/prisma';
import EditCategory from './EditCategory';
import { ITranslations } from '@/types/translations';
import DeleteCategory from './DeleteCategory';


const CategoryItems = ({ category, translations }: { category: Category, translations: ITranslations }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell className="text-right">
                <div className='flex gap-3 justify-end'>
                    <EditCategory category={category} translations={translations} />
                    <DeleteCategory id={category.id} translations={translations} />
                </div>
            </TableCell>
        </TableRow>
    )
}

export default CategoryItems