"use client"
import React from "react"
import { Theme, ThemePanel } from "@radix-ui/themes"

export default function ThemeClient({ children }: { children: React.ReactNode }) {
  return (
    <Theme accentColor="bronze" scaling="105%">
      {children}
      <ThemePanel />
    </Theme>
  )
}
