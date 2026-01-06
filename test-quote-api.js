// Test script to debug quote API
const https = require('https');

const testData = {
  service: "Web Development",
  projectTitle: "Test Project",
  projectDescription: "This is a test quotation request",
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

const postData = JSON.stringify(testData);

const options = {
  hostname: 'swanlogics-backend.vercel.app',
  port: 443,
  path: '/quote',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

console.log('Testing quote API...');
console.log('URL:', `https://${options.hostname}${options.path}`);
console.log('Data:', testData);
console.log('\n---\n');

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  console.log('\n---\n');

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response Body:', data);
    try {
      const json = JSON.parse(data);
      console.log('Parsed Response:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('Could not parse as JSON');
    }
  });
});

req.on('error', (error) => {
  console.error('Request Error:', error);
});

req.write(postData);
req.end();
