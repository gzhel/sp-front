#!/usr/bin/env bash
cd "$(dirname "$0")/scripts" || exit
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
export BRANCH=${GIT_BRANCH//[\/]/-}

echo ""
echo "Which contour you want to deploy?"
echo ""
echo "[1] Development (default)"
echo "[2] Stage"
echo "[3] Production"
echo "[name] Custom tag"

read -p "" contour
if [ -z "$contour" ]; then
    contour=1
fi

case $contour in
    [1] ) export CONTOUR="sp-dev";;
    [2] ) export CONTOUR="sp-stage";;
    [3] ) export CONTOUR="sp-prod";;
    * ) export CONTOUR="$contour";;
esac

if [[ "$contour" != 1 ]]; then
  echo "Are you sure want deploy to ${CONTOUR} (yes/no)?"
  read -p "" yn
  case $yn in
          [Yy]* ) ;;
          [Yes] ) ;;
          [yes] ) ;;
          * ) echo "Deploy canceled"; exit;;
  esac
fi

docker-compose build && docker-compose push
