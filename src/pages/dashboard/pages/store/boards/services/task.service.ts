import api from '@/api/api';
import { Task } from '@/models/task.model';

export const TaskService = {

  async getTasksByBoard(boardId: string) {
    const res = await api.get<Task[]>(`/tasks/board/${boardId}`);
    const data = res.data;
    return data;
  },

  async createTask(data: {
    title: string;
    columnId: string;
    description?: string;
  }) {
    return api.post<Task>('/tasks', data);
  },
  async updateTask(
    taskId: string,
    data: { title?: string; description?: string },
  ) {
    return api.patch(`/tasks/${taskId}`, data);
  },
  async deleteTask(taskId: string) {
    return api.delete(`/tasks/${taskId}`);
  },
  async moveTask(data: {
    taskId: string;
    targetColumnId: string;
    targetPosition: number;
  }) {
    console.log('Moving task:', data);
    return api.post('/tasks/move', data);
  },
};
