export const nameEditor = (name: string|undefined) => {
  const beforeExtentionIndex = name?.lastIndexOf('.');
  if(!name) return '';
  if (beforeExtentionIndex !== -1) {
    return `${name.slice(0, beforeExtentionIndex)}_wt${name.slice(beforeExtentionIndex)}`;
  }
  return `${name}_wt`;
}
