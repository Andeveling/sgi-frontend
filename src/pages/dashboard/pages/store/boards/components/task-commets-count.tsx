import { Button } from '@/components/ui/button';
import { useSocket } from '@/context/SocketContext';
import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const TaskCommentsCount = ({ taskId }: { taskId: string }) => {
  const { emit, on, off } = useSocket();
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    const handleCommentsData = (data: { taskId: string; count: number }) => {
      if (data.taskId === taskId) {
        setCommentsCount(data.count);
      }
    };

    if (taskId) {
      // Emitir evento para suscribirse y obtener los datos iniciales
      emit('subscribeToTaskComments', { taskId });
    }

    // Escuchar eventos de actualizaciones
    on('taskCommentsUpdated', handleCommentsData);
    on('taskCommentsData', handleCommentsData);

    return () => {
      // Limpiar suscripción al desmontar
      off('taskCommentsUpdated', handleCommentsData);
      off('taskCommentsData', handleCommentsData);
    };
  }, [taskId, emit, on, off]);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-primary"
      disabled
    >
      <MessageSquare className="h-4 w-4 mr-1" />
      <span className="text-xs">{commentsCount}</span>
    </Button>
  );
};

export default TaskCommentsCount;
