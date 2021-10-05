/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllModules
// ====================================================

export interface AllModules_readAllModules_resources {
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

export interface AllModules_readAllModules_topics_resources {
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

export interface AllModules_readAllModules_topics_activities_resources {
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

export interface AllModules_readAllModules_topics_activities {
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
  resources: AllModules_readAllModules_topics_activities_resources[];
}

export interface AllModules_readAllModules_topics {
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
  resources: AllModules_readAllModules_topics_resources[];
  activities: AllModules_readAllModules_topics_activities[];
}

export interface AllModules_readAllModules {
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
  resources: AllModules_readAllModules_resources[];
  topics: AllModules_readAllModules_topics[];
}

export interface AllModules {
  readAllModules: AllModules_readAllModules[];
}
