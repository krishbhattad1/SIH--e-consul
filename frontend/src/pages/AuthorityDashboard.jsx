import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import GovernmentHeader from "../components/GovernmentHeader";
import "./AuthorityDashboard.css";

const consultationRules = [
  { id: "ev-adoption", key: "rule1" },
  { id: "charging", key: "rule2" },
  { id: "incentives", key: "rule3" },
  { id: "battery", key: "rule4" },
  { id: "public-transport", key: "rule5" },
  { id: "general", key: "generalOther" },
];

const DEMO_FEEDBACK = [
  {
    id: "EC-1001",
    name: "Citizen 01",
    ruleId: "ev-adoption",
    opinion: "support",
    language: "English",
    date: "10 September 2026",
    feedback:
      "The policy can accelerate electric vehicle adoption and reduce pollution. Clear incentives will help more citizens move to electric vehicles.",
  },
  {
    id: "EC-1002",
    name: "Citizen 02",
    ruleId: "ev-adoption",
    opinion: "concern",
    language: "English",
    date: "11 September 2026",
    feedback:
      "The policy is useful, but the purchase cost is still high for ordinary families. Financial support should be easier to access.",
  },
  {
    id: "EC-1003",
    name: "Citizen 03",
    ruleId: "charging",
    opinion: "support",
    language: "Hindi",
    date: "12 September 2026",
    feedback:
      "चार्जिंग स्टेशन बढ़ाने से इलेक्ट्रिक वाहन अपनाने में मदद मिलेगी। शहरों के साथ ग्रामीण क्षेत्रों में भी सुविधा होनी चाहिए।",
  },
  {
    id: "EC-1004",
    name: "Citizen 04",
    ruleId: "charging",
    opinion: "concern",
    language: "English",
    date: "13 September 2026",
    feedback:
      "Charging infrastructure is not yet reliable in smaller towns. The policy should define clear standards for availability and maintenance.",
  },
  {
    id: "EC-1005",
    name: "Citizen 05",
    ruleId: "incentives",
    opinion: "neutral",
    language: "Marathi",
    date: "14 September 2026",
    feedback:
      "The proposed subsidy is helpful, but the eligibility rules need more clarity before implementation.",
  },
  {
    id: "EC-1006",
    name: "Citizen 06",
    ruleId: "incentives",
    opinion: "support",
    language: "English",
    date: "15 September 2026",
    feedback:
      "The incentives can make electric vehicles more affordable and encourage faster adoption.",
  },
  {
    id: "EC-1007",
    name: "Citizen 07",
    ruleId: "battery",
    opinion: "support",
    language: "English",
    date: "16 September 2026",
    feedback:
      "Domestic battery manufacturing will strengthen the supply chain and create skilled employment opportunities.",
  },
  {
    id: "EC-1008",
    name: "Citizen 08",
    ruleId: "battery",
    opinion: "concern",
    language: "English",
    date: "17 September 2026",
    feedback:
      "Battery manufacturing standards should include strong safety, recycling and data reporting requirements.",
  },
  {
    id: "EC-1009",
    name: "Citizen 09",
    ruleId: "public-transport",
    opinion: "support",
    language: "Hindi",
    date: "18 September 2026",
    feedback:
      "सार्वजनिक परिवहन का विद्युतीकरण शहरों में प्रदूषण कम कर सकता है और यात्रियों को बेहतर सेवा दे सकता है।",
  },
  {
    id: "EC-1010",
    name: "Citizen 10",
    ruleId: "public-transport",
    opinion: "neutral",
    language: "English",
    date: "19 September 2026",
    feedback:
      "Electric buses are promising, but the implementation timeline and maintenance responsibilities should be clearly defined.",
  },
  {
    id: "EC-1011",
    name: "Citizen 11",
    ruleId: "general",
    opinion: "support",
    language: "English",
    date: "20 September 2026",
    feedback:
      "The overall direction of the policy is positive and supports cleaner mobility across the country.",
  },
  {
    id: "EC-1012",
    name: "Citizen 12",
    ruleId: "general",
    opinion: "concern",
    language: "English",
    date: "21 September 2026",
    feedback:
      "Implementation should be transparent, with clear monitoring, reporting and accountability for all departments.",
  },
  {
    id: "EC-1013",
    name: "Citizen 13",
    ruleId: "ev-adoption",
    opinion: "neutral",
    language: "English",
    date: "22 September 2026",
    feedback:
      "The objectives are clear, but more information is needed about the long term cost and expected benefits.",
  },
  {
    id: "EC-1014",
    name: "Citizen 14",
    ruleId: "charging",
    opinion: "support",
    language: "English",
    date: "23 September 2026",
    feedback:
      "A national charging network with common technical standards would make electric vehicle ownership easier.",
  },
  {
    id: "EC-1015",
    name: "Citizen 15",
    ruleId: "charging",
    opinion: "concern",
    language: "English",
    date: "24 September 2026",
    feedback:
      "Charging prices should remain affordable. High operating costs could discourage public adoption.",
  },
  {
    id: "EC-1016",
    name: "Citizen 16",
    ruleId: "incentives",
    opinion: "support",
    language: "English",
    date: "25 September 2026",
    feedback:
      "Simple and transparent incentives will encourage consumers and small businesses to adopt electric vehicles.",
  },
  {
    id: "EC-1017",
    name: "Citizen 17",
    ruleId: "battery",
    opinion: "neutral",
    language: "English",
    date: "26 September 2026",
    feedback:
      "Battery recycling should be addressed clearly so that growth in manufacturing does not create future waste problems.",
  },
  {
    id: "EC-1018",
    name: "Citizen 18",
    ruleId: "battery",
    opinion: "concern",
    language: "Hindi",
    date: "27 September 2026",
    feedback:
      "बैटरी की सुरक्षा, पुनर्चक्रण और निपटान के लिए स्पष्ट नियम जरूरी हैं।",
  },
  {
    id: "EC-1019",
    name: "Citizen 19",
    ruleId: "public-transport",
    opinion: "support",
    language: "English",
    date: "28 September 2026",
    feedback:
      "Electric public transport can improve air quality and reduce operating emissions in major cities.",
  },
  {
    id: "EC-1020",
    name: "Citizen 20",
    ruleId: "public-transport",
    opinion: "concern",
    language: "English",
    date: "29 September 2026",
    feedback:
      "Authorities should publish clear maintenance standards and performance reports for electric bus fleets.",
  },
];

