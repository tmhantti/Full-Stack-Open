export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBaseExtended extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBaseExtended {
  kind: "basic"
}

export interface CoursePartBackground extends CoursePartBaseExtended {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartSpecial extends CoursePartBaseExtended {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;