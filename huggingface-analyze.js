// T&C Shield - Hugging Face Integration
// Advanced NLP analysis using specialized legal models

class HuggingFaceAnalyzer {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.baseURL = "https://api-inference.huggingface.co/models";
  }

  async classifyLegalText(text, model = "mrm8488/legal-bert-tos") {
    if (!this.apiKey) {
      throw new Error("Hugging Face API key not configured");
    }

    try {
      const response = await fetch(`${this.baseURL}/${model}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text.substring(0, 5000), // Limit input size
        }),
      });

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Hugging Face classification failed:", error);
      throw error;
    }
  }

  async summarizeLegalText(text, model = "doonhammer/legal_tldr") {
    if (!this.apiKey) {
      throw new Error("Hugging Face API key not configured");
    }

    try {
      const response = await fetch(`${this.baseURL}/${model}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text.substring(0, 3000),
          parameters: {
            max_length: 150,
            min_length: 30,
            do_sample: false,
          },
        }),
      });

      const result = await response.json();
      return result[0]?.summary_text || "Summary not available";
    } catch (error) {
      console.error("Hugging Face summarization failed:", error);
      throw error;
    }
  }

  async detectPrivacyRisks(text) {
    // Use a privacy-focused model or general classification
    try {
      const chunks = this.chunkText(text, 1000);
      const results = [];

      for (const chunk of chunks) {
        const classification = await this.classifyLegalText(chunk);
        if (classification && classification.length > 0) {
          results.push({
            text: chunk.substring(0, 100) + "...",
            classification: classification,
            riskScore: this.calculateRiskFromClassification(classification),
          });
        }
      }

      return {
        overallRisk: this.calculateOverallRisk(results),
        detailedResults: results,
        source: "huggingface",
      };
    } catch (error) {
      console.error("Privacy risk detection failed:", error);
      throw error;
    }
  }

  chunkText(text, maxLength) {
    const chunks = [];
    for (let i = 0; i < text.length; i += maxLength) {
      chunks.push(text.substring(i, i + maxLength));
    }
    return chunks;
  }

  calculateRiskFromClassification(classification) {
    // Map classification results to risk scores
    // This would depend on the specific model output format
    if (Array.isArray(classification)) {
      const highRiskLabels = ["RISKY", "HIGH_RISK", "UNFAIR", "PROBLEMATIC"];
      const hasHighRisk = classification.some((item) =>
        highRiskLabels.some((label) =>
          item.label?.toUpperCase().includes(label)
        )
      );
      return hasHighRisk ? 0.8 : 0.3;
    }
    return 0.5; // Default moderate risk
  }

  calculateOverallRisk(results) {
    if (results.length === 0) return 0;
    const avgRisk =
      results.reduce((sum, r) => sum + r.riskScore, 0) / results.length;
    return Math.round(avgRisk * 100);
  }
}

// Specialized privacy policy analyzer
class PrivacyPolicyAnalyzer extends HuggingFaceAnalyzer {
  async analyzePrivacyPolicy(text) {
    const privacyKeywords = [
      "personal data",
      "cookies",
      "tracking",
      "third party",
      "data sharing",
      "analytics",
      "advertising",
      "profiling",
    ];

    const foundConcerns = [];
    const textLower = text.toLowerCase();

    privacyKeywords.forEach((keyword) => {
      if (textLower.includes(keyword)) {
        foundConcerns.push({
          keyword,
          context: this.extractContext(text, keyword),
          severity: this.assessKeywordSeverity(keyword),
        });
      }
    });

    try {
      // Also get AI analysis if available
      const aiAnalysis = await this.detectPrivacyRisks(text);

      return {
        keywordAnalysis: foundConcerns,
        aiAnalysis: aiAnalysis,
        overallScore: this.calculatePrivacyScore(foundConcerns, aiAnalysis),
        recommendations: this.generatePrivacyRecommendations(foundConcerns),
      };
    } catch (error) {
      // Fallback to keyword analysis only
      return {
        keywordAnalysis: foundConcerns,
        overallScore: this.calculatePrivacyScore(foundConcerns),
        recommendations: this.generatePrivacyRecommendations(foundConcerns),
      };
    }
  }

