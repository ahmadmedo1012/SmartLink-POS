# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: critical-path.spec.ts >> POS page >> adding product to cart updates totals
- Location: e2e/critical-path.spec.ts:207:7

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByText('منتج أ').first()

```

```
Error: write EPIPE
```