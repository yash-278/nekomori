import { MediaSeason } from "../gql/graphql";

export function getCurrentSeason(): MediaSeason {
  const date = new Date();
  const month = date.getMonth();
  let season = MediaSeason.Winter;

  if (month >= 11 || month <= 1) {
    season = MediaSeason.Winter;
  } else if (month >= 2 && month <= 4) {
    season = MediaSeason.Spring;
  } else if (month >= 5 && month <= 7) {
    season = MediaSeason.Summer;
  } else {
    season = MediaSeason.Fall;
  }

  return season;
}

export function getNextSeason(): MediaSeason {
  const season = getCurrentSeason();
  switch (season) {
    case MediaSeason.Winter:
      return MediaSeason.Spring;
    case MediaSeason.Spring:
      return MediaSeason.Summer;
    case MediaSeason.Summer:
      return MediaSeason.Fall;
    case MediaSeason.Fall:
      return MediaSeason.Winter;
  }
}

export function getNextSeasonYear(): number {
  const season = getCurrentSeason();
  const date = new Date();
  const year = date.getFullYear();

  if (season === MediaSeason.Fall) {
    return year + 1;
  }

  return year;
}
