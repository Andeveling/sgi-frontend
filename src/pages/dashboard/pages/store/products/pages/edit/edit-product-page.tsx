import { useParams } from 'react-router-dom';
import ProductDetailsCard from '../../components/product-details-card/product-details-card';
import ProductStatisticsCard from '../../components/product-statistics-card/product-statistics-card';
import ProductForm from '../../components/products-form/product-form';
import { useTitleView } from '@/hooks/use-title-view';
import { ProductFormProvider } from '../../context/product-form-context';

export default function EditProductPage() {
  useTitleView({ layoutDisplayName: 'Dashboard', viewDisplayName: 'Edit Product' });
  const { productId } = useParams();
  return (
    <ProductFormProvider productId={productId}>
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
