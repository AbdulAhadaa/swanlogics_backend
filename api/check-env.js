// Simple endpoint to check if environment variables are set
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const envCheck = {
    EMAIL_USER: !!process.env.EMAIL_USER,
    EMAIL_PASS: !!process.env.EMAIL_PASS,
    ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
    MONGODB_URI: !!process.env.MONGODB_URI,
    GEMINI_API_KEY: !!process.env.GEMINI_API_KEY
  };
  
  res.json({
    message: "Environment variables check",
    variables: envCheck,
    allSet: Object.values(envCheck).every(v => v === true)
  });
}
