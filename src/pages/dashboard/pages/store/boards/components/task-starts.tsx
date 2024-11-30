import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSocket } from '@/context/SocketContext';
import { useAuthStore } from '@/store/auth/auth.store';
import { Star } from 'lucide-react';

interface TaskStarButtonProps {
  taskId: string;
}

const TaskStarButton: React.FC<TaskStarButtonProps> = ({ taskId }) => {
  const { emit, on, off } = useSocket();
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const handleLikesUpdate = (data: {
      taskId: string;
      likeCount: number;
      isStarred: boolean;
    }) => {
      if (data.taskId === taskId) {
        setStarCount(data.likeCount);
        setIsStarred(data.isStarred);
      }
    };

    if (user?.id) {
      emit('getTaskLikeStatus', { taskId, userId: user.id });
    }
    on('taskLikesUpdated', handleLikesUpdate);
    on('taskLikeStatus', handleLikesUpdate);
    return () => {
      off('taskLikesUpdated', handleLikesUpdate);
      off('taskLikeStatus', handleLikesUpdate);
    };
  }, [taskId, emit, on, off, user]);

  const handleStarClick = () => {
    if (!user?.id) {
      console.error('Usuario no autenticado');
      return;
    }

    emit('toggleTaskLike', { taskId, userId: user.id });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-primary"
      onClick={handleStarClick}
    >
      <Star className={`h-4 w-4 mr-1 ${isStarred ? 'fill-primary' : ''}`} />
      <span className="text-xs">{starCount}</span>
    </Button>
  );
};

export default TaskStarButton;
