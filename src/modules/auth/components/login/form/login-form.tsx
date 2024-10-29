import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/hooks/store.hooks"
import { useToast } from "@/hooks/use-toast"
import { type LoginForm, loginSchema } from "@/modules/auth/schemas/login.schema"
import { useLoginMutation } from "@/modules/auth/services/auth.services"
import { setCredentials } from "@/modules/auth/slices"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const { toast } = useToast()
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const user = await login(data).unwrap()
      dispatch(setCredentials({ user, token: user.token }))
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mx-auto max-w-md space-y-6'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Login</h1>
          <p className='text-muted-foreground'>Enter your email and password to access your account.</p>
        </div>

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Email</FormLabel>
              <FormControl>
                <Input id={field.name} type='email' placeholder='m@example.com' {...field} />
              </FormControl>
              <FormDescription>We'll never share your email with anyone else.</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Password</FormLabel>
              <FormControl>
                <Input id={field.name} type='password' autoComplete='current-password' {...field} />
              </FormControl>
              <FormDescription>We'll never share your password with anyone else.</FormDescription>
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  )
}
