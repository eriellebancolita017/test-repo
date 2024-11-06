import { useEventCallback } from "@/hooks/storage/useEventCallback";
import { useEventListener } from "@/hooks/storage/useEventListener";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

const LS = "local-storage";

declare global {
  interface WindowEventMap {
    [LS]: CustomEvent;
  }
}

type SetValue<T> = Dispatch<React.SetStateAction<T | undefined>>;
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error: unknown) {
      console.error(`Error reading localStorage key “${key}”`, error);
      return initialValue;
    }
  }, [initialValue, key]);
  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = useEventCallback(
    (value: SetStateAction<T | undefined>) => {
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting localStorage key “${key}” even though environment is not a client`,
        );
      }
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        if (newValue === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(newValue));
          setStoredValue(newValue);
        }

        window.dispatchEvent(new Event(LS));
      } catch (err: unknown) {
        console.error(`Error setting localStorage key “${key}”`, err);
      }
    },
  );

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue],
  );

  useEventListener("storage", handleStorageChange);
  useEventListener(LS, handleStorageChange);

  return [storedValue, setValue];
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.error("Error parsing JSON value", { value });
    return undefined;
  }
}
