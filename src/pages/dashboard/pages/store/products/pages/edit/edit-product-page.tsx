import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import ProductDetailsCard from '../../components/product-details-card/product-details-card';
import ProductStatisticsCard from '../../components/product-statistics-card/product-statistics-card';
import ProductFormProvider from '../../components/products-form/product-form-provider';
import ProductForm from '../../components/products-form/product-form';

export default function EditProductPage() {
  const { productId } = useParams();
  return (
    <ProductFormProvider productId={productId}>
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
    </ProductFormProvider>
  );
}
