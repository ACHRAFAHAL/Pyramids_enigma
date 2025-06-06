import streamlit as st
import streamlit.components.v1 as components
import os

# Set page configuration for wider layout
st.set_page_config(layout="wide")

# Get the directory of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Define file paths
html_file_path = os.path.join(current_dir, "index.html")
css_file_path = os.path.join(current_dir, "style.css")
js_file_path = os.path.join(current_dir, "script.js")
# Note: For the GLB model, you'll need to host it publicly (e.g., GitHub Pages, AWS S3)
# and update the 'modelPath' variable in script.js to its public URL.
# Local file paths for GLB models within Streamlit components are not directly supported
# without a more complex setup (e.g., serving static files via FastAPI/Flask and embedding).
# For simplicity, we assume you'll host the GLB externally.

# Retrieve API key from Streamlit secrets
# To use secrets:
# 1. Create a folder named `.streamlit` in your app's root directory.
# 2. Inside `.streamlit`, create a file named `secrets.toml`.
# 3. Add your API key to `secrets.toml` like this: `gemini_api_key = "YOUR_API_KEY_HERE"`
try:
    gemini_api_key = st.secrets["gemini_api_key"]
except KeyError:
    st.error("API key not found in Streamlit secrets. Please add 'gemini_api_key' to your .streamlit/secrets.toml file.")
    st.stop()


# Read HTML content
try:
    with open(html_file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
except FileNotFoundError:
    st.error(f"Error: index.html not found at {html_file_path}")
    st.stop()

# Read CSS content
try:
    with open(css_file_path, 'r', encoding='utf-8') as f:
        css_content = f.read()
except FileNotFoundError:
    st.warning(f"Warning: style.css not found at {css_file_path}. The page might not be styled correctly.")
    css_content = ""

# Read JavaScript content
try:
    with open(js_file_path, 'r', encoding='utf-8') as f:
        js_content = f.read()
except FileNotFoundError:
    st.warning(f"Warning: script.js not found at {js_file_path}. The page might not function correctly.")
    js_content = ""

# IMPORTANT: Embed CSS and JS directly into the HTML for Streamlit components.
# Streamlit's html component has limitations on loading external relative files (like .css or .js)
# within the same directory. CDN links (like Chart.js, Three.js) will work as they are external.

# Remove existing <link rel="stylesheet" href="style.css"> and <script src="script.js"></script>
# if they are present, to avoid redundancy and potential issues.
html_content = html_content.replace('<link rel="stylesheet" href="style.css">', '')
html_content = html_content.replace('<script src="script.js"></script>', '')

# Find the </head> tag and insert CSS
html_content = html_content.replace('</head>', f"<style>{css_content}</style></head>")

# Find the </body> tag and insert JavaScript, injecting the API key
# WARNING: Since the API call happens client-side (in script.js),
# the API key will still be visible in the browser's developer tools (e.g., network requests, source).
# For truly secure API calls that hide the key from the client, consider making the API call
# from the Streamlit backend (Python) and having the client-side JS communicate with your Streamlit app.
js_with_api_key = js_content.replace('const apiKey = "API_KEY_HERE";', f'const apiKey = "{gemini_api_key}";')
html_content = html_content.replace('</body>', f"<script>{js_with_api_key}</script></body>")

# Display the custom HTML content
components.html(html_content, height=1200, scrolling=True) # Adjust height as needed
