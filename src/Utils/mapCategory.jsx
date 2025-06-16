export const mapCategory = (category) => {
  const categoryMap = {
    Moone: "Moon",
    Sonne: "Sunset",
  };
  return categoryMap[category] || category;
};