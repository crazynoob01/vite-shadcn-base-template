import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Project ID injected during build/generation
const PROJECT_ID = '__PROJECT_ID__'
const API_BASE = 'https://gatherlane.com'

export function RSVPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: 'attending',
    pax: 1,
    side: '',
    vegetarianPax: 0,
    message: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Basic frontend validation
    if (!formData.side) {
      setError('Please select whose guest you are.')
      setIsSubmitting(false)
      return
    }

    if (!formData.phone) {
      setError('Phone number is required.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/rsvp/${PROJECT_ID}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit RSVP')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          {formData.attendance === 'attending'
            ? "We can't wait to see you!"
            : "We'll miss you!"}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="side">Whose guest are you? *</Label>
          <Select
            value={formData.side}
            onValueChange={(value) => setFormData({ ...formData, side: value })}
          >
            <SelectTrigger id="side">
              <SelectValue placeholder="Select side" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="groom">Groom</SelectItem>
              <SelectItem value="bride">Bride</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
              />
          </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Will you be attending? *</Label>
        <RadioGroup
          value={formData.attendance}
          onValueChange={(value) => setFormData({ ...formData, attendance: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="attending" id="attending" />
            <Label htmlFor="attending">Yes, I'll be there!</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not_attending" id="not_attending" />
            <Label htmlFor="not_attending">Sorry, I can't make it</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.attendance === 'attending' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="pax">Total Guests</Label>
            <Input
              id="pax"
              type="number"
              min={1}
              max={10}
              value={formData.pax}
              onChange={(e) => setFormData({ ...formData, pax: parseInt(e.target.value) || 1 })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vegetarianPax">Vegetarian Meals</Label>
            <Input
              id="vegetarianPax"
              type="number"
              min={0}
              max={formData.pax}
              value={formData.vegetarianPax}
              onChange={(e) =>
                setFormData({ ...formData, vegetarianPax: parseInt(e.target.value) || 0 })
              }
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Message for the Couple</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Write something sweet..."
          rows={3}
        />
      </div>

      {error && <div className="text-sm text-destructive bg-destructive/10 rounded p-3">{error}</div>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
      </Button>
    </form>
  )
}

