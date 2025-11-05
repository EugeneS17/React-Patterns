export interface LaunchLinks {
  mission_patch?: string;
  mission_patch_small?: string;
  reddit_campaign?: string;
  reddit_launch?: string;
  reddit_recovery?: string;
  reddit_media?: string;
  presskit?: string;
  article_link?: string;
  wikipedia?: string;
  video_link?: string;
  youtube_id?: string;
  flickr_images?: string[];
}

export interface RocketInfo {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface Launch {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  upcoming: boolean;
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: string;
  launch_date_local: string;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window: number;
  rocket: RocketInfo;
  ships: string[];
  launch_site: {
    site_id: string;
    site_name: string;
    site_name_long: string;
  };
  launch_success: boolean | null;
  links: LaunchLinks;
  details: string | null;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  timeline: Record<string, unknown> | null;
  crew: unknown | null;
}