const WORD_STOP_LIST = new Set([
  "the",
  "and",
  "for",
  "that",
  "with",
  "this",
  "from",
  "should",
  "will",
  "are",
  "can",
  "more",
  "than",
  "into",
  "have",
  "has",
  "their",
  "they",
  "not",
  "but",
  "all",
  "our",
  "about",
  "been",
  "being",
  "would",
  "could",
  "also",
  "need",
  "help",
  "make",
  "made",
  "its",
  "too",
  "very",
  "only",
  "citizen",
  "citizens",
  "policy",
  "proposed",
  "electric",
  "vehicle",
  "vehicles",
]);

const UI = {
  en: {
    positive: "Positive",
    negative: "Negative",
    neutral: "Neutral",
    total: "Total responses",
    positiveCount: "Positive",
    neutralCount: "Neutral",
    negativeCount: "Negative",
    sentimentDistribution: "Sentiment distribution",
    sentimentTrend: "Sentiment trend",
    wordFrequency: "Most frequent topics",
    wordCloud: "Word cloud",
    aiInsights: "AI-generated insights",
    aiSummary: "Executive summary",
    keyThemes: "Key themes",
    actionable: "Actionable observations",
    feedbackAnalysis: "Citizen feedback analysis",
    comment: "Comment",
    aiSummaryColumn: "AI summary",
    date: "Date",
    clear: "Clear",
    allSentiments: "All sentiments",
    consultationFilter: "Consultation",
    allConsultations: "All consultations",
    searchPlaceholder:
      "Search comments, names or reference numbers...",
    noData: "No feedback available yet",
    noDataText:
      "Submit feedback through the public portal to populate this analysis.",
    sampleDataNote:
      "Demonstration dataset shown for presentation",
    liveDataNote:
      "Analysis updates from submitted portal feedback",
    positiveSummary:
      "Positive responses are generally supportive of the policy direction and expected mobility benefits.",
    neutralSummary:
      "Neutral responses commonly request more clarity on eligibility, timelines and implementation.",
    negativeSummary:
      "Concerns frequently focus on affordability, infrastructure reliability, safety, maintenance and compliance.",
    topicCompliance: "Implementation",
    topicCost: "Cost",
    topicInfrastructure: "Infrastructure",
    topicSafety: "Safety",
    topicPrivacy: "Transparency",
    insight1:
      "Stakeholders are broadly supportive of cleaner mobility and wider electric vehicle adoption.",
    insight2:
      "Recurring concerns relate to affordability, charging availability and implementation clarity.",
    insight3:
      "Authorities should publish clear standards, timelines and monitoring responsibilities.",
    generatedFrom:
      "Generated from current consultation feedback",
    filters: "Analysis filters",
    reset: "Reset filters",
    allRules: "All policy sections",
    policySection: "Policy section",
    languageFilter: "Language",
    allLanguages: "All languages",
    viewFeedback: "View feedback",
    responses: "responses",
    response: "response",
    back: "Back to sections",
    reference: "Reference",
    submitted: "Submitted",
    support: "Positive",
    concern: "Negative",
    rule1: "Electric Vehicle Adoption",
    rule2: "Charging Infrastructure",
    rule3: "Purchase Incentives",
    rule4: "Battery Manufacturing",
    rule5: "Public Transport Electrification",
    generalOther: "General / Other",
  },

  hi: {
    positive: "सकारात्मक",
    negative: "नकारात्मक",
    neutral: "तटस्थ",
    total: "कुल प्रतिक्रियाएँ",
    positiveCount: "सकारात्मक",
    neutralCount: "तटस्थ",
    negativeCount: "नकारात्मक",
    sentimentDistribution: "भावना वितरण",
    sentimentTrend: "भावना रुझान",
    wordFrequency: "सबसे अधिक दोहराए गए विषय",
    wordCloud: "शब्द क्लाउड",
    aiInsights: "एआई द्वारा तैयार मुख्य निष्कर्ष",
    aiSummary: "कार्यकारी सारांश",
    keyThemes: "मुख्य विषय",
    actionable: "कार्रवाई योग्य अवलोकन",
    feedbackAnalysis: "नागरिक प्रतिक्रिया विश्लेषण",
    comment: "टिप्पणी",
    aiSummaryColumn: "एआई सारांश",
    date: "तिथि",
    clear: "साफ करें",
    allSentiments: "सभी भावनाएँ",
    consultationFilter: "परामर्श",
    allConsultations: "सभी परामर्श",
    searchPlaceholder:
      "टिप्पणी, नाम या संदर्भ संख्या खोजें...",
    noData: "अभी कोई प्रतिक्रिया उपलब्ध नहीं है",
    noDataText:
      "इस विश्लेषण को भरने के लिए सार्वजनिक पोर्टल से प्रतिक्रिया जमा करें।",
    sampleDataNote:
      "प्रस्तुति के लिए प्रदर्शित प्रदर्शन डेटा",
    liveDataNote:
      "विश्लेषण पोर्टल से जमा की गई प्रतिक्रियाओं के अनुसार अपडेट होता है",
    positiveSummary:
      "सकारात्मक प्रतिक्रियाएँ सामान्यतः नीति की दिशा और स्वच्छ परिवहन के लाभों का समर्थन करती हैं।",
    neutralSummary:
      "तटस्थ प्रतिक्रियाओं में पात्रता, समयसीमा और कार्यान्वयन के बारे में अधिक स्पष्टता की मांग की गई है।",
    negativeSummary:
      "मुख्य चिंताएँ वहनीयता, चार्जिंग अवसंरचना, सुरक्षा, रखरखाव और अनुपालन से संबंधित हैं।",
    topicCompliance: "कार्यान्वयन",
    topicCost: "लागत",
    topicInfrastructure: "अवसंरचना",
    topicSafety: "सुरक्षा",
    topicPrivacy: "पारदर्शिता",
    insight1:
      "हितधारक स्वच्छ परिवहन और इलेक्ट्रिक वाहनों को व्यापक रूप से अपनाने का समर्थन करते हैं।",
    insight2:
      "बार-बार सामने आने वाली चिंताएँ वहनीयता, चार्जिंग उपलब्धता और कार्यान्वयन की स्पष्टता से संबंधित हैं।",
    insight3:
      "प्राधिकरणों को स्पष्ट मानक, समयसीमा और निगरानी की जिम्मेदारियाँ प्रकाशित करनी चाहिए।",
    generatedFrom:
      "वर्तमान परामर्श प्रतिक्रियाओं से तैयार",
    filters: "विश्लेषण फ़िल्टर",
    reset: "फ़िल्टर रीसेट करें",
    allRules: "सभी नीति अनुभाग",
    policySection: "नीति अनुभाग",
    languageFilter: "भाषा",
    allLanguages: "सभी भाषाएँ",
    viewFeedback: "प्रतिक्रिया देखें",
    responses: "प्रतिक्रियाएँ",
    response: "प्रतिक्रिया",
    back: "अनुभागों पर वापस जाएँ",
    reference: "संदर्भ",
    submitted: "जमा किया गया",
    support: "सकारात्मक",
    concern: "नकारात्मक",
    rule1: "इलेक्ट्रिक वाहन अपनाना",
    rule2: "चार्जिंग अवसंरचना",
    rule3: "खरीद प्रोत्साहन",
    rule4: "बैटरी निर्माण",
    rule5: "सार्वजनिक परिवहन विद्युतीकरण",
    generalOther: "सामान्य / अन्य",
  },
};

