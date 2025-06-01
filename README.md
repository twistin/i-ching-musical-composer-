# I Ching Musical Composer

## Description

The I Ching Musical Composer is an application designed to generate musical ideas for SuperCollider based on I Ching trigrams. Users can simulate coin tosses to generate a hexagram, which then reveals two trigrams. For each trigram, the application provides associated musical interpretations (scales, texture, polyrhythm) and SuperCollider programming suggestions (`SynthDef` and `Pbind` examples). Furthermore, it visualizes the combined hexagram and leverages the Google Gemini API to generate a unique philosophical and musical interpretation for the complete hexagram.

## Features

* **I Ching Hexagram Generation**: Simulates coin tosses to determine the six lines of a hexagram.
* **Trigram Analysis**: Identifies the lower and upper trigrams from the hexagram.
* **Musical Ideas**: Provides detailed musical elements (scales, melody, texture, polyrhythm) for each trigram.
* **SuperCollider Integration**: Offers `SynthDef` and `Pbind` code examples for SuperCollider, tailored to each trigram.
* **Combined Hexagram Display**: Visually represents the full 6-line hexagram.
* **Gemini API Powered Insights**: Fetches a unique interpretation for the combined hexagram, offering deeper musical and philosophical inspiration.
* **Interactive UI**:
  * Click on individual trigrams from a list to view their details and code.
  * Click on the generated hexagram to open a modal with combined details, individual trigram codes, and the Gemini-generated meaning.
* **Copy-to-Clipboard**: Easily copy SuperCollider code snippets.
* **Responsive Design**: Adapts to various screen sizes for a good user experience.
* **Offline Trigram Data**: Core trigram information is available offline. API-dependent features (hexagram meaning) require connectivity.

## Tech Stack

* React 19 (using `esm.sh` for module resolution)
* TypeScript
* Tailwind CSS (via CDN)
* Google Gemini API (`@google/genai` via `esm.sh`)

## Getting Started

### Prerequisites

* A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
* A Google Gemini API Key. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).
* For local development, a local web server or an IDE with a live server extension. Node.js and npm/yarn are **not** strictly required to *run* the `index.html` directly if your browser supports ES modules, but are generally useful for web development and would be required if you were to introduce a build step.

### Installation

1. **Clone the repository (or download the files):**
   
   ```bash
   git clone https://your-repository-url/i-ching-musical-composer.git
   cd i-ching-musical-composer
   ```
2. **No explicit `npm install` step is needed** as dependencies are loaded via CDN and `esm.sh` in `index.html`.

### API Key Configuration

The application **requires** your Google Gemini API Key to be available as `process.env.API_KEY` within the client-side JavaScript execution context.

**Important Security Note**: For client-side applications, directly embedding an API key or making `process.env.API_KEY` available without a secure build process can expose your key. The instructions below assume your development or deployment environment handles this securely.

* **For Local Development (using a dev server that supports environment variable injection, e.g., Vite, Parcel, or esbuild with define):**
  If you were using such a tool (which is not explicitly configured in this project structure but is common), you would typically create a `.env` file in the project root:
  
  ```
  API_KEY=YOUR_GEMINI_API_KEY
  ```
  
  The development server would then make this available as `process.env.API_KEY`.

* **For Local Development (serving `index.html` directly):**
  Serving `index.html` directly in a browser will result in `process.env.API_KEY` being `undefined`. The application is designed to expect this variable to be pre-configured in its execution environment. You would need a mechanism to define this, for example, by using a development server that can inject environment variables or by modifying your local setup to define `process.env.API_KEY` globally before the scripts run (though manual modifications to achieve this are outside the scope of the application's code).

### Running Locally

1. Ensure your API Key is configured as per the section above, suitable for your local serving method.

2. Open the `index.html` file using a local web server.
   
   * Many code editors (like VS Code) have extensions (e.g., "Live Server") that can serve HTML files.
   * If you are using a more advanced development server (like Vite, Parcel), follow its specific commands (e.g., `npm run dev` or `npx parcel index.html`).
   
   The application should now run in your browser. Features requiring the Gemini API (like hexagram meaning generation) will only work if the API key is correctly accessible.

## Deployment

Deploying this application involves serving the static files (`index.html`, `index.tsx`, and any other assets) and ensuring the `API_KEY` is securely available to the client-side code. Most static hosting platforms allow setting environment variables that can be injected during a build step.

**Crucial for Deployment**: The `process.env.API_KEY` used in `App.tsx` needs to be replaced with your actual API key during a build/deployment process. Client-side JavaScript cannot directly access OS environment variables in the same way Node.js can.

### General Note on API Key for Static Hosts

For platforms like Netlify or GitHub Pages, you will set your `API_KEY` as an environment variable in the platform's settings. If your project had a build step (e.g., using Vite, Webpack, Parcel, or esbuild), that build tool would be configured to pick up this environment variable (e.g., `API_KEY` from Netlify/GitHub Actions secrets) and replace `process.env.API_KEY` in your JavaScript code with the actual key value.

Since this project currently lacks an explicit, pre-configured build script in a `package.json` for this replacement, you'd need to:

1. Introduce a build tool (like esbuild, Vite, Parcel) and configure it for this replacement.
2. Or, rely on the platform's specific features if they offer direct injection into simple JS files (less common for `process.env` syntax without a build tool).

Assuming you implement a build step (e.g., a script `npm run build` that uses `esbuild` to bundle `index.tsx` and define `process.env.API_KEY`):

```json
// Example hypothetical package.json script for esbuild
// "scripts": {
//   "build": "esbuild index.tsx --bundle --outfile=dist/main.js --define:process.env.API_KEY=\\"\"$API_KEY\"\\" --loader:.tsx=tsx --platform=browser && cp index.html dist/index.html && sed -i 's/\\/index.tsx/main.js/g' dist/index.html"
// }
// Note: The $API_KEY here would be provided by the CI/CD environment (Netlify, GitHub Actions).
// You would also need to adjust index.html to point to the bundled 'main.js'.
```

### Netlify

1. **Push your code** to a Git repository (GitHub, GitLab, Bitbucket).
2. Go to your Netlify dashboard, click "Add new site" -> "Import an existing project."
3. Connect to your Git provider and select your repository.
4. **Build Settings**:
   * **Build command**: If you've set up a build script (e.g., `npm run build` as described above), enter it here. If you are deploying files directly without a build step (not recommended for `process.env.API_KEY`), this might be empty, but the API key won't be injected.
   * **Publish directory**: The directory containing your `index.html` and bundled JavaScript (e.g., `dist` if you use a build step, or `.` if `index.html` is in the root and you are not using a build step).
5. **Environment Variables**:
   * Go to your site's settings: Site settings > Build & deploy > Environment.
   * Add an environment variable:
     * Key: `API_KEY`
     * Value: `YOUR_GEMINI_API_KEY`
   * This key will be available to your build command.
6. Click "Deploy site."

### GitHub Pages

1. **Push your code** to a GitHub repository.

2. **Set up API Key as a Secret**:
   
   * In your GitHub repository, go to Settings > Secrets and variables > Actions.
   * Click "New repository secret."
   * Name: `API_KEY`
   * Value: Your Google Gemini API Key.

3. **Set up GitHub Actions for Build and Deploy**:
   
   * Create a workflow file in your repository, e.g., `.github/workflows/deploy.yml`. This workflow will build your project (injecting the API key) and deploy it to GitHub Pages.
   
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches:
         - main # Or your default branch
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       permissions:
         contents: read
         pages: write
         id-token: write
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - name: Checkout code
           uses: actions/checkout@v4
   
         # If you add a package.json and a build tool like esbuild or Vite:
         # - name: Setup Node.js
         #   uses: actions/setup-node@v4
         #   with:
         #     node-version: '20'
         # - name: Install dependencies
         #   run: npm install # Assuming you have a package.json
         # - name: Build project
         #   run: npm run build # Your build script that uses the API_KEY
         #   env:
         #     API_KEY: ${{ secrets.API_KEY }} # Makes the secret available to the build script
   
         # If deploying raw files (API_KEY will NOT be injected this way into process.env)
         # For this project's current structure (no build tool), this means
         # the API_KEY will be undefined unless you add a build step.
         # The following steps assume a build output in a 'dist' folder.
         # Adjust 'dist' to '.' if you are serving from root without a build.
   
         - name: Setup Pages
           uses: actions/configure-pages@v5
   
         # This step assumes your build output (or source files if no build) is in the root.
         # If you have a build step that outputs to 'dist', change './' to './dist'.
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: './' # Or your build output directory e.g. './dist'
   
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

4. **Configure GitHub Pages**:
   
   * In your GitHub repository, go to Settings > Pages.
   * Under "Build and deployment," set the Source to "GitHub Actions."
   
   After the Action runs successfully, your site will be deployed. Ensure your build process correctly utilizes the `secrets.API_KEY`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is inspired by ancient wisdom and modern technology.
Considered MIT License unless otherwise specified.
(You can add a `LICENSE` file with MIT License text if desired).
