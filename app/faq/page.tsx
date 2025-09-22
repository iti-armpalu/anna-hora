"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { faqData, categories, header, uiTexts, FAQItem } from "@/data/faq-content";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFAQs = faqData.filter(
    (item: FAQItem) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (question: string) => {
    setExpandedItems((prev) =>
      prev.includes(question)
        ? prev.filter((item) => item !== question)
        : [...prev, question]
    );
  };

  const groupedFAQs = categories
    .map((category) => ({
      category,
      items: filteredFAQs.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">
            {header.title}
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {header.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
          <Input
            type="text"
            placeholder={header.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-4 text-lg border-stone-300 focus:border-stone-500 focus:ring-stone-500"
          />
        </div>

        {/* FAQ Groups */}
        <div className="space-y-8">
          {groupedFAQs.map((group) => (
            <div key={group.category} className="bg-white rounded-lg shadow-sm border border-stone-200">
              <div className="p-6 border-b border-stone-100">
                <h2 className="text-2xl font-serif text-stone-900">{group.category}</h2>
              </div>

              <div className="divide-y divide-stone-100">
                {group.items.map((item) => (
                  <div key={item.question} className="p-6">
                    <button
                      onClick={() => toggleExpanded(item.question)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <h3 className="text-lg font-serif text-stone-900 group-hover:text-stone-700 transition-colors pr-4">
                        {item.question}
                      </h3>
                      {expandedItems.includes(item.question) ? (
                        <ChevronUp className="w-5 h-5 text-stone-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-500 flex-shrink-0" />
                      )}
                    </button>

                    {expandedItems.includes(item.question) && (
                      <div className="mt-4 pt-4 border-t border-stone-100">
                        <p className="text-stone-600 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {/* {filteredFAQs.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg mb-4">
              {uiTexts.noResultsPrefix}
              {searchTerm}"
            </p>
            <Button
              onClick={() => setSearchTerm("")}
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-50"
            >
              {uiTexts.clearSearchLabel}
            </Button>
          </div>
        )} */}

        {/* Contact Prompt */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-stone-200 p-8 text-center">
          <h3 className="text-2xl font-serif text-stone-900 mb-4">
            {uiTexts.contactPromptTitle}
          </h3>
          <p className="text-stone-600 mb-6 leading-relaxed">
            {uiTexts.contactPromptText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-stone-900 hover:bg-stone-800 text-white">
              <Link href={uiTexts.contactCtas.primary.href}>
                {uiTexts.contactCtas.primary.label}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-50 bg-transparent"
            >
              <Link href={uiTexts.contactCtas.secondary.href}>
                {uiTexts.contactCtas.secondary.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
