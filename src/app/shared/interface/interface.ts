export interface songsData {
  album: null;
  band: { id: number; title: string };
  cityName: string;
  country: string;
  createdAt: string;
  deletedAt: string;
  duration: number;
  genres: { id: number; genre_name: string }[];
  id: number;
  isSongFavorite: boolean;
  latitude: number;
  live: boolean;
  longitude: number;
  song: string;
  stateName: string;
  thumbnail: string;
  title: string;
  totalCount: string;
}
export class eventData {
  band: { id: number; title: string };
  deletedAt: null;
  description: string;
  endTime: string;
  eventName: string;
  id: number;
  latitude: number;
  location: string;
  longitude: number;
  startTime: string;
  thumbnail: string;
  totalCount: string;
}

// Band Profile component
export class addBandMemberData {
  avatar: null;
  email: string;
  id: number;
  roleId: number;
  userName: string;
}

export class bandDetails {
  createdAt: string;
  description: string;
  id: number;
  logo: string;
  title: string;
}

export class bandMembers {
  amiFollowing: boolean;
  avatar: string;
  bandId: number;
  bandRoleId: number;
  email: string;
  id: number;
  role: { id: number; name: string };
  userName: string;
}
export class bandGallery {
  createdAt: string;
  id: number;
  mediaType: string;
  mediaURL: string;
}
