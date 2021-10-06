/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllModulesQuery
// ====================================================

export interface AllModulesQuery_modules_resources {
  __typename: "Resource";
  /**
   * Primary key
   */
  id: number;
  /**
   * Name of this resource
   */
  name: string;
  /**
   * Description of this resource
   */
  description: string;
  /**
   * Details of this resource
   */
  details: any;
}

export interface AllModulesQuery_modules_topics_resources {
  __typename: "Resource";
  /**
   * Primary key
   */
  id: number;
  /**
   * Name of this resource
   */
  name: string;
  /**
   * Description of this resource
   */
  description: string;
  /**
   * Details of this resource
   */
  details: any;
}

export interface AllModulesQuery_modules_topics_activities_resources {
  __typename: "Resource";
  /**
   * Primary key
   */
  id: number;
  /**
   * Name of this resource
   */
  name: string;
  /**
   * Description of this resource
   */
  description: string;
}

export interface AllModulesQuery_modules_topics_activities {
  __typename: "Activity";
  /**
   * Primary key
   */
  id: number;
  /**
   * Title for this activity
   */
  title: string;
  /**
   * Description of this activity
   */
  description: string;
  /**
   * Details of this activity
   */
  details: any;
  resources: AllModulesQuery_modules_topics_activities_resources[];
}

export interface AllModulesQuery_modules_topics {
  __typename: "Topic";
  /**
   * Primary key
   */
  id: number;
  /**
   * Title for this topic
   */
  title: string;
  /**
   * Description of this topic
   */
  description: string;
  resources: AllModulesQuery_modules_topics_resources[];
  activities: AllModulesQuery_modules_topics_activities[];
}

export interface AllModulesQuery_modules {
  __typename: "Module";
  /**
   * Primary key
   */
  id: number;
  /**
   * Title for this module
   */
  title: string;
  /**
   * Description of this module
   */
  description: string;
  resources: AllModulesQuery_modules_resources[];
  topics: AllModulesQuery_modules_topics[];
}

export interface AllModulesQuery {
  modules: AllModulesQuery_modules[];
}
