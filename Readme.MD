![License](https://img.shields.io/badge/License-GPL%20v2%20or%20later-blue.svg)

# bootstrap-blocks

your-theme/
├── assets/
│   ├── css/                 → Output of compiled SCSS (e.g., style.min.css)
│   ├── js/                  → Custom or bundled JavaScript
│   ├── scss/                → SCSS source files (can include Bootstrap)
│   └── images/              → Theme images
├── templates/               → Block-based page templates (e.g., index.html, page.html)
├── parts/                   → Block template parts (e.g., header.html, footer.html)
├── theme.json               → Theme configuration (styles, settings, templates)
├── style.css                → Just theme header for WP recognition (not used for styling)
├── functions.php            → Enqueue styles/scripts (if needed)
├── gulpfile.js              → Gulp config
└── package.json             → Node modules config
