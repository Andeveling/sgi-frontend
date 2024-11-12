import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema, LoginFormType } from '@/pages/auth/schemas';
import { useAuthStore } from '@/store/auth/auth.store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { getValidationError } from '@/utilities/get-validation-error';
import { AxiosError } from 'axios';
import { Toaster } from '@/components/ui/sonner';


export default function LoginForm() {
  const loginUser = useAuthStore((state) => state.loginUser);
  const navigate = useNavigate();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = async ({
    email,
    password,
  }) => {
    try {
      await loginUser(email, password);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(getValidationError(error.code));
      }
    }
  };

  return (
    <Form {...form}>
      <form
        role="form"
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
          name="email"
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          login
        </Button>
        <Toaster />
      </form>
    </Form>
  );
}
