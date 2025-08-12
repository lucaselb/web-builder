<template>
  <div
    class="canvas-element"
    :class="{
      'is-container': isContainer,
      'is-dragging': isDragging,
      'drag-over': isDragOver,
    }"
    :data-child-id="element.id"
    :draggable="!isContainer"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @dragover="handleDragOver"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- Element Controls -->
    <div class="element-controls" v-if="!isDragging">
      <span class="element-label">{{ element.name }}</span>
      <div class="control-buttons">
        <button @click="duplicateElement" class="control-btn" title="Duplicate">
          📋
        </button>
        <button
          @click="deleteElement"
          class="control-btn delete"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>

    <!-- Container Content (Row/Column) -->
    <div v-if="isContainer" class="container-content" :style="containerStyles">
      <div
        v-if="!element.children || element.children.length === 0"
        class="empty-container"
      >
        <div class="empty-container-text">Drop components here</div>
      </div>

      <CanvasElement
        v-for="(child, childIndex) in element.children"
        :key="child.id"
        :element="child"
        :index="childIndex"
        :parent-id="element.id"
        @move="handleChildMove"
        @delete="handleChildDelete"
        @duplicate="handleChildDuplicate"
      />
    </div>

    <!-- Regular Component Content -->
    <div
      v-else
      class="component-content"
      :style="componentStyles"
      v-html="element.content"
    />

    <!-- Drop Indicator for Containers -->
    <div
      v-if="dropIndicator.show && dropIndicator.targetId === element.id"
      class="container-drop-indicator"
      :class="{
        vertical: dropIndicator.orientation === 'vertical',
        horizontal: dropIndicator.orientation === 'horizontal',
      }"
      :style="{
        top: dropIndicator.position.y + 'px',
        left: dropIndicator.position.x + 'px',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useDragDrop, type ComponentItem } from "../composables/useDragDrop";

interface Props {
  element: ComponentItem;
  index: number;
  parentId?: string;
}

