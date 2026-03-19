"use client"

import { Icons } from "@/components/landing/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useApi } from "@/hooks/use-api"
import { useBillingPlans } from "@/hooks/use-queries"
import { useCallback, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { PricingSkeleton } from "./pricing-skeleton"

export function PricingDialog({ children }: { children: React.ReactNode }) {
  const { post } = useApi()
  const { plans, isLoading } = useBillingPlans()
  const [isProcessing, setIsProcessing] = useState<string | null>(null)
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">(
    "monthly"
  )

  const handlePlanAction = useCallback(
    async (planSlug: string) => {
      setIsProcessing(planSlug)
      const response = await post("/billing/checkout", { plan_slug: planSlug })

      if (response.error) {
        toast.error(response.error)
        setIsProcessing(null)
      } else {
        const checkoutUrl =
          response.data?.checkout_url || response.data?.data?.checkout_url
        if (checkoutUrl) {
          window.location.href = checkoutUrl
        } else {
          setIsProcessing(null)
        }
      }
    },
    [post]
  )

  const handleTopupAction = useCallback(async () => {
    setIsProcessing("topup")
    const response = await post("/billing/topup", {})

    if (response.error) {
      toast.error(response.error)
      setIsProcessing(null)
    } else {
      const checkoutUrl =
        response.data?.checkout_url || response.data?.data?.checkout_url
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        setIsProcessing(null)
      }
    }
  }, [post])

  const filteredPlans = useMemo(() => {
    return plans.filter((p) => p.billing_period.toLowerCase() === period)
  }, [plans, period])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="scrollbar-hide max-h-[70vh] w-full overflow-y-auto border-zinc-200 sm:max-w-4xl dark:border-zinc-800 dark:bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-zinc-950 dark:text-zinc-50">
            Upgrade Your Plan
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
              {(["monthly", "quarterly", "yearly"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`flex h-9 items-center justify-center rounded-lg px-6 text-sm font-medium transition-all ${
                    period === p
                      ? "bg-primary text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  <span className="capitalize">{p}</span>
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <PricingSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlans.map((plan) => {
                const isPro = plan.tier === "pro" || plan.tier === "premium"
                return (
                  <Card
                    key={plan.id}
                    className={`flex flex-col border-zinc-200 transition-all hover:scale-[1.01] dark:border-zinc-800 dark:bg-zinc-900/50 ${isPro ? "ring-2 ring-primary/50" : ""}`}
                  >
                    <CardContent className="flex-1 space-y-4 p-5">
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
                          {plan.name}
                        </div>
                        <div className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">
                          ${plan.price_cents / 100}
                          <span className="text-sm font-normal text-zinc-500">
                            /{plan.billing_period}
                          </span>
                        </div>
                      </div>
                      <Separator className="bg-zinc-100 dark:bg-zinc-800" />
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                          <Icons.Success className="size-4 text-primary" />
                          <span>
                            {plan.applications_per_month === -1
                              ? "Unlimited"
                              : plan.applications_per_month.toLocaleString()}{" "}
                            Apps
                          </span>
                        </li>
                        <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                          <Icons.Success className="size-4 text-primary" />
                          <span>
                            {plan.credits_per_month === -1
                              ? "Unlimited"
                              : plan.credits_per_month.toLocaleString()}{" "}
                            Credits
                          </span>
                        </li>
                        <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                          <Icons.Success className="size-4 text-primary" />
                          <span>Full AI Automation</span>
                        </li>
                        <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                          <Icons.Success className="size-4 text-primary" />
                          <span>Priority Support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="p-5 pt-0">
                      <Button
                        className="h-10 w-full font-bold"
                        variant={isPro ? "default" : "outline"}
                        onClick={() => handlePlanAction(plan.slug)}
                        disabled={isProcessing !== null}
                      >
                        {isProcessing === plan.slug
                          ? "Processing..."
                          : "Get started"}
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}

              {/* Top-up Card */}
              <Card className="flex flex-col border-2 border-dashed border-zinc-200 bg-zinc-50/10 text-center transition-all hover:scale-[1.01] dark:border-zinc-800 dark:bg-zinc-900/10">
                <CardContent className="flex-1 space-y-4 p-5">
                  <div className="flex flex-col items-center gap-3">
                    <div className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold tracking-wider text-zinc-600 uppercase dark:bg-zinc-800 dark:text-zinc-400">
                      Quick Add
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
                        Top-up
                      </div>
                      <p className="text-xs text-zinc-500">
                        Need a quick boost? Buy extra applications or credits
                        instantly.
                      </p>
                    </div>
                  </div>
                  <Separator className="bg-zinc-100 dark:bg-zinc-800" />
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button
                    onClick={handleTopupAction}
                    disabled={isProcessing !== null}
                    variant="outline"
                    className="h-10 w-full border-2 border-zinc-900 font-bold dark:border-zinc-50"
                  >
                    {isProcessing === "topup" ? "Processing..." : "Add Credits"}
                  </Button>
                </CardFooter>
              </Card>

              {filteredPlans.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-zinc-500">
                    No plans found for {period} billing.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
