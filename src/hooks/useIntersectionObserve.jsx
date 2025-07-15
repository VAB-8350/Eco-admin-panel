import React from 'react'

export default function useIntersectionObserve({ containerId, handlerIntersection }) {

  // Local State
  const [reset, setReset] = React.useState(false)

  // Refs
  const observerRef = React.useRef(null)

  // Effects
  React.useEffect(() => {

    const observeElement = observerRef.current

    if (observeElement) {

      const container = document.getElementById(containerId)

      const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            handlerIntersection()

          }

        })

      }, {
        root: container, // The parent element with scroll
        threshold: .3 // how much of the component must be visible
      })

      if (observeElement) {

        observer.observe(observeElement)

      }

      return () => {

        if (observeElement) {

          observer.unobserve(observeElement)

        }

      }

    }

  }, [observerRef.current, handlerIntersection])

  // Methods
  const resetObserver = () => setReset(!reset)

  return {
    observerRef,
    resetObserver
  }

}
