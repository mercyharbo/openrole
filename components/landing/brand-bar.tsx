import React from "react"

export const BrandBar = () => {
  return (
    <section className="bg-zinc-50/50 py-16 dark:bg-zinc-900/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
          WORKS WITH ALL MAJOR JOB BOARDS
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:gap-16">
          {[
            "Greenhouse",
            "Lever",
            "Workday",
            "Ashby",
            "SmartRecruiters",
            "iCMS",
          ].map((brand) => (
            <span
              key={brand}
              className="text-xl font-bold text-zinc-500 dark:text-zinc-400"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
