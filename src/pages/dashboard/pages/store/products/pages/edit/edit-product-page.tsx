import { Card, CardContent } from '@/components/ui/card';
import { FormProvider } from 'react-hook-form';
import ProductDetailsCard from '../../components/product-details-card/product-details-card';
import ProductStatisticsCard from '../../components/product-statistics-card/product-statistics-card';
import ProductForm from '../../components/products-form/product-form';
import { useEditPage } from './hooks/use-edit-product-hook';
import { Navigate } from 'react-router-dom';

export default function EditProductPage() {
  const { form, isPending, error } = useEditPage();
  if (isPending) return 'Loading...';
  if (error) return <Navigate to='/dashboard/products' />

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-2">
        <div className={`col-span-1  rounded-lg shadow-md`}>
          <Card>
            <CardContent>
              <ProductForm isEdit/>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 col-span-1">
          <ProductStatisticsCard />
          <ProductDetailsCard />
        </div>
      </div>
    </FormProvider>
  );
}
