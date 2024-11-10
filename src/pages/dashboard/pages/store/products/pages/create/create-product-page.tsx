import { useTitleView } from '@/hooks/use-title-view';
import ProductDetailsCard from '../../components/product-details-card/product-details-card';
import ProductStatisticsCard from '../../components/product-statistics-card/product-statistics-card';
import ProductForm from '../../components/products-form/product-form';
import ProductFormProvider from '../../components/products-form/product-form-provider';

export default function CreateProductPage() {
  useTitleView({ layoutDisplayName: 'Dashboard', viewDisplayName: 'Create Product' });
  return (
    <ProductFormProvider>
      <div className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-2">
        <div className={`col-span-1  rounded-lg shadow-md`}>
          <ProductForm />
        </div>
        <div className="space-y-6 col-span-1">
          <ProductStatisticsCard />
          <ProductDetailsCard />
        </div>
      </div>
    </ProductFormProvider>
  );
}
