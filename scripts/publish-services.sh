#!/usr/bin/env bash
# Publish each folder in services/ as its own GitHub repo: scripts/publish-services.sh <owner> [--private|--public]
set -euo pipefail
owner=${1:?usage: scripts/publish-services.sh <github-user-or-org> [--private|--public]}
visibility=${2:---private}
root=$(cd "$(dirname "$0")/.." && pwd)
for dir in "$root"/services/*/; do
  name=$(basename "$dir")
  tmp=$(mktemp -d)
  cp -R "$dir". "$tmp"/
  git -C "$tmp" init -q -b main
  git -C "$tmp" add -A
  git -C "$tmp" commit -q -m "Initial import of $name"
  gh repo create "$owner/$name" "$visibility" --source "$tmp" --push
  rm -rf "$tmp"
  sleep 20   # GitHub rate-limits rapid repo creation
done
