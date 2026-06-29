export const dressCode = {
  title: "Código de Vestuario",
  intro:
    "Queremos que esta noche sea inolvidable. Te pedimos vestirte para la ocasión. Evitar vestidos y trajes estampados, con lentejuelas o decoraciones exageradas. Te agradecemos tener en cuenta este código de vestuario para nuestro gran día.",
  // Suggested-color boards shown under "Colores sugeridos" — women first, then
  // men. Each carries its own allowed-color palette (rendered as labeled
  // swatches above the board). Hex values sampled from the "Paleta de colores" art.
  inspirationBoards: [
    {
      label: "Ellas",
      url: "https://www.pinterest.com/valentinafonnegra/vestuario-mujer/",
      palette: [
        { name: "Palo de rosa", hex: "#E2A79F" },
        { name: "Coral", hex: "#FD9376" },
        { name: "Durazno", hex: "#F4A578" },
        { name: "Terracota", hex: "#D47040" },
        { name: "Mostaza", hex: "#F5BA46" },
        { name: "Salvia", hex: "#B2BDA9" },
        { name: "Eucalipto", hex: "#82987F" },
        { name: "Oliva", hex: "#908B61" },
        { name: "Oliva claro", hex: "#ABA171" },
        { name: "Lavanda", hex: "#A894C0" },
        { name: "Azul polvo", hex: "#788CA5" },
        { name: "Azul niebla", hex: "#BBBEC5" },
        { name: "Topo", hex: "#B19C87" },
        { name: "Camel", hex: "#9A6C49" },
        { name: "Chocolate", hex: "#53311D" },
        { name: "Rojo", hex: "#C42422" },
      ],
    },
    {
      label: "Ellos",
      url: "https://www.pinterest.com/valentinafonnegra/vestuario-hombre/",
      palette: [
        { name: "Gris", hex: "#9B9B9B" },
        { name: "Gris cálido", hex: "#91877C" },
        { name: "Arena", hex: "#B39C88" },
        { name: "Café claro", hex: "#966644" },
        { name: "Café", hex: "#59341E" },
        { name: "Negro", hex: "#222221" },
      ],
    },
  ],
  recommendedPalette: [
    { name: "Palo de rosa", hex: "#D8B4B0" },
    { name: "Wine", hex: "#7B3540" },
    { name: "Durazno", hex: "#F0C090" },
    { name: "Naranjado", hex: "#C8682E" },
    { name: "Eucalipto", hex: "#8BA597" },
    { name: "Esmeralda", hex: "#2C6B33" },
  ],
  avoid: [
    "Blanco",
    "Marfil",
    "Beige muy claro",
    "Vinotinto",
    "Verde oscuro",
    "Azul oscuro",
  ],
  notes:
    "Llevar tacones cómodos, debido a que la ceremonia es en césped; y un abrigo porque en la noche hace frío.",
} as const;

export type DressCode = typeof dressCode;
