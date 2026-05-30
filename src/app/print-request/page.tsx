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
import { PRINT_SERVICES, PRINT_SIZES, PRINT_FINISHES } from '@/constants'
import { generateOrderNumber, isValidGhanaPhone } from '@/lib/utils'

const STEPS = ['Service Details', 'Artwork', 'Contact Details']

export default function PrintRequestPage() {
  const [step, setStep] = useState(0)
  const [serviceType, setServiceType] = useState('')
  const [quantity, setQuantity] = useState('')
  const [size, setSize] = useState('')
  const [finish, setFinish] = useState('')
  const [artworkNotes, setArtworkNotes] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [refNumber, setRefNumber] = useState('')

  const validateStep = () => {
    const e: Record<string, string> = {}
    if (step === 0) {
      if (!serviceType) e.serviceType = 'Select a service type'
      if (!quantity || Number(quantity) < 1) e.quantity = 'Enter a valid quantity'
      if (!size) e.size = 'Select a size'
      if (!finish) e.finish = 'Select a finish'
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

  const next = () => {
    if (!validateStep()) return
    if (step < 2) setStep(step + 1)
    else {
      setRefNumber(generateOrderNumber('PRT'))
      setSubmitted(true)
    }
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
          We&apos;ll review your printing request and send you a quote.
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
      <h1 className="text-3xl font-bold text-tscolors-navy">Printing Request</h1>
      <p className="mt-2 text-muted-foreground">
        Tell us about your printing job and we&apos;ll prepare a quote
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
                <Label>Service type *</Label>
                <Select value={serviceType} onValueChange={v => setServiceType(v ?? '')}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRINT_SERVICES.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.serviceType && <p className="mt-1 text-xs text-destructive">{errors.serviceType}</p>}
              </div>
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="mt-1"
                />
                {errors.quantity && <p className="mt-1 text-xs text-destructive">{errors.quantity}</p>}
              </div>
              <div>
                <Label>Size *</Label>
                <Select value={size} onValueChange={v => setSize(v ?? '')}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRINT_SIZES.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.size && <p className="mt-1 text-xs text-destructive">{errors.size}</p>}
              </div>
              <div>
                <Label>Finish *</Label>
                <Select value={finish} onValueChange={v => setFinish(v ?? '')}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select finish" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRINT_FINISHES.map(f => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.finish && <p className="mt-1 text-xs text-destructive">{errors.finish}</p>}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-tscolors-navy/20 bg-tscolors-cloud p-8 text-center">
                <Upload className="mx-auto h-10 w-10 text-tscolors-navy/40" />
                <p className="mt-4 font-medium text-tscolors-navy">Upload artwork</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop or click to browse (PNG, JPG, PDF, AI — max 10MB)
                </p>
                <Button type="button" variant="outline" className="mt-4" disabled>
                  Choose File
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">File upload coming soon</p>
              </div>
              <div>
                <Label htmlFor="artworkNotes">Notes</Label>
                <Textarea
                  id="artworkNotes"
                  value={artworkNotes}
                  onChange={e => setArtworkNotes(e.target.value)}
                  className="mt-1"
                  rows={4}
                  placeholder="Colour preferences, bleed requirements, etc."
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
            <Button
              type="button"
              className="bg-tscolors-gold text-tscolors-navy hover:bg-tscolors-gold-light"
              onClick={next}
            >
              {step === 2 ? 'Submit Request' : 'Next'}
              {step < 2 && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
