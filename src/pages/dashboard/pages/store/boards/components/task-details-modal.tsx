import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useSocket } from '@/context/SocketContext';
import { SaveTaskComment, TaskComment } from '@/models/task-comment.model';
import { Task } from '@/models/task.model';
import { useAuthStore } from '@/store/auth/auth.store';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TaskCommentCard } from './task-comment-card';
import TaskStarButton from './task-starts';

interface TaskDetailsModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDetailsModal({
  task,
  isOpen,
  onClose,
}: TaskDetailsModalProps) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<TaskComment[]>([]);
  const { emit, on, off } = useSocket();
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleCommentsData = (data: {
      taskId: string;
      count: number;
      comments: TaskComment[];
    }) => {
      if (data.taskId === task.id) {
        setComments(data.comments);
      }
    };

    if (task.id) {
      // Emitir evento para suscribirse y obtener los datos iniciales
      emit('subscribeToTaskComments', { taskId: task.id });
      // Emitir solicitud para obtener los comentarios
      emit('getTaskCommentsData', { taskId: task.id });
    }

    // Escuchar eventos de actualizaciones
    on('taskCommentsUpdated', handleCommentsData);

    // Escuchar eventos de actualizaciones
    on('taskCommentsData', handleCommentsData);

    return () => {
      // Limpiar suscripción al desmontar
      off('taskCommentsUpdated', handleCommentsData);
      off('taskCommentsData', handleCommentsData);
    };
  }, [task.id, emit, on, off]);

  const handleAddComment = () => {
    setLoading(true);
    if (!user?.id) {
      toast.error('No tienes permisos para hacer esto');
      return;
    }

    const data: SaveTaskComment = {
      taskId: task.id,
      userId: user?.id,
      content: newComment,
    };

    emit('addTaskComment', data);
    setNewComment('');
    setLoading(false);
    toast.success('Comentario agregado exitosamente');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mt-4">
          <DialogTitle className="flex justify-between items-center">
            <span>{task.title}</span>
            <TaskStarButton taskId={task.id} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="mt-2 text-sm text-gray-500">{task.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              {comments.map((comment) => (
                <TaskCommentCard key={comment.id} comment={comment} />
              ))}
            </ScrollArea>
          </div>
          <div>
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={handleAddComment}
              className="mt-2"
              disabled={loading}
            >
              Add Comment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
