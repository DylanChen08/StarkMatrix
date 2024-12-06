import type { DirectiveBinding } from 'vue'

const clickOutside = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const handler = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) {
        binding.value(e)
      }
    }
    el._clickOutside = handler
    document.addEventListener('click', handler)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el._clickOutside)
    delete el._clickOutside
  }
}

export default clickOutside 