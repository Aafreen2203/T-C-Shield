// T&C Shield - Popup Script
// Main analysis logic and UI management

// Enhanced risky keywords database with severity levels
const riskyKeywords = {
  high: [
    // Original high-risk phrases
    {
      phrase: "we may share your data",
      description: "Your personal data may be shared with third parties",
    },
    {
      phrase: "data may be sold",
      description: "Your data could be sold to other companies",
    },
    {
      phrase: "you waive any rights",
      description: "You're giving up legal rights",
    },
    {
      phrase: "we are not liable",
      description: "Company disclaims responsibility for damages",
    },
    {
      phrase: "personal data may be transferred",
      description: "Your data may be moved to other countries",
    },
    {
      phrase: "without prior notice",
      description: "Changes can be made without informing you",
    },
    {
      phrase: "tracking technologies",
      description: "Your online behavior is being monitored",
    },

    // Data selling & monetization (HIGH RISK)
    {
      phrase: "data may be sold to third parties",
      description: "Your personal information could be sold for profit",
    },
    {
      phrase: "we reserve the right to monetize your information",
      description: "Company can make money from your personal data",
    },
    {
      phrase: "we share anonymized data for profit",
      description: "Your data is used commercially even when anonymized",
    },
    {
      phrase: "personal info is provided to partners",
      description: "Your data is shared with business partners",
    },
    {
      phrase: "we may disclose data to advertisers",
      description: "Advertisers get direct access to your information",
    },

    // Privacy violations (HIGH RISK)
    {
      phrase: "personal data may be transferred internationally",
      description:
        "Your data may be moved to countries with weaker privacy laws",
    },
    {
      phrase: "we track your activity across sites",
      description:
        "Your browsing behavior is monitored across multiple websites",
    },
    {
      phrase: "behavioral profiling is performed",
      description: "Company creates detailed profiles of your behavior",
    },
    {
      phrase: "we may access your contacts",
      description: "Company can access your personal contact list",
    },
    {
      phrase: "we may record calls or messages",
      description: "Your communications may be recorded and stored",
    },

    // Legal waivers (HIGH RISK)
    {
      phrase: "use at your own risk",
      description: "You accept all risks with no company responsibility",
    },
    {
      phrase: "no warranties are provided",
      description: "Company provides no guarantees about their service",
    },
    {
      phrase: "we disclaim all responsibility",
      description: "Company takes no responsibility for any issues",
    },
    {
      phrase: "you waive the right to sue",
      description: "You give up your right to take legal action",
    },
    {
      phrase: "indirect or consequential damages are excluded",
      description: "Company won't pay for damages their service causes",
    },

    // Arbitration & dispute resolution (HIGH RISK)
    {
      phrase: "disputes will be resolved through arbitration",
      description: "You cannot take disputes to court",
    },
    {
      phrase: "you waive the right to a jury trial",
      description: "You give up your constitutional right to a jury trial",
    },
    {
      phrase: "class action waivers apply",
      description: "You cannot join with others in a class action lawsuit",
    },
    {
      phrase: "binding arbitration is mandatory",
      description: "You must use private arbitration instead of courts",
    },

    // Content & IP rights (HIGH RISK)
    {
      phrase: "we own any content you submit",
      description: "Company claims ownership of everything you post",
    },
    {
      phrase: "you grant us a perpetual license",
      description: "Company gets permanent rights to use your content",
    },
    {
      phrase: "rights are worldwide and royalty-free",
      description: "Company can use your content globally without paying you",
    },

    // Unilateral changes (HIGH RISK)
    {
      phrase: "we reserve the right to modify these terms at any time",
      description: "Company can change terms whenever they want",
    },
    {
      phrase: "changes are effective immediately upon posting",
      description: "New terms apply instantly without your explicit agreement",
    },
    {
      phrase: "we may change features without notice",
      description: "Service features can be removed without warning",
    },
    {
      phrase: "we can update pricing without warning",
      description: "Prices can increase without advance notice",
    },
  ],

  medium: [
    // Original medium-risk phrases
    {
      phrase: "third-party service providers",
      description: "Your data is shared with external companies",
    },
    {
      phrase: "we may disclose",
      description: "Information may be revealed under certain conditions",
    },
    {
      phrase: "automatically renew",
      description: "Subscription will continue charging automatically",
    },
    {
      phrase: "revise these terms at any time",
      description: "Terms can change without your explicit consent",
    },
    { phrase: "subject to change", description: "Policies may be modified" },
    {
      phrase: "cancel anytime",
      description: "May have hidden cancellation restrictions",
    },

    // Privacy & data collection (MEDIUM RISK)
    {
      phrase: "we may collect personal information",
      description: "Company gathers your personal details",
    },
    {
      phrase: "your data may be shared with affiliates",
      description: "Information is shared within the company group",
    },
    {
      phrase: "data retention policies may change",
      description: "How long they keep your data can change",
    },
    {
      phrase: "cookies and tracking technologies are used",
      description: "Website tracks your browsing with cookies",
    },
    {
      phrase: "location data is collected",
      description: "Your physical location is tracked and stored",
    },
    {
      phrase: "your browsing history may be logged",
      description: "Record of websites you visit is kept",
    },
    {
      phrase: "information from your device is collected",
      description: "Data about your device and software is gathered",
    },
    {
      phrase: "usage statistics are aggregated",
      description: "Your usage patterns are compiled with others",
    },
    {
      phrase: "we may link data from multiple sources",
      description: "Information about you is combined from different places",
    },

    // Billing & subscriptions (MEDIUM RISK)
    {
      phrase: "subscription automatically renews",
      description: "You'll be charged repeatedly unless you cancel",
    },
    {
      phrase: "you will be charged unless cancelled",
      description: "Billing continues until you actively stop it",
    },
    {
      phrase: "renewal occurs without notice",
      description: "Subscription renews without warning you first",
    },
    {
      phrase: "billing continues until you opt out",
      description: "Charges keep happening until you take action",
    },
    {
      phrase: "price may increase without consent",
      description: "Costs can go up without your agreement",
    },

    // Marketing & advertising (MEDIUM RISK)
    {
      phrase: "your information could be used for marketing",
      description: "Your data is used to send you advertisements",
    },
    {
      phrase: "advertisers may receive user data",
      description: "Marketing companies get access to your information",
    },
    {
      phrase: "your preferences are sold or exchanged",
      description: "Information about your likes/dislikes is shared for profit",
    },
    {
      phrase: "we use your profile data for targeted ads",
      description: "Personal information is used to show you specific ads",
    },

    // Cancellation & refunds (MEDIUM RISK)
    {
      phrase: "refunds are subject to approval",
      description: "Getting your money back requires company permission",
    },
    {
      phrase: "we may refuse refund requests",
      description: "Company can deny refunds at their discretion",
    },
    {
      phrase: "cancellations must be made within a narrow window",
      description: "Very limited time to cancel your subscription",
    },
    {
      phrase: "service may be terminated without notice",
      description: "Company can end your service without warning",
    },

    // Legal & jurisdictional (MEDIUM RISK)
    {
      phrase: "venue is chosen by the company",
      description: "Legal disputes happen where the company wants",
    },
    {
      phrase: "you agree to private dispute resolution only",
      description: "Cannot use public courts for disputes",
    },
    {
      phrase: "the court of our choice has jurisdiction",
      description: "Company decides which court handles legal issues",
    },
    {
      phrase: "we may assign our rights freely",
      description: "Company can transfer their rights to others",
    },
    {
      phrase: "continued use implies acceptance of changes",
      description: "Using the service means you agree to new terms",
    },
  ],

  low: [
    // Original low-risk phrases
    { phrase: "non-refundable", description: "Payments cannot be returned" },
    {
      phrase: "opt-out at your own risk",
      description: "Opting out may have consequences",
    },
    {
      phrase: "cookies and similar technologies",
      description: "Website uses tracking cookies",
    },
    {
      phrase: "analytics and advertising",
      description: "Data used for marketing purposes",
    },

    // Fees & charges (LOW RISK)
    {
      phrase: "fees are non-refundable",
      description: "Money paid cannot be returned",
    },
    {
      phrase: "hidden charges may apply",
      description: "Additional fees may be charged",
    },
    {
      phrase: "charges may appear on your statement under a different name",
      description: "Billing may show up with unexpected company names",
    },
    {
      phrase: "you forfeit fees upon cancellation",
      description: "No refund when you cancel your account",
    },
    {
      phrase: "termination does not entitle you to compensation",
      description: "No payment if service is ended",
    },

    // Service limitations (LOW RISK)
    {
      phrase: "no guarantee of uninterrupted service",
      description: "Service may have downtime or interruptions",
    },
    {
      phrase: "we are not responsible for data breaches",
      description: "Company doesn't take responsibility for security incidents",
    },
    {
      phrase: "security is provided as is",
      description: "No guarantees about how secure the service is",
    },
    {
      phrase: "we may suspend accounts for any reason",
      description: "Your account can be suspended without specific cause",
    },
    {
      phrase: "you are responsible for your credentials",
      description: "You must protect your own login information",
    },

    // Content & user-generated content (LOW RISK)
    {
      phrase: "we may repurpose your submissions",
      description: "Content you submit may be used in other ways",
    },
    {
      phrase: "user-generated content may be used for promotion",
      description: "Your posts might be used in marketing materials",
    },
    {
      phrase: "we can edit or remove your content without notice",
      description: "Company can modify or delete what you post",
    },
    {
      phrase: "you cannot transfer your rights without permission",
      description: "Cannot give your account rights to someone else",
    },

    // Legal technicalities (LOW RISK)
    {
      phrase: "you agree to indemnify us",
      description: "You'll pay for any legal costs the company faces",
    },
    {
      phrase: "you accept all risks",
      description: "You take responsibility for any problems that occur",
    },
    {
      phrase: "severability means the rest remains valid",
      description: "If one part is invalid, the rest of the agreement stays",
    },
    {
      phrase: "failure to enforce rights does not waive them",
      description: "Company keeps their rights even if they don't use them",
    },
    {
      phrase: "terms may be revised without explicit consent",
      description: "Agreement can change without asking you directly",
    },
    {
      phrase: "we are not responsible for third-party actions",
      description: "Company not liable for what their partners do",
    },
  ],
};

