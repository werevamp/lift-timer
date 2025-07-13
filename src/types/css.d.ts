declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.module.scss' {
  const content: { [className: string]: string }
  export default content
}

// Specific declaration for Font Awesome CSS
declare module '@fortawesome/fontawesome-svg-core/styles.css' {
  const content: any
  export default content
}
