<template>
  <div class="export-panel-overlay" @click="$emit('close')">
    <div class="export-panel" @click.stop>
      <div class="export-header">
        <h2>Export Code</h2>
        <button @click="$emit('close')" class="close-btn">✕</button>
      </div>

      <div class="export-content">
        <div class="export-tabs">
          <button
            :class="{ active: activeTab === 'html' }"
            @click="activeTab = 'html'"
            class="tab-btn"
          >
            HTML
          </button>
          <button
            :class="{ active: activeTab === 'css' }"
            @click="activeTab = 'css'"
            class="tab-btn"
          >
            CSS
          </button>
        </div>

        <div class="code-container">
          <div class="code-actions">
            <button @click="copyToClipboard" class="copy-btn">
              {{ copied ? "✓ Copied!" : "📋 Copy" }}
            </button>
          </div>

          <pre class="code-block"><code v-html="highlightedCode"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ComponentItem } from "../composables/useDragDrop";

interface Props {
  canvasElements: ComponentItem[];
}

interface Emits {
  (e: "close"): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const activeTab = ref<"html" | "css">("html");
const copied = ref(false);

const generateHTML = (elements: ComponentItem[], depth = 0): string => {
  const indent = "  ".repeat(depth);
  let html = "";

  for (const element of elements) {
    if (element.type === "row" || element.type === "column") {
      const className = `${element.type}-container`;
      html += `${indent}<div class="${className}">\n`;

      if (element.children && element.children.length > 0) {
        html += generateHTML(element.children, depth + 1);
      } else {
        html += `${indent}  <!-- Empty ${element.type} -->\n`;
      }

      html += `${indent}</div>\n`;
    } else {
      // Regular component
      const className = element.type.replace(/([A-Z])/g, "-$1").toLowerCase();
      const content =
        element.content || `<div class="${className}">Component content</div>`;

      // Clean up the content and add proper class
      const cleanContent = content
        .replace(/class="[^"]*"/g, `class="${className}"`)
        .replace(/^\s+|\s+$/g, "");

      html += `${indent}${cleanContent}\n`;
    }
  }

  return html;
};

const generateCSS = (elements: ComponentItem[]): string => {
  const styles = new Map<string, Record<string, string>>();

  const collectStyles = (elements: ComponentItem[]) => {
    for (const element of elements) {
      if (element.type === "row" || element.type === "column") {
        const className = `.${element.type}-container`;
        styles.set(className, element.styles || {});

        if (element.children && element.children.length > 0) {
          collectStyles(element.children);
        }
      } else {
        const className = `.${element.type
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()}`;
        styles.set(className, element.styles || {});
      }
    }
  };

  collectStyles(elements);

  let css = "/* Generated CSS */\n\n";

  for (const [selector, styleObj] of styles) {
    css += `${selector} {\n`;

    for (const [property, value] of Object.entries(styleObj)) {
      css += `  ${property}: ${value};\n`;
    }

    css += "}\n\n";
  }

  return css;
};

const exportCode = computed(() => {
  if (activeTab.value === "html") {
    const htmlContent = generateHTML(props.canvasElements);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Design</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${htmlContent}</body>
</html>`;
  } else {
    return generateCSS(props.canvasElements);
  }
});

const highlightedCode = computed(() => {
  const code = exportCode.value;

  if (activeTab.value === "html") {
    // First escape HTML, then apply syntax highlighting
    const escapedCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

    return escapedCode
      .replace(/(&lt;!--.*?--&gt;)/g, '<span class="comment">$1</span>')
      .replace(/(&lt;\/?[^&gt;]+&gt;)/g, '<span class="tag">$1</span>')
      .replace(
        /(class|id|src|href|alt)=&quot;([^&]*)&quot;/g,
        '<span class="attribute">$1</span>=&quot;<span class="string">$2</span>&quot;'
      );
  } else {
    return code
      .replace(/(\/\*.*?\*\/)/g, '<span class="comment">$1</span>')
      .replace(
        /([.#][a-zA-Z-_][a-zA-Z0-9-_]*)/g,
        '<span class="selector">$1</span>'
      )
      .replace(/([a-zA-Z-]+)(\s*:)/g, '<span class="property">$1</span>$2')
      .replace(/(:\s*)([^;]+)/g, '$1<span class="value">$2</span>');
  }
});

const copyToClipboard = async () => {
  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(exportCode.value);
      copied.value = true;
    } else {
      // Fallback for older browsers or when Clipboard API is blocked
      copyToClipboardFallback(exportCode.value);
    }

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Modern clipboard failed, trying fallback:", err);
    // If modern API fails, use fallback
    copyToClipboardFallback(exportCode.value);
  }
};

const copyToClipboardFallback = (text: string) => {
  try {
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    // Use the older execCommand API
    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (successful) {
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } else {
      console.error("Fallback copy failed");
    }
  } catch (err) {
    console.error("Fallback copy error:", err);
  }
};
</script>

<style scoped>
.export-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.export-panel {
  background-color: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  height: 80%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.export-header {
  padding: 24px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.export-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #495057;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #e9ecef;
  color: #495057;
}

.export-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.export-tabs {
  padding: 16px 24px 0 24px;
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #e9ecef;
}

.tab-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px 6px 0 0;
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background-color: #e9ecef;
}

.tab-btn.active {
  background-color: #ffffff;
  color: #495057;
  border-bottom: 2px solid #007bff;
}

.code-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.code-actions {
  padding: 16px 24px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
}

.copy-btn {
  padding: 8px 16px;
  border: 1px solid #007bff;
  border-radius: 6px;
  background-color: #ffffff;
  color: #007bff;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background-color: #007bff;
  color: #ffffff;
}

.code-block {
  flex: 1;
  margin: 0;
  padding: 24px;
  background-color: #f8f9fa;
  color: #495057;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow: auto;
  white-space: pre;
}

/* Syntax highlighting */
:deep(.comment) {
  color: #6c757d;
  font-style: italic;
}

:deep(.tag) {
  color: #e83e8c;
  font-weight: bold;
}

:deep(.attribute) {
  color: #fd7e14;
}

:deep(.string) {
  color: #20c997;
}

:deep(.selector) {
  color: #6f42c1;
  font-weight: bold;
}

:deep(.property) {
  color: #007bff;
}

:deep(.value) {
  color: #28a745;
}

.code-block::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.code-block::-webkit-scrollbar-track {
  background: #e9ecef;
}

.code-block::-webkit-scrollbar-thumb {
  background: #ced4da;
  border-radius: 4px;
}

.code-block::-webkit-scrollbar-thumb:hover {
  background: #adb5bd;
}
</style>
