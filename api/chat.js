const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const domainFAQ = {
  "ui/ux": {
    keywords: ["ui", "ux", "design", "user interface", "user experience", "wireframe", "prototype"],
    responses: {
      general: "🎨 **UI/UX Design Services**\n• User Research & Analysis\n• Wireframing & Prototyping\n• Visual Design & Branding\n• Usability Testing\n\n*Starting from $2k - Timeline: 2-4 weeks*",
      pricing: "💰 **UI/UX Design Pricing:**\n• Basic Design: $2k-5k\n• Complete UX Research: $5k-10k\n• Enterprise Solutions: $10k+",
      process: "📋 **Our UI/UX Process:**\n1. Discovery & Research\n2. Wireframing\n3. Visual Design\n4. Prototyping\n5. Testing & Refinement"
    }
  },
  "branding": {
    keywords: ["brand", "logo", "identity", "branding", "visual identity"],
    responses: {
      general: "🏷️ **Branding Services**\n• Logo Design\n• Brand Identity\n• Brand Guidelines\n• Marketing Materials\n\n*Starting from $1.5k - Timeline: 1-3 weeks*",
      pricing: "💰 **Branding Pricing:**\n• Logo Only: $500-1.5k\n• Complete Brand Identity: $2k-5k\n• Brand Strategy: $5k-10k",
      deliverables: "📦 **Branding Deliverables:**\n• Logo variations\n• Color palette\n• Typography\n• Brand guidelines\n• Business card designs"
    }
  },
  "marketing": {
    keywords: ["marketing", "digital marketing", "seo", "social media", "advertising"],
    responses: {
      general: "📈 **Marketing Services**\n• Digital Marketing Strategy\n• SEO Optimization\n• Social Media Management\n• Content Marketing\n\n*Starting from $1k/month - Timeline: Ongoing*",
      pricing: "💰 **Marketing Pricing:**\n• SEO Package: $1k-3k/month\n• Social Media: $800-2k/month\n• Complete Strategy: $2k-5k/month",
      strategy: "🎯 **Marketing Strategy:**\n• Market Analysis\n• Competitor Research\n• Content Planning\n• Performance Tracking"
    }
  },
  "web development": {
    keywords: ["web", "website", "development", "frontend", "backend", "fullstack"],
    responses: {
      general: "💻 **Web Development Services**\n• Custom Websites\n• E-commerce Solutions\n• Web Applications\n• CMS Development\n\n*Starting from $3k - Timeline: 2-8 weeks*",
      pricing: "💰 **Web Development Pricing:**\n• Landing Page: $1k-3k\n• Business Website: $3k-8k\n• E-commerce: $5k-15k\n• Web App: $10k+",
      technologies: "⚡ **Technologies We Use:**\n• React, Next.js\n• Node.js, Express\n• MongoDB, PostgreSQL\n• AWS, Vercel"
    }
  },
  "mobile app": {
    keywords: ["mobile", "app", "ios", "android", "react native", "flutter"],
    responses: {
      general: "📱 **Mobile App Development**\n• iOS & Android Apps\n• Cross-platform Solutions\n• App Store Deployment\n• Maintenance & Updates\n\n*Starting from $8k - Timeline: 2-4 months*",
      pricing: "💰 **Mobile App Pricing:**\n• Simple App: $8k-15k\n• Complex App: $15k-30k\n• Enterprise App: $30k+",
      platforms: "📲 **Development Options:**\n• Native iOS/Android\n• React Native\n• Flutter\n• Progressive Web Apps"
    }
  },
  "consulting": {
    keywords: ["consulting", "consultation", "advice", "strategy", "planning"],
    responses: {
      general: "🤝 **Consulting Services**\n• Technical Consulting\n• Project Planning\n• Architecture Review\n• Team Augmentation\n\n*Starting from $150/hour - Flexible timeline*",
      pricing: "💰 **Consulting Rates:**\n• Hourly Rate: $150-300/hour\n• Project-based: $2k-10k\n• Retainer: $3k-8k/month",
      expertise: "🎯 **Our Expertise:**\n• Technology Strategy\n• Digital Transformation\n• Process Optimization\n• Team Leadership"
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

export default async function handler(req, res) {
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