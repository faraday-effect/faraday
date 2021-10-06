<template>
  <q-page padding>
    <h1>Podium</h1>
    <ol v-if="result">
      <li v-for="(module, idx) in result.modules" :key="idx">
        <strong>Module</strong>
        {{ module.title }}&mdash;{{ module.description }}
        <ol>
          <li v-for="(topic, idx) in module.topics" :key="idx">
            <strong>Topic</strong>
            {{ topic.title }}&mdash;{{ topic.description }}
            <span v-for="(resource, idx) in topic.resources" :key="idx">
              [{{ resource.name }}&mdash;{{ resource.description }}
              {{ resource.details }}]
            </span>
            <ol>
              <li v-for="(activity, idx) in topic.activities" :key="idx">
                <strong>Activity</strong>
                {{ activity.title }}&mdash;{{ activity.description }}
              </li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { AllModulesQuery } from 'pages/__generated__/AllModulesQuery';

export default defineComponent({
  name: 'PodiumPage',

  setup() {
    const { result, loading, error } = useQuery<AllModulesQuery>(gql`
      query AllModulesQuery {
        modules: readAllModules {
          id
          title
          description
          resources {
            id
            name
            description
            details
          }
          topics {
            id
            title
            description
            resources {
              id
              name
              description
              details
            }
            activities {
              id
              title
              description
              details
              resources {
                id
                name
                description
              }
            }
          }
        }
      }
    `);
    return { result, loading, error };
  },
});
</script>
