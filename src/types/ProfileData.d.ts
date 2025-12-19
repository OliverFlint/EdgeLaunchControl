export type ProfileData = {
  last_used?: string;
  profiles_order?: string[];
  info_cache?: {
    [key: string]: {
      name?: string;
      avatar_icon?: string;
    };
  };
};
