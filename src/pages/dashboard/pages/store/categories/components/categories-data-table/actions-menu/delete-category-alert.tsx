import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Category } from '@/models/category.model';
import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { deleteCategory } from '../../../services/category.service';
import { queryClient } from '@/main';
import { toast } from 'sonner';

interface DeleteCategoryAlertProps {
  category: Category;
}

export default function DeleteCategoryAlert({
  category,
}: DeleteCategoryAlertProps) {
  const mutation = useMutation({
    mutationFn: () => deleteCategory(category.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleDelete = () => {
    mutation.mutate();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 text-primary">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            category?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
