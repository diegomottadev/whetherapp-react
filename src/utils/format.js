/**
 * Rounds a temperature to a whole number.
 * Math.round(-0.3) gives -0, so the "|| 0" turns it into a plain 0.
 * @param {number} celsius - Temperature in °C.
 * @returns {string} For example "19".
 */
export const formatTemperature = celsius => String(Math.round(celsius) || 0);

/**
 * Adds the unit to a wind speed.
 * @param {number} metersPerSecond - Wind speed in m/s, as the API sends it with units=metric.
 * @returns {string} For example "3.6 m/s".
 */
export const formatWind = metersPerSecond => `${metersPerSecond} m/s`;

/**
 * Adds the percent sign to a humidity value.
 * @param {number} percent - Relative humidity, from 0 to 100.
 * @returns {string} For example "82 %".
 */
export const formatHumidity = percent => `${percent} %`;
