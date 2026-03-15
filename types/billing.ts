export interface BillingBalance {
    applications_remaining: number
    credits_remaining: number
    applications_used_this_period: number
    credits_used_this_period: number
}

export interface BillingPlan {
    id: string
    name: string
    slug: string
    tier: string
    billing_period: string
    price_cents: number
    applications_per_month: number
    credits_per_month: number
    is_active: boolean
}

export interface BillingSubscription {
    status: string
    plan: BillingPlan
    current_period_start: string
    current_period_end: string
    cancel_at_period_end: boolean
}

export interface BillingHistory {
    id: string
    type: string
    amount_cents: number
    applications_delta: number
    credits_delta: number
    description: string
    created_at: string
}
