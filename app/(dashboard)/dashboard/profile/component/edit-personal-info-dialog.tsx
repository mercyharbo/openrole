"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useApi } from "@/hooks/use-api"
import { useApplicantProfile } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as z from "zod"

const personalInfoSchema = z.object({
  personal_info: z.object({
    phone: z.string().optional().nullable(),
    date_of_birth: z.string().optional().nullable(),
    nationality: z.string().optional().nullable(),
    address_city: z.string().optional().nullable(),
    address_country: z.string().optional().nullable(),
    address_postal_code: z.string().optional().nullable(),
    address_state: z.string().optional().nullable(),
    address_street: z.string().optional().nullable(),
    country_of_residence: z.string().optional().nullable(),
    emergency_contact_name: z.string().optional().nullable(),
    emergency_contact_phone: z.string().optional().nullable(),
    emergency_contact_relationship: z.string().optional().nullable(),
  }),
})

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

export function EditPersonalInfoDialog() {
  const { isPersonalInfoDialogOpen, setPersonalInfoDialogOpen } = useProfileStore()
  const { patch } = useApi()
  const { applicant, refreshApplicant } = useApplicantProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema) as Resolver<PersonalInfoFormValues>,
    defaultValues: {
      personal_info: {
        phone: "",
        date_of_birth: "",
        nationality: "",
        address_city: "",
        address_country: "",
        address_postal_code: "",
        address_state: "",
        address_street: "",
        country_of_residence: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        emergency_contact_relationship: "",
      },
    },
  })

  useEffect(() => {
    if (isPersonalInfoDialogOpen && applicant) {
      form.reset({
        personal_info: {
          phone: applicant.personal_info?.phone || "",
          date_of_birth: applicant.personal_info?.date_of_birth || "",
          nationality: applicant.personal_info?.nationality || "",
          address_city: applicant.personal_info?.address_city || "",
          address_country: applicant.personal_info?.address_country || "",
          address_postal_code: applicant.personal_info?.address_postal_code || "",
          address_state: applicant.personal_info?.address_state || "",
          address_street: applicant.personal_info?.address_street || "",
          country_of_residence: applicant.personal_info?.country_of_residence || "",
          emergency_contact_name: applicant.personal_info?.emergency_contact_name || "",
          emergency_contact_phone: applicant.personal_info?.emergency_contact_phone || "",
          emergency_contact_relationship: applicant.personal_info?.emergency_contact_relationship || "",
        },
      })
    }
  }, [isPersonalInfoDialogOpen, applicant, form])

  const onSubmit: SubmitHandler<PersonalInfoFormValues> = async (values) => {
    setIsSubmitting(true)
    try {
      const { error } = await patch("applicants/me", {
        personal_info: values.personal_info,
      })

      if (error) {
        toast.error(error)
        form.setError("root", { message: error })
        return
      }

      toast.success("Personal info updated successfully")
      await refreshApplicant()
      setPersonalInfoDialogOpen(false)
    } catch (err) {
      const msg = (err as Error)?.message || "An error occurred"
      toast.error(msg)
      form.setError("root", { message: msg })
      console.error("An error occurred:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isPersonalInfoDialogOpen} onOpenChange={setPersonalInfoDialogOpen}>
      <DialogContent className="flex h-[80dvh] w-full max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="text-gray-900 dark:text-white">
            Edit Personal Info
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto p-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {form.formState.errors.root && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {form.formState.errors.root.message}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <FormField<PersonalInfoFormValues>
                  control={form.control}
                  name="personal_info.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 08012345678"
                          className="h-10"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField<PersonalInfoFormValues>
                  control={form.control}
                  name="personal_info.date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="h-10"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField<PersonalInfoFormValues>
                  control={form.control}
                  name="personal_info.nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Nigerian"
                          className="h-10"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField<PersonalInfoFormValues>
                  control={form.control}
                  name="personal_info.country_of_residence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country of Residence</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Nigeria"
                          className="h-10"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-2">
                  <FormField<PersonalInfoFormValues>
                    control={form.control}
                    name="personal_info.address_street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. No 20, idowu kolade street"
                            className="h-10"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField<PersonalInfoFormValues>
                  control={form.control}
                  name="personal_info.address_city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Osogbo"
                          className="h-10"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField<PersonalInfoFormValues>
                  control={form.control}
                  name="personal_info.address_state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Osun"
                          className="h-10"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField<PersonalInfoFormValues>
                  control={form.control}
                  name="personal_info.address_country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Country</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Nigeria"
                          className="h-10"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField<PersonalInfoFormValues>
                  control={form.control}
                  name="personal_info.address_postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 12701"
                          className="h-10"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-2 pt-2 text-sm font-medium text-gray-500">
                  Emergency Contact
                </div>
                <FormField<PersonalInfoFormValues>
                  control={form.control}
                  name="personal_info.emergency_contact_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          className="h-10"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField<PersonalInfoFormValues>
                  control={form.control}
                  name="personal_info.emergency_contact_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
                          className="h-10"
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="col-span-2">
                  <FormField<PersonalInfoFormValues>
                    control={form.control}
                    name="personal_info.emergency_contact_relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Spouse, Parent, etc."
                            className="h-10"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPersonalInfoDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
