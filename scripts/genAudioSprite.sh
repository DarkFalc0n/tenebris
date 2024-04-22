#!/bin/sh

json=$(node scripts/change-ext.js $1 json)
node scripts/output.js $1 >"public/assets/audios/$json"

constants=$(node scripts/change-ext.js $1 ts)
node scripts/constants.js $1 >"public/assets/audios/$constants"