// Initialize popup when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  await initializePopup();
  setupEventListeners();
});

async function initializePopup() {
  try {
    const result = await chrome.storage.local.get(["tcPageData"]);
    const pageData = result.tcPageData;

    if (!pageData) {
      displayStatus(
        "No page data available. Try refreshing the page.",
        "warning"
      );
      return;
    }

    if (pageData.error) {
      displayStatus(pageData.error, "danger");
      return;
    }

    // Analyze the page content
    const analysis = await analyzeTnC(pageData.text);
    displayResults(analysis, pageData);
  } catch (error) {
    console.error("Popup initialization error:", error);
    displayStatus("Error analyzing page content", "danger");
  }
}

async function analyzeTnC(text) {
  const textLower = text.toLowerCase();
  const findings = [];

  // Check each category of risky keywords
  Object.keys(riskyKeywords).forEach((severity) => {
    riskyKeywords[severity].forEach((item) => {
      if (textLower.includes(item.phrase.toLowerCase())) {
        findings.push({
          phrase: item.phrase,
          description: item.description,
          severity: severity,
          category: categorizeRisk(item.phrase, item.description),
          count: (
            textLower.match(new RegExp(item.phrase.toLowerCase(), "g")) || []
          ).length,
        });
      }
    });
  });

  // Prepare basic analysis results
  const analysis = {
    totalRisks: findings.length,
    findings: findings,
    riskScore: calculateRiskScore(findings),
    wordCount: text.split(/\s+/).length,
    aiAnalysis: null,
    aiSummary: null,
  };

  // Try to enhance with Hugging Face AI analysis (optional)
  try {
    // Check if we have enough text for AI analysis (minimum 100 words)
    if (
      analysis.wordCount > 100 &&
      typeof analyzeWithHuggingFace === "function"
    ) {
      console.log("Attempting Hugging Face analysis...");

      // Run AI analysis in parallel (don't wait for it to complete)
      analyzeWithHuggingFace(text.substring(0, 3000))
        .then((hfResults) => {
          if (hfResults && !hfResults.error) {
            analysis.aiAnalysis = hfResults;

            // If we got a summary, display it
            if (hfResults.summary) {
              analysis.aiSummary = hfResults.summary;
            }

            // If we got privacy risks, factor them into the score
            if (hfResults.privacyRisks?.overallRisk) {
              const aiRiskBonus = Math.min(
                hfResults.privacyRisks.overallRisk * 0.3,
                20
              );
              analysis.riskScore = Math.min(
                analysis.riskScore + aiRiskBonus,
                100
              );
            }

            console.log("Hugging Face analysis completed:", hfResults);
          }
        })
        .catch((error) => {
          console.log(
            "Hugging Face analysis failed (optional):",
            error.message
          );
        });
    }
  } catch (error) {
    // AI analysis is optional - don't let it break the main functionality
    console.log("AI analysis skipped:", error.message);
  }

  return analysis;
}

