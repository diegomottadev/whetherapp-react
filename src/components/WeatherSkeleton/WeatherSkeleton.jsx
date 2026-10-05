import './WeatherSkeleton.css';

// Same layout as WeatherData, so the card doesn't jump when the data arrives.
const WeatherSkeleton = () => (
  <div className="WeatherSkeleton" role="status">
    <span className="visually-hidden">Loading the weather…</span>
    <div className="WeatherSkeleton-main" aria-hidden="true">
      <span className="WeatherSkeleton-block WeatherSkeleton-icon" />
      <span className="WeatherSkeleton-block WeatherSkeleton-value" />
    </div>
    <div className="WeatherSkeleton-extra" aria-hidden="true">
      <span className="WeatherSkeleton-block WeatherSkeleton-row" />
      <span className="WeatherSkeleton-block WeatherSkeleton-row" />
    </div>
  </div>
);

export default WeatherSkeleton;
