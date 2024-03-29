<template>
  <q-page padding>
    <h1>Podium</h1>
    <h4>Courses</h4>
    <ol>
      <li v-for="(course, id) in allCourses.courses" :key="id">
        {{ course.prefix.prefix }} {{ course.number }}&mdash;{{ course.title }}
      </li>
    </ol>
    <h4>Modules</h4>
    <ol v-if="allModules">
      <li v-for="(module, idx) in allModules.modules" :key="idx">
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

    <q-btn label="Click Me" @click="sendMessage" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { io, Socket } from 'socket.io-client';
import { AllCoursesQuery } from 'pages/__generated__/AllCoursesQuery';
import { AllModulesQuery } from 'pages/__generated__/AllModulesQuery';

export default defineComponent({
  name: 'PodiumPage',

  setup() {
    let socket: Socket;
    onMounted(() => {
      socket = io('ws://localhost:3000/podium');
    });

    const sendMessage = () => {
      socket.send('clicky');
    };

    const { result: allCourses } = useQuery<AllCoursesQuery>(gql`
      query AllCoursesQuery {
        courses: readAllCourses {
          id
          prefix {
            prefix
          }
          number
          title
        }
      }
    `);

    const {
      result: allModules,
      loading,
      error,
    } = useQuery<AllModulesQuery>(gql`
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
    return { allCourses, allModules, loading, error, sendMessage };
  },
});
</script>
