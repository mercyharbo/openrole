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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useApi } from "@/hooks/use-api"
import { useApplicantProfile } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as z from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const complianceSchema = z.object({
  citizenship_status: z.string().optional().nullable(),
  visa_type: z.string().optional().nullable(),
  work_authorization: z.boolean(),
  requires_sponsorship: z.boolean(),
  veteran_status: z.string().optional().nullable(),
  protected_veteran: z.boolean(),
  disability_status: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  race_ethnicity: z.string().optional().nullable(),
  right_to_work_us: z.boolean(),
  right_to_work_uk: z.boolean(),
  right_to_work_eu: z.boolean(),
  right_to_work_canada: z.boolean(),
  right_to_work_australia: z.boolean(),
  visa_expiry_date: z.string().optional().nullable(),
  security_clearance: z.boolean(),
  security_clearance_level: z.string().optional().nullable(),
  criminal_conviction: z.string().optional().nullable(),
  criminal_explanation: z.string().optional().nullable(),
})

type ComplianceFormValues = z.infer<typeof complianceSchema>

export function EditComplianceDialog() {
  const { isComplianceDialogOpen, setComplianceDialogOpen } = useProfileStore()
  const { patch } = useApi()
  const { applicant, refreshApplicant } = useApplicantProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ComplianceFormValues>({
    resolver: zodResolver(complianceSchema) as Resolver<ComplianceFormValues>,
    defaultValues: {
      citizenship_status: "",
      visa_type: "",
      work_authorization: false,
      requires_sponsorship: false,
      veteran_status: "",
      protected_veteran: false,
      disability_status: "no",
      gender: "male",
      race_ethnicity: "",
      right_to_work_us: false,
      right_to_work_uk: false,
      right_to_work_eu: false,
      right_to_work_canada: false,
      right_to_work_australia: false,
      visa_expiry_date: "",
      security_clearance: false,
      security_clearance_level: "",
      criminal_conviction: "no",
      criminal_explanation: "",
    },
  })

  useEffect(() => {
    if (isComplianceDialogOpen && applicant?.compliance_data) {
      form.reset({
        gender: applicant.compliance_data?.gender || "male",
        right_to_work_eu: applicant.compliance_data?.right_to_work_eu ?? false,
        right_to_work_uk: applicant.compliance_data?.right_to_work_uk ?? false,
        right_to_work_us: applicant.compliance_data?.right_to_work_us ?? false,
        disability_status: applicant.compliance_data?.disability_status || "no",
        protected_veteran: applicant.compliance_data?.protected_veteran ?? false,
        security_clearance: applicant.compliance_data?.security_clearance ?? false,
        work_authorization: applicant.compliance_data?.work_authorization ?? false,
        criminal_conviction: applicant.compliance_data?.criminal_conviction || "no",
        requires_sponsorship: applicant.compliance_data?.requires_sponsorship ?? false,
        right_to_work_canada: applicant.compliance_data?.right_to_work_canada ?? false,
        right_to_work_australia: applicant.compliance_data?.right_to_work_australia ?? false,
        // Match additional fields if they exist in the UI schema but not the core type yet, or just fallback
        visa_type: applicant.compliance_data?.visa_type || "",
        visa_expiry_date: applicant.compliance_data?.visa_expiry_date || "",
        citizenship_status: applicant.compliance_data?.citizenship_status || "",
        veteran_status: applicant.compliance_data?.veteran_status || "",
        race_ethnicity: applicant.compliance_data?.race_ethnicity || "",
        security_clearance_level: applicant.compliance_data?.security_clearance_level || "",
        criminal_explanation: applicant.compliance_data?.criminal_explanation || "",
      })
    }
  }, [isComplianceDialogOpen, applicant, form])

  const onSubmit: SubmitHandler<ComplianceFormValues> = async (values) => {
    setIsSubmitting(true)
    try {
      const { error } = await patch("applicants/me/compliance", values)

      if (error) {
        toast.error(error)
        form.setError("root", { message: error })
        return
      }

      toast.success("Compliance data updated successfully")
      await refreshApplicant()
      setComplianceDialogOpen(false)
    } catch (err) {
      const msg = (err as Error)?.message || "An error occurred"
      toast.error(msg)
      form.setError("root", { message: msg })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isComplianceDialogOpen} onOpenChange={setComplianceDialogOpen}>
      <DialogContent className="flex h-[90dvh] w-full max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="flex flex-col border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="text-gray-900 dark:text-white">
            Compliance & EEO
          </DialogTitle>
          <p className="mt-1 text-sm text-gray-500">
            Equal Employment Opportunity and work authorization details. Auto-filled for job applications.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="scrollbar-hide flex-1 space-y-8 overflow-y-auto p-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Citizenship & Visa */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="citizenship_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Citizenship Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="citizen">Citizen</SelectItem>
                          <SelectItem value="permanent_resident">Permanent Resident</SelectItem>
                          <SelectItem value="visa_holder">Visa Holder</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="visa_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visa Type (if applicable)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || "none"}>
                        <FormControl>
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="h1b">H-1B</SelectItem>
                          <SelectItem value="l1">L-1</SelectItem>
                          <SelectItem value="f1">F-1 (OPT)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Authorized to work in target country?</span>
                  <FormField
                    control={form.control}
                    name="work_authorization"
                    render={({ field }) => (
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Require sponsorship now or in future?</span>
                  <FormField
                    control={form.control}
                    name="requires_sponsorship"
                    render={({ field }) => (
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    )}
                  />
                </div>
              </div>

              {/* Veteran Status */}
              <div className="space-y-4 pt-4 border-t dark:border-zinc-800">
                <FormField
                  control={form.control}
                  name="veteran_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Veteran Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="non_veteran">No, I am not a veteran</SelectItem>
                          <SelectItem value="veteran">Yes, I am a veteran</SelectItem>
                          <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Protected Veteran?</span>
                  <FormField
                    control={form.control}
                    name="protected_veteran"
                    render={({ field }) => (
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    )}
                  />
                </div>
              </div>

              {/* Disability Status */}
              <div className="space-y-4 pt-4 border-t dark:border-zinc-800">
                <FormField
                  control={form.control}
                  name="disability_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disability Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || "no"}>
                        <FormControl>
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="No, I do not have a disability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="no">No, I do not have a disability</SelectItem>
                          <SelectItem value="yes">Yes, I have a disability</SelectItem>
                          <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Gender & Race */}
              <div className="space-y-4 pt-4 border-t dark:border-zinc-800">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || "male"}>
                        <FormControl>
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Male" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non_binary">Non-binary</SelectItem>
                          <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="race_ethnicity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Race / Ethnicity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="black">Black or African American</SelectItem>
                          <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                          <SelectItem value="asian">Asian</SelectItem>
                          <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Global Work Authorization */}
              <div className="space-y-4 pt-4 border-t dark:border-zinc-800">
                <h4 className="text-sm font-medium">Global Work Authorization</h4>
                
                {[
                  { name: "right_to_work_us", label: "Right to work in US?" },
                  { name: "right_to_work_uk", label: "Right to work in UK?" },
                  { name: "right_to_work_eu", label: "Right to work in EU?" },
                  { name: "right_to_work_canada", label: "Right to work in Canada?" },
                  { name: "right_to_work_australia", label: "Right to work in Australia?" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <FormField
                      control={form.control}
                      name={item.name as keyof ComplianceFormValues}
                      render={({ field }) => (
                        <FormControl>
                          <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      )}
                    />
                  </div>
                ))}

                <FormField
                  control={form.control}
                  name="visa_expiry_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Visa Expiry Date (if applicable)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-10 w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "MM/dd/yyyy")
                              ) : (
                                <span>mm/dd/yyyy</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Security & Background */}
              <div className="space-y-4 pt-4 border-t dark:border-zinc-800">
                <h4 className="text-sm font-medium">Security & Background</h4>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Do you have security clearance?</span>
                  <FormField
                    control={form.control}
                    name="security_clearance"
                    render={({ field }) => (
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="security_clearance_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Clearance Level</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Secret, Top Secret, SC, DV" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="criminal_conviction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Have you ever been convicted of a crime?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || "no"}>
                        <FormControl>
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="No" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="yes">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="criminal_explanation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>If yes, please explain (optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief explanation..." 
                          className="min-h-[100px] resize-none" 
                          {...field} 
                          value={field.value || ""} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <Button 
                type="submit" 
                className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Compliance Data"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
