import { PhoneInput } from '@/components/phone-input/phone-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import {
  FirstStoreFormType,
  firstStoreFormSchema,
} from '@/pages/welcome/schemas/first-store-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { MapPin, Store } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createStore } from '../../services/store.service';
import { useAuthStore } from '@/store/auth/auth.store';
import { Separator } from '@/components';

export default function FirstStoreForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const checkProfileUser = useAuthStore((state) => state.checkProfileUser);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const form = useForm<FirstStoreFormType>({
    resolver: zodResolver(firstStoreFormSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      cellphone: '',
    },
  });

  const onSubmit: SubmitHandler<FirstStoreFormType> = async (data) => {
    setIsSubmitting(true);

    try {
      await createStore(data);
      toast.success('Store created successfully');
      await checkProfileUser();
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 overflow-y-auto grid bg-background/25 h-screen justify-center items-center relative">
      <Card className="w-full max-w-md mx-auto my-auto h-fit">
        <CardHeader>
          <CardTitle className="text-2xl">Create a new store</CardTitle>
          <CardDescription>
            Add a new store to your inventory management system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Store className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Awesome Store"
                          {...field}
                          className="pl-8"
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-left">
                      Enter a name for your store
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="This an awesome store description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-left">
                      Enter a description for your store
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Street, number, and zip code"
                          {...field}
                          className="pl-8"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cellphone"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">
                      Cellphone Number
                    </FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        defaultCountry="CO"
                        placeholder="Enter a phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-left">
                      Enter a phone number with whatsApp or Telegram
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Store'}
              </Button>
              <Separator orientation="horizontal" />
              <Button
                type="button"
                className="w-full"
                onClick={logoutUser}
                variant="secondary"
              >
                Maybe later
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
