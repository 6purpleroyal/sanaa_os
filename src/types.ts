export type UserRole =
  | 'Visitor'
  | 'Journalist'
  | 'Participant'
  | 'Teacher'
  | 'School Admin'
  | 'Volunteer'
  | 'Judge'
  | 'County Coordinator'
  | 'Festival Coordinator'
  | 'National Admin'
  | 'Super Admin';

export type FestivalStatus = 'Active' | 'Upcoming' | 'Archived';

export interface Festival {
  id: string;
  year: number;
  edition: string; // e.g. "98th", "99th", "100th", "101st"
  theme: string;
  dates: string;
  logo: string;
  banner: string;
  status: FestivalStatus;
  totalSchools: number;
  totalParticipants: number;
  totalCounties: number;
  totalPerformances: number;
  totalAwards: number;
  hostVenue: string;
  hostCounty: string;
}

export interface Venue {
  id: string;
  name: string;
  hall: string;
  gps: { lat: number; lng: number };
  capacity: number;
  photos: string[];
  currentPerformance?: string;
  assignedJudgeCount: number;
  status: 'Active' | 'Idle' | 'Maintenance';
}

export interface County {
  id: string;
  name: string;
  region: 'Nairobi' | 'Coast' | 'Rift Valley' | 'Central' | 'Western' | 'Nyanza' | 'Eastern' | 'North Eastern';
  flag: string;
  coordinator: string;
  coordinatorPhone: string;
  schoolCount: number;
  participantCount: number;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  topSchool: string;
}

export type InstitutionType = 'Primary' | 'Secondary' | 'University' | 'TVET' | 'Special School';

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  countyId: string;
  countyName: string;
  principal: string;
  logo: string;
  contacts: string;
  website?: string;
  socials?: string;
  totalAppearances: number;
  trophiesWon: number;
}

export interface Participant {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  institutionId: string;
  institutionName: string;
  categoryId: string;
  categoryName: string;
  photo: string;
  bio: string;
}

export type CategoryType =
  | 'Choral & Folk Songs'
  | 'Zilizopendwa'
  | 'Traditional Cultural Dance'
  | 'Solo Vocal & Duet'
  | 'Instrumental Ensembles'
  | 'Elocution & Poetry'
  | 'Taarab'
  | 'Drama & Sacred Music';

export interface Category {
  id: string;
  code: string;
  name: string;
  type: CategoryType;
  description: string;
  timeLimitMinutes: number;
  maxParticipantsPerGroup: number;
}

export interface Performance {
  id: string;
  festivalYear: number;
  categoryId: string;
  categoryName: string;
  categoryCode: string;
  venueId: string;
  venueName: string;
  scheduledTime: string;
  schoolId: string;
  schoolName: string;
  countyName: string;
  conductor: string;
  pieceTitle: string;
  status: 'Scheduled' | 'Live' | 'Scored' | 'Completed';
  livestreamUrl?: string;
  photos?: string[];
  finalScore?: number;
  rank?: number;
  awardType?: 'Gold' | 'Silver' | 'Bronze' | 'Certificate';
}

export interface Judge {
  id: string;
  name: string;
  specialization: string;
  assignedCategoryIds: string[];
  avatar: string;
  experienceYears: number;
  institutionAffiliation: string;
}

export interface ScoreCriterion {
  creativity: number; // 0-20
  technique: number; // 0-20
  presentation: number; // 0-20
  originality: number; // 0-20
  timing: number; // 0-10
  stagePresence: number; // 0-10
}

export interface ScoreEntry extends ScoreCriterion {
  id: string;
  performanceId: string;
  judgeId: string;
  judgeName: string;
  comments: string;
  finalScore: number; // sum 0-100
  submittedAt: string;
}

export interface Award {
  id: string;
  festivalYear: number;
  type: 'Gold' | 'Silver' | 'Bronze' | 'Special Trophy';
  categoryName: string;
  winnerSchool: string;
  countyName: string;
  score: number;
  trophyName: string;
  presenter: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'Title Partner' | 'Platinum' | 'Gold' | 'Silver' | 'Media Partner';
  website: string;
  description: string;
}

export interface NewsStory {
  id: string;
  title: string;
  subtitle: string;
  category: 'Featured Story' | 'Behind the Performance' | 'Artist Spotlight' | 'School Spotlight' | 'Judge Perspective' | 'Volunteer Diaries' | 'Cultural Heritage';
  author: string;
  authorRole: string;
  publishDate: string;
  coverImage: string;
  content: string;
  galleryImages: string[];
  audioQuoteUrl?: string;
  audioQuoteTitle?: string;
  videoUrl?: string;
  relatedPerformanceId?: string;
  isFeatured: boolean;
  readTime: string;
  likes: number;
  commentsCount: number;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'audio';
  title: string;
  url: string;
  thumbnailUrl?: string;
  tags: string[];
  credits: string;
  countyName: string;
  schoolName?: string;
  festivalYear: number;
  createdAt: string;
}

export interface VolunteerTask {
  id: string;
  volunteerName: string;
  role: 'Data Collector' | 'Usher & Hospitality' | 'Stage Manager' | 'Media Officer' | 'Judge Assistant';
  assignedVenue: string;
  assignment: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  date: string;
  shiftTime: string;
}

export interface OfflineScoreCapture {
  id: string;
  timestamp: string;
  performanceId: string;
  schoolName: string;
  categoryName: string;
  venueName: string;
  judgeName: string;
  scores: ScoreCriterion;
  finalScore: number;
  comments: string;
  mediaFilesCount: number;
  synced: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  timestamp: string;
  ip: string;
  details: string;
}
