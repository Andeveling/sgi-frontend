import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TaskComment } from './task-comment';
import { Task } from '@/models/task.model';
import { Star } from 'lucide-react';

interface TaskDetailsModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
}

export function TaskDetailsModal({
  task,
  isOpen,
  onClose,
  onCommentAdded,
}: TaskDetailsModalProps) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(task.comments || []);
  const [starCount, setStarCount] = useState(task.stars || 0);
  const [isStarred, setIsStarred] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: {
          name: 'Current User', // Replace with actual user data
          avatar: '/placeholder.svg?height=40&width=40',
        },
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, comment]);
      setNewComment('');
      onCommentAdded();
      // TODO: Implement API call to save the new comment
    }
  };

  const handleStarClick = () => {
    setIsStarred(!isStarred);
    setStarCount((prevCount) => (isStarred ? prevCount - 1 : prevCount + 1));
    // TODO: Implement API call to update star count on the server
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{task.title}</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
              onClick={handleStarClick}
            >
              <Star
                className={`h-4 w-4 mr-1 ${isStarred ? 'fill-primary' : ''}`}
              />
              <span>{starCount}</span>
            </Button>
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
                <TaskComment key={comment.id} comment={comment} />
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
            <Button onClick={handleAddComment} className="mt-2">
              Add Comment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
