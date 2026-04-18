// Simple replacement for clsx/tailwind-merge due to disk space constraints
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
