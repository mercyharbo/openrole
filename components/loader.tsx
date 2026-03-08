import { cn } from "@/lib/utils"

interface LoaderProps {
  className?: string
  text?: string
  fullScreen?: boolean
}

export function Loader({ className, text, fullScreen }: LoaderProps) {
  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        className
      )}
    >
      <div className="relative flex size-20 items-center justify-center">
        {/* Core Glow */}
        <div className="animate-shimmer-pulse absolute inset-0 rounded-full bg-primary/20 blur-2xl" />

        {/* Liquid Wave Elements */}
        <div className="flex h-12 items-end gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-liquid-wave w-1.5 rounded-full bg-primary"
              style={{
                height: "100%",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      {text && (
        <p className="text-auth-muted animate-shimmer-pulse text-sm font-semibold tracking-wide uppercase">
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md dark:bg-zinc-950/80">
        {content}
      </div>
    )
  }

  return content
}
