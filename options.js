// T&C Shield Options/Settings Page Script

document.addEventListener("DOMContentLoaded", async () => {
  await loadSettings();
  setupEventListeners();
});

// Load saved settings from storage
async function loadSettings() {
  try {
    const settings = await chrome.storage.sync.get([
      "enableHighlighting",
      "autoAnalyze",
      "sensitivityLevel",
      "enableGPT",
      "gptApiKey",
      "enableHF",
      "hfApiKey",
      "customKeywords",
      "saveAnalytics",
    ]);

    // Apply loaded settings to UI
    document.getElementById("enableHighlighting").checked =
      settings.enableHighlighting !== false;
    document.getElementById("autoAnalyze").checked =
      settings.autoAnalyze !== false;
    document.getElementById("sensitivityLevel").value =
      settings.sensitivityLevel || "medium";
    document.getElementById("enableGPT").checked = settings.enableGPT || false;
    document.getElementById("gptApiKey").value = settings.gptApiKey || "";
    document.getElementById("enableHF").checked = settings.enableHF || false;
    document.getElementById("hfApiKey").value = settings.hfApiKey || "";
    document.getElementById("saveAnalytics").checked =
      settings.saveAnalytics !== false;

    // Show/hide API key sections
    toggleApiKeySection("gpt", settings.enableGPT);
    toggleApiKeySection("hf", settings.enableHF);

    // Load custom keywords
    if (settings.customKeywords) {
      displayCustomKeywords(settings.customKeywords);
    }
  } catch (error) {
    console.error("Failed to load settings:", error);
    showStatus("Failed to load settings", "error");
  }
}

// Setup event listeners
function setupEventListeners() {
  // Toggle API key sections
  document.getElementById("enableGPT").addEventListener("change", (e) => {
    toggleApiKeySection("gpt", e.target.checked);
  });

  document.getElementById("enableHF").addEventListener("change", (e) => {
    toggleApiKeySection("hf", e.target.checked);
  });

  // Custom keywords
  document
    .getElementById("addKeywords")
    .addEventListener("click", addCustomKeywords);

  // Save settings
  document
    .getElementById("saveSettings")
    .addEventListener("click", saveSettings);

  // Reset settings
  document
    .getElementById("resetSettings")
    .addEventListener("click", resetSettings);

  // Clear data
  document.getElementById("clearData").addEventListener("click", clearAllData);
}

// Toggle visibility of API key input sections
function toggleApiKeySection(service, show) {
  const section = document.getElementById(`${service}KeySection`);
  section.style.display = show ? "block" : "none";
}

// Add custom keywords
async function addCustomKeywords() {
  const textarea = document.getElementById("customKeywords");
  const newKeywords = textarea.value.trim();

  if (!newKeywords) {
    showStatus("Please enter some keywords to add", "error");
    return;
  }

  try {
    // Get existing keywords
    const result = await chrome.storage.sync.get(["customKeywords"]);
    const existingKeywords = result.customKeywords || [];

    // Parse new keywords
    const keywordsToAdd = newKeywords
      .split("\n")
      .map((k) => k.trim())
      .filter((k) => k.length > 0)
      .filter((k) => !existingKeywords.includes(k)); // Avoid duplicates

    if (keywordsToAdd.length === 0) {
      showStatus("No new keywords to add", "error");
      return;
    }

    // Save updated keywords
    const updatedKeywords = [...existingKeywords, ...keywordsToAdd];
    await chrome.storage.sync.set({ customKeywords: updatedKeywords });

    // Update UI
    displayCustomKeywords(updatedKeywords);
    textarea.value = "";

    showStatus(
      `Added ${keywordsToAdd.length} new keyword${keywordsToAdd.length > 1 ? "s" : ""}`,
      "success"
    );
  } catch (error) {
    console.error("Failed to add keywords:", error);
    showStatus("Failed to add keywords", "error");
  }
}

// Display custom keywords list
function displayCustomKeywords(keywords) {
  const container = document.getElementById("keywordsList");
  container.innerHTML = "";

  if (!keywords || keywords.length === 0) {
    container.innerHTML =
      '<p style="color: #666; text-align: center; padding: 20px;">No custom keywords added yet</p>';
    return;
  }

  keywords.forEach((keyword, index) => {
    const item = document.createElement("div");
    item.className = "keyword-item";
    item.innerHTML = `
      <span>${keyword}</span>
      <span class="remove-keyword" data-index="${index}">×</span>
    `;
    container.appendChild(item);
  });

  // Add remove event listeners
  container.querySelectorAll(".remove-keyword").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      removeCustomKeyword(index);
    });
  });
}

// Remove a custom keyword
async function removeCustomKeyword(index) {
  try {
    const result = await chrome.storage.sync.get(["customKeywords"]);
    const keywords = result.customKeywords || [];

    if (index >= 0 && index < keywords.length) {
      keywords.splice(index, 1);
      await chrome.storage.sync.set({ customKeywords: keywords });
      displayCustomKeywords(keywords);
      showStatus("Keyword removed", "success");
    }
  } catch (error) {
    console.error("Failed to remove keyword:", error);
    showStatus("Failed to remove keyword", "error");
  }
}

// Save all settings
async function saveSettings() {
  try {
    const settings = {
      enableHighlighting: document.getElementById("enableHighlighting").checked,
      autoAnalyze: document.getElementById("autoAnalyze").checked,
      sensitivityLevel: document.getElementById("sensitivityLevel").value,
      enableGPT: document.getElementById("enableGPT").checked,
      gptApiKey: document.getElementById("gptApiKey").value.trim(),
      enableHF: document.getElementById("enableHF").checked,
      hfApiKey: document.getElementById("hfApiKey").value.trim(),
      saveAnalytics: document.getElementById("saveAnalytics").checked,
    };

    // Validate API keys if enabled
    if (settings.enableGPT && !settings.gptApiKey) {
      showStatus("Please enter your OpenAI API key", "error");
      return;
    }

    if (settings.enableHF && !settings.hfApiKey) {
      showStatus("Please enter your Hugging Face API key", "error");
      return;
    }

    await chrome.storage.sync.set(settings);
    showStatus("Settings saved successfully!", "success");

    // Notify content scripts about setting changes
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs
          .sendMessage(tab.id, {
            type: "SETTINGS_UPDATED",
            settings: settings,
          })
          .catch(() => {}); // Ignore errors for tabs without content script
      });
    });
  } catch (error) {
    console.error("Failed to save settings:", error);
    showStatus("Failed to save settings", "error");
  }
}

// Reset all settings to defaults
async function resetSettings() {
  if (
    !confirm(
      "Are you sure you want to reset all settings to defaults? This cannot be undone."
    )
  ) {
    return;
  }

  try {
    await chrome.storage.sync.clear();
    await loadSettings(); // Reload with defaults
    showStatus("Settings reset to defaults", "success");
  } catch (error) {
    console.error("Failed to reset settings:", error);
    showStatus("Failed to reset settings", "error");
  }
}

// Clear all stored data
async function clearAllData() {
  if (
    !confirm(
      "Are you sure you want to clear all stored data? This includes analysis history and settings. This cannot be undone."
    )
  ) {
    return;
  }

  try {
    await chrome.storage.local.clear();
    await chrome.storage.sync.clear();
    showStatus("All data cleared successfully", "success");

    // Reload page to show defaults
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Failed to clear data:", error);
    showStatus("Failed to clear data", "error");
  }
}

// Show status message
function showStatus(message, type = "success") {
  const statusEl = document.getElementById("saveStatus");
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;

  // Clear status after 5 seconds
  setTimeout(() => {
    statusEl.textContent = "";
    statusEl.className = "status";
  }, 5000);
}

// Utility function to validate API keys
function validateApiKey(service, key) {
  if (!key) return false;

  switch (service) {
    case "openai":
      return key.startsWith("sk-") && key.length > 20;
    case "huggingface":
      return key.startsWith("hf_") && key.length > 10;
    default:
      return key.length > 5;
  }
}
