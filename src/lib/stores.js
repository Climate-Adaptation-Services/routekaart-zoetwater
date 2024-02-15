import { writable, readable } from "svelte/store";

export const procesSelection = writable(null)
export const timeScale = writable(null)
export const faseHover = writable(null)
export const spoorPijl = writable(null)

export const procesColors = readable({
  'Landelijk team': '#0070C0',
  "Regio": '#C00001',
  "Samen": '#00B050'
})