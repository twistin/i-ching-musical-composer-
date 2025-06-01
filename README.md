# I Ching Musical Composer

## Description

The I Ching Musical Composer is an application designed to generate musical ideas for SuperCollider based on I Ching trigrams. Users can simulate coin tosses to generate a hexagram, which then reveals two trigrams. For each trigram, the application provides associated musical interpretations (scales, texture, polyrhythm) and SuperCollider programming suggestions (`SynthDef` and `Pbind` examples). Furthermore, it visualizes the combined hexagram and leverages the Google Gemini API to generate a unique philosophical and musical interpretation for the complete hexagram.

## Features

*   **I Ching Hexagram Generation**: Simulates coin tosses to determine the six lines of a hexagram.
*   **Trigram Analysis**: Identifies the lower and upper trigrams from the hexagram.
*   **Musical Ideas**: Provides detailed musical elements (scales, melody, texture, polyrhythm) for each trigram.
*   **SuperCollider Integration**: Offers `SynthDef` and `Pbind` code examples for SuperCollider, tailored to each trigram.
*   **Combined Hexagram Display**: Visually represents the full 6-line hexagram.
*   **Gemini API Powered Insights**: Fetches a unique interpretation for the combined hexagram, offering deeper musical and philosophical inspiration (requires API key).
*   **Interactive UI**:
    *   Click on individual trigrams from a list to view their details and code.
    *   Click on the generated hexagram to open a modal with combined details, individual trigram codes, and the Gemini-generated meaning.
*   **Copy-to-Clipboard**: Easily copy SuperCollider code snippets.
*   **Responsive Design**: Adapts to various screen sizes.
*   **Offline Trigram Data**: Core trigram information is available offline. API-dependent features (hexagram meaning) require connectivity and a configured API key.

## Tech Stack

*   React 18
*   TypeScript
*   Vite
*   Tailwind CSS (via npm)
*   Google Gemini API (`@google/genai`)

## Getting Started

### Prerequisites

*   Node.js (which includes npm) LTS version or higher.
*   A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
*   A Google Gemini API Key. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://your-repository-url/i-ching-musical-composer.git # Replace with your repo URL
    cd i-ching-musical-composer
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### API Key Configuration

The application uses Vite to manage environment variables.

1.  **Create a `.env` file:** In the root directory of the project, create a file named `.env`. You can copy the `.env.example` file if it exists:
    ```bash
    cp .env.example .env 
    ```
    (If `.env.example` doesn't exist, just create a new `.env` file.)

2.  **Edit `.env`**: Open the `.env` file and add your Google Gemini API Key:
    ```env
    VITE_API_KEY="YOUR_ACTUAL_GEMINI_API_KEY_GOES_HERE"
    ```
    Replace `"YOUR_ACTUAL_GEMINI_API_KEY_GOES_HERE"` with your actual key.

3.  **Save the file.**
4.  **Security**: The `.env` file is already listed in `.gitignore`. This is **CRUCIAL** to prevent your API key from being accidentally committed to your Git repository. **Never commit your API key to a public repository.**

### Running Locally

1.  Ensure your API Key is configured in the `.env` file as described above.
2.  Start the Vite development server:
    ```bash
    npm run dev
    ```
3.  Open the URL shown in your terminal (usually `http://localhost:5173`) in your web browser.

The application should now run. Features requiring the Gemini API (like hexagram meaning generation) will only work if the `VITE_API_KEY` is correctly set.

## Build for Production

To create an optimized production build:
```bash
npm run build
```
The output files will be in the `dist` directory. You can then serve these files using any static web server.

## Deployment

Deploying this application involves building it and then serving the static files from the `dist` directory.

### API Key for Deployed Versions:
When deploying, your hosting platform (e.g., Netlify, Vercel, GitHub Pages with a custom build action) needs to be configured with the `VITE_API_KEY` as an environment variable. Vite will embed this key during the `npm run build` process.

*   **GitHub Pages**: If using the basic GitHub Pages static site deployment, it won't run a build step that injects the key from GitHub Secrets by default. You'd need a more complex GitHub Action to build with Vite and make the secret available as `VITE_API_KEY` during that build.
*   **Netlify/Vercel**: These platforms typically allow you to set environment variables in their dashboards. Set `VITE_API_KEY` to your Gemini API key. During the build (`npm run build`) on their servers, Vite will pick up this variable.

If `VITE_API_KEY` is not available during the build, Gemini API features will be disabled in the deployed application, and a warning will be shown.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is inspired by ancient wisdom and modern technology.
Considered MIT License unless otherwise specified.
```