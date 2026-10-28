# Devin demo: Fan-out audit across six microservices

**What it shows:** A Dynamic Workflow runs one child session per repo, checks for the deprecated `request` package and missing rate limits, ranks the findings with file:line evidence, and opens fix PRs only for confirmed ones.

**Needs:** GitHub only

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## Set it up

The six services in `services/` are also published as template repos, so you can set this lab up entirely in the browser.

1. Create your own copy of each service. Open each link, choose your GitHub account or org as the owner, keep the name GitHub fills in (`acme-svc-…`), and click **Create repository**:

   - [acme-svc-payments](https://github.com/new?template_owner=thequantexplorer&template_name=devin-demo-svc-payments&name=acme-svc-payments)
   - [acme-svc-orders](https://github.com/new?template_owner=thequantexplorer&template_name=devin-demo-svc-orders&name=acme-svc-orders)
   - [acme-svc-users](https://github.com/new?template_owner=thequantexplorer&template_name=devin-demo-svc-users&name=acme-svc-users)
   - [acme-svc-notifications](https://github.com/new?template_owner=thequantexplorer&template_name=devin-demo-svc-notifications&name=acme-svc-notifications)
   - [acme-svc-search](https://github.com/new?template_owner=thequantexplorer&template_name=devin-demo-svc-search&name=acme-svc-search)
   - [acme-svc-inventory](https://github.com/new?template_owner=thequantexplorer&template_name=devin-demo-svc-inventory&name=acme-svc-inventory)

2. In Devin, open [**Settings → Connections → GitHub**](https://app.devin.ai/settings/connections/github) and make sure Devin can access the six new repos.

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
