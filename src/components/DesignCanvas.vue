<template>
  <div class="design-canvas">
    <div class="canvas-header">
      <h2>Design Canvas</h2>
      <div class="canvas-actions">
        <button @click="addRow" class="action-btn">
          <span class="btn-icon">➕</span>
          Add Row
        </button>
        <button @click="addColumn" class="action-btn">
          <span class="btn-icon">📐</span>
          Add Column
        </button>
        <button @click="exportCode" class="action-btn primary">
          <span class="btn-icon">📋</span>
          Export Code
        </button>
      </div>
    </div>

    <div
      class="canvas-content"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      :class="{ 'drag-over': isDragOver }"
    >
      <div v-if="canvasElements.length === 0" class="empty-canvas">
        <div class="empty-icon">🎨</div>
        <h3>Start Building Your Design</h3>
        <p>Drag components from the sidebar to begin creating your layout</p>
      </div>

      <CanvasElement
        v-for="(element, index) in canvasElements"
        :key="element.id"
        :element="element"
        :index="index"
        @move="moveElement"
        @delete="deleteElement"
        @duplicate="duplicateElement"
      />
    </div>

    <!-- Drop Indicator -->
    <div
      v-if="dropIndicator.show"
      class="drop-indicator"
      :style="{
        top: dropIndicator.position.y + 'px',
        left: dropIndicator.position.x + 'px',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from "vue";
import { useDragDrop, type ComponentItem } from "../composables/useDragDrop";
import CanvasElement from "./CanvasElement.vue";

const { draggedItem, draggedFromSidebar, dropIndicator, endDrag, generateId } =
  useDragDrop();

const canvasElements = ref<ComponentItem[]>([]);
const isDragOver = ref(false);

const addRow = () => {
  const newRow: ComponentItem = {
    id: generateId(),
    type: "row",
    name: "Row",
    content: "",
    children: [],
    styles: {
      display: "flex",
      "flex-direction": "row",
      gap: "16px",
      padding: "16px",
      "min-height": "100px",
      border: "2px dashed #e0e0e0",
      "border-radius": "8px",
      "background-color": "#f9f9f9",
    },
  };
  canvasElements.value.push(newRow);
};

const addColumn = () => {
  const newColumn: ComponentItem = {
    id: generateId(),
    type: "column",
    name: "Column",
    content: "",
    children: [],
    styles: {
      display: "flex",
      "flex-direction": "column",
      gap: "16px",
      padding: "16px",
      "min-height": "200px",
      border: "2px dashed #e0e0e0",
      "border-radius": "8px",
      "background-color": "#f9f9f9",
    },
  };
  canvasElements.value.push(newColumn);
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  if (draggedItem.value) {
    event.dataTransfer!.dropEffect = "copy";
  }
};

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault();
  if (draggedItem.value) {
    isDragOver.value = true;
  }
};

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
  // Only hide when leaving the canvas completely
  if (!event.currentTarget?.contains(event.relatedTarget as Node)) {
    isDragOver.value = false;
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;

  if (draggedItem.value && draggedFromSidebar.value) {
    // Add new component to canvas
    const newElement: ComponentItem = {
      ...draggedItem.value,
      id: generateId(),
    };
    canvasElements.value.push(newElement);
  }

  endDrag();
};

const moveElement = (fromIndex: number, toIndex: number) => {
  const element = canvasElements.value.splice(fromIndex, 1)[0];
  canvasElements.value.splice(toIndex, 0, element);
};

const deleteElement = (index: number) => {
  canvasElements.value.splice(index, 1);
};

const duplicateElement = (index: number) => {
  const original = canvasElements.value[index];
  const duplicate: ComponentItem = {
    ...original,
    id: generateId(),
    children: original.children
      ? original.children.map((child) => ({
          ...child,
          id: generateId(),
        }))
      : [],
  };
  canvasElements.value.splice(index + 1, 0, duplicate);
};

interface Emits {
  (e: "export", elements: ComponentItem[]): void;
}

const emit = defineEmits<Emits>();

const exportCode = () => {
  emit("export", canvasElements.value);
};

// Expose canvasElements for export functionality
defineExpose({
  canvasElements,
});
</script>

<style scoped>
.design-canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
}

.canvas-header {
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.canvas-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #495057;
}

.canvas-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 8px 16px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: #ffffff;
  color: #495057;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: #e9ecef;
  transform: translateY(-1px);
}

.action-btn.primary {
  background-color: #007bff;
  color: #ffffff;
  border-color: #007bff;
}

.action-btn.primary:hover {
  background-color: #0056b3;
}

.btn-icon {
  font-size: 14px;
}

.canvas-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  min-height: 0;
  position: relative;
  transition: background-color 0.2s ease;
}

.canvas-content.drag-over {
  background-color: #e3f2fd;
}

.empty-canvas {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  color: #6c757d;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.7;
}

.empty-canvas h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
}

.empty-canvas p {
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
}

.drop-indicator {
  position: fixed;
  width: 100%;
  height: 4px;
  border: 2px dashed #007bff;
  border-radius: 4px;
  background-color: rgba(0, 123, 255, 0.1);
  z-index: 1000;
  pointer-events: none;
  animation: pulse 1s infinite;
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

.canvas-content::-webkit-scrollbar {
  width: 8px;
}

.canvas-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.canvas-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.canvas-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
