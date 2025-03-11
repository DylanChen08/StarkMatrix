export interface AffixProps {
  offsetTop?: number
  offsetBottom?: number
  target?: string | HTMLElement
  zIndex?: number
}

export interface AffixEmits {
  change: (fixed: boolean) => void
}

export interface AffixInstance {
  update: () => void
  updatePosition: () => void
} 