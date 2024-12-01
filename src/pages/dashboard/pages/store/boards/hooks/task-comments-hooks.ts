import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskCommentService } from '../services/task-comments.service';

// Constantes de claves para React Query
const taskCommentsKeys = {
  all: ['task-comments'] as const,
  task: (taskId: string) => [...taskCommentsKeys.all, 'task', taskId] as const,
};

export const useTaskComments = (taskId: string) => {
  return useQuery({
    queryKey: taskCommentsKeys.task(taskId),
    queryFn: () => TaskCommentService.getCommentsByTask(taskId),
    enabled: !!taskId, // Solo se ejecuta si el taskId está definido
  });
};

export const useCreateTaskComment = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { taskId: string; content: string }) =>
      TaskCommentService.createComment(data),
    onSuccess: () => {
      // Refresca los comentarios de la tarea después de crear uno
      queryClient.invalidateQueries({
        queryKey: taskCommentsKeys.task(taskId),
      });
    },
  });
};

export const useUpdateTaskComment = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { commentId: string; content: string }) =>
      TaskCommentService.updateComment(data.commentId, {
        content: data.content,
      }),
    onSuccess: () => {
      // Refresca los comentarios de la tarea actual después de una actualización
      queryClient.invalidateQueries({
        queryKey: taskCommentsKeys.task(taskId),
      });
    },
  });
};

export const useDeleteTaskComment = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) =>
      TaskCommentService.deleteComment(commentId),
    onSuccess: () => {
      // Refresca los comentarios de la tarea actual después de borrar uno
      queryClient.invalidateQueries({
        queryKey: taskCommentsKeys.task(taskId),
      });
    },
  });
};
