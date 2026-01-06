// Test script to check both /quote and /api/quote endpoints
const https = require('https');

const testData = {
  service: "Web Development",
  projectTitle: "Test Project",
  projectDescription: "This is a test",
  budgetRange: "$5k - $10k",
  preferredTimeline: "1-2 months",
  name: "Test User",
  companyName: "Test Company",
  email: "test@example.com",
  phoneNumber: "+1234567890",
  ndaRequired: false,
  scheduleProposalCall: true,
  ongoingSupport: false
};

function testEndpoint(path) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: 'swanlogics-backend.vercel.app',
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    console.log(`\n=== Testing ${path} ===`);
    
    const req = https.request(options, (res) => {
      console.log('Status Code:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log('Response:', data);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('Error:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  await testEndpoint('/quote');
  await testEndpoint('/api/quote');
}

runTests();
