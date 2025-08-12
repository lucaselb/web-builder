<template>
  <div class="component-sidebar">
    <div class="sidebar-header">
      <h2>Components</h2>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search components..."
        class="search-input"
      />
    </div>

    <div class="sidebar-content">
      <div
        v-for="category in filteredCategories"
        :key="category"
        class="category-section"
      >
        <h3 class="category-title" @click="toggleCategory(category)">
          <span
            class="expand-icon"
            :class="{ expanded: expandedCategories.has(category) }"
            >▶</span
          >
          {{ category }}
        </h3>

        <div
          v-if="expandedCategories.has(category)"
          class="category-components"
        >
          <div
            v-for="component in getComponentsByCategory(category)"
            :key="component.id"
            class="component-item"
            :draggable="true"
            @dragstart="startDrag($event, component)"
            @dragend="endDrag"
          >
            <span class="component-icon">{{ component.icon }}</span>
            <span class="component-name">{{ component.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  componentCategories,
  componentDefinitions,
  type ComponentDefinition,
} from "../data/components";
import { useDragDrop } from "../composables/useDragDrop";

const { startDrag: startDragDrop, endDrag: endDragDrop } = useDragDrop();

const searchQuery = ref("");
const expandedCategories = ref(new Set(["Containment"]));

const toggleCategory = (category: string) => {
  if (expandedCategories.value.has(category)) {
    expandedCategories.value.delete(category);
  } else {
    expandedCategories.value.add(category);
  }
};

const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return componentCategories;
  }

  const query = searchQuery.value.toLowerCase();
  return componentCategories.filter((category) => {
    const categoryComponents = componentDefinitions.filter(
      (comp) => comp.category === category
    );
    return categoryComponents.some(
      (comp) =>
        comp.name.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query)
    );
  });
});

const getComponentsByCategory = (category: string) => {
  const components = componentDefinitions.filter(
    (comp) => comp.category === category
  );

  if (!searchQuery.value) {
    return components;
  }

  const query = searchQuery.value.toLowerCase();
  return components.filter((comp) => comp.name.toLowerCase().includes(query));
};

const startDrag = (event: DragEvent, component: ComponentDefinition) => {
  const draggedComponent = {
    id: component.id,
    type: component.id,
    name: component.name,
    content: component.defaultContent,
    styles: component.defaultStyles,
  };

  startDragDrop(draggedComponent, true);

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("text/plain", component.name);
  }
};

const endDrag = () => {
  endDragDrop();
};
</script>

<style scoped>
.component-sidebar {
  width: 300px;
  height: 100vh;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background-color: #ffffff;
}

.sidebar-header h2 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #495057;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  background-color: #ffffff;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.category-section {
  margin-bottom: 8px;
}

.category-title {
  padding: 12px 20px;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
}

.category-title:hover {
  background-color: #f8f9fa;
}

.expand-icon {
  transition: transform 0.2s ease;
  font-size: 12px;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.category-components {
  background-color: #ffffff;
}

.component-item {
  padding: 12px 20px 12px 40px;
  cursor: grab;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #f8f9fa;
  transition: background-color 0.2s ease;
}

.component-item:hover {
  background-color: #e3f2fd;
}

.component-item:active {
  cursor: grabbing;
}

.component-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.component-name {
  font-size: 13px;
  color: #495057;
  font-weight: 500;
}

.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
