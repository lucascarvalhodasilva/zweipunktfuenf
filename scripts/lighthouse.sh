#!/bin/sh
set -e

if [ -z "$1" ]; then
  echo "Usage: npm run lighthouse -- <url>"
  exit 1
fi

eval export $(grep '^CHROME_PATH=' "$(dirname "$0")/../.env.local")

mkdir -p lighthouse

URL="$1"
SLUG=$(echo "$URL" | sed 's|https\?://||;s|[/:]|_|g;s|_$||')
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
OUTPUT="lighthouse/${SLUG}-${TIMESTAMP}.html"

lighthouse "$URL" \
  --output=html \
  --output-path="$OUTPUT" \
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
  --no-enable-error-reporting \
  --quiet

echo "Report saved to $OUTPUT"
