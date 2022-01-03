enum Type {
  VARIABLE = "variable",
  REGULAR = "regular",
}

export const typeFromString = (type: string): Type => {
  return Type[type.toUpperCase() as keyof typeof Type];
};

export default Type;
