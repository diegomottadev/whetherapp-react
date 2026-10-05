// Places on the page, in this order. Some are towns or islands, so the API gets
// coordinates instead of a name: "Copacabana" alone could also be the beach in Rio.
// To add one, add an entry here. lat and lon are in decimal degrees.
export const CITIES = [
  { id: 'cusco', name: 'Cusco', country: 'Peru', lat: -13.5171, lon: -71.9785 },
  { id: 'copacabana', name: 'Copacabana', country: 'Bolivia', lat: -16.1657, lon: -69.0854 },
  { id: 'vina-del-mar', name: 'Viña del Mar', country: 'Chile', lat: -33.0245, lon: -71.5518 },
  { id: 'porto-de-galinhas', name: 'Porto de Galinhas', country: 'Brazil', lat: -8.5008, lon: -35.003 },
  { id: 'santa-cruz-island', name: 'Santa Cruz Island', country: 'Galápagos, Ecuador', lat: -0.7472, lon: -90.3134 },
  { id: 'flores', name: 'Flores', country: 'Guatemala', lat: 16.9299, lon: -89.8915 },
  { id: 'caye-caulker', name: 'Caye Caulker', country: 'Belize', lat: 17.7432, lon: -88.025 },
  { id: 'santa-marta', name: 'Santa Marta', country: 'Colombia', lat: 11.2321, lon: -74.1951 },
  { id: 'koh-phangan', name: 'Koh Phangan', country: 'Thailand', lat: 9.735, lon: 100.0306 },
];
