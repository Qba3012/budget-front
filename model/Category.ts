enum Category {
  GROCERY = "grocery",
  CAR = "car",
  MEDICAL = "medical",
  TRAVEL = "travel",
}

export const categoryFromString = (category: String) => {
  return Category[category.toUpperCase() as keyof typeof Category];
};
export default Category;