  extractContext(text, keyword, contextLength = 150) {
    const index = text.toLowerCase().indexOf(keyword.toLowerCase());
    if (index === -1) return "";

    const start = Math.max(0, index - contextLength / 2);
    const end = Math.min(
      text.length,
      index + keyword.length + contextLength / 2
    );

    return text.substring(start, end);
  }

  assessKeywordSeverity(keyword) {
    const highRisk = ["data sharing", "third party", "profiling", "tracking"];
    const mediumRisk = ["cookies", "analytics", "advertising"];

    if (highRisk.includes(keyword)) return "high";
    if (mediumRisk.includes(keyword)) return "medium";
    return "low";
  }

  calculatePrivacyScore(keywordAnalysis, aiAnalysis = null) {
    let score = 0;

    keywordAnalysis.forEach((concern) => {
      switch (concern.severity) {
        case "high":
          score += 15;
          break;
        case "medium":
          score += 10;
          break;
        case "low":
          score += 5;
          break;
      }
    });

    if (aiAnalysis?.overallRisk) {
      score += aiAnalysis.overallRisk * 0.5; // Weight AI analysis
    }

    return Math.min(score, 100);
  }

  generatePrivacyRecommendations(concerns) {
    const recommendations = [];

    if (concerns.some((c) => c.keyword.includes("data sharing"))) {
      recommendations.push(
        "Review what personal data is being shared and with whom"
      );
    }

    if (concerns.some((c) => c.keyword.includes("cookies"))) {
      recommendations.push("Check cookie settings and opt-out options");
    }

    if (concerns.some((c) => c.keyword.includes("tracking"))) {
      recommendations.push("Consider using privacy-focused browser settings");
    }

    return recommendations;
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { HuggingFaceAnalyzer, PrivacyPolicyAnalyzer };
}

// Global instance with pre-configured API key for easy use
// Note: API keys should be stored securely in Chrome storage, not hardcoded
const hfAnalyzer = new HuggingFaceAnalyzer();
const privacyAnalyzer = new PrivacyPolicyAnalyzer();

// Convenience functions for popup.js integration
async function analyzeWithHuggingFace(text) {
  try {
    // Get API key from Chrome storage - SECURE approach
    const settings = await chrome.storage.sync.get(["hfApiKey", "enableHF"]);

    if (!settings.enableHF || !settings.hfApiKey) {
      console.log("Hugging Face analysis disabled or API key not configured");
      return { error: "Hugging Face integration not configured" };
    }

    const analyzer = new HuggingFaceAnalyzer(settings.hfApiKey);

    // Try multiple analysis approaches
    const results = {
      classification: null,
      summary: null,
      privacyRisks: null,
      error: null,
    };

    try {
      // Legal text classification
      results.classification = await analyzer.classifyLegalText(text);
    } catch (error) {
      console.warn("HF Classification failed:", error.message);
    }

    try {
      // Text summarization
      results.summary = await analyzer.summarizeLegalText(text);
    } catch (error) {
      console.warn("HF Summarization failed:", error.message);
    }

    try {
      // Privacy risk detection
      results.privacyRisks = await analyzer.detectPrivacyRisks(text);
    } catch (error) {
      console.warn("HF Privacy analysis failed:", error.message);
    }

    return results;
  } catch (error) {
    console.error("Hugging Face analysis failed:", error);
    return { error: error.message };
  }
}

async function analyzePrivacyPolicyWithHF(text) {
  try {
    // Get API key from Chrome storage - SECURE approach
    const settings = await chrome.storage.sync.get(["hfApiKey", "enableHF"]);

    if (!settings.enableHF || !settings.hfApiKey) {
      return { error: "Hugging Face integration not configured" };
    }

    const analyzer = new PrivacyPolicyAnalyzer(settings.hfApiKey);
    return await analyzer.analyzePrivacyPolicy(text);
  } catch (error) {
    console.error("Privacy policy analysis failed:", error);
    return { error: error.message };
  }
}
