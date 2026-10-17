#!/usr/bin/env bash
cd "$(dirname "$0")"

if [ -f ".venv/bin/uvicorn" ]; then
  exec ./.venv/bin/uvicorn main:app --host 0.0.0.0 --port 3003 --reload
else
  echo "⚠️ .venv not found, attempting system uvicorn..."
  exec uvicorn main:app --host 0.0.0.0 --port 3003 --reload
fi
