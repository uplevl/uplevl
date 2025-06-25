"use client";

import { useEffect, useRef, useState } from "react";
import { type ChangeEvent } from "react";

import { Input } from "./input";

// USD currency config - created once and reused
const moneyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Regex for stripping non-digits - created once and reused
const DIGITS_ONLY = /\D/g;

interface MoneyInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "value" | "type" | "defaultValue"> {
  value?: number; // value in cents
  defaultValue?: number; // default value in cents
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  min?: number; // minimum value in cents
  max?: number; // maximum value in cents
}

export function MoneyInput({ value, defaultValue, onChange, min, max, onBlur, ...props }: MoneyInputProps) {
  // Use ref to track if this is the first render
  const isFirstRender = useRef(true);

  const [formattedValue, setFormattedValue] = useState(() => {
    const initialValue = value ?? defaultValue;
    if (initialValue === undefined) return "";
    return moneyFormatter.format(initialValue / 100);
  });

  // Update formatted value when the value prop changes
  useEffect(() => {
    // Skip the first render as we already set the initial value
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (value !== undefined) {
      setFormattedValue(moneyFormatter.format(value / 100));
    }
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setFormattedValue(newValue);

    if (onChange) {
      const digits = newValue.replace(DIGITS_ONLY, "");
      const cents = Number(digits);

      // Apply min/max constraints
      const constrainedCents = Math.min(Math.max(cents, min ?? -Infinity), max ?? Infinity);

      // Create a synthetic event that matches the original event structure
      // @ts-expect-error - this is a hack to get the value to be a number
      const syntheticEvent: ChangeEvent<HTMLInputElement> = {
        ...event,
        target: {
          ...event.target,
          // @ts-expect-error - this is a hack to get the value to be a number
          value: constrainedCents, // Keep the original string value for the input element
        },
        currentTarget: {
          ...event.currentTarget,
          // @ts-expect-error - this is a hack to get the value to be a number
          value: constrainedCents, // Keep the original string value for the input element
        },
      } satisfies ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    // Format the value on blur
    const digits = event.target.value.replace(DIGITS_ONLY, "");
    const cents = Number(digits);
    const formatted = moneyFormatter.format(cents / 100);
    setFormattedValue(formatted);

    // Call the original onBlur if provided
    onBlur?.(event);
  }

  return <Input {...props} type="text" value={formattedValue} onChange={handleChange} onBlur={handleBlur} />;
}
