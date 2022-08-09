const trimWhitespaceCharacters = (text: string): string => {
  return text.replace(/^\s+|\s+$/g, '');
}

const replaceWhitespaceWithHyphen = (text: string): string => {
  return text.replace(/\s+/g, '-');
}

const replaceSlashWithSpaces = (text: string): string => {
  return text.replace(/\//g, ' ');
}

const replaceUnnecessaryCharacters = (text: string): string => {
  return text.replaceAll(/[^a-zA-Z /]/g, "");
}

export const formatStoryName = (text: string): string => {
  let formattedStoryName = text;
  formattedStoryName = formattedStoryName.toLowerCase();
  formattedStoryName = replaceUnnecessaryCharacters(formattedStoryName);
  formattedStoryName = replaceSlashWithSpaces(formattedStoryName);
  formattedStoryName = trimWhitespaceCharacters(formattedStoryName);
  formattedStoryName = replaceWhitespaceWithHyphen(formattedStoryName);

  return formattedStoryName;
}


export const formatStoryId = (text: string): string => {
  let formattedStoryId = text;
  formattedStoryId.toUpperCase();
  formattedStoryId = trimWhitespaceCharacters(formattedStoryId);

  return formattedStoryId;
}
