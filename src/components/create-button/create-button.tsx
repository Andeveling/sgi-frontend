import { PlusCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateButtonProps {
  onClick: () => void;
  entityName: string;
}

export default function CreateButton({
  onClick,
  entityName,
}: CreateButtonProps) {
  return (
    <Button variant="default" size="sm" className="h-9" onClick={onClick}>
      <PlusCircleIcon className="h-4 w-4 mr-1" />
      Create {entityName}
    </Button>
  );
}
