# QueueLess

QueueLess is a campus canteen order-ahead concept. The prototype explores a student pickup flow and a lightweight canteen workflow for handling incoming requests during short breaks.

## Explore the prototype

Open `index.html` in a browser, or publish this folder with GitHub Pages. It uses plain HTML, CSS and JavaScript, with no build step or package installation.

### Student view

- Search a sample menu and filter by category.
- Add items, change quantities and choose a pickup window.
- Preview a sample order and see its progress on **My orders**.

### Canteen view

- See incoming demo orders and sample queue counts.
- Move orders through received, preparing, ready and collected.
- Mark sample menu items unavailable or available.

The views share demo order and menu availability state in the browser. Open the student and canteen views in the same browser profile to see updates reflected between them.

## Repository map

```text
index.html                 Student menu and basket
orders.html                Student order tracking
operator.html              Canteen order desk
styles.css                 Shared responsive design
scripts/data.js             Sample menu and workflow data
scripts/store.js            Browser-only demo state
scripts/student.js          Menu search, filters and basket
scripts/orders.js           Student tracking view
scripts/operator.js         Canteen queue and menu controls
docs/PRODUCT_BRIEF.md       Concept, users and scope
docs/VALIDATION_PLAN.md     Assumptions and research plan
```

## Prototype boundaries

This is a front-end proof of concept. Menu items, availability, prices and pickup windows are illustrative. Demo orders and availability changes are stored in browser storage; there is no server, payment, account, notification, or canteen integration. Do not enter real personal or payment information.

## Publish with GitHub Pages

Create a repository and upload the contents of this folder, keeping `index.html` at the repository root. In **Settings → Pages**, publish from the `main` branch and `/(root)`. Use the resulting Pages URL as the live demo link; the repository URL can be shared as the source-code link.

## Suggested next step

Use the validation plan to learn whether the student problem and canteen workflow are real before adding a backend or payment features. No user research or pilot results are claimed by this prototype.
