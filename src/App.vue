<template>
  <div class="app">
    <ComponentSidebar />
    <DesignCanvas ref="canvasRef" @export="handleExport" />
    <CodeExportPanel
      v-if="showExportPanel"
      :canvas-elements="exportElements"
      @close="showExportPanel = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ComponentSidebar from "./components/ComponentSidebar.vue";
import DesignCanvas from "./components/DesignCanvas.vue";
import CodeExportPanel from "./components/CodeExportPanel.vue";
import type { ComponentItem } from "./composables/useDragDrop";

const showExportPanel = ref(false);
const exportElements = ref<ComponentItem[]>([]);

const handleExport = (elements: ComponentItem[]) => {
  exportElements.value = elements;
  showExportPanel.value = true;
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

#app {
  height: 100vh;
  overflow: hidden;
}

.app {
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
}

/* Global component styles */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.chip {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  display: inline-block;
}

.card {
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.text-field,
.textarea,
.select,
.number-input,
.date-picker,
.time-picker,
.autocomplete,
.combobox,
.file-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
}

.checkbox,
.radio-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.range-slider,
.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  outline: none;
}

.table,
.data-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e0e0e0;
}

.table th,
.table td,
.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.table th,
.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.grid {
  display: grid;
  gap: 16px;
}

.grid-item {
  padding: 16px;
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
}

.alert {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Animation styles */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.progress-circular {
  animation: spin 2s linear infinite;
}

.skeleton-loader {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 2s infinite;
}

/* Switch component styles */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider-switch {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider-switch:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.switch input:checked + .slider-switch {
  background-color: #007bff;
}

.switch input:checked + .slider-switch:before {
  transform: translateX(26px);
}

/* Tab styles */
.tabs {
  border-bottom: 1px solid #e0e0e0;
  display: flex;
}

.tab {
  padding: 12px 24px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab:hover {
  background-color: #f8f9fa;
}

.tab.active {
  border-bottom-color: #007bff;
  color: #007bff;
  font-weight: 600;
}

/* Progress bar styles */
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease;
}

/* Button toggle styles */
.button-toggle {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.toggle-btn {
  padding: 8px 16px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.toggle-btn:hover {
  background-color: #f8f9fa;
}

.toggle-btn.active {
  background-color: #007bff;
  color: #ffffff;
}

/* Stepper styles */
.stepper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.step {
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  background-color: #ffffff;
  color: #6c757d;
  font-weight: 500;
  transition: all 0.2s ease;
}

.step.active {
  border-color: #007bff;
  background-color: #007bff;
  color: #ffffff;
}

/* Timeline styles */
.timeline {
  position: relative;
  padding-left: 24px;
  border-left: 2px solid #007bff;
}

.timeline-item {
  position: relative;
  padding: 16px 0 16px 24px;
  margin-bottom: 16px;
}

.timeline-item:before {
  content: "";
  position: absolute;
  left: -28px;
  top: 20px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #007bff;
}

/* OTP Input styles */
.otp-input {
  display: flex;
  gap: 8px;
}

.otp-input input {
  width: 40px;
  height: 40px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
}

.otp-input input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}
</style>
