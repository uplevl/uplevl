import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class values into a single string of class names.
 * @param inputs - An array of class values to merge.
 * @returns A string of class names that are merged together.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Waits for a specified number of milliseconds.
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the specified number of milliseconds.
 */
export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Formats the current date and time to a human-readable string.
 * @returns A string representing the current date and time in the format "long weekday, month day, year, hour:minute:second AM/PM".
 */
export function getFormattedDateTime() {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Adjusts to 12-hour format with AM/PM
  };

  const now: Date = new Date();
  return now.toLocaleString("en-US", options);
}

/**
 * Replaces Handlebars-like placeholders in the provided template string.
 *
 * @param template - The string containing placeholders in the format {{key}}.
 * @param values - An object where each key corresponds to a placeholder's key in the template.
 * @returns A new string with all placeholders replaced by their corresponding values.
 */
export function replacePlaceholders(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{\s*([^}\s]+)\s*\}\}/g, (match, key) => {
    // If the key exists in values, replace it; otherwise, return the original placeholder.
    return key in values ? values[key] : match;
  });
}

export function formatCentsToDollarsIntl(cents: number, locale = "en-US", currency = "USD"): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2 }).format(dollars);
}

interface CustomerNameParts {
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
}

export function parseCustomerName(fullName?: string | null): CustomerNameParts {
  if (!fullName) {
    return { firstName: null, middleName: null, lastName: null };
  }

  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 0) {
    return { firstName: null, middleName: null, lastName: null };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], middleName: null, lastName: null };
  }

  if (parts.length === 2) {
    return { firstName: parts[0], middleName: null, lastName: parts[1] };
  }

  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  const middleName = parts.slice(1, -1).join(" ");

  return { firstName, middleName, lastName };
}

/**
 * Scrolls to the bottom of the parent element.
 * @param target - The target element to scroll to.
 * @param parent - The parent element to scroll.
 */
export function autoScrollToBottom(target: HTMLDivElement, parent: HTMLElement) {
  const startScrollTop = parent.scrollTop;
  const endScrollTop = target.offsetTop;
  const duration = 500; // duration of the animation in ms
  const startTime = performance.now();

  function animateScroll() {
    const elapsedTime = performance.now() - startTime;
    const progress = elapsedTime / duration;
    parent.scrollTop = startScrollTop + (endScrollTop - startScrollTop) * progress;
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      parent.scrollTop = endScrollTop;
    }
  }

  animateScroll();
}