function calculateRiskScore(findings) {
  let score = 0;
  findings.forEach((finding) => {
    switch (finding.severity) {
      case "high":
        score += 10 * finding.count;
        break;
      case "medium":
        score += 5 * finding.count;
        break;
      case "low":
        score += 2 * finding.count;
        break;
    }
  });
  return Math.min(score, 100); // Cap at 100
}

function displayResults(analysis, pageData) {
  const statusEl = document.getElementById("status");
  const riskSummaryEl = document.getElementById("risk-summary");
  const risksEl = document.getElementById("risks");

  // Clear previous results
  risksEl.innerHTML = "";

  if (analysis.totalRisks === 0) {
    displayStatus("✅ No obvious risks detected", "safe");
    riskSummaryEl.innerHTML = `
      <div style="text-align: center;">
        <strong>Clean Bill of Health!</strong><br>
        <small>Analyzed ${analysis.wordCount.toLocaleString()} words</small>
        ${analysis.aiSummary ? `<br><br><strong>AI Summary:</strong><br><small style="color: #555; line-height: 1.4; text-align: left; display: block; margin-top: 10px;">${analysis.aiSummary}</small>` : ""}
      </div>
    `;
  } else {
    const riskLevel =
      analysis.riskScore >= 30
        ? "danger"
        : analysis.riskScore >= 15
          ? "warning"
          : "safe";
    displayStatus(
      `⚠️ ${analysis.totalRisks} potential risk${analysis.totalRisks > 1 ? "s" : ""} found`,
      riskLevel
    );

    riskSummaryEl.innerHTML = `
      <div>
        <strong>Risk Score: ${analysis.riskScore}/100</strong><br>
        <small>Found ${analysis.totalRisks} risky clause${analysis.totalRisks > 1 ? "s" : ""} in ${analysis.wordCount.toLocaleString()} words</small>
        ${analysis.aiSummary ? `<br><br><strong>AI Summary:</strong><br><small style="color: #555; line-height: 1.4;">${analysis.aiSummary}</small>` : ""}
      </div>
    `;

    // Sort findings by severity
    const sortedFindings = analysis.findings.sort((a, b) => {
      const severityOrder = { high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });

    sortedFindings.forEach((finding) => {
      const li = document.createElement("li");
      li.className = `risk-item ${finding.severity}`;

      // Get icon and color based on risk category/severity
      const { icon, color } = getRiskIcon(finding.category || finding.severity);

      li.innerHTML = `
        <div class="risk-item-content">
          <div class="risk-header">
            <span class="risk-icon" style="color: ${color}">${icon}</span>
            <div class="severity-dot ${finding.severity}" title="${finding.severity.toUpperCase()} RISK"></div>
            <div class="risk-title">${finding.phrase}</div>
          </div>
          <div class="risk-description">${finding.description}</div>
          ${finding.count > 1 ? `<div class="risk-count">Found ${finding.count} times</div>` : ""}
        </div>
      `;

      // Add tooltip functionality
      li.title = `Category: ${finding.category || "General"}\nSeverity: ${finding.severity.toUpperCase()}\nDescription: ${finding.description}`;

      risksEl.appendChild(li);
    });
  }
}

function displayStatus(message, type = "default") {
  const statusEl = document.getElementById("status");
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
}

// Categorize risks based on keywords and descriptions
function categorizeRisk(phrase, description) {
  const phraseLower = phrase.toLowerCase();
  const descLower = description.toLowerCase();

  // Data & Privacy
  if (
    phraseLower.includes("data") ||
    phraseLower.includes("information") ||
    phraseLower.includes("privacy") ||
    descLower.includes("personal data")
  ) {
    if (
      phraseLower.includes("share") ||
      phraseLower.includes("sold") ||
      descLower.includes("shared")
    ) {
      return "sharing";
    } else if (
      phraseLower.includes("track") ||
      phraseLower.includes("monitor") ||
      descLower.includes("monitor")
    ) {
      return "tracking";
    } else if (phraseLower.includes("cookie") || descLower.includes("cookie")) {
      return "cookies";
    } else {
      return "data collection";
    }
  }

  // Legal & Liability
  if (
    phraseLower.includes("liable") ||
    phraseLower.includes("waive") ||
    phraseLower.includes("rights") ||
    descLower.includes("legal")
  ) {
    if (phraseLower.includes("terminat") || descLower.includes("terminat")) {
      return "termination";
    } else if (
      phraseLower.includes("dispute") ||
      descLower.includes("dispute")
    ) {
      return "dispute";
    } else if (
      phraseLower.includes("liable") ||
      descLower.includes("liability")
    ) {
      return "liability";
    } else {
      return "legal";
    }
  }

  // Financial & Commercial
  if (
    phraseLower.includes("payment") ||
    phraseLower.includes("pay") ||
    phraseLower.includes("fee") ||
    phraseLower.includes("cost") ||
    descLower.includes("money") ||
    descLower.includes("payment")
  ) {
    if (
      phraseLower.includes("subscription") ||
      descLower.includes("subscription")
    ) {
      return "subscription";
    } else if (phraseLower.includes("fee") || descLower.includes("fee")) {
      return "fees";
    } else {
      return "payment";
    }
  }

  // Content & Usage
  if (
    phraseLower.includes("content") ||
    phraseLower.includes("material") ||
    descLower.includes("content")
  ) {
    return "content";
  }

  if (
    phraseLower.includes("use") ||
    phraseLower.includes("usage") ||
    descLower.includes("usage")
  ) {
    return "usage";
  }

  if (
    phraseLower.includes("modif") ||
    phraseLower.includes("change") ||
    descLower.includes("modif") ||
    descLower.includes("change")
  ) {
    return "modification";
  }

  // Default category
  return "legal";
}

// Get appropriate icon and color for risk categories
function getRiskIcon(category) {
  const iconMap = {
    // Data & Privacy
    "data collection": { icon: "🔒", color: "#e74c3c" },
    tracking: { icon: "👁️", color: "#e67e22" },
    sharing: { icon: "📤", color: "#f39c12" },
    cookies: { icon: "🍪", color: "#d35400" },

    // Legal & Liability
    liability: { icon: "⚖️", color: "#8e44ad" },
    legal: { icon: "📋", color: "#9b59b6" },
    termination: { icon: "🚪", color: "#e74c3c" },
    dispute: { icon: "⚡", color: "#e67e22" },

    // Financial & Commercial
    payment: { icon: "💳", color: "#27ae60" },
    fees: { icon: "💰", color: "#f1c40f" },
    subscription: { icon: "🔄", color: "#3498db" },

    // Content & Usage
    content: { icon: "📄", color: "#34495e" },
    usage: { icon: "🎯", color: "#16a085" },
    modification: { icon: "✏️", color: "#2980b9" },

    // Default by severity
    high: { icon: "🚨", color: "#e74c3c" },
    medium: { icon: "⚠️", color: "#f39c12" },
    low: { icon: "ℹ️", color: "#3498db" },
  };

  return iconMap[category.toLowerCase()] || iconMap["medium"];
}

function setupEventListeners() {
  // Refresh button
  document.getElementById("refresh-btn").addEventListener("click", async () => {
    displayStatus("Refreshing analysis...", "default");

    // Trigger content script to re-analyze
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });

      // Wait a moment then reinitialize
      setTimeout(initializePopup, 1000);
    } catch (error) {
      displayStatus("Failed to refresh. Please reload the page.", "danger");
    }
  });

  // Settings button - opens options page
  document.getElementById("settings-btn").addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });
}

// Utility function to get current tab info
async function getCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  } catch (error) {
    console.error("Failed to get current tab:", error);
    return null;
  }
}
