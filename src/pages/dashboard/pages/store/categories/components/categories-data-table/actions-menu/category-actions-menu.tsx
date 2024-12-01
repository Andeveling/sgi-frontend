import { Category } from '@/models/category.model';
import DeleteCategoryAlert from './delete-category-alert';
import EditCategoryPopover from './edit-category-popover';

export default function CategoryActionsMenu({ category }: { category: Category }) {
  return (
    <div className="flex space-x-2">
      <EditCategoryPopover category={category} />
      <DeleteCategoryAlert category={category} />
    </div>
  );
}
