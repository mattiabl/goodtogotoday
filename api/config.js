export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'GET') {
    res.status(200).json({
      OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY,
      IQAIR_API_KEY: process.env.IQAIR_API_KEY
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}