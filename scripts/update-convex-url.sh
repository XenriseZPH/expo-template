#!/bin/bash
# Auto-detect local IP and update EXPO_PUBLIC_CONVEX_URL in .env.local
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')
if [ -z "$IP" ]; then
  echo "Could not detect local IP"
  exit 1
fi
echo "Detected IP: $IP"

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s|EXPO_PUBLIC_CONVEX_URL=http://[0-9.]*:3210|EXPO_PUBLIC_CONVEX_URL=http://$IP:3210|" .env.local
  sed -i '' "s|EXPO_PUBLIC_CONVEX_SITE_URL=http://[0-9.]*:3211|EXPO_PUBLIC_CONVEX_SITE_URL=http://$IP:3211|" .env.local
else
  sed -i "s|EXPO_PUBLIC_CONVEX_URL=http://[0-9.]*:3210|EXPO_PUBLIC_CONVEX_URL=http://$IP:3210|" .env.local
  sed -i "s|EXPO_PUBLIC_CONVEX_SITE_URL=http://[0-9.]*:3211|EXPO_PUBLIC_CONVEX_SITE_URL=http://$IP:3211|" .env.local
fi
echo "Updated .env.local with IP $IP"
