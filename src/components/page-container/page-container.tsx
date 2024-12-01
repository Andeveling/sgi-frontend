import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { useTitleView } from '@/hooks/use-title-view';

type PageContainerProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function PageContainer({
  title,
  description,
  children,
}: PageContainerProps) {
  useTitleView({ layoutDisplayName: 'Dashboard', viewDisplayName: title });
  return (
    <Card className="bg-background/25 p-8 rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
