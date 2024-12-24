<template>
          <div>
            hz-input
          </div>
        </template>

        <script lang="ts" setup name="hz-input">
        import { defineProps } from 'vue'
        import { inputProps } from './types'

        defineProps(inputProps)
        </script>

        <style scoped lang="scss">
        .hz-input {
        }
        </style>
        