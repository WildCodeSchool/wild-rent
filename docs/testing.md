# CLI

## e2e with docker

```bash
docker compose -f docker-compose.e2e.yml up --build --exit-code-from e2e
``` 

## Local testing

```bash
LOCAL=TRUE npx playwright test --headed
LOCAL=TRUE npx playwright test --ui
``` 