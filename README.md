# AI Answer Review

A standalone, guided human review tool by Suzanne Hansen at Suzanne's Lab.

AI Answer Review helps a reviewer compare an AI answer with the original task and available evidence. It turns five recorded judgments into a review summary with unresolved items and next steps.

## Try it

[Try the live demo](https://yay-fun.github.io/ai-answer-checkup/), or open `index.html` in a browser. Choose either fictional example to inspect the workflow, then change the judgments and generate a summary. You can also enter your own approved, non-sensitive material.

## What it checks

1. Requested work: were all deliverables provided?
2. Evidence: are factual claims supported by the supplied record?
3. Constraints: were scope, audience, and format preserved?
4. Correction follow-through: did a correction reach dependent claims?
5. Next step: is the remaining action clear?

The reviewer selects Pass, Fail, Unverified, or Not applicable and records the supporting reason. The application summarizes those judgments. It does not independently analyze pasted answers or verify facts.

## Why I made this

My independent AI research examines the gap between a convincing answer and completed, supported work. AI Answer Review translates those distinctions into a practical review activity. It is an application prototype and portfolio demonstration, not a production enterprise deployment.

## Privacy and limits

The prototype makes no model calls and uses no browser storage. Entries stay in page memory and disappear on reload. Exported notes are downloaded only when requested. Hosting providers may retain normal request logs. Use approved, non-sensitive material.

Browser interaction testing, accessibility validation, learner studies, and enterprise integrations are not established. A completed review records the reviewer's judgment and does not prove accuracy.

## Tests and reproducibility

With Node.js installed, run from the repository root:

```sh
node test_review.cjs
node test_fixtures.cjs
node test_demo.cjs
```

The first script checks 12 routing scenarios, JavaScript syntax, and three static source properties. The second checks routing for eight predefined reference-rating sets. These are not live-model accuracy results or independent annotation agreement measurements.

The demo regression check verifies that example judgments remain separate from source notes.

The `fixtures` directory contains fictional tasks, source records, candidate answers, reference judgments, and rationales. The `results` directory preserves the recorded routing results.

## GitHub Pages

In repository Settings, open Pages. Choose Deploy from a branch, the default branch, and the root folder. Save. The root `index.html` is the self-contained demo. The matching copy in `dist` is used by the tests.

## Authorship

Built with AI assistance from Suzanne Hansen's evaluation methods. Fictional examples are explicitly labeled. No affiliation, commissioned work, company data access, or measured adoption improvement is claimed.

[Research portfolio](https://suzanneslab.wixsite.com/airesearch) · [LinkedIn](https://www.linkedin.com/in/suzannes-lab)
