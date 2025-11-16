const categoryMap = {
  Moone: "Moon",
  Sonne: "Sunset",
};
export const mapCategory = (category) => {
  return categoryMap[category] || category;
};