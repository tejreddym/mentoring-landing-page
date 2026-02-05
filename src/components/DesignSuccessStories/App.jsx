import { useState, useEffect } from "react";

import { PartnerSpotlight } from "./PartnerSpotlight";

const successStories = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "CEO, TechVenture Inc.",
    image: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwcG9ydHJhaXQlMjBjb25maWRlbnR8ZW58MXx8fHwxNzY5NzUwMDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    metric: "+400% LEADS",
    description: "Transformed our lead generation pipeline in 6 months",
    company: "TechVenture Inc."
  },
  {
    id: 2,
    name: "Marcus Chen",
    title: "Founder, Quantum Labs",
    image: "https://images.unsplash.com/photo-1742119971773-57e0131095b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZW50cmVwcmVuZXVyJTIwcG9ydHJhaXQlMjBtb2Rlcm58ZW58MXx8fHwxNzY5NzUwMDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    metric: "2.8M USERS",
    description: "Scaled from 10K to 2.8M active users globally",
    company: "Quantum Labs"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "VP Product, Nexus Digital",
    image: "https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3Njk3NTAwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    metric: "$12M ARR",
    description: "Achieved $12M annual recurring revenue milestone",
    company: "Nexus Digital"
  },
  {
    id: 4,
    name: "David Park",
    title: "Co-Founder, Innovate Studio",
    image: "https://images.unsplash.com/photo-1758691737644-ef8be18256c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlciUyMHBvcnRyYWl0JTIwaW5ub3ZhdGl2ZXxlbnwxfHx8fDE3Njk3NTAwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    metric: "95% RETENTION",
    description: "Industry-leading customer retention rate achieved",
    company: "Innovate Studio"
  },
  {
    id: 5,
    name: "Olivia Thompson",
    title: "Chief Growth Officer, Stellar AI",
    image: "https://images.unsplash.com/photo-1760574751859-c03d3ff220a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZm91bmRlciUyMHBvcnRyYWl0JTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY5NzUwMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    metric: "300% ROI",
    description: "Triple return on investment within first quarter",
    company: "Stellar AI"
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Managing Director, Apex Solutions",
    image: "https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZW8lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2OTc1MDAwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    metric: "47 MARKETS",
    description: "Expanded to 47 international markets in 18 months",
    company: "Apex Solutions"
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <PartnerSpotlight />
    </div>
  );
}
