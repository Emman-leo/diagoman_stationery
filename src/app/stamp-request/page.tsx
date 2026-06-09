'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Upload, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { STAMP_TYPES, STAMP_SIZES, STAMP_COLORS } from '@/constants'
import { submitStampRequest } from '@/lib/supabase/requests'
import { uploadStampLogo } from '@/lib/supabase/storage'
import { isValidGhanaPhone, normalizePhone } from '@/lib/utils'

const STEPS = ['Stamp Details', 'Logo & Design', 'Contact Details']

export default function StampRequestPage() {
  const [step, setStep] = useState(0)
  const [stampType, setStampType] = useState('')
  const [stampText, setStampText] = useState('')
  const [size, setSize] = useState('')
  const [inkColor, setInkColor] = useState('')
  const [designNotes, setDesignNotes] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const validateStep = () => {
    const e: Record<string, string> = {}
    if (step === 0) {
      if (!stampType) e.stampType = 'Select a stamp type'
      if (!stampText.trim()) e.stampText = 'Stamp text is required'
      if (!size) e.size = 'Select a size'
      if (!inkColor) e.inkColor = 'Select an ink color'
    }
    if (step === 2) {
      if (!name.trim()) e.name = 'Name is required'
      if (!phone.trim()) e.phone = 'Phone is required'
      else if (!isValidGhanaPhone(phone)) e.phone = 'Enter a valid Ghana phone number'
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = async () => {
    if (!validateStep()) return
    if (step < 2) {
      setStep(step + 1)
      return
    }

    setSubmitting(true)
    setErrors({})

    let logoUrl: string | null = null
    if (logoFile) {
      setUploading(true)
      logoUrl = await uploadStampLogo(logoFile)
      setUploading(false)
      if (!logoUrl) {
        setErrors({ submit: 'Logo upload failed. Please try again.' })
        setSubmitting(false)
        return
      }
    }

    const { orderNumber, error } = await submitStampRequest({
      customer_name: name.trim(),
      customer_phone: normalizePhone(phone),
      stamp_type: stampType,
      stamp_text: stampText.trim(),
      size,
      ink_color: inkColor,
      logo_url: logoUrl,
    })

    setSubmitting(false)

    if (error || !orderNumber) {
      setErrors({ submit: error ?? 'Failed to submit request. Please try again.' })
      return
    }

    setRefNumber(orderNumber)
    setSubmitted(true)
  }

  const back = () => {
    if (step > 0) setStep(step - 1)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="mt-6 text-2xl font-bold text-tscolors-navy">Request Submitted!</h1>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll review your stamp request and send you a quote.
        </p>
        <p className="mt-4 text-lg">
          Reference:{' '}
          <span className="font-bold text-tscolors-gold-dark">{refNumber}</span>
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants(),
            'mt-8 inline-flex bg-tscolors-navy text-white hover:bg-tscolors-navy-light'
          )}
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-tscolors-navy">Custom Stamp Request</h1>
      <p className="mt-2 text-muted-foreground">
        Tell us what you need and we&apos;ll prepare a quote for you
      </p>

      <div className="mt-8 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col items-center">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                i <= step ? 'bg-tscolors-navy text-white' : 'bg-gray-200 text-gray-500'
              )}
            >
              {i + 1}
            </div>
            <span className="mt-1 hidden text-xs sm:block">{label}</span>
          </div>
        ))}
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <Label>Stamp type *</Label>
                <Select value={stampType} onValueChange={v => setStampType(v ?? '')}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {STAMP_TYPES.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stampType && <p className="mt-1 text-xs text-destructive">{errors.stampType}</p>}
              </div>
              <div>
                <Label htmlFor="stampText">Stamp text *</Label>
                <Textarea
                  id="stampText"
                  value={stampText}
                  onChange={e => setStampText(e.target.value)}
                  placeholder="Enter text for your stamp (use new lines for multiple lines)"
                  className="mt-1"
                  rows={4}
                />
                {errors.stampText && <p className="mt-1 text-xs text-destructive">{errors.stampText}</p>}
              </div>
              <div>
                <Label>Size *</Label>
                <Select value={size} onValueChange={v => setSize(v ?? '')}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {STAMP_SIZES.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.size && <p className="mt-1 text-xs text-destructive">{errors.size}</p>}
              </div>
              <div>
                <Label>Ink color *</Label>
                <Select value={inkColor} onValueChange={v => setInkColor(v ?? '')}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {STAMP_COLORS.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.inkColor && <p className="mt-1 text-xs text-destructive">{errors.inkColor}</p>}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-tscolors-navy/20 bg-tscolors-cloud p-8 text-center">
                <Upload className="mx-auto h-10 w-10 text-tscolors-navy/40" />
                <p className="mt-4 font-medium text-tscolors-navy">Upload logo or design</p>
                <p className="mt-2 text-sm text-muted-foreground">PNG, JPG, PDF — max 5MB</p>
                <input
                  type="file"
                  accept="image/png,image/jpeg,application/pdf"
                  onChange={e => setLogoFile(e.target.files?.[0] ?? null)}
                  className="mt-4 block w-full text-sm text-muted-foreground"
                />
                {logoFile && <p className="mt-2 text-xs text-green-700">Selected: {logoFile.name}</p>}
              </div>
              <div>
                <Label htmlFor="designNotes">Additional notes</Label>
                <Textarea
                  id="designNotes"
                  value={designNotes}
                  onChange={e => setDesignNotes(e.target.value)}
                  className="mt-1"
                  rows={4}
                  placeholder="Any special instructions for your stamp design"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full name *</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone number *</Label>
                <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="0244123456" className="mt-1" />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button type="button" variant="outline" onClick={back} disabled={step === 0}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
            {errors.submit && (
              <p className="text-sm text-destructive">{errors.submit}</p>
            )}

            <Button
              type="button"
              disabled={submitting}
              className="bg-tscolors-gold text-tscolors-navy hover:bg-tscolors-gold-light"
              onClick={next}
            >
              {step === 2 ? (submitting ? 'Submitting...' : 'Submit Request') : 'Next'}
              {step < 2 && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
