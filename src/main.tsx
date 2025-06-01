import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import Tailwind CSS styles

// --- Global Error Handler ---
const escapeHtml = (unsafe: any): string => {
  if (typeof unsafe !== 'string') {
    try {
      unsafe = String(unsafe);
    } catch (e) {
      return 'Unserializable error object';
    }
  }
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
};

const displayGlobalError = (message: string, source?: string, lineno?: number, colno?: number, error?: Error | string | Event) => {
  console.error("Global error caught:", message, source, lineno, colno, error);
  const errorDisplayDiv = document.getElementById('critical-error-display');
  const errorMessageEl = document.getElementById('error-message-content');
  const errorStackEl = document.getElementById('error-stack-content');
  const rootEl = document.getElementById('root');

  if (rootEl) {
    rootEl.style.display = 'none'; // Hide React root
  }

  if (errorDisplayDiv) {
    errorDisplayDiv.style.display = 'block'; // Make error div visible
    if (errorMessageEl) {
      let msgContent = `<strong>Message:</strong> ${escapeHtml(message)}<br>`;
      if (source) msgContent += `<strong>Source:</strong> ${escapeHtml(source)}<br>`;
      if (lineno !== undefined) msgContent += `<strong>Line:</strong> ${lineno}<br>`;
      if (colno !== undefined) msgContent += `<strong>Column:</strong> ${colno}`;
      errorMessageEl.innerHTML = msgContent;
    }
    if (errorStackEl) {
      let stackContent = 'No stack trace available.';
      if (error && (error instanceof Error) && error.stack) {
        stackContent = escapeHtml(error.stack);
      } else if (typeof error === 'string') {
        stackContent = escapeHtml(error);
      } else if (error instanceof Event && error.type === 'unhandledrejection') {
        // For unhandled promise rejections, error might be the reason
        const reason = (error as PromiseRejectionEvent).reason;
        if (reason instanceof Error && reason.stack) {
            stackContent = escapeHtml(reason.stack);
        } else {
            stackContent = escapeHtml(String(reason));
        }
      }
      errorStackEl.innerHTML = `<strong style="display: block; margin-bottom: 5px;">Stack Trace:</strong>${stackContent.replace(/\n/g, "<br>")}`;
    }
  }
};

window.onerror = (message, source, lineno, colno, error) => {
  displayGlobalError(message as string, source, lineno, colno, error);
  return true; // Prevent default browser error handling
};

window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
  console.error('Unhandled promise rejection:', event.reason);
  const reason = event.reason;
  let message = 'Unhandled promise rejection';
  let source = 'Promise';
  let lineno: number | undefined;
  let colno: number | undefined;

  if (reason instanceof Error) {
    message = reason.message;
    // Attempt to get source, lineno, colno if available (often not standard for promise rejections)
    // source = reason.fileName || source; // fileName is non-standard
    // lineno = reason.lineNumber; // lineNumber is non-standard
    // colno = reason.columnNumber; // columnNumber is non-standard
  } else {
    message = String(reason);
  }
  displayGlobalError(message, source, lineno, colno, reason);
});


// --- Main Application Logic ---
console.log("src/main.tsx: Script execution started.");

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    const errorMsg = "src/main.tsx: Critical Error - Root element #root not found in DOM.";
    console.error(errorMsg);
    // Display error using our function, then throw to ensure it's caught by global handlers if needed
    displayGlobalError(errorMsg, 'src/main.tsx', 0, 0, new Error(errorMsg)); 
    throw new Error(errorMsg); 
  }
  console.log("src/main.tsx: Root element #root found.");

  const root = ReactDOM.createRoot(rootElement);
  console.log("src/main.tsx: ReactDOM.createRoot executed successfully.");

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("src/main.tsx: root.render called successfully.");

} catch (error: any) {
  console.error("src/main.tsx: Error during React app initialization/rendering:", error);
  const errorMessage = error instanceof Error ? error.message : String(error);
  const sourceFile = error?.fileName || 'src/main.tsx';
  const lineNumber = error?.lineNumber;
  const columnNumber = error?.columnNumber;
  
  displayGlobalError(
    `React app initialization/rendering error: ${errorMessage}`,
    sourceFile,
    lineNumber,
    columnNumber,
    error
  );
}