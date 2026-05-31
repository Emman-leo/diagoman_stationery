'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { uploadProductImage } from '@/lib/supabase/storage'
import { cn } from '@/lib/utils'

type Props = {
  currentUrl: string | null
  onUpload: (url: string) => void
  onRemove: () => void
}

export function ImageUpload({ currentUrl, onUpload, onRemove }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Only JPG, PNG and WebP images are allowed')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be under 2MB')
      return
    }

    setError(null)
    setUploading(true)

    const url = await uploadProductImage(file)

    setUploading(false)

    if (!url) {
      setError('Upload failed. Please try again.')
      return
    }

    onUpload(url)
    e.target.value = ''
  }

  return (
    <div className="space-y-2">
      {currentUrl ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentUrl}
            alt="Product"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition-colors"
          >
            <X size={14} className="text-gray-600" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            'w-full h-40 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors',
            uploading
              ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
              : 'border-gray-300 hover:border-tscolors-navy hover:bg-tscolors-navy/5 cursor-pointer'
          )}
        >
          {uploading ? (
            <>
              <div className="w-6 h-6 border-2 border-tscolors-navy border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-500">Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={20} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Upload image</span>
              <span className="text-xs text-gray-400">JPG, PNG, WebP — max 2MB</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  )
}
