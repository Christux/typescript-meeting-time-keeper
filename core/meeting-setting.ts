export interface MeetingSetting extends Section {
  date?: string;
  chapters: Chapter[];
}

export interface Chapter {
  title: string;
  sections: Section[];
}

export interface Section {
  title: string;
  speaker?: string;
  duration: number;
  _durationString?: string;
  elapsedTime?: number;
  _elapsedTimeString?: string;
}
