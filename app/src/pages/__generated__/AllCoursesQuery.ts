/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllCoursesQuery
// ====================================================

export interface AllCoursesQuery_courses_prefix {
  __typename: "Prefix";
  /**
   * Prefix (e.g., `COS`)
   */
  prefix: string;
}

export interface AllCoursesQuery_courses {
  __typename: "Course";
  /**
   * Primary key
   */
  id: number;
  prefix: AllCoursesQuery_courses_prefix;
  /**
   * Course number (e.g., `243`, `103H`)
   */
  number: string;
  /**
   * Course title
   */
  title: string;
}

export interface AllCoursesQuery {
  courses: AllCoursesQuery_courses[];
}
