#!/bin/sh

output=$(node scripts/output.js $1)
node scripts/convert.js $1 >"public/assets/audios/$output"