function parseDate(dateString) {
  const parsed = new Date(dateString);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function getSentiment(feedback) {
  const positiveWords = [
    "support",
    "positive",
    "useful",
    "improve",
    "benefit",
    "affordable",
    "encourage",
    "cleaner",
    "strengthen",
    "promising",
    "easier",
    "good",
    "reduce",
    "better",
  ];

  const negativeWords = [
    "concern",
    "high",
    "difficult",
    "problem",
    "unreliable",
    "risk",
    "safety",
    "cost",
    "expensive",
    "unclear",
    "poor",
    "discourage",
    "waste",
    "issue",
    "lack",
  ];

  const text = feedback.toLowerCase();

  const positiveScore = positiveWords.reduce(
    (score, word) =>
      score + (text.includes(word) ? 1 : 0),
    0,
  );

  const negativeScore = negativeWords.reduce(
    (score, word) =>
      score + (text.includes(word) ? 1 : 0),
    0,
  );

  if (positiveScore > negativeScore) {
    return "support";
  }

  if (negativeScore > positiveScore) {
    return "concern";
  }

  return "neutral";
}

function generateSummary(feedback, language) {
  const text = feedback.toLowerCase();

  if (
    text.includes("charging") ||
    text.includes("चार्जिंग")
  ) {
    return language === "hi"
      ? "चार्जिंग अवसंरचना की उपलब्धता और विश्वसनीयता पर ध्यान देने की आवश्यकता है।"
      : "The response highlights the need for reliable and accessible charging infrastructure.";
  }

  if (
    text.includes("cost") ||
    text.includes("price") ||
    text.includes("afford") ||
    text.includes("लागत")
  ) {
    return language === "hi"
      ? "प्रतिक्रिया में लागत और वहनीयता को प्रमुख चिंता बताया गया है।"
      : "The response identifies cost and affordability as major concerns.";
  }

  if (
    text.includes("battery") ||
    text.includes("recycling") ||
    text.includes("बैटरी")
  ) {
    return language === "hi"
      ? "बैटरी सुरक्षा, निर्माण और पुनर्चक्रण को स्पष्ट रूप से संबोधित करने की आवश्यकता है।"
      : "The response emphasizes battery safety, manufacturing and recycling requirements.";
  }

  if (
    text.includes("public transport") ||
    text.includes("सार्वजनिक परिवहन")
  ) {
    return language === "hi"
      ? "प्रतिक्रिया सार्वजनिक परिवहन के विद्युतीकरण और बेहतर सेवा पर केंद्रित है।"
      : "The response focuses on electrifying public transport and improving service.";
  }

  if (
    text.includes("implementation") ||
    text.includes("monitoring") ||
    text.includes("accountability")
  ) {
    return language === "hi"
      ? "प्रतिक्रिया स्पष्ट कार्यान्वयन, निगरानी और जवाबदेही की मांग करती है।"
      : "The response requests clearer implementation, monitoring and accountability.";
  }

  return language === "hi"
    ? "प्रतिक्रिया नीति के प्रभाव और कार्यान्वयन पर नागरिक का दृष्टिकोण प्रस्तुत करती है।"
    : "The response provides a citizen perspective on the policy and its implementation.";
}

function AuthorityDashboard() {
  const navigate = useNavigate();

  // FIX:
  // No LanguageContext dependency.
  // Language is managed directly inside this dashboard.
  const [language, setLanguage] = useState("en");

  const t = UI[language] || UI.en;

  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [sentimentFilter, setSentimentFilter] =
    useState("all");
  const [ruleFilter, setRuleFilter] =
    useState("all");
  const [languageFilter, setLanguageFilter] =
    useState("all");

  const [portalFeedback, setPortalFeedback] =
    useState([]);

  useEffect(() => {
    try {
      const savedFeedback = JSON.parse(
        localStorage.getItem("consultationFeedback") ||
          "[]",
      );

      if (Array.isArray(savedFeedback)) {
        setPortalFeedback(savedFeedback);
      }
    } catch {
      setPortalFeedback([]);
    }
  }, []);

  const hasLiveData = portalFeedback.length > 0;

  const feedbackData = useMemo(() => {
    if (!hasLiveData) {
      return DEMO_FEEDBACK;
    }

    return portalFeedback.map((item, index) => {
      const feedbackText =
        item.feedback ||
        item.comment ||
        item.message ||
        "";

      const opinion =
        item.opinion ||
        getSentiment(feedbackText);

      return {
        id:
          item.id ||
          item.reference ||
          `LIVE-${index + 1}`,
        name: item.name || "Citizen",
        ruleId: item.ruleId || "general",
        opinion,
        language: item.language || "English",
        date:
          item.date ||
          item.submittedAt ||
          new Date().toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            },
          ),
        feedback: feedbackText,
      };
    });
  }, [hasLiveData, portalFeedback]);

  const filteredFeedback = useMemo(() => {
    const query = search.trim().toLowerCase();

    return feedbackData.filter((item) => {
      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.feedback.toLowerCase().includes(query);

      const matchesSentiment =
        sentimentFilter === "all" ||
        item.opinion === sentimentFilter;

      const matchesRule =
        ruleFilter === "all" ||
        item.ruleId === ruleFilter;

      const matchesLanguage =
        languageFilter === "all" ||
        item.language === languageFilter;

      return (
        matchesSearch &&
        matchesSentiment &&
        matchesRule &&
        matchesLanguage
      );
    });
  }, [
    feedbackData,
    search,
    sentimentFilter,
    ruleFilter,
    languageFilter,
  ]);

  const sentimentCounts = useMemo(() => {
    return {
      support: filteredFeedback.filter(
        (item) => item.opinion === "support",
      ).length,

      neutral: filteredFeedback.filter(
        (item) => item.opinion === "neutral",
      ).length,

      concern: filteredFeedback.filter(
        (item) => item.opinion === "concern",
      ).length,
    };
  }, [filteredFeedback]);

  const totalResponses = filteredFeedback.length;

  const percentages = useMemo(() => {
    if (!totalResponses) {
      return {
        support: 0,
        neutral: 0,
        concern: 0,
      };
    }

    return {
      support: Math.round(
        (sentimentCounts.support / totalResponses) *
          100,
      ),

      neutral: Math.round(
        (sentimentCounts.neutral / totalResponses) *
          100,
      ),

      concern: Math.round(
        (sentimentCounts.concern / totalResponses) *
          100,
      ),
    };
  }, [sentimentCounts, totalResponses]);

  const wordFrequency = useMemo(() => {
    const frequencies = {};

    filteredFeedback.forEach((item) => {
      const words = item.feedback
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .split(/\s+/)
        .filter(Boolean);

      words.forEach((word) => {
        if (
          word.length < 4 ||
          WORD_STOP_LIST.has(word)
        ) {
          return;
        }

        frequencies[word] =
          (frequencies[word] || 0) + 1;
      });
    });

    return Object.entries(frequencies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [filteredFeedback]);

  const maxWordFrequency = wordFrequency.length
    ? Math.max(
        ...wordFrequency.map(
          ([, count]) => count,
        ),
      )
    : 1;

  const themes = useMemo(() => {
    const getCount = (keywords) =>
      filteredFeedback.filter((item) =>
        keywords.some((keyword) =>
          item.feedback
            .toLowerCase()
            .includes(keyword),
        ),
      ).length;

    return [
      {
        label: t.topicInfrastructure,
        count: getCount([
          "charging",
          "infrastructure",
          "station",
          "network",
          "अवसंरचना",
          "चार्जिंग",
        ]),
      },
      {
        label: t.topicCost,
        count: getCount([
          "cost",
          "price",
          "afford",
          "subsidy",
          "लागत",
          "कीमत",
        ]),
      },
      {
        label: t.topicSafety,
        count: getCount([
          "safety",
          "recycling",
          "maintenance",
          "security",
          "सुरक्षा",
          "पुनर्चक्रण",
        ]),
      },
      {
        label: t.topicCompliance,
        count: getCount([
          "implementation",
          "standards",
          "monitoring",
          "accountability",
          "timeline",
          "नियम",
        ]),
      },
    ].map((theme) => ({
      ...theme,
      percentage: totalResponses
        ? Math.round(
            (theme.count / totalResponses) *
              100,
          )
        : 0,
    }));
  }, [filteredFeedback, t, totalResponses]);

  const maxThemePercentage = Math.max(
    ...themes.map(
      (theme) => theme.percentage,
    ),
    1,
  );

  const dates = useMemo(() => {
    const grouped = {};

    filteredFeedback.forEach((item) => {
      const date = parseDate(item.date);

      const key = date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        },
      );

      if (!grouped[key]) {
        grouped[key] = {
          date: key,
          support: 0,
          neutral: 0,
          concern: 0,
        };
      }

      grouped[key][item.opinion] += 1;
    });

    return Object.values(grouped).slice(-8);
  }, [filteredFeedback]);

  const chartMax = Math.max(
    ...dates.flatMap((item) => [
      item.support,
      item.neutral,
      item.concern,
    ]),
    1,
  );

  const donutSegments = useMemo(() => {
    const values = [
      {
        key: "support",
        value: sentimentCounts.support,
        color: "#2e7d32",
      },
      {
        key: "neutral",
        value: sentimentCounts.neutral,
        color: "#c58b00",
      },
      {
        key: "concern",
        value: sentimentCounts.concern,
        color: "#b3261e",
      },
    ];

    let cumulative = 0;

    return values.map((segment) => {
      const percentage = totalResponses
        ? segment.value / totalResponses
        : 0;

      const start = cumulative;
      cumulative += percentage;

      return {
        ...segment,
        start,
        percentage,
      };
    });
  }, [sentimentCounts, totalResponses]);

  const getRuleLabel = (ruleId) => {
    const rule = consultationRules.find(
      (item) => item.id === ruleId,
    );

    return rule ? t[rule.key] : t.generalOther;
  };

  const resetFilters = () => {
    setSearch("");
    setSentimentFilter("all");
    setRuleFilter("all");
    setLanguageFilter("all");
  };

  const renderDonutSegment = (
    segment,
    index,
  ) => {
    if (segment.value === 0) {
      return null;
    }

    const radius = 75;
    const center = 100;
    const circumference =
      2 * Math.PI * radius;

    const dash =
      segment.percentage * circumference;

    const gap = 2;

    return (
      <circle
        key={segment.key}
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={segment.color}
        strokeWidth="25"
        strokeDasharray={`${Math.max(
          dash - gap,
          0,
        )} ${circumference}`}
        strokeDashoffset={
          -segment.start * circumference
        }
        transform="rotate(-90 100 100)"
      />
    );
  };

  return (
    <>
      <GovernmentHeader />

      <div className="authority-layout">
        <aside className="authority-sidebar">
          <div className="authority-user">
            <div className="authority-user-mark">
              A
            </div>

            <div>
              <strong>
                {language === "hi"
                  ? "प्राधिकरण उपयोगकर्ता"
                  : "Authority User"}
              </strong>

              <span>
                {language === "hi"
                  ? "भारी उद्योग मंत्रालय"
                  : "Ministry of Heavy Industries"}
              </span>
            </div>
          </div>

          <nav className="authority-navigation">
            <button
              type="button"
              className={
                activeTab === "dashboard"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("dashboard")
              }
            >
              {language === "hi"
                ? "डैशबोर्ड"
                : "Dashboard"}
            </button>

            <button
              type="button"
              className={
                activeTab === "consultations"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("consultations")
              }
            >
              {language === "hi"
                ? "परामर्श"
                : "Consultations"}
            </button>

            <button
              type="button"
              className={
                activeTab === "feedback"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("feedback")
              }
            >
              {language === "hi"
                ? "प्रतिक्रिया"
                : "Feedback"}
            </button>

            <button
              type="button"
              className={
                activeTab === "analysis"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("analysis")
              }
            >
              {language === "hi"
                ? "विश्लेषण"
                : "Analysis"}
            </button>

            <button
              type="button"
              className={
                activeTab === "reports"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("reports")
              }
            >
              {language === "hi"
                ? "रिपोर्ट"
                : "Reports"}
            </button>
          </nav>

          <button
            type="button"
            className="public-portal-link"
            onClick={() => navigate("/")}
          >
            ←{" "}
            {language === "hi"
              ? "सार्वजनिक पोर्टल"
              : "Public Portal"}
          </button>
        </aside>

        <main className="authority-main">
          <div className="authority-heading">
            <div>
              <div className="authority-breadcrumb">
                {language === "hi"
                  ? "प्राधिकरण पोर्टल / प्रतिक्रिया / विश्लेषण"
                  : "Authority Portal / Feedback / Analysis"}
              </div>

              <h1>
                {language === "hi"
                  ? "ई-परामर्श प्रतिक्रिया विश्लेषण"
                  : "e-Consultation Feedback Analysis"}
              </h1>

              <p>
                {language === "hi"
                  ? "नागरिक प्रतिक्रियाओं को भावना, विषय और कार्रवाई योग्य निष्कर्षों में बदलें।"
                  : "Transform citizen feedback into sentiment, themes and actionable insights."}
              </p>
            </div>

            <div className="heading-actions">
              <span className="status-badge">
                ●{" "}
                {language === "hi"
                  ? "विश्लेषण सक्रिय"
                  : "Analysis Active"}
              </span>

              <span className="data-status">
                {hasLiveData
                  ? t.liveDataNote
                  : t.sampleDataNote}
              </span>

              <button
                type="button"
                className="language-toggle"
                onClick={() =>
                  setLanguage((current) =>
                    current === "en"
                      ? "hi"
                      : "en",
                  )
                }
                aria-label={
                  language === "en"
                    ? "Switch dashboard to Hindi"
                    : "डैशबोर्ड को अंग्रेज़ी में बदलें"
                }
              >
                {language === "en"
                  ? "हिंदी"
                  : "English"}
              </button>
            </div>
          </div>

          <section className="policy-banner">
            <div>
              <span className="policy-label">
                {language === "hi"
                  ? "वर्तमान परामर्श"
                  : "CURRENT CONSULTATION"}
              </span>

              <h2>
                {language === "hi"
                  ? "मसौदा इलेक्ट्रिक वाहन नीति 2027"
                  : "Draft Electric Vehicle Policy 2027"}
              </h2>

              <p>
                {language === "hi"
                  ? "भारी उद्योग मंत्रालय"
                  : "Ministry of Heavy Industries"}
              </p>
            </div>

            <div className="policy-date">
              <span>
                {language === "hi"
                  ? "अंतिम तिथि"
                  : "Closing date"}
              </span>

              <strong>
                30 September 2026
              </strong>
            </div>
          </section>

          <section className="filters-panel">
            <div className="filters-heading">
              <div>
                <h2>{t.filters}</h2>

                <p>
                  {language === "hi"
                    ? "डैशबोर्ड डेटा को फ़िल्टर करें"
                    : "Filter dashboard data"}
                </p>
              </div>

              <button
                type="button"
                className="reset-button"
                onClick={resetFilters}
              >
                {t.reset}
              </button>
            </div>

            <div className="filter-grid">
              <div className="filter-field filter-wide">
                <label htmlFor="feedback-search">
                  {language === "hi"
                    ? "खोज"
                    : "Search"}
                </label>

                <input
                  id="feedback-search"
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder={
                    t.searchPlaceholder
                  }
                />
              </div>

              <div className="filter-field">
                <label htmlFor="sentiment-filter">
                  {language === "hi"
                    ? "भावना"
                    : "Sentiment"}
                </label>

                <select
                  id="sentiment-filter"
                  value={sentimentFilter}
                  onChange={(event) =>
                    setSentimentFilter(
                      event.target.value,
                    )
                  }
                >
                  <option value="all">
                    {t.allSentiments}
                  </option>

                  <option value="support">
                    {t.positive}
                  </option>

                  <option value="neutral">
                    {t.neutral}
                  </option>

                  <option value="concern">
                    {t.negative}
                  </option>
                </select>
              </div>

              <div className="filter-field">
                <label htmlFor="rule-filter">
                  {t.policySection}
                </label>

                <select
                  id="rule-filter"
                  value={ruleFilter}
                  onChange={(event) =>
                    setRuleFilter(
                      event.target.value,
                    )
                  }
                >
                  <option value="all">
                    {t.allRules}
                  </option>

                  {consultationRules.map(
                    (rule) => (
                      <option
                        key={rule.id}
                        value={rule.id}
                      >
                        {t[rule.key]}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className="filter-field">
                <label htmlFor="language-filter">
                  {t.languageFilter}
                </label>

                <select
                  id="language-filter"
                  value={languageFilter}
                  onChange={(event) =>
                    setLanguageFilter(
                      event.target.value,
                    )
                  }
                >
                  <option value="all">
                    {t.allLanguages}
                  </option>

                  <option value="English">
                    English
                  </option>

                  <option value="Hindi">
                    हिंदी
                  </option>

                  <option value="Marathi">
                    मराठी
                  </option>
                </select>
              </div>
            </div>
          </section>

          <div className="analysis-context">
            <span>
              {language === "hi"
                ? `${totalResponses} प्रतिक्रियाओं का विश्लेषण किया जा रहा है`
                : `Analysing ${totalResponses} feedback responses`}
            </span>

            <span>
              {hasLiveData
                ? t.liveDataNote
                : t.sampleDataNote}
            </span>
          </div>

          <section className="feedback-summary">
            <article className="summary-item">
              <span>{t.total}</span>
              <strong>{totalResponses}</strong>
            </article>

            <article className="summary-item positive-card">
              <span>
                {t.positiveCount}
              </span>

              <strong>
                {sentimentCounts.support}
              </strong>
            </article>

            <article className="summary-item neutral-card">
              <span>
                {t.neutralCount}
              </span>

              <strong>
                {sentimentCounts.neutral}
              </strong>
            </article>

            <article className="summary-item negative-card">
              <span>
                {t.negativeCount}
              </span>

              <strong>
                {sentimentCounts.concern}
              </strong>
            </article>
          </section>

          <section className="analytics-grid">
            <article className="analytics-card">
              <div className="card-heading">
                <h2>
                  {t.sentimentDistribution}
                </h2>

                <p>
                  {language === "hi"
                    ? "वर्तमान फ़िल्टर के अनुसार"
                    : "Based on current filters"}
                </p>
              </div>

              {totalResponses ? (
                <div className="chart-with-legend">
                  <div className="donut-wrap">
                    <svg
                      viewBox="0 0 200 200"
                      className="donut-chart"
                      role="img"
                      aria-label={
                        t.sentimentDistribution
                      }
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="75"
                        fill="none"
                        stroke="#e8edf1"
                        strokeWidth="25"
                      />

                      {donutSegments.map(
                        renderDonutSegment,
                      )}

                      <text
                        x="100"
                        y="96"
                        textAnchor="middle"
                        className="donut-total"
                      >
                        {totalResponses}
                      </text>

                      <text
                        x="100"
                        y="114"
                        textAnchor="middle"
                        className="donut-label"
                      >
                        {language === "hi"
                          ? "प्रतिक्रियाएँ"
                          : "responses"}
                      </text>
                    </svg>
                  </div>

                  <div className="chart-legend">
                    <div className="legend-row">
                      <i
                        className="legend-dot"
                        style={{
                          background:
                            "#2e7d32",
                        }}
                      />

                      <span>
                        {t.positive}
                      </span>

                      <strong>
                        {percentages.support}%
                      </strong>
                    </div>

                    <div className="legend-row">
                      <i
                        className="legend-dot"
                        style={{
                          background:
                            "#c58b00",
                        }}
                      />

                      <span>
                        {t.neutral}
                      </span>

                      <strong>
                        {percentages.neutral}%
                      </strong>
                    </div>

                    <div className="legend-row">
                      <i
                        className="legend-dot"
                        style={{
                          background:
                            "#b3261e",
                        }}
                      />

                      <span>
                        {t.negative}
                      </span>

                      <strong>
                        {percentages.concern}%
                      </strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-chart">
                  {t.noData}
                </div>
              )}
            </article>

            <article className="analytics-card trend-card">
              <div className="card-heading">
                <h2>
                  {t.sentimentTrend}
                </h2>

                <p>
                  {language === "hi"
                    ? "तिथि के अनुसार प्रतिक्रियाएँ"
                    : "Responses over time"}
                </p>
              </div>

              {dates.length ? (
                <>
                  <div className="trend-chart-wrap">
                    <svg
                      viewBox="0 0 720 240"
                      className="trend-chart"
                    >
                      {[0, 1, 2, 3, 4].map(
                        (step) => {
                          const y =
                            30 + step * 40;

                          return (
                            <line
                              key={step}
                              x1="45"
                              y1={y}
                              x2="690"
                              y2={y}
                              stroke="#e2e7eb"
                              strokeWidth="1"
                            />
                          );
                        },
                      )}

                      {dates.map(
                        (item, index) => {
                          const x =
                            dates.length ===
                            1
                              ? 360
                              : 55 +
                                (index /
                                  (dates.length -
                                    1)) *
                                  625;

                          return (
                            <text
                              key={`label-${item.date}`}
                              x={x}
                              y="230"
                              textAnchor="middle"
                              className="axis-label"
                            >
                              {item.date}
                            </text>
                          );
                        },
                      )}

                      {[
                        {
                          key: "support",
                          color: "#2e7d32",
                        },
                        {
                          key: "neutral",
                          color: "#c58b00",
                        },
                        {
                          key: "concern",
                          color: "#b3261e",
                        },
                      ].map((series) => {
                        const points = dates
                          .map(
                            (
                              item,
                              index,
                            ) => {
                              const x =
                                dates.length ===
                                1
                                  ? 360
                                  : 55 +
                                    (index /
                                      (dates.length -
                                        1)) *
                                      625;

                              const y =
                                195 -
                                (item[
                                  series.key
                                ] /
                                  chartMax) *
                                  150;

                              return `${x},${y}`;
                            },
                          )
                          .join(" ");

                        return (
                          <g
                            key={series.key}
                          >
                            <polyline
                              points={points}
                              fill="none"
                              stroke={
                                series.color
                              }
                              strokeWidth="3"
                            />

                            {dates.map(
                              (
                                item,
                                index,
                              ) => {
                                const x =
                                  dates.length ===
                                  1
                                    ? 360
                                    : 55 +
                                      (index /
                                        (dates.length -
                                          1)) *
                                        625;

                                const y =
                                  195 -
                                  (item[
                                    series.key
                                  ] /
                                    chartMax) *
                                    150;

                                return (
                                  <circle
                                    key={`${series.key}-${index}`}
                                    cx={x}
                                    cy={y}
                                    r="4"
                                    fill={
                                      series.color
                                    }
                                  />
                                );
                              },
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="trend-legend">
                    <span>
                      <i className="positive-line" />
                      {t.positive}
                    </span>

                    <span>
                      <i className="neutral-line" />
                      {t.neutral}
                    </span>

                    <span>
                      <i className="negative-line" />
                      {t.negative}
                    </span>
                  </div>
                </>
              ) : (
                <div className="empty-chart">
                  {t.noData}
                </div>
              )}
            </article>

            <article className="analytics-card">
              <div className="card-heading">
                <h2>{t.wordFrequency}</h2>

                <p>
                  {language === "hi"
                    ? "बार-बार आने वाले शब्द"
                    : "Recurring terms in feedback"}
                </p>
              </div>

              <div className="word-bars">
                {wordFrequency.map(
                  ([word, count]) => (
                    <div
                      className="word-bar-row"
                      key={word}
                    >
                      <span>{word}</span>

                      <div className="word-bar-track">
                        <div
                          className="word-bar-fill"
                          style={{
                            width: `${
                              (count /
                                maxWordFrequency) *
                              100
                            }%`,
                          }}
                        />
                      </div>

                      <strong>
                        {count}
                      </strong>
                    </div>
                  ),
                )}
              </div>
            </article>

            <article className="analytics-card word-cloud-card">
              <div className="card-heading">
                <h2>{t.wordCloud}</h2>

                <p>
                  {language === "hi"
                    ? "प्रमुख शब्दों का दृश्य प्रतिनिधित्व"
                    : "Visual representation of recurring topics"}
                </p>
              </div>

              <div className="word-cloud">
                {wordFrequency.map(
                  ([word, count], index) => {
                    const size =
                      15 +
                      Math.min(
                        count * 4,
                        28,
                      );

                    return (
                      <span
                        key={word}
                        className={`cloud-word cloud-word-${
                          index % 5
                        }`}
                        style={{
                          fontSize: `${size}px`,
                        }}
                      >
                        {word}
                      </span>
                    );
                  },
                )}
              </div>
            </article>
          </section>

          <section className="insights-grid">
            <article className="insights-card">
              <div className="section-title">
                <div>
                  <h2>
                    {t.aiInsights}
                  </h2>

                  <p>
                    {t.generatedFrom}
                  </p>
                </div>

                <span className="ai-label">
                  AI
                </span>
              </div>

              <div className="executive-summary">
                <h3>
                  {t.aiSummary}
                </h3>

                <p>
                  {language === "hi"
                    ? "नागरिक प्रतिक्रियाओं में स्वच्छ परिवहन और इलेक्ट्रिक वाहन अपनाने के लिए सामान्य समर्थन दिखाई देता है। साथ ही, लागत, चार्जिंग अवसंरचना, सुरक्षा और स्पष्ट कार्यान्वयन से संबंधित बार-बार चिंताएँ सामने आती हैं।"
                    : "Citizen feedback shows broad support for cleaner mobility and wider electric vehicle adoption. At the same time, recurring concerns focus on affordability, charging infrastructure, safety and implementation clarity."}
                </p>
              </div>

              <h3 className="subsection-title">
                {t.actionable}
              </h3>

              <ul className="insight-list">
                <li>
                  <span>01</span>
                  <p>{t.insight1}</p>
                </li>

                <li>
                  <span>02</span>
                  <p>{t.insight2}</p>
                </li>

                <li>
                  <span>03</span>
                  <p>{t.insight3}</p>
                </li>
              </ul>
            </article>

            <article className="themes-card">
              <div className="section-title">
                <div>
                  <h2>{t.keyThemes}</h2>

                  <p>
                    {language === "hi"
                      ? "प्रतिक्रियाओं में पहचाने गए विषय"
                      : "Themes identified in responses"}
                  </p>
                </div>
              </div>

              <div className="theme-list">
                {themes.map((theme) => (
                  <div
                    className="theme-row"
                    key={theme.label}
                  >
                    <span>
                      {theme.label}
                    </span>

                    <div className="theme-track">
                      <div
                        className="theme-fill"
                        style={{
                          width: `${
                            (theme.percentage /
                              maxThemePercentage) *
                            100
                          }%`,
                        }}
                      />
                    </div>

                    <strong>
                      {theme.percentage}%
                    </strong>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="rule-section-block">
            <div className="section-title">
              <div>
                <h2>
                  {t.feedbackAnalysis}
                </h2>

                <p>
                  {filteredFeedback.length}{" "}
                  {filteredFeedback.length ===
                  1
                    ? t.response
                    : t.responses}
                </p>
              </div>
            </div>

            {filteredFeedback.length ? (
              <div className="feedback-table-wrap">
                <table className="feedback-table">
                  <thead>
                    <tr>
                      <th>
                        {t.reference}
                      </th>

                      <th>{t.date}</th>

                      <th>
                        {language === "hi"
                          ? "भावना"
                          : "Sentiment"}
                      </th>

                      <th>{t.comment}</th>

                      <th>
                        {t.aiSummaryColumn}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredFeedback.map(
                      (item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>
                              {item.id}
                            </strong>

                            <small>
                              {item.name}
                            </small>
                          </td>

                          <td>
                            {item.date}
                          </td>

                          <td>
                            <span
                              className={`opinion-badge ${item.opinion}`}
                            >
                              {item.opinion ===
                              "support"
                                ? t.positive
                                : item.opinion ===
                                    "concern"
                                  ? t.negative
                                  : t.neutral}
                            </span>
                          </td>

                          <td className="comment-cell">
                            {item.feedback}
                          </td>

                          <td className="summary-cell">
                            {generateSummary(
                              item.feedback,
                              language,
                            )}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="dashboard-no-results">
                <h3>{t.noData}</h3>
                <p>{t.noDataText}</p>
              </div>
            )}
          </section>

          <div className="dashboard-footnote">
            <span>
              e-Consultation Portal | Authority Analytics
            </span>

            <span>
              {hasLiveData
                ? t.liveDataNote
                : t.sampleDataNote}
            </span>
          </div>
        </main>
      </div>
    </>
  );
}

export default AuthorityDashboard;