export interface Speaker {
  name: string;
  affiliation: string;
  topic: string;
  image: string;
}

export interface ScheduleEvent {
  time: string;
  title: string;
}

export interface DaySchedule {
  day: string;
  events: ScheduleEvent[];
}

export interface Section {
  id: string;
  title: string;
  content?: string;
  items?: Speaker[];
  schedule?: DaySchedule[];
  address?: string;
  deadline?: string;
  link?: string;
  points?: string[];
}

export interface Sponsor {
  name: string;
  logo: string;
}

export interface Contact {
  email: string;
  twitter: string;
  website: string;
}

export interface SchoolInfo {
  title: string;
  subtitle: string;
  dates: string;
  location: string;
  description: string;
  heroImage: string;
}

export interface ContentData {
  school: SchoolInfo;
  sections: Section[];
  sponsors: Sponsor[];
  contact: Contact;
}
