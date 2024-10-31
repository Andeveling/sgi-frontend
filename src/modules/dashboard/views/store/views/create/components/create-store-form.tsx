import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Store, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  description: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  cellphoneNumber: z
    .string()
    .min(1, "Cellphone number is required")
    .regex(/^[0-9]+$/, "Please enter a valid number"),
})

export default function CreateStoreForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      cellphoneNumber: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(values)
    setIsSubmitting(false)
    // Here you would typically send the data to your backend
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl'>Create New Store</CardTitle>
        <CardDescription>Add a new store to your inventory management system</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Store className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                      <Input placeholder='Enter store name' {...field} className='pl-8' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Enter store description' className='min-h-[100px]' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <MapPin className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                      <Input placeholder='Enter store address' {...field} className='pl-8' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='cellphoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cellphone Number</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Phone className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                      <Input placeholder='Enter cellphone number' {...field} className='pl-8' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Store"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
