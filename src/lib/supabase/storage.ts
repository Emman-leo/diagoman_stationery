import { createClient } from '@/lib/supabase/client'

export async function uploadProductImage(file: File): Promise<string | null> {
  const supabase = createClient()

  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`
  const filePath = `products/${fileName}`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
  const supabase = createClient()

  const url = new URL(imageUrl)
  const pathParts = url.pathname.split('/product-images/')
  if (pathParts.length < 2) return

  const filePath = pathParts[1]
  await supabase.storage.from('product-images').remove([filePath])
}
