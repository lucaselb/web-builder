import { ref, reactive } from "vue";

export interface ComponentItem {
  id: string;
  type: string;
  name: string;
  content?: string;
  children?: ComponentItem[];
  styles?: Record<string, string>;
}

export interface DropZone {
  id: string;
  type: "container" | "row" | "column";
  accepts: string[];
}

// Global state - singleton pattern
const draggedItem = ref<ComponentItem | null>(null);
const draggedFromSidebar = ref<boolean>(false);
const dropIndicator = reactive({
  show: false,
  position: { x: 0, y: 0 },
  targetId: "",
  insertIndex: -1,
  orientation: "horizontal" as "horizontal" | "vertical",
});

const generateId = () => {
  return `component_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const startDrag = (item: ComponentItem, fromSidebar: boolean = false) => {
  draggedItem.value = fromSidebar ? { ...item, id: generateId() } : item;
  draggedFromSidebar.value = fromSidebar;
};

const endDrag = () => {
  draggedItem.value = null;
  draggedFromSidebar.value = false;
  hideDropIndicator();
};

const showDropIndicator = (
  targetId: string,
  insertIndex: number,
  x: number,
  y: number,
  orientation: "horizontal" | "vertical" = "horizontal"
) => {
  dropIndicator.show = true;
  dropIndicator.targetId = targetId;
  dropIndicator.insertIndex = insertIndex;
  dropIndicator.position.x = x;
  dropIndicator.position.y = y;
  dropIndicator.orientation = orientation;
};

const hideDropIndicator = () => {
  dropIndicator.show = false;
  dropIndicator.targetId = "";
  dropIndicator.insertIndex = -1;
};

export const useDragDrop = () => {
  return {
    draggedItem,
    draggedFromSidebar,
    dropIndicator,
    startDrag,
    endDrag,
    showDropIndicator,
    hideDropIndicator,
    generateId,
  };
};
