import { useRef, useEffect } from 'react';

const usePreviousValue = <T>(value: T) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePreviousValue;
