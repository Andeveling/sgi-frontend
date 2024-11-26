import api from "@/api/api";
import { Task } from "@/models/task.model";

export const TaskService = {
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
    return api.patch('/tasks/move', data);
  },
};
