/**
 * Gets a readable name for a component, for HOC display names in React DevTools.
 * @param {Function} Component - A React component.
 * @returns {string} displayName, then name, then "Component".
 */
export const getDisplayName = Component => Component.displayName || Component.name || 'Component';
