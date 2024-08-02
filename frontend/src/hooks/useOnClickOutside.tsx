import type {RefObject} from "react";
import {useCallback, useEffect} from "react";

export default function useOnClickOutside(ref: RefObject<HTMLElement>, callback: VoidFunction) {

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  }, [callback, ref])

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [handleClickOutside]);
}