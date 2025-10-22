const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swanlogics Portfolio API",
      version: "1.0.0",
      description: "API for chatting with portfolio AI assistant and handling quotations",
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://swanlogics-backend-4keb3erxx-hqads-projects.vercel.app/api' 
          : 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ]
  },
  apis: [
    __dirname + '/chat.js',
    __dirname + '/quote.js', 
    __dirname + '/contact.js'
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(swaggerSpec);
};