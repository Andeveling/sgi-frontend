import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CustomersPage() {
  return (
    <div className="p-4">
      <Button>
        <Plus className="mr-2 h-4 w-4" /> Add New Customer
      </Button>
    </div>
  );
}
