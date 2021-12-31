import { GraphQLScalarType, Kind } from 'graphql';

export const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',

  /**
   * Convert the scalar's back-end representation to a JSON-compatible format.
   * @param value - representation on the back-end
   */
  serialize(value: string) {
    return value;
  },

  /**
   * Convert the scalar's JSON value to its back-end representation.
   * Called when the scalar is provided by a client as a GraphQL variable for an argument.
   * @param value - JSON representation
   */
  parseValue(value: string) {
    return value;
  },

  /**
   * When an incoming query string includes the scalar as a hard-coded argument value,
   * that value is part of the query document's abstract syntax tree (AST).
   * Convert the value's AST representation to the scalar's back-end representation.
   * @param ast
   */
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }

    return null; // Invalid kind.
  },
});

// Credits:
// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/
