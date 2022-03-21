import { ChangeEvent, FormEvent } from 'react'

type FormElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLFormElement

export const valuePicked =
  <T>(callback: (value: T) => void) =>
  (event: ChangeEvent<FormElement>) =>
    callback(event.target.value)

export const defaultPrevented =
  (callback: (event: FormEvent<HTMLFormElement>) => void) =>
  (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    callback(event)
  }
