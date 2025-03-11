import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguageStore, translations } from "@/lib/i18n"
import { useToast } from "@/hooks/use-toast"

const bankAccountSchema = z.object({
  accountNumber: z.string().min(8, {
    message: "Account number must be at least 8 characters.",
  }),
  routingNumber: z.string().min(9, {
    message: "Routing number must be at least 9 characters.",
  }),
  accountHolderName: z.string().min(2, {
    message: "Account holder name must be at least 2 characters.",
  }),
  bankName: z.string().min(2, {
    message: "Bank name must be at least 2 characters.",
  }),
})

type BankAccountFormValues = z.infer<typeof bankAccountSchema>

export function BankAccountForm() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { toast } = useToast()
  
  const form = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      accountNumber: "",
      routingNumber: "",
      accountHolderName: "",
      bankName: "",
    },
  })

  const onSubmit = (data: BankAccountFormValues) => {
    toast({
      title: t.bankAccountAdded,
      description: t.yourBankAccountHasBeenAddedSuccessfully,
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.bankName}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Bank of America" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="accountHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.accountHolderName}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="routingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.routingNumber}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="123456789" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.accountNumber}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="12345678" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          {t.addBankAccount}
        </Button>
      </form>
    </Form>
  )
}
