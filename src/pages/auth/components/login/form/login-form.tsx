import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema, LoginFormType } from '@/pages/auth/schemas';
import { useAuthStore } from '@/store/auth/auth.store';
import { toast } from 'sonner';

export default function LoginForm() {
  const login = useAuthStore((state) => state.loginUser);
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      await login(data.identifier, data.password);
      toast.success('Login exitoso');
    } catch (error) {
      toast.error('Login fallido');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-6"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">
            Enter your email and password to access your account.
          </p>
        </div>

        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Email</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  type="email"
                  placeholder="m@example.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Password</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We'll never share your password with anyone else.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          login
        </Button>
      </form>
    </Form>
  );
}
