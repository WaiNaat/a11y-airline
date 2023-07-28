const Alert = ({ count, label, prevCount }: { prevCount: number, count: number, label: string }) => {
  let message = '';
  if (prevCount < count) message = `${label} 승객 추가 ${count}`;
  if (prevCount > count) message = `${label} 승객 감소 ${count}`;

  return (
    <p>
      {message}
    </p>
  );
};

export default Alert;