interface Emits {
  (e: "move", fromIndex: number, toIndex: number): void;
  (e: "delete", index: number): void;
  (e: "duplicate", index: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const {
  draggedItem,
  draggedFromSidebar,
  dropIndicator,
  startDrag,
  endDrag,
  showDropIndicator,
  hideDropIndicator,
  generateId,
} = useDragDrop();

const isDragging = ref(false);
const isDragOver = ref(false);

const isContainer = computed(() => {
  return props.element.type === "row" || props.element.type === "column";
});

const containerStyles = computed(() => {
  if (!isContainer.value) return {};

  return {
    ...props.element.styles,
    position: "relative",
  };
});

const componentStyles = computed(() => {
  if (isContainer.value) return {};

  return {
    ...props.element.styles,
    position: "relative",
  };
});

const handleDragStart = (event: DragEvent) => {
  if (isContainer.value) return;

  isDragging.value = true;
  startDrag(props.element, false);

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
  }
};

const handleDragEnd = () => {
  isDragging.value = false;
  endDrag();
};

const handleDragOver = (event: DragEvent) => {
  if (!isContainer.value || !draggedItem.value) return;

  event.preventDefault();
  event.stopPropagation();

  const rect = event.currentTarget!.getBoundingClientRect();
  const y = event.clientY - rect.top;
  const x = event.clientX - rect.left;

  // Calculate insertion index based on container type
  let insertIndex = 0;
  if (props.element.children && props.element.children.length > 0) {
    const children = props.element.children;
    const isRow = props.element.type === "row";

    for (let i = 0; i < children.length; i++) {
      const childEl = document.querySelector(
        `[data-child-id="${children[i].id}"]`
      );
      if (childEl) {
        const childRect = childEl.getBoundingClientRect();
        const childCenter = isRow
          ? childRect.left + childRect.width / 2 - rect.left
          : childRect.top + childRect.height / 2 - rect.top;

        if ((isRow && x < childCenter) || (!isRow && y < childCenter)) {
          break;
        }
        insertIndex = i + 1;
      }
    }
  }

  const orientation = props.element.type === "row" ? "horizontal" : "vertical";
  showDropIndicator(props.element.id, insertIndex, x, y, orientation);
  event.dataTransfer!.dropEffect = "copy";
};

const handleDragEnter = (event: DragEvent) => {
  if (!isContainer.value || !draggedItem.value) return;

  event.preventDefault();
  event.stopPropagation();
  isDragOver.value = true;
};

const handleDragLeave = (event: DragEvent) => {
  if (!isContainer.value) return;

  event.preventDefault();
  event.stopPropagation();

  // Only hide when leaving the container completely
  if (!event.currentTarget?.contains(event.relatedTarget as Node)) {
    isDragOver.value = false;
    hideDropIndicator();
  }
};

const handleDrop = (event: DragEvent) => {
  if (!isContainer.value || !draggedItem.value) return;

  event.preventDefault();
  event.stopPropagation();

  isDragOver.value = false;
  hideDropIndicator();

  // Add the dragged item to this container
  if (draggedFromSidebar.value) {
    // New component from sidebar
    const newElement: ComponentItem = {
      ...draggedItem.value,
      id: generateId(),
    };

    if (!props.element.children) {
      props.element.children = [];
    }

    const insertIndex =
      dropIndicator.insertIndex >= 0
        ? dropIndicator.insertIndex
        : props.element.children.length;
    props.element.children.splice(insertIndex, 0, newElement);
  } else {
    // Moving existing component - this would need parent-child communication
    console.log(
      "Moving existing component to container - needs parent communication"
    );
  }

  endDrag();
};

const deleteElement = () => {
  emit("delete", props.index);
};

const duplicateElement = () => {
  emit("duplicate", props.index);
};

const handleChildMove = (fromIndex: number, toIndex: number) => {
  if (!props.element.children) return;

  const child = props.element.children.splice(fromIndex, 1)[0];
  props.element.children.splice(toIndex, 0, child);
};

const handleChildDelete = (childIndex: number) => {
  if (!props.element.children) return;

  props.element.children.splice(childIndex, 1);
};

const handleChildDuplicate = (childIndex: number) => {
  if (!props.element.children) return;

  const original = props.element.children[childIndex];
  const duplicate: ComponentItem = {
    ...original,
    id: generateId(),
  };
  props.element.children.splice(childIndex + 1, 0, duplicate);
};
</script>

<style scoped>
.canvas-element {
  position: relative;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.canvas-element:hover {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.canvas-element.is-dragging {
  opacity: 0.5;
  transform: rotate(2deg);
}

.canvas-element.drag-over {
  outline: 2px solid #28a745;
  outline-offset: 2px;
}

.element-controls {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.canvas-element:hover .element-controls {
  opacity: 1;
}

.element-label {
  font-size: 12px;
  font-weight: 600;
  color: #495057;
}

.control-buttons {
  display: flex;
  gap: 4px;
}

.control-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background-color: #f8f9fa;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: background-color 0.2s ease;
}

.control-btn:hover {
  background-color: #e9ecef;
}

.control-btn.delete:hover {
  background-color: #dc3545;
  color: #ffffff;
}

.container-content {
  min-height: 80px;
  border-radius: 8px;
  position: relative;
}

.empty-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border: 2px dashed #ced4da;
  border-radius: 8px;
  background-color: #f8f9fa;
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
}

.empty-container-text {
  pointer-events: none;
}

.component-content {
  border-radius: 8px;
  overflow: hidden;
}

.container-drop-indicator {
  position: absolute;
  border: 2px dashed #007bff;
  border-radius: 4px;
  z-index: 1000;
  pointer-events: none;
  animation: pulse 1s infinite;
  background-color: rgba(0, 123, 255, 0.1);
}

.container-drop-indicator.horizontal {
  width: 100%;
  height: 4px;
  left: 0 !important;
}

.container-drop-indicator.vertical {
  width: 4px;
  height: 40px;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

/* Container specific styles */
.is-container .component-content {
  padding: 16px;
}

.is-container.drag-over .container-content {
  background-color: rgba(40, 167, 69, 0.1);
}
</style>
