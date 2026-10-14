# AI Answer Checkup

A small, guided human review tool by Suzanne Hansen at Suzanne's Lab.

Checkup helps a reviewer compare an AI answer with the original task and available evidence. It turns five recorded judgments into a review summary with unresolved items and next steps.

## Who this is for

Use this when you have to accept, return, or hold an AI answer. You bring the original request, the answer, the evidence you actually have, and any correction history.

The reviewer service offers a human review of the AI answer for evidence support, correction history, and unresolved issues. The page records your judgments. It does not score the model, and it does not verify facts on its own.

## Try it

[Try the live demo](https://yay-fun.github.io/ai-answer-checkup/), or open `index.html` in a browser. Choose either fictional example to inspect the workflow, then change the judgments and generate a summary. You can also enter your own approved, non-sensitive material.

## What it checks

1. Requested work: were all deliverables provided?
2. Evidence: are factual claims supported by the supplied record?
3. Constraints: were scope, audience, and format preserved?
4. Correction follow-through: did a correction reach dependent claims?
5. Next step: is the remaining action clear?

The reviewer selects Pass, Fail, Unverified, or Not applicable. Pass, Fail, and Not applicable each need a written reason. Unverified means you cannot establish the check from the record.

Those ratings lead to one outcome:

- A missing judgment, or a Pass, Fail, or Not applicable without a reason, leads to `incomplete`.
- A Fail leads to `revise`. A Fail outranks an Unverified check.
- The Unverified rating leads to the `verify` outcome when no check has failed.
- Passes on the applicable checks lead to `reviewed`.
- Not applicable on every check leads to `no-scope`.

The application summarizes those judgments. It does not independently analyze pasted answers or verify facts.

## Why I made this

My independent AI research examines the gap between a convincing answer and completed, supported work. Checkup translates those distinctions into a practical review activity. It is an application prototype and portfolio demonstration, not a production enterprise deployment.

## Privacy and limits

The prototype makes no model calls and uses no browser storage. Entries stay in page memory and disappear on reload. Exported notes are downloaded only when requested. Hosting providers may retain normal request logs. Use approved, non-sensitive material.

Browser interaction testing, accessibility validation, learner studies, and enterprise integrations are not established. A completed review records the reviewer's judgment and does not prove accuracy.

## For technical reviewers

With Node.js installed, run from the repository root:

```sh
node test_review.cjs
node test_fixtures.cjs
node test_demo.cjs
```

`test_review.cjs` checks 12 routing scenarios, JavaScript syntax, and three static source properties. `test_fixtures.cjs` checks routing for eight predefined reference-rating sets. These are not live-model accuracy results or independent annotation agreement measurements.

`test_demo.cjs` verifies that example judgments remain separate from source notes.

The `fixtures` directory contains fictional tasks, source records, candidate answers, reference judgments, and rationales. The `results` directory preserves the recorded routing results. Each test writes its JSON only under `results/`.

Tests read the root `index.html`. That file is what GitHub Pages serves. The repository does not keep a `dist/` copy, so the tested page and the published page stay the same file.

### GitHub Pages

In repository Settings, open Pages. Choose Deploy from a branch, the default branch, and the root folder. Save. The root `index.html` is the self-contained demo.

## Authorship

Built with AI assistance from Suzanne Hansen's evaluation methods. Fictional examples are explicitly labeled. No affiliation, commissioned work, company data access, or measured adoption improvement is claimed.

[Research portfolio](https://suzanneslab.wixsite.com/airesearch) · [LinkedIn](https://www.linkedin.com/in/suzannes-lab)
