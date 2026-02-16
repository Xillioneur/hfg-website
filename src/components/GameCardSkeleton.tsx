import React from 'react';

const GameCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-void-primary overflow-hidden animate-pulse">
      <div className="aspect-[16/10] w-full bg-slate-200 dark:bg-zinc-800" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-32 bg-slate-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-12 bg-slate-200 dark:bg-zinc-800 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-200 dark:bg-zinc-800 rounded" />
          <div className="h-3 w-2/3 bg-slate-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;
