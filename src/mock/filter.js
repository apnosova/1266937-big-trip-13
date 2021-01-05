const filterNames = [
  `everything`,
  `future`,
  `past`,
];

export const generateFilter = () => {
  return filterNames.map((filterName) => {
    return {
      name: filterName,
    };
  });
};
