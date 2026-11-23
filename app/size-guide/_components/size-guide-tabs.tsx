"use client"

import type { ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sizeGuideContent } from "../_data"
import { MeasuringGuide } from "./measuring-guide"

const TAB = { chart: "chart", measure: "measure" } as const

/**
 * "Size chart · How to measure" — shared by the Size guide page and the product page dialog,
 * so both show the same two views.
 */
export function SizeGuideTabs({ chart }: { chart: ReactNode }) {
  const { ui } = sizeGuideContent

  return (
    <Tabs defaultValue={TAB.chart} className="gap-block">
      <TabsList>
        <TabsTrigger value={TAB.chart}>{ui.chartTab}</TabsTrigger>
        <TabsTrigger value={TAB.measure}>{ui.measureTab}</TabsTrigger>
      </TabsList>
      <TabsContent value={TAB.chart}>{chart}</TabsContent>
      <TabsContent value={TAB.measure}>
        <MeasuringGuide />
      </TabsContent>
    </Tabs>
  )
}
