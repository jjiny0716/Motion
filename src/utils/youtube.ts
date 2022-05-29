// https://www.youtube.com/watch?v=i4PEMTxxHb4&ab_channel=M.CtheMAXOfficial
// https://youtu.be/i4PEMTxxHb4
// https://www.youtube.com/embed/i4PEMTxxHb4
// to
// https://www.youtube.com/embed/i4PEMTxxHb4
export function convertYoutubeURLToEmbbededURL(url: string): string | undefined {
  if (!url) return undefined;
  return "https://www.youtube.com/embed/" + url.split('/').at(-1)?.split('&')[0].replace("watch?v=", "");
}
