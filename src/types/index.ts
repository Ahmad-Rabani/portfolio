export interface Project {
  id: number;
  title: string;
  description: string;
  problem: string;
  impact: string;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'uiux' | 'tools';
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  current?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SummaryCard {
  value: string;
  label: string;
  description: string;
}
