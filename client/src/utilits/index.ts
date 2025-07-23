export const nameEditor = (name: string|undefined) => {
  const beforeExtentionIndex = name?.lastIndexOf('.');
  if(!name) return '';
  if (beforeExtentionIndex !== -1) {
    return `${name.slice(0, beforeExtentionIndex)}_wt${name.slice(beforeExtentionIndex)}`;
  }
  return `${name}_wt`;
}

export const fontSizeEditor = (textLength: number) => {
  
  return textLength < 5 ? 'text-6xl' :
  textLength < 10 ? 'text-5xl' :
  textLength < 20 ? 'text-4xl' :
  textLength < 30 ? 'text-3xl' :
  textLength < 40 ? 'text-2xl' :
  'text-xl'; 
}
 

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};