/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStatus
// ====================================================

export interface getStatus_readStatus {
  __typename: "Status";
  /**
   * Simple status string
   */
  status: string;
}

export interface getStatus {
  /**
   * Read current status
   */
  readStatus: getStatus_readStatus;
}
