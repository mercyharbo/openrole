import { Button } from "@/components/ui/button"
import { useApi } from "@/hooks/use-api"
import { useBillingPlans } from "@/hooks/use-queries"
import { useAuthStore } from "@/lib/store/auth-store"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Separator } from "../ui/separator"
import { Icons } from "./icons"
import { toast } from "react-toastify"

export const Pricing = () => {
  return (
    <Suspense fallback={<div className="h-20" />}>
      <PricingContent />
    </Suspense>
  )
}

const PricingContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { post } = useApi()
  const { accessToken } = useAuthStore()
  
  const { plans, isLoading } = useBillingPlans()
  const [isProcessing, setIsProcessing] = useState<string | null>(null)
  const hasAutoTriggered = useRef(false)
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">(
    "monthly"
  )

  const handlePlanAction = useCallback(async (planSlug: string) => {
    if (!accessToken) {
      router.push(`/login?redirect_to=/#pricing&action=checkout&plan_slug=${planSlug}`)
      return
    }

    setIsProcessing(planSlug)
    const response = await post("/billing/checkout", { plan_slug: planSlug })
    
    if (response.error) {
      toast.error(response.error)
      setIsProcessing(null)
    } else {
      const checkoutUrl = response.data?.checkout_url || response.data?.data?.checkout_url
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        toast.error("Failed to initiate checkout")
        setIsProcessing(null)
      }
    }
  }, [accessToken, post, router])

  const handleTopupAction = useCallback(async () => {
    if (!accessToken) {
      router.push("/login?redirect_to=/#pricing&action=topup")
      return
    }

    setIsProcessing("topup")
    const response = await post("/billing/topup", {})
    
    if (response.error) {
      toast.error(response.error)
      setIsProcessing(null)
    } else {
      const checkoutUrl = response.data?.checkout_url || response.data?.data?.checkout_url
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        toast.error("Failed to initiate top-up")
        setIsProcessing(null)
      }
    }
  }, [accessToken, post, router])

  // Handle automatic action after redirecting back from login/register
  useEffect(() => {
    if (accessToken && !hasAutoTriggered.current && !isLoading && plans.length > 0) {
      const action = searchParams.get("action")
      const planSlug = searchParams.get("plan_slug")
      
      if (action === "checkout" && planSlug) {
        hasAutoTriggered.current = true
        setTimeout(() => {
          handlePlanAction(planSlug)
        }, 0)
      } else if (action === "topup") {
        hasAutoTriggered.current = true
        setTimeout(() => {
          handleTopupAction()
        }, 0)
      }
    }
  }, [accessToken, searchParams, isLoading, plans, handlePlanAction, handleTopupAction])

  // Filter plans based on selected period
  const filteredPlans = useMemo(() => {
    // If the API doesn't have all periods, we'll try to find matches or show what's available
    // For this demonstration, we'll filter by the billing_period field
    return plans.filter((p) => p.billing_period.toLowerCase() === period)
  }, [plans, period])

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#F9F9FF] px-6 py-24 lg:py-40 dark:bg-zinc-950"
    >
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-[0.03]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:gap-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-6xl dark:text-zinc-50">
            Choose your right plan!
          </h2>
          <p className="max-w-2xl text-lg font-medium text-zinc-500">
            Select from best plans, ensuring a perfect match. Need more or less?
            <br />
            Customize your subscription for a seamless fit!
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center">
          <div className="flex items-center rounded-2xl bg-white p-1.5 shadow-sm dark:bg-zinc-900">
            {(["monthly", "quarterly", "yearly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex h-12 items-center justify-center rounded-xl px-8 text-sm font-bold transition-all ${
                  period === p
                    ? "bg-primary text-white shadow-lg"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <span className="capitalize">{p}</span>
                {p === "quarterly" && (
                  <span className="ml-2 hidden text-[10px] opacity-80 sm:inline">
                    (Save 10%)
                  </span>
                )}
                {p === "yearly" && (
                  <span className="ml-2 hidden text-[10px] opacity-80 sm:inline">
                    (Save 20%)
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-xl font-medium text-zinc-400">
              No plans found for {period} billing.
            </p>
            <Button variant="outline" onClick={() => setPeriod("monthly")}>
              View Monthly Plans
            </Button>
          </div>
        ) : (
          <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-4">
            {filteredPlans.map((plan) => {
              const isCustom =
                plan.tier === "enterprise" || plan.slug.includes("custom")
              const isPro = plan.tier === "pro" || plan.tier === "premium"

              return (
                <Card
                  key={plan.id}
                  className={`group relative flex flex-col gap-5 transition-all hover:scale-[1.02] ${
                    isCustom
                      ? "border-transparent bg-linear-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-zinc-900"
                      : "border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
                  }`}
                >
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-start gap-5">
                      {/* Badge */}
                      <div
                        className={`inline-flex items-center rounded-full px-5 py-2 text-xs ${
                          isPro
                            ? "bg-primary text-white"
                            : isCustom
                              ? "bg-white text-zinc-900 shadow-sm"
                              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {plan.name}
                      </div>

                      <p className="text-sm font-medium text-zinc-500">
                        Ideal for{" "}
                        {plan.tier === "free" ? "starters" : "professionals"}{" "}
                        seeking to enhance and update their job search further.
                      </p>

                      <div className="flex flex-col gap-3">
                        {isCustom ? (
                          <h3 className="text-5xl font-bold tracking-tight">
                            Let&apos;s Talk!
                          </h3>
                        ) : (
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">
                              ${plan.price_cents / 100}
                            </span>
                            <span className="text-zinc-500">
                              /{plan.billing_period}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Features */}
                    <ul className="flex flex-col gap-5">
                      {[
                        {
                          text: `${plan.applications_per_month === -1 ? "Unlimited" : plan.applications_per_month} Applications`,
                          included: true,
                        },
                        {
                          text: `${plan.credits_per_month === -1 ? "Unlimited" : plan.credits_per_month} AI Credits`,
                          included: true,
                        },
                        { text: "Smart Field Detection", included: true },
                        {
                          text: "Priority Support",
                          included: true,
                        },
                      ].map((feature, idx) => (
                        <li
                          key={idx}
                          className={`flex items-center gap-4 transition-opacity ${
                            feature.included ? "opacity-100" : "opacity-30"
                          }`}
                        >
                          <div
                            className={`flex size-6 items-center justify-center rounded-full ${
                              isCustom
                                ? "bg-white text-primary shadow-sm"
                                : "text-primary"
                            }`}
                          >
                            <Icons.Success className="size-4" />
                          </div>
                          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="w-full">
                    {/* CTA Button */}
                    <div className="mt-auto w-full">
                      <Button
                        onClick={() => !isCustom && handlePlanAction(plan.slug)}
                        disabled={isProcessing !== null}
                        variant={isCustom ? "default" : "outline"}
                        className={`h-11 w-full text-sm font-bold transition-all ${
                          isCustom
                            ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950"
                            : isPro
                              ? "border-primary text-primary hover:bg-primary hover:text-white"
                              : "border-zinc-200 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                        asChild={isCustom}
                      >
                        {isCustom ? (
                          <Link href="/contact" className="flex items-center justify-center w-full h-full">
                            Book a Call
                          </Link>
                        ) : (
                          isProcessing === plan.slug ? "Processing..." : "Get started"
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            })}

            {/* Top-up Card */}
            <Card className="flex flex-col gap-5 border-2 border-dashed border-zinc-200 bg-zinc-50/50 text-center transition-all hover:scale-[1.02] dark:border-zinc-800 dark:bg-zinc-900/30">
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center gap-5">
                  <div className="inline-flex items-center rounded-full bg-zinc-100 px-5 py-2 text-xs font-bold tracking-wider text-zinc-600 uppercase dark:bg-zinc-800 dark:text-zinc-400">
                    Quick Add
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-4xl font-bold tracking-tight">Top-up</h3>
                    <p className="text-sm font-medium leading-relaxed text-zinc-500">
                      Need a quick boost? Buy extra applications or credits
                      instantly.
                    </p>
                  </div>
                </div>

                <Separator />
              </CardContent>

              <CardFooter className="w-full">
                <Button
                  onClick={handleTopupAction}
                  disabled={isProcessing !== null}
                  variant="outline"
                  className="h-11 w-full border-2 border-zinc-950 font-bold transition-transform active:scale-95 dark:border-zinc-50"
                >
                  {isProcessing === "topup" ? "Processing..." : "Add Credits"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
