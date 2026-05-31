import { ShopLayout } from '@/components/layout/ShopLayout'
import { HomePageContent } from '@/components/shop/HomePageContent'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { mapCategory, mapProduct } from '@/lib/supabase/mappers'

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()

  const [{ data: featuredProducts }, { data: categories }] = await Promise.all([
    supabase
      .from('products')
      .select('*, category:categories(id, name, slug)')
      .eq('is_active', true)
      .eq('has_fixed_price', true)
      .order('created_at', { ascending: false })
      .limit(4),
    supabase.from('categories').select('*').order('name'),
  ])

  return (
    <ShopLayout>
      <HomePageContent
        featuredProducts={(featuredProducts ?? []).map(row => mapProduct(row as Record<string, unknown>))}
        categories={(categories ?? []).map(row => mapCategory(row as Record<string, unknown>))}
      />
    </ShopLayout>
  )
}
