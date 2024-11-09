const cors = (req, res, next) => {
    // Set the CORS headers for the response
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With'); // Allowed headers
  
    // Handle preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end(); // Respond with 200 for OPTIONS requests
    }
  
    next(); // If it's not an OPTIONS request, pass control to the next middleware or handler
  };
  
  export default cors;
  