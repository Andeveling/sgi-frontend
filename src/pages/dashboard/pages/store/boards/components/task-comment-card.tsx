import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TaskComment } from '@/models/task-comment.model';

interface TaskCommentProps {
  comment: TaskComment;
}

export function TaskCommentCard({ comment }: TaskCommentProps) {
  return (
    <Card className="mb-2">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <Avatar>
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-sm font-medium">
            {comment.author.name}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm">{comment.content}</p>
      </CardContent>
    </Card>
  );
}
