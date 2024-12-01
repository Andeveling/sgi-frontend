import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export const CreateProductAction = () => {
  const params = useParams();
  return (
    <Button variant="default" size="sm" className='h-9'>
      <PlusCircleIcon className="h-4 w-4 mr-1" />
      <Link to={`/dashboard/${params.storeId}/products/create`}>Create Product</Link>
    </Button>
  );
};
