# Anato by Keuro Lab

Anato is an open-source, browser-based anatomy learning experience by [Keuro Lab](https://keurolab.com). It helps students explore a simplified 3D anatomy model through their camera, click labels for plain-language explanations, and learn in English or Hausa.

The project is designed to grow through community contributions, especially new anatomy lessons, translations, accessibility improvements, and classroom features.

## Features

- Interactive head and hand anatomy model
- Camera-based face and hand tracking
- Clickable anatomy labels with contextual explanations
- English and Hausa lesson content
- Built-in quiz mode
- No video upload: camera processing happens in the browser
- Responsive React/Vite landing page and interactive explore page

## Run locally

Requirements:

- Node.js 18 or newer
- A modern browser with camera support

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, then select **Explore Anato** and allow camera access. Camera access normally requires `localhost` or a secure HTTPS connection.

Create a production build with:

```bash
npm run build
npm run preview
```

## Project structure

```text
.
├── index.html                 React/Vite entry document
├── public/
│   ├── anato-engine.html      Interactive anatomy engine
│   ├── anato-logo.svg         Anato mark
│   └── keuro-logo.png         Keuro Lab logo
└── src/
    ├── App.jsx                Landing page and explore route
    ├── main.jsx               React entry point
    └── styles.css             Application styles
```

The React application embeds `public/anato-engine.html` on the Explore page. This keeps the camera and 3D engine isolated while the surrounding product experience remains easy to extend in React.

## Adding lessons and translations

Lesson content currently lives in the `LESSONS` object inside `public/anato-engine.html`. Each entry contains a layer, an English lesson, and a Hausa lesson:

```js
"Example structure": {
  layer: "skull",
  en: [
    "Example structure",
    "A short, student-friendly explanation.",
    "What it does or why it matters."
  ],
  ha: [
    "Sunan sashi",
    "Bayani mai sauki ga dalibai.",
    "Aikin sashin ko dalilin muhimmancinsa."
  ]
}
```

When adding a label, make sure its name matches the label in the model metadata and that its layer is enabled by the interface. Keep explanations concise, age-appropriate, and educational rather than diagnostic.

Good contribution ideas include:

- Yoruba, Igbo, French, Arabic, and other translations
- More body regions and classroom lesson plans
- Better keyboard navigation and screen-reader support
- Additional quizzes and teacher activities
- Improved mobile camera controls
- Label accuracy and interaction improvements
- Offline support for low-connectivity classrooms

## Contributing

1. Fork the repository.
2. Create a focused branch, for example `feature/yoruba-lessons`.
3. Make and test your changes locally.
4. Run `npm run build` before opening a pull request.
5. Describe what changed, why it helps learners, and how it was tested.

Please keep pull requests focused and avoid committing generated folders such as `node_modules` or `dist`.

## Privacy and safety

Camera video is processed locally in the browser and is not uploaded by Anato. Anato is an educational visualization, not a medical scan or diagnostic tool. It shows approximate anatomy and should not be used for medical decisions.

## Attribution and licensing

The anatomy models are based on BodyParts3D, © The Database Center for Life Science, licensed under [Creative Commons Attribution-Share Alike 2.1 Japan](https://creativecommons.org/licenses/by-sa/2.1/jp/). The project should retain this attribution when distributed.

Please check the license of every third-party model, library, image, and translation added to the project. Contributions should be original or submitted with permission to share them under a compatible license.

## Maintainer

Anato is maintained by Keuro Lab as an open learning project for students, educators, and contributors interested in accessible technology and science education.
