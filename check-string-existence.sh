#!/bin/sh
# Prevent push if the string exists in another branch

# Specify the target branch and the string to search for
TARGET_BRANCH="main"
SEARCH_STRING="shoaib"

# Save the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Checkout the target branch and search for the string
git checkout $TARGET_BRANCH > /dev/null 2>&1

# Search for the string
STRING_EXISTS=$(git grep -q "$SEARCH_STRING" && echo "yes" || echo "no")

# Checkout back to the original branch
git checkout $CURRENT_BRANCH > /dev/null 2>&1

# Conditionally block the push
if [ "$STRING_EXISTS" = "no" ]; then
  echo "Error: The string '$SEARCH_STRING' does not exost in $TARGET_BRANCH branch. Push aborted."
  exit 1
fi
