import api from '@/api/api';
import type { TaskComment } from '@/models/task-comment.model';

export const TaskCommentService = {
  // Obtener comentarios por tarea
  async getCommentsByTask(taskId: string) {
    const res = await api.get<TaskComment[]>(`/task-comments/task/${taskId}`);
    return res.data;
  },

  // Crear un nuevo comentario
  async createComment(data: { taskId: string; content: string }) {
    const res = await api.post<TaskComment>('/task-comments', data);
    return res.data;
  },

  // Actualizar un comentario
  async updateComment(commentId: string, data: { content: string }) {
    const res = await api.patch<TaskComment>(
      `/task-comments/${commentId}`,
      data,
    );
    return res.data;
  },

  // Eliminar un comentario
  async deleteComment(commentId: string) {
    const res = await api.delete(`/task-comments/${commentId}`);
    return res.data;
  },
};
