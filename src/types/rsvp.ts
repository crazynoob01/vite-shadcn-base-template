export interface RsvpCustomField {
  key: string
  label: string
  type: 'text' | 'number' | 'select' | 'textarea'
  required?: boolean
  options?: string[] // only for type: 'select'
}

export interface UseRsvpOptions {
  customFields?: RsvpCustomField[]
  deadline?: string
}

export type RsvpStatus = 'idle' | 'loading' | 'success' | 'error'
