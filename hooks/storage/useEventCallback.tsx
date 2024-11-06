import { useCallback, useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/storage/useIsomorphicLayoutEffect";

/**
 * Creates a callback function that can be safely used without issues during rendering.
 *
 * @template Args
 * @template Return
 * @param {(...args: Args) => Return} callback - The callback function to wrap.
 * @returns {(...args: Args) => Return} A wrapped callback function.
 */
export function useEventCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => Return {
  // This reference stores the callback function. It should not be called during rendering.
  const ref = useRef<typeof callback>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  // Use the useIsomorphicLayoutEffect hook to update the reference when the callback changes.
  useIsomorphicLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);

  /**
   * Returns a new callback function that wraps the reference, allowing it to be safely called.
   * @param {...Args} args - Arguments to pass to the callback.
   * @returns {Return} The result of the callback.
   */
  return useCallback((...args) => ref.current(...args), [ref]);
}
