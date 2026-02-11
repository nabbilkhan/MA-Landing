/**
 * Program Visibility Configuration
 *
 * Toggle programs on/off across the entire site from this single file.
 * Set a program to `true` to show it, `false` to hide it.
 * All program pages, navigation, popups, and stats respect these flags.
 */
export const PROGRAM_VISIBILITY = {
  tech: true,
  healthcare: false,
  logistics: false,
}

/**
 * Check if a program slug is currently visible.
 * @param {string} slug - 'tech', 'healthcare', or 'logistics'
 * @returns {boolean}
 */
export function isProgramVisible(slug) {
  return PROGRAM_VISIBILITY[slug] ?? false
}
