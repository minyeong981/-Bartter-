import './index.scss';

export default function Header({
  location,
  infoIcon,
  searchIcon,
  alramIcon,
}: {
  location: string;
  infoIcon: string;
  searchIcon: string;
  alramIcon: string;
}) {
  return (
    <div className="header">
      <div className="location">{location}</div>
      <div className="icons">
        <div className="icon">{infoIcon}</div>
        <div className="icon">{searchIcon}</div>
        <div className="icon">{alramIcon}</div>
      </div>
    </div>
  );
}
