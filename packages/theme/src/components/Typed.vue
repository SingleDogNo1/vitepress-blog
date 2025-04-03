<template>
  <div ref="typedRef">
    <slot><span class="typing" /></slot>
  </div>
</template>

<script setup lang="ts">
import Typed, { type TypedOptions } from "typed.js";
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";

defineOptions({
  name: "TypedComponent"
});

const props = defineProps<{
  options: TypedOptions;
}>();

const typedRef = useTemplateRef('typedRef');
let typedInstance: Typed | null = null;

function initTypedJS() {
  try {
    const $typed = typedRef.value!.querySelector(".typing");
    if (!$typed) {
      throw new Error("Make sure that there is an element with the class attribute 'typing'");
    }

    typedInstance = new Typed($typed, props.options);
  } catch (error) {
    console.error("Failed to create Typed instance:", error);
  }
}

onMounted(() => {
  initTypedJS();
});

onBeforeUnmount(() => {
  typedInstance?.destroy();
});

</script>