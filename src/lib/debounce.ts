  export const debounce = (delay: number ,timerIdRef:any): void => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
    timerIdRef.current = setTimeout(() => {
      timerIdRef.current = null;
    }, delay);
  };