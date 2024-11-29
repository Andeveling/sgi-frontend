import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Task } from '@/models/task.model';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical, Star, MessageSquare } from 'lucide-react';
import { TaskDetailsModal } from './task-details-modal';

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starCount, setStarCount] = useState(task.stars || 0);
  const [isStarred, setIsStarred] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task',
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary',
      },
    },
  });

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent opening the modal when clicking the drag handle or footer buttons
    if (!(e.target as HTMLElement).closest('button')) {
      setIsModalOpen(true);
    }
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
    setStarCount((prevCount) => (isStarred ? prevCount - 1 : prevCount + 1));
    // TODO: Implement API call to update star count on the server
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
        })}
        onClick={handleCardClick}
      >
        <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
          <Button
            variant={'ghost'}
            {...attributes}
            {...listeners}
            className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
          >
            <span className="sr-only">Move task</span>
            <GripVertical className="h-4 w-4" />
          </Button>
          <Badge variant={'outline'} className="ml-auto font-semibold">
            Task
          </Badge>
        </CardHeader>
        <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
          {task.title}
        </CardContent>
        <CardFooter className="px-3 py-2 border-t border-secondary flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
            onClick={handleStarClick}
          >
            <Star
              className={`h-4 w-4 mr-1 ${isStarred ? 'fill-primary' : ''}`}
            />
            <span className="text-xs">{starCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{task.comments?.length || 0}</span>
          </Button>
        </CardFooter>
      </Card>
      <TaskDetailsModal
        task={task}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCommentAdded={() => {
          
          task.comments = [...(task.comments || []), {}];
        }}
      />
    </>
  );
}
