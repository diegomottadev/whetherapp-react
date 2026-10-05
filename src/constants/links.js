// Footer links. External ones open in a new tab; internal ones stay in the same tab.
// BASE_URL is "/" in dev and "/whetherapp-react/" in the build, so the internal link works in both.
export const FOOTER_LINKS = [
  {
    id: 'redux',
    label: 'How Redux works here',
    href: `${import.meta.env.BASE_URL}explanation-redux/`,
    external: false,
  },
  { id: 'data', label: 'Data from OpenWeatherMap', href: 'https://openweathermap.org/', external: true },
  { id: 'icons', label: 'Icons by Weather Icons', href: 'https://erikflowers.github.io/weather-icons/', external: true },
  { id: 'code', label: 'Code on GitHub', href: 'https://github.com/diegomottadev/whetherapp-react', external: true },
];
