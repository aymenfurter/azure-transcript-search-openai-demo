 #!/bin/sh

echo ""
echo "Loading azd .env file from current environment"
echo ""

while IFS='=' read -r key value; do
    value=$(echo "$value" | sed 's/^"//' | sed 's/"$//')
    export "$key=$value"
done <<EOF
$(azd env get-values)
EOF

echo 'Creating python virtual environment "scripts/.venv"'
python3 -m venv scripts/.venv

echo 'Installing dependencies from "requirements.txt" into virtual environment'
./scripts/.venv/bin/python -m pip install -r scripts/requirements.txt

echo 'Collecting video-ids'

set -ex
echo "Creating directories..."
mkdir -p bin
echo "Downloading yt-dlp..."
curl -vL https://github.com/yt-dlp/yt-dlp/releases/download/2023.06.22/yt-dlp -o bin/youtube-dl
echo "Setting permissions..."
chmod a+rx bin/youtube-dl
echo "Checking youtube-dl version..."
bin/youtube-dl --version
echo "Fetching playlist data..."
bin/youtube-dl --verbose --skip-download --print-json --playlist-end 20 "https://www.youtube.com/@$YOUTUBE_CHANNEL_NAME/videos" > /tmp/videos.json
echo "Extracting video ids..."
cat /tmp/videos.json | jq --join-output '.id,"\n"' > /tmp/videos.txt
echo "Creating index files..."
while IFS= read -r id; do
  echo "Processing video $id"
  bin/youtube-dl --write-auto-sub --sub-lang en --skip-download -o "data/$id" https://www.youtube.com/watch?v=$id
  ./scripts/.venv/bin/python ./scripts/generate_embeddings.py $id
done < /tmp/videos.txt || { echo "Failed to read from file: /tmp/videos.txt"; exit 1; }

echo "Done! All videos have been indexed."