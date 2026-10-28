# Devin demo: Fan-out audit across six microservices

**What it shows:** One prompt starts a Dynamic Workflow. Devin runs one child session per repo, collects structured findings with file:line evidence, ranks them, and opens fix PRs only where a finding is confirmed.

**Needs:** GitHub only

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## Set it up

1. Click **Use this template → Create a new repository** (or fork it) into your own GitHub account or org.
2. In Devin, open [**Settings → Connections → GitHub**](https://app.devin.ai/settings/connections/github) and make sure Devin can access the new repository.
3. This repo holds six small services under `services/`. To get the real multi-repo setup, publish each one as its own repo (needs the [GitHub CLI](https://cli.github.com/), logged in):

   ```sh
   scripts/publish-services.sh <you>            # creates <you>/acme-svc-payments, ... as private repos
   scripts/publish-services.sh <you> --public   # or public
   ```

   Then give Devin access to the six new repos.

## Prompt

Start a new Devin session and paste this. Replace `<you>` with your GitHub user or org.

```text
Audit all six Acme microservices for two risks, using a Dynamic Workflow: fan out one child session per repo, collect structured findings, then rank them.

Repos: https://github.com/<you>/acme-svc-payments https://github.com/<you>/acme-svc-orders https://github.com/<you>/acme-svc-users https://github.com/<you>/acme-svc-notifications https://github.com/<you>/acme-svc-search https://github.com/<you>/acme-svc-inventory

Check each repo for:
1. Use of the deprecated `request` npm package (a real runtime dependency/import, not a comment).
2. Write endpoints (POST/PUT/PATCH/DELETE), especially auth and money-moving ones, that have no rate limiting.

Each child must cite file:line evidence and run the repo's tests. Return a ranked table (severity, repo, finding, evidence, confirmed yes/no). Open a fix PR (with tests passing) ONLY for confirmed findings; explicitly list repos you checked and found clean or false positives, and explain why.
```
