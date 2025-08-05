// T&C Shield - Content Script
// This script runs on every webpage and extracts text content for analysis

(async () => {
  try {
    // Check if this page might contain T&C or Privacy Policy content
    const pageTitle = document.title.toLowerCase();
    const pageText = document.body.innerText.toLowerCase();

    const tcIndicators = [
      "terms",
      "conditions",
      "privacy",
      "policy",
      "agreement",
      "terms of service",
      "terms of use",
      "user agreement",
      "privacy policy",
      "cookie policy",
      "data policy",
    ];

    const isTCPage = tcIndicators.some(
      (indicator) =>
        pageTitle.includes(indicator) || pageText.includes(indicator)
    );

    // Extract page content
    const pageData = {
      url: window.location.href,
      title: document.title,
      text: document.body.innerText,
      isTCPage: isTCPage,
      timestamp: Date.now(),
      wordCount: document.body.innerText.split(/\s+/).length,
    };

    // Store the data for popup to access
    chrome.storage.local.set({
      tcPageData: pageData,
      lastAnalyzed: window.location.href,
    });

    // If this looks like a T&C page, also highlight risky content
    if (isTCPage) {
      highlightRiskyContent();
    }
  } catch (error) {
    console.error("T&C Shield content script error:", error);
    chrome.storage.local.set({
      tcPageData: {
        error: "Failed to analyze page content",
        url: window.location.href,
        timestamp: Date.now(),
      },
    });
  }
})();

function highlightRiskyContent() {
  const riskyPhrases = [
    "we may share your data",
    "third-party service providers",
    "we may disclose",
    "non-refundable",
    "automatically renew",
    "without prior notice",
    "tracking technologies",
    "data may be sold",
    "revise these terms at any time",
    "you waive any rights",
    "we are not liable",
  ];

  // Simple highlighting - can be enhanced later
  let bodyHTML = document.body.innerHTML;

  riskyPhrases.forEach((phrase) => {
    const regex = new RegExp(`(${phrase})`, "gi");
    bodyHTML = bodyHTML.replace(
      regex,
      `<span style="background-color: #ffeb3b; padding: 2px 4px; border-radius: 3px; border: 1px solid #f57c00;">$1</span>`
    );
  });

  // Only apply if we found matches to avoid breaking the page
  if (bodyHTML !== document.body.innerHTML) {
    document.body.innerHTML = bodyHTML;
  }
}
