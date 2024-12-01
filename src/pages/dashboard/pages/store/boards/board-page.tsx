import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';
import { useParams } from 'react-router-dom';
import { CreateColumnDialog } from './components/create-column-dialog';
import { KanbanBoard } from './components/kanban-board';
import { useBoardQuery } from './hooks/use-board-query';

export default function BoardPage() {
  const { boardId } = useParams();
  const { data: board } = useBoardQuery(boardId as string);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Board - {board?.name}</CardTitle>
        <CardDescription>{board?.description}</CardDescription>
        <div>
          <CreateColumnDialog boardId={boardId as string} />
        </div>
      </CardHeader>
      <CardContent>
        <KanbanBoard boardId={boardId as string} />
      </CardContent>
    </Card>
  );
}
