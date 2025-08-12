export interface ComponentDefinition {
  id: string;
  name: string;
  category: string;
  icon: string;
  defaultContent: string;
  defaultStyles: Record<string, string>;
}

export const componentCategories = [
  "Containment",
  "Navigation",
  "Form inputs & controls",
  "Data & display",
  "Selection",
  "Feedback",
  "Images & icons",
  "Pickers",
];

export const componentDefinitions: ComponentDefinition[] = [
  // Containment
  {
    id: "buttons",
    name: "Buttons",
    category: "Containment",
    icon: "🔘",
    defaultContent: '<button class="btn">Click me</button>',
    defaultStyles: {
      "background-color": "#007bff",
      color: "#ffffff",
      border: "none",
      padding: "12px 24px",
      "border-radius": "6px",
      cursor: "pointer",
    },
  },
  {
    id: "cards",
    name: "Cards",
    category: "Containment",
    icon: "🃏",
    defaultContent:
      '<div class="card"><h3>Card Title</h3><p>Card content goes here</p></div>',
    defaultStyles: {
      "background-color": "#ffffff",
      "border-radius": "8px",
      padding: "16px",
      "box-shadow": "0 2px 8px rgba(0,0,0,0.1)",
      border: "1px solid #e0e0e0",
    },
  },
  {
    id: "chips",
    name: "Chips",
    category: "Containment",
    icon: "🏷️",
    defaultContent: '<span class="chip">Chip</span>',
    defaultStyles: {
      "background-color": "#f0f0f0",
      color: "#333",
      padding: "6px 12px",
      "border-radius": "16px",
      "font-size": "14px",
      display: "inline-block",
    },
  },
  {
    id: "dialogs",
    name: "Dialogs",
    category: "Containment",
    icon: "💬",
    defaultContent:
      '<div class="dialog"><h2>Dialog Title</h2><p>Dialog content</p><button>Close</button></div>',
    defaultStyles: {
      "background-color": "#ffffff",
      "border-radius": "8px",
      padding: "24px",
      "box-shadow": "0 8px 32px rgba(0,0,0,0.2)",
      "max-width": "400px",
    },
  },
  {
    id: "dividers",
    name: "Dividers",
    category: "Containment",
    icon: "➖",
    defaultContent: '<hr class="divider">',
    defaultStyles: {
      border: "none",
      height: "1px",
      "background-color": "#e0e0e0",
      margin: "16px 0",
    },
  },
  {
    id: "lists",
    name: "Lists",
    category: "Containment",
    icon: "📝",
    defaultContent:
      '<ul class="list"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
    defaultStyles: { "list-style": "none", padding: "0", margin: "0" },
  },
  {
    id: "sheets",
    name: "Sheets",
    category: "Containment",
    icon: "📜",
    defaultContent: '<div class="sheet">Sheet Content</div>',
    defaultStyles: {
      "background-color": "#ffffff",
      "border-radius": "8px",
      padding: "16px",
      "box-shadow": "0 4px 16px rgba(0,0,0,0.1)",
    },
  },
  {
    id: "tooltips",
    name: "Tooltips",
    category: "Containment",
    icon: "💭",
    defaultContent: '<div class="tooltip">Tooltip text</div>',
    defaultStyles: {
      "background-color": "#333",
      color: "#fff",
      padding: "6px 12px",
      "border-radius": "4px",
      "font-size": "12px",
      position: "absolute",
    },
  },

  // Navigation
  {
    id: "app-bars",
    name: "App bars",
    category: "Navigation",
    icon: "📱",
    defaultContent: '<div class="app-bar"><h1>App Title</h1></div>',
    defaultStyles: {
      "background-color": "#007bff",
      color: "#ffffff",
      padding: "16px 24px",
      display: "flex",
      "align-items": "center",
    },
  },
  {
    id: "bottom-navigation",
    name: "Bottom navigation",
    category: "Navigation",
    icon: "⬇️",
    defaultContent:
      '<div class="bottom-nav"><div class="nav-item">Home</div><div class="nav-item">Search</div><div class="nav-item">Profile</div></div>',
    defaultStyles: {
      "background-color": "#ffffff",
      "border-top": "1px solid #e0e0e0",
      display: "flex",
      "justify-content": "space-around",
      padding: "12px 0",
    },
  },
  {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    category: "Navigation",
    icon: "🍞",
    defaultContent:
      '<nav class="breadcrumbs"><a href="#">Home</a> / <a href="#">Category</a> / <span>Current</span></nav>',
    defaultStyles: { "font-size": "14px", color: "#666" },
  },
  {
    id: "footers",
    name: "Footers",
    category: "Navigation",
    icon: "🦶",
    defaultContent: '<footer class="footer">© 2024 Your Company</footer>',
    defaultStyles: {
      "background-color": "#333",
      color: "#ffffff",
      padding: "24px",
      "text-align": "center",
      "margin-top": "auto",
    },
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "Navigation",
    icon: "📄",
    defaultContent:
      '<div class="pagination"><button>1</button><button>2</button><button>3</button></div>',
    defaultStyles: { display: "flex", gap: "4px", "align-items": "center" },
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    icon: "📑",
    defaultContent:
      '<div class="tabs"><div class="tab active">Tab 1</div><div class="tab">Tab 2</div><div class="tab">Tab 3</div></div>',
    defaultStyles: { "border-bottom": "1px solid #e0e0e0", display: "flex" },
  },

  // Form inputs & controls
  {
    id: "autocompletes",
    name: "Autocompletes",
    category: "Form inputs & controls",
    icon: "🔍",
    defaultContent:
      '<input class="autocomplete" placeholder="Start typing...">',
    defaultStyles: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      "border-radius": "4px",
    },
  },
  {
    id: "checkboxes",
    name: "Checkboxes",
    category: "Form inputs & controls",
    icon: "☑️",
    defaultContent:
      '<label class="checkbox"><input type="checkbox"> Check me</label>',
    defaultStyles: { display: "flex", "align-items": "center", gap: "8px" },
  },
  {
    id: "combobox",
    name: "Combobox",
    category: "Form inputs & controls",
    icon: "📦",
    defaultContent:
      '<select class="combobox"><option>Option 1</option><option>Option 2</option></select>',
    defaultStyles: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      "border-radius": "4px",
    },
  },
  {
    id: "file-inputs",
    name: "File inputs",
    category: "Form inputs & controls",
    icon: "📁",
    defaultContent: '<input type="file" class="file-input">',
    defaultStyles: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      "border-radius": "4px",
    },
  },
  {
    id: "number-inputs",
    name: "Number inputs",
    category: "Form inputs & controls",
    icon: "🔢",
    defaultContent:
      '<input type="number" class="number-input" placeholder="Enter number">',
    defaultStyles: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      "border-radius": "4px",
    },
  },
  {
    id: "otp-input",
    name: "OTP Input",
    category: "Form inputs & controls",
    icon: "🔐",
    defaultContent:
      '<div class="otp-input"><input maxlength="1"><input maxlength="1"><input maxlength="1"><input maxlength="1"></div>',
    defaultStyles: { display: "flex", gap: "8px" },
  },
  {
    id: "radio-buttons",
    name: "Radio buttons",
    category: "Form inputs & controls",
    icon: "🔘",
    defaultContent:
      '<div class="radio-group"><label><input type="radio" name="radio"> Option 1</label><label><input type="radio" name="radio"> Option 2</label></div>',
    defaultStyles: { display: "flex", "flex-direction": "column", gap: "8px" },
  },
  {
    id: "selects",
    name: "Selects",
    category: "Form inputs & controls",
    icon: "📋",
    defaultContent:
      '<select class="select"><option>Select option</option><option>Option 1</option><option>Option 2</option></select>',
    defaultStyles: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      "border-radius": "4px",
    },
  },
  {
    id: "switches",
    name: "Switches",
    category: "Form inputs & controls",
    icon: "🔄",
    defaultContent:
      '<label class="switch"><input type="checkbox"><span class="slider-switch"></span></label>',
    defaultStyles: {
      position: "relative",
      display: "inline-block",
      width: "60px",
      height: "34px",
    },
  },
  {
    id: "text-fields",
    name: "Text fields",
    category: "Form inputs & controls",
    icon: "📝",
    defaultContent:
      '<input type="text" class="text-field" placeholder="Enter text">',
    defaultStyles: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      "border-radius": "4px",
    },
  },
  {
    id: "textareas",
    name: "Textareas",
    category: "Form inputs & controls",
    icon: "📄",
    defaultContent:
      '<textarea class="textarea" placeholder="Enter text" rows="4"></textarea>',
    defaultStyles: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      "border-radius": "4px",
      resize: "vertical",
    },
  },

  // Data & display
  {
    id: "confirm-edit",
    name: "Confirm Edit",
    category: "Data & display",
    icon: "✅",
    defaultContent: '<div class="confirm-edit">Edit confirmed</div>',
    defaultStyles: {
      "background-color": "#d4edda",
      color: "#155724",
      padding: "12px",
      "border-radius": "4px",
      border: "1px solid #c3e6cb",
    },
  },
  {
    id: "data-tables",
    name: "Data tables",
    category: "Data & display",
    icon: "📊",
    defaultContent:
      '<table class="data-table"><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>John</td><td>25</td></tr></tbody></table>',
    defaultStyles: {
      width: "100%",
      "border-collapse": "collapse",
      border: "1px solid #e0e0e0",
    },
  },
  {
    id: "tables",
    name: "Tables",
    category: "Data & display",
    icon: "📋",
    defaultContent:
      '<table class="table"><tr><th>Header 1</th><th>Header 2</th></tr><tr><td>Cell 1</td><td>Cell 2</td></tr></table>',
    defaultStyles: {
      width: "100%",
      "border-collapse": "collapse",
      border: "1px solid #e0e0e0",
    },
  },

  // Selection
  {
    id: "button-toggles",
    name: "Button toggles",
    category: "Selection",
    icon: "🔘",
    defaultContent:
      '<div class="button-toggle"><button class="toggle-btn active">Option 1</button><button class="toggle-btn">Option 2</button></div>',
    defaultStyles: {
      display: "flex",
      border: "1px solid #ccc",
      "border-radius": "4px",
      overflow: "hidden",
    },
  },
  {
    id: "chip-groups",
    name: "Chip groups",
    category: "Selection",
    icon: "🏷️",
    defaultContent:
      '<div class="chip-group"><span class="chip">Tag 1</span><span class="chip">Tag 2</span><span class="chip">Tag 3</span></div>',
    defaultStyles: { display: "flex", gap: "8px", "flex-wrap": "wrap" },
  },
  {
    id: "steppers",
    name: "Steppers",
    category: "Selection",
    icon: "👣",
    defaultContent:
      '<div class="stepper"><div class="step active">Step 1</div><div class="step">Step 2</div><div class="step">Step 3</div></div>',
    defaultStyles: { display: "flex", "align-items": "center", gap: "16px" },
  },

  // Feedback
  {
    id: "alerts",
    name: "Alerts",
    category: "Feedback",
    icon: "⚠️",
    defaultContent: '<div class="alert">This is an alert message</div>',
    defaultStyles: {
      "background-color": "#fff3cd",
      color: "#856404",
      padding: "12px",
      "border-radius": "4px",
      border: "1px solid #ffeaa7",
    },
  },
  {
    id: "badges",
    name: "Badges",
    category: "Feedback",
    icon: "🏷️",
    defaultContent: '<span class="badge">5</span>',
    defaultStyles: {
      "background-color": "#dc3545",
      color: "#ffffff",
      padding: "4px 8px",
      "border-radius": "12px",
      "font-size": "12px",
      "font-weight": "bold",
    },
  },
  {
    id: "banners",
    name: "Banners",
    category: "Feedback",
    icon: "🎌",
    defaultContent: '<div class="banner">Important announcement banner</div>',
    defaultStyles: {
      "background-color": "#007bff",
      color: "#ffffff",
      padding: "16px",
      "text-align": "center",
      "font-weight": "bold",
    },
  },
  {
    id: "empty-states",
    name: "Empty states",
    category: "Feedback",
    icon: "📭",
    defaultContent:
      '<div class="empty-state"><div class="empty-icon">📭</div><p>No items found</p></div>',
    defaultStyles: { "text-align": "center", padding: "48px", color: "#666" },
  },
  {
    id: "progress-circular",
    name: "Progress circular",
    category: "Feedback",
    icon: "⭕",
    defaultContent: '<div class="progress-circular"></div>',
    defaultStyles: {
      width: "40px",
      height: "40px",
      border: "4px solid #f3f3f3",
      "border-top": "4px solid #007bff",
      "border-radius": "50%",
      animation: "spin 2s linear infinite",
    },
  },
  {
    id: "progress-linear",
    name: "Progress linear",
    category: "Feedback",
    icon: "📊",
    defaultContent:
      '<div class="progress-bar"><div class="progress-fill" style="width: 60%"></div></div>',
    defaultStyles: {
      width: "100%",
      height: "8px",
      "background-color": "#f0f0f0",
      "border-radius": "4px",
      overflow: "hidden",
    },
  },
  {
    id: "ratings",
    name: "Ratings",
    category: "Feedback",
    icon: "⭐",
    defaultContent: '<div class="rating">⭐⭐⭐⭐⭐</div>',
    defaultStyles: { "font-size": "20px", color: "#ffd700" },
  },
  {
    id: "skeleton-loaders",
    name: "Skeleton loaders",
    category: "Feedback",
    icon: "💀",
    defaultContent: '<div class="skeleton-loader"></div>',
    defaultStyles: {
      background:
        "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      height: "20px",
      "border-radius": "4px",
      animation: "shimmer 2s infinite",
    },
  },
  {
    id: "snackbars",
    name: "Snackbars",
    category: "Feedback",
    icon: "🍿",
    defaultContent: '<div class="snackbar">Action completed successfully</div>',
    defaultStyles: {
      "background-color": "#333",
      color: "#fff",
      padding: "16px",
      "border-radius": "4px",
      position: "fixed",
      bottom: "16px",
      left: "16px",
    },
  },
  {
    id: "timelines",
    name: "Timelines",
    category: "Feedback",
    icon: "⏰",
    defaultContent:
      '<div class="timeline"><div class="timeline-item">Event 1</div><div class="timeline-item">Event 2</div></div>',
    defaultStyles: {
      position: "relative",
      "padding-left": "24px",
      "border-left": "2px solid #007bff",
    },
  },

  // Images & icons
  {
    id: "aspect-ratios",
    name: "Aspect ratios",
    category: "Images & icons",
    icon: "📐",
    defaultContent:
      '<div class="aspect-ratio"><img class="image" src="/placeholder.jpg" alt="placeholder"></div>',
    defaultStyles: {
      "aspect-ratio": "16/9",
      overflow: "hidden",
      "border-radius": "8px",
    },
  },
  {
    id: "avatars",
    name: "Avatars",
    category: "Images & icons",
    icon: "👤",
    defaultContent: '<div class="avatar">👤</div>',
    defaultStyles: {
      width: "48px",
      height: "48px",
      "border-radius": "50%",
      "background-color": "#f0f0f0",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      "font-size": "24px",
    },
  },
  {
    id: "icons",
    name: "Icons",
    category: "Images & icons",
    icon: "🎯",
    defaultContent: '<span class="icon">🎯</span>',
    defaultStyles: { "font-size": "24px", display: "inline-block" },
  },
  {
    id: "images",
    name: "Images",
    category: "Images & icons",
    icon: "🖼️",
    defaultContent:
      '<img class="image" src="/placeholder.jpg" alt="placeholder" style="height: 200px; width: 200px">',
    defaultStyles: {
      "max-width": "100%",
      height: "auto",
      "border-radius": "8px",
    },
  },

  // Pickers
  {
    id: "color-pickers",
    name: "Color pickers",
    category: "Pickers",
    icon: "🎨",
    defaultContent: '<input type="color" class="color-picker" value="#007bff">',
    defaultStyles: {
      width: "60px",
      height: "40px",
      border: "none",
      "border-radius": "4px",
      cursor: "pointer",
    },
  },
  {
    id: "date-pickers",
    name: "Date pickers",
    category: "Pickers",
    icon: "📅",
    defaultContent: '<input type="date" class="date-picker">',
    defaultStyles: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      "border-radius": "4px",
    },
  },
  {
    id: "time-pickers",
    name: "Time pickers",
    category: "Pickers",
    icon: "🕐",
    defaultContent: '<input type="time" class="time-picker">',
    defaultStyles: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      "border-radius": "4px",
    },
  },
];
