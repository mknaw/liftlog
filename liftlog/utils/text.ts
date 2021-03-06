
export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const camelToTitle = (s: string) => {
  return capitalize(s.replace( /([A-Z])/g, ' $1' ));
}

