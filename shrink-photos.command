#!/bin/bash
# ---------------------------------------------------------------------------
#  Double-click this file to shrink every photo in the images/ folder down to
#  a sensible size for a website.
#
#  Photos straight off a phone are 3-7 MB each, which makes the site slow to
#  load. This shrinks them to about 300-700 KB with no visible difference.
#
#  It only touches photos that are too big, so it is safe to run again and
#  again. It uses `sips`, which is already built into every Mac.
# ---------------------------------------------------------------------------

cd "$(dirname "$0")" || exit 1

MAXDIM=1600      # longest side, in pixels
QUALITY=70       # JPEG quality

echo ""
echo "  Shrinking photos in images/ ..."
echo ""

shopt -s nullglob nocaseglob
changed=0
skipped=0

for f in images/*.jpg images/*.jpeg images/*.png; do
  [ -e "$f" ] || continue

  w=$(sips -g pixelWidth  "$f" 2>/dev/null | awk '/pixelWidth/{print $2}')
  h=$(sips -g pixelHeight "$f" 2>/dev/null | awk '/pixelHeight/{print $2}')
  [ -z "$w" ] && continue

  long=$w
  [ "$h" -gt "$w" ] && long=$h

  before=$(du -k "$f" | cut -f1)

  if [ "$long" -le "$MAXDIM" ] && [ "$before" -lt 900 ]; then
    skipped=$((skipped + 1))
    continue
  fi

  sips -Z "$MAXDIM" "$f" -s format jpeg -s formatOptions "$QUALITY" >/dev/null 2>&1

  after=$(du -k "$f" | cut -f1)
  printf "    %-42s %5sKB -> %5sKB\n" "$(basename "$f")" "$before" "$after"
  changed=$((changed + 1))
done

echo ""
echo "  Done. $changed shrunk, $skipped already fine."
echo ""
echo "  Now commit and push, and the site will use the smaller photos."
echo ""
echo "  (You can close this window.)"
echo ""
