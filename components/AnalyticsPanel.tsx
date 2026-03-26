"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  MousePointer2, 
  Eye, 
  BarChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import type { LinkData } from "@/utils/storage";

interface AnalyticsPanelProps {
  links: LinkData[];
}

export default function AnalyticsPanel({ links }: AnalyticsPanelProps) {
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const totalViews = Math.floor(totalClicks * 1.5) + 400; // Mock views
  const ctr = totalClicks > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";

  const stats = [
    { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, color: "bg-blue-500", trend: "+12.5%" },
    { label: "Total Clicks", value: totalClicks.toLocaleString(), icon: MousePointer2, color: "bg-emerald-500", trend: "+8.2%" },
    { label: "CTR", value: `${ctr}%`, icon: TrendingUp, color: "bg-indigo-500", trend: "+2.1%" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-xl text-white ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                stat.trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              }`}>
                {stat.trend.startsWith("+") ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Clicks Per Link</h2>
          <BarChart size={16} className="text-slate-400" />
        </div>
        
        <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-6">
          {links.length > 0 ? (
            links.map((link, i) => {
              const percentage = totalClicks > 0 ? (link.clicks / totalClicks) * 100 : 0;
              return (
                <div key={link.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700 truncate max-w-[180px]">{link.title}</span>
                    <span className="text-slate-400 font-mono">{link.clicks.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6">
              <p className="text-slate-400 text-sm italic">No link data to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
