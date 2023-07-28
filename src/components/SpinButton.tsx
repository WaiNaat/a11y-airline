import { useState, useId, useRef } from "react";
import "./SpinButton.css";
import Alert from "./Alert";
import usePreviousValue from "../hooks/usePreviousValue";

type SpinButtonProps = {
  label: string;
}

const SpinButton = ({ label }: SpinButtonProps) => {
  const [count, setCount] = useState<number | ''>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState(false);
  const id = useId();
  const prevCount = usePreviousValue<number>(count === '' ? 0 : count);

  const timeoutRef = useRef(0);

  const increment = () => {
    setCount((prevCount) => Math.min(prevCount === '' ? 1 : prevCount + 1, 3));

    setOpenAlert(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
    }
    timeoutRef.current = window.setTimeout(() => {
      setOpenAlert(false);
    }, 100);
  };

  const decrement = () => {
    setCount((prevCount) => {
      const newCount = Math.max(prevCount === '' ? 0 : prevCount - 1, 0);
      return newCount ? newCount : '';
    });

    setOpenAlert(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
    }
    timeoutRef.current = window.setTimeout(() => {
      setOpenAlert(false);
    }, 100);
  };

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <section className="spinButtonContainer">
      <div className="spinButtonLabel">
        <label htmlFor={id}>{label}</label>
        <button
          type="button"
          className="helpIcon"
          onClick={toggleTooltip}
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          aria-label="도움말 여닫기"
        >
          ?
          <div role="alert" aria-atomic="true" aria-live="assertive" aria-relevant="additions text">
            {isTooltipVisible && (
              <span className="tooltip">최대 인원수는 3명까지 가능합니다!</span>
            )}
          </div>
        </button>
      </div>
      <button type="button" onClick={decrement} className="spinButton" aria-label={`${label} 탑승자 한 명 줄이기`}>
        -
      </button>
      <input
        id={id}
        type="tel"
        role="spinbutton"
        className="spinButtonInput"
        maxLength={1}
        inputMode="numeric"
        aria-label={`현재 ${label} ${count === '' ? 0 : count}명 선택됨`}
        value={count}
        onChange={({ target: { value }}) => setCount(value === '' || value === '0' ? '' : Math.min(3, Math.max(0, Number(value))) )}
      />
      <div role="alert" aria-atomic="true" aria-live="assertive" aria-relevant="additions text" className="hidden-mini">
        {openAlert && <Alert prevCount={prevCount} count={count === '' ? 0 : count} label={label} />}
      </div>
      <button type="button" onClick={increment} className="spinButton" aria-label={`${label} 탑승자 한 명 늘리기 (최대 세 명)`}>
        +
      </button>
    </section>
  );
};

export default SpinButton;
