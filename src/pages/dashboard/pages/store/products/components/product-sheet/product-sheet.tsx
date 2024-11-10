import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import ProductForm from '../products-form/product-form';

export function ProductSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]" >
        <SheetHeader>
          <SheetTitle>Create Product</SheetTitle>
          <SheetDescription>Create a new product</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4">
          <ProductForm />
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
