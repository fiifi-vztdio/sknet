{
  \
  "scripts\": {
    "setup": "npm install && npm run setup:packages",
    "setup:packages": "npm install --workspaces",
    "dev:all": "concurrently \"npm run dev:web\" \"npm run dev:mobile\" \"npm run dev:api\"",
    "dev:web": "cd apps/web && npm run dev",
    "dev:mobile": "cd apps/mobile && npm run dev",
    "dev:api": "cd apps/api && npm run dev",
    "build:all": "npm run build --workspaces",
    "clean:all": "npm run clean --workspaces && rm -rf node_modules",
    "type-check:all": "npm run type-check --workspaces",
    "lint:all": "npm run lint --workspaces",
    "test:all": "npm run test --workspaces"
}
\
}
