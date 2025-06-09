#!/bin/sh
echo "Injecting API keys into env.js..."

cp env.template.js env.js

# Replace placeholders with actual Vercel environment values
sed -i'' "s|{{OPENWEATHERMAP_API_KEY}}|$OPENWEATHERMAP_API_KEY|g" env.js
sed -i'' "s|{{IQAIR_API_KEY}}|$IQAIR_API_KEY|g" env.js

echo "Done injecting API keys."
