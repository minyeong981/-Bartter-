import './TwoButton.scss';

interface TwoButtonProps {
  first: string;
  second: string;
  activeButton: string;
  onClick: (button: string) => void;
}

export default function TwoButton({ first, second, activeButton, onClick }: TwoButtonProps) {
  return (
    <div className="main-page">
      <button
        className={`button ${activeButton === first ? 'active' : ''}`}
        onClick={() => onClick(first)}
      >
        {first}
      </button>
      <button
        className={`button ${activeButton === second ? 'active' : ''}`}
        onClick={() => onClick(second)}
      >
        {second}
      </button>
    </div>
  );
}

