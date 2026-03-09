---
description: Specific styling conventions for Shadcn dialogs regarding width overriding using TailwindCSS.
---

When styling a \`DialogContent\` component from shadcn/ui, you must be aware of how Tailwind overrides work with responsive prefixes. By default, the \`DialogContent\` base component uses a responsive width max such as \`sm:max-w-md\`.

If you just use a base utility class like \`max-w-2xl\`, it will be overridden by the \`sm:max-w-md\` class at the \`sm\` breakpoint (640px and above) because the prefixed class applies a media query and is more specific.

- **Avoid:** \`className="max-w-2xl"\` (won't override \`sm:max-w-md\` on desktop screens)
- **Avoid:** \`className="max-w-2xl!"\` (using \`!important\` flag is considered an anti-pattern when it can be avoided)
- **Instead:** Overwrite at the same breakpoint tier along with \`w-full\`: \`className="w-full max-w-2xl sm:max-w-2xl"\`
