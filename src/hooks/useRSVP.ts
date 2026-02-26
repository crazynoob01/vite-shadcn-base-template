import { useState, type FormEvent } from 'react'
import { PROJECT_ID, API_BASE } from '../constants'
import type { RsvpCustomField, UseRsvpOptions, RsvpStatus } from '../types/rsvp'

export type { RsvpCustomField, UseRsvpOptions, RsvpStatus }

// Core fields sent as top-level keys in the request body.
// Wedding-specific fields (side, vegetarianPax, dietaryRestrictions, message)
// are deliberately excluded — non-wedding events route these through customFields.
const CORE_FIELDS = ['name', 'phone', 'email', 'attendance', 'pax'] as const

export function useRSVP(options: UseRsvpOptions = {}) {
  const { customFields = [], deadline } = options
  const [formData, setFormData] = useState<Record<string, unknown>>({
    attendance: 'attending',
    pax: 1,
  })
  const [status, setStatus] = useState<RsvpStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const setValue = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    setSuccessMsg('')

    // Basic client-side validation
    const name = formData.name
    if (!name || (typeof name === 'string' && !name.trim())) {
      setStatus('error')
      setErrorMsg('Name is required')
      return
    }
    const phone = formData.phone
    if (!phone || (typeof phone === 'string' && !phone.trim())) {
      setStatus('error')
      setErrorMsg('Phone number is required')
      return
    }

    // Validate required custom fields
    for (const field of customFields) {
      if (field.required) {
        const val = formData[field.key]
        const isEmpty =
          val === undefined || val === null || (typeof val === 'string' && !val.trim())
        if (isEmpty) {
          setStatus('error')
          setErrorMsg(`${field.label} is required`)
          return
        }
      }
    }

    // Separate core fields from custom fields
    const coreData: Record<string, unknown> = {}
    const customData: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(formData)) {
      if ((CORE_FIELDS as readonly string[]).includes(key)) {
        coreData[key] = value
      } else {
        customData[key] = value
      }
    }

    // Ensure pax is a number
    if (coreData.pax !== undefined) {
      coreData.pax = Number(coreData.pax) || 1
    }

    try {
      const res = await fetch(`${API_BASE}/api/rsvp/${PROJECT_ID}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...coreData,
          ...(Object.keys(customData).length > 0 ? { customFields: customData } : {}),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
      setStatus('success')
      setSuccessMsg(data.message || 'Thank you for your response!')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const reset = () => {
    setFormData({ attendance: 'attending', pax: 1 })
    setStatus('idle')
    setErrorMsg('')
    setSuccessMsg('')
  }

  return {
    formData,
    setValue,
    submit,
    status,
    errorMsg,
    successMsg,
    reset,
    deadline,
    customFields,
  }
}
