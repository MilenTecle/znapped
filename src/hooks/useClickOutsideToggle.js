import { useEffect, useRef, useState } from 'react'

/**
 * Provides functionality to toggle a dropdown or expandable menu,
 * and closes it when clicking outside the element.
 */
const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  /**
   * Adds an event listner to detect mouse clicks outside the elemenent.
   * When clicked outside, the 'exanded' state is set to 'false'.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
        // Check if the click is outside the element
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false)
      }
    }
    // Attach the mouseup evente listner
    document.addEventListener('mouseup', handleClickOutside)
    // Remove the event listner on component unmount
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle