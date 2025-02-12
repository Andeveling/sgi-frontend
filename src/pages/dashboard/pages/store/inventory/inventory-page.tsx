import PageContainer from '@/components/page-container/page-container';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MovementsTable } from './components/movements-table';
import { EntryForm } from './components/entry-form';
import { ExitForm } from './components/exit-form';

export default function InventoryPage() {
  return (
    <PageContainer title="Inventory" description="Manage your inventory">
      <Tabs defaultValue="Movements" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="Movements">Movements</TabsTrigger>
          <TabsTrigger value="Entries">Entries</TabsTrigger>
          <TabsTrigger value="Exits">Exits</TabsTrigger>
        </TabsList>
        <TabsContent value="Movements">
          <MovementsTable />
        </TabsContent>
        <TabsContent value="Entries">
          <EntryForm />
        </TabsContent>
        <TabsContent value="Exits">
          <ExitForm />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
