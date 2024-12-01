import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Task } from '@/models/task.model';
import { Column } from '@/models/column.model';

export interface KanbanState {
  tasks: Task[];
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  setTasks: (tasks: Task[]) => void;
  updateTaskColumn: (taskId: Task['id'], newColumnId: Column['id']) => void;
  reorderTasks: (columnId: string, fromIndex: number, toIndex: number) => void;
  reorderColumns: (fromIndex: number, toIndex: number) => void;
}

const storeApi: StateCreator<KanbanState, [], [], KanbanState> = (
  set,
) => ({
  tasks: [],
  columns: [],
  setColumns: (columns) => set({ columns }),
  setTasks: (tasks) => set({ tasks }),
  updateTaskColumn: (taskId, newColumnId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task,
      ),
    })),
  reorderTasks: (columnId, fromIndex, toIndex) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.columnId === columnId) {
          const tasksInColumn = state.tasks
            .filter((t) => t.columnId === columnId)
            .sort((a, b) => a.position - b.position);
          const reorderedTasks = arrayMove(tasksInColumn, fromIndex, toIndex);
          return reorderedTasks.find((t) => t.id === task.id) || task;
        }
        return task;
      }),
    })),
  reorderColumns: (fromIndex, toIndex) =>
    set((state) => ({
      columns: arrayMove(state.columns, fromIndex, toIndex),
    })),
});

export const useKanbanStore = create<KanbanState>()(
  devtools(storeApi, { name: 'kanban' }),
);

export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const updatedArray = [...array];
  const [movedItem] = updatedArray.splice(from, 1);
  updatedArray.splice(to, 0, movedItem);
  return updatedArray;
}
