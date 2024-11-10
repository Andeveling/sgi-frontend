import { Card, CardContent } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CreateProduct,
  CreateProductSchema,
} from '../../../../../../../models/product.model';
import ProductDetailsCard from '../../components/product-details-card/product-details-card';
import ProductStatisticsCard from '../../components/product-statistics-card/product-statistics-card';
import ProductForm from '../../components/products-form/product-form';

export default function CreateProductPage() {
  const form = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: '',
      buyPrice: 0,
      sellPrice: 0,
      stock: 0,
      description: '',
      minStock: 0,
      categoryId: '',
      storeId: '',
    },
  });

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-2">
        <div className={`col-span-1  rounded-lg shadow-md`}>
          <Card>
            <CardContent>
              <ProductForm />
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
