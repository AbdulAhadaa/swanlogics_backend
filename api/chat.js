const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const domainFAQ = {
  "ui/ux": {
    keywords: ["ui", "ux", "design", "user interface", "user experience", "wireframe", "prototype"],
    responses: {
      general: "🎨 **UI/UX Design Services**\n• User Research & Wireframing\n• Visual Design & Prototyping\n• Usability Testing\n*Starting from $2k - Timeline: 2-4 weeks*",
      pricing: "💰 **UI/UX Pricing:**\n• Basic Design: $2k-5k\n• UX Research: $5k-10k\n• Enterprise: $10k+",
      process: "📋 **UI/UX Process:**\n1. Research & Wireframing\n2. Visual Design\n3. Prototyping & Testing"
    }
  },
  "branding": {
    keywords: ["brand", "logo", "identity", "branding", "visual identity"],
    responses: {
      general: "🏷️ **Branding Services**\n• Logo Design & Brand Identity\n• Brand Guidelines & Materials\n• Visual Identity System\n*Starting from $1.5k - Timeline: 1-3 weeks*",
      pricing: "💰 **Branding Pricing:**\n• Logo Only: $500-1.5k\n• Brand Identity: $2k-5k\n• Full Strategy: $5k-10k",
      deliverables: "📦 **You Get:**\n• Logo variations & colors\n• Typography & guidelines\n• Business materials"
    }
  },
  "marketing": {
    keywords: ["marketing", "digital marketing", "seo", "social media", "advertising"],
    responses: {
      general: "📈 **Marketing Services**\n• SEO & Digital Strategy\n• Social Media Management\n• Content Marketing\n*Starting from $1k/month - Ongoing*",
      pricing: "💰 **Marketing Pricing:**\n• SEO: $1k-3k/month\n• Social Media: $800-2k/month\n• Full Strategy: $2k-5k/month",
      strategy: "🎯 **Our Approach:**\n• Market & competitor analysis\n• Content planning & creation\n• Performance tracking"
    }
  },
  "web development": {
    keywords: ["web", "website", "development", "frontend", "backend", "fullstack"],
    responses: {
      general: "💻 **Web Development**\n• Custom Websites & E-commerce\n• Web Applications & CMS\n• Responsive & Fast Loading\n*Starting from $3k - Timeline: 2-8 weeks*",
      pricing: "💰 **Web Pricing:**\n• Landing Page: $1k-3k\n• Business Site: $3k-8k\n• E-commerce: $5k-15k\n• Web App: $10k+",
      technologies: "⚡ **Tech Stack:**\n• React, Next.js, Node.js\n• MongoDB, PostgreSQL\n• AWS, Vercel hosting"
    }
  },
  "mobile app": {
    keywords: ["mobile", "app", "ios", "android", "react native", "flutter"],
    responses: {
      general: "📱 **Mobile App Development**\n• iOS & Android Apps\n• Cross-platform Solutions\n• App Store Deployment\n*Starting from $8k - Timeline: 2-4 months*",
      pricing: "💰 **App Pricing:**\n• Simple App: $8k-15k\n• Complex App: $15k-30k\n• Enterprise: $30k+",
      platforms: "📲 **Platforms:**\n• Native iOS/Android\n• React Native & Flutter\n• Progressive Web Apps"
    }
  },
  "consulting": {
    keywords: ["consulting", "consultation", "advice", "strategy", "planning"],
    responses: {
      general: "🤝 **Consulting Services**\n• Technical Consulting & Planning\n• Architecture Review\n• Team Augmentation\n*Starting from $150/hour - Flexible*",
      pricing: "💰 **Consulting Rates:**\n• Hourly: $150-300/hour\n• Project: $2k-10k\n• Retainer: $3k-8k/month",
      expertise: "🎯 **Expertise:**\n• Technology Strategy\n• Digital Transformation\n• Process Optimization"
    }
  }
};

const generalFAQ = {
  pricing: "💰 Our projects usually start from $1k. Exact cost depends on your requirements and chosen service.",
  timeline: "⏳ We can deliver projects as fast as ASAP rush, or within 1-6 months depending on scope.",
  contact: "📞 You can reach us through the quotation form or schedule a proposal call.",
  services: "🚀 We offer UI/UX Design, Branding, Marketing, Web Development, Mobile Apps, and Consulting.",
};

function findDomainMatch(userMessage) {
  const lower = userMessage.toLowerCase();
  
  for (const [domain, data] of Object.entries(domainFAQ)) {
    if (data.keywords.some(keyword => lower.includes(keyword))) {
      if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
        return data.responses.pricing || data.responses.general;
      }
      if (lower.includes('process') || lower.includes('how')) {
        return data.responses.process || data.responses.general;
      }
      if (lower.includes('technology') || lower.includes('tech') || lower.includes('stack')) {
        return data.responses.technologies || data.responses.general;
      }
      if (lower.includes('deliverable') || lower.includes('what do i get')) {
        return data.responses.deliverables || data.responses.general;
      }
      
      return data.responses.general;
    }
  }
  return null;
}

function checkGeneralFAQ(userMessage) {
  const lower = userMessage.toLowerCase();
  for (const key in generalFAQ) {
    if (lower.includes(key)) return generalFAQ[key];
  }
  return null;
}

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Chat with the AI assistant
 *     description: Send a message to the AI assistant and get a response about SwanLogics services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: User's message to the AI assistant
 *                 example: What services do you offer?
 *     responses:
 *       200:
 *         description: AI assistant's response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   description: AI assistant's response
 *                   example: 🚀 We offer UI/UX Design, Website Development, Mobile App Development...
 *       405:
 *         description: Method not allowed
 *       500:
 *         description: Internal server error
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const domainAnswer = findDomainMatch(message);
    if (domainAnswer) return res.json({ reply: domainAnswer });
    
    const generalAnswer = checkGeneralFAQ(message);
    if (generalAnswer) return res.json({ reply: generalAnswer });

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);

    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}