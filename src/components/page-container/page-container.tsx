import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

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
