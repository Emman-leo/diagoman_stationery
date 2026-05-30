'use client'

import { Category } from '@/types'
import { cn } from '@/lib/utils'

type Props = {
  categories: Category[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}

export function CategoryFilter({ categories, selectedId, onSelect }: Props) {
  const pills = [{ id: null, name: 'All' }, ...categories.map(c => ({ id: c.id, name: c.name }))]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      {pills.map(pill => (
        <button
          key={pill.id ?? 'all'}
          type="button"
          onClick={() => onSelect(pill.id)}
          className={cn(
            'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
            selectedId === pill.id
              ? 'bg-tscolors-navy text-white'
              : 'bg-white text-tscolors-navy ring-1 ring-tscolors-navy/20 hover:bg-tscolors-cloud'
          )}
        >
          {pill.name}
        </button>
      ))}
    </div>
  )
}
