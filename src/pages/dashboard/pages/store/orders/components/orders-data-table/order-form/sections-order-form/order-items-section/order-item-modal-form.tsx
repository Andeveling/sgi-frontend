import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useOrdersStore } from '@/store/orders/orders.store';
import { Product } from '@/models/product.model';
import { FixedSizeList as List } from 'react-window';
import { toast } from 'sonner';

export default function AddItemModal() {
  const products = useOrdersStore((state) => state.products);
  const addItem = useOrdersStore((state) => state.addOrderItem);
  const updateProductStock = useOrdersStore(
    (state) => state.updateProductStock,
  );
  const [isOpen, setIsOpen] = useState(false);

  const [newItem, setNewItem] = useState<{
    productId: string;
    product: Product | null;
    quantity: number;
  }>({
    productId: '',
    product: null,
    quantity: 0,
  });




  const handleAddNewItem = () => {
    if (newItem.productId && newItem.quantity > 0 && newItem.product) {
      const updatedStock = newItem.product.stock - newItem.quantity;
      if (updatedStock >= 0) {
        updateProductStock(newItem.productId, updatedStock);

        addItem({
          id: newItem.productId,
          productId: newItem.productId,
          product: newItem.product as Product,
          quantity: newItem.quantity,
          price: newItem.product.sellPrice,
        });

        // subscribeToStockUpdates(newItem.productId);

        toast.success('Item added successfully.');
        setNewItem({ productId: '', product: null, quantity: 0 });
        setIsOpen(false);
      } else {
        toast.error('The product is out of stock.');
      }
    }
  };

  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const product = products[index];
    return (
      <div style={style} key={product.id}>
        <SelectItem value={product.id}>{product.name}</SelectItem>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-9 bg-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="">
            <Select
              value={newItem.productId}
              onValueChange={(value) => {
                const selectedProduct = products.find(
                  (product) => product.id === value,
                );
                setNewItem((prev) => ({
                  ...prev,
                  productId: value,
                  product: selectedProduct || null,
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Products</SelectLabel>
                  <List
                    height={200}
                    itemCount={products.length}
                    itemSize={35}
                    width="100%"
                  >
                    {renderRow}
                  </List>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {newItem.product && <ProductDataInfo product={newItem.product} />}
          <div>
            <Input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity || ''}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  quantity: Number(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </div>
        <Button
          onClick={handleAddNewItem}
          disabled={
            !newItem.productId || !newItem.quantity || newItem.quantity <= 0
          }
        >
          Add Item
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const ProductDataInfo = ({ product }: { product: Product }) => {
  const isNotExistingStock = product.stock === 0;
  return (
    <div className="flex flex-col gap-2">
      <ul className="space-y-2">
        <li>
          <b>Name:</b>{' '}
          <span className={isNotExistingStock ? 'line-through' : ''}>
            {product.name}
          </span>
        </li>
        <li>
          <b>Sell Price:</b> {product.sellPrice}
        </li>
        <li>
          <b>Buy Price:</b> {product.buyPrice}
        </li>
        <li>
          Stock: <span className={isNotExistingStock ? 'line-through' : ''}>{product.stock}</span>
        </li>
      </ul>
    </div>
  );
};
