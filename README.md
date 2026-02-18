# 🎭 Playwright - 🧃 Juice Shop

[![Playwright Tests](https://github.com/joaquinpiedracueva/playwright-juiceshop/actions/workflows/playwright.yml/badge.svg)](https://github.com/joaquinpiedracueva/playwright-juiceshop/actions/workflows/playwright.yml)
[![🎭 Playwright Report](https://img.shields.io/badge/🎭_Playwright_Report-2b3137)](https://joaquinpiedracueva.github.io/playwright-juiceshop/)

![Playwright Juice Shop](assets/playwright-juiceshop.png)

## Description

End-to-end test automation framework for [OWASP Juice Shop](https://demo.owasp-juice.shop/) built with [Playwright](https://playwright.dev/docs/intro) and [TypeScript](https://www.typescriptlang.org/docs/)

The [Issues](https://github.com/joaquinpiedracueva/playwright-juiceshop/issues) page documents known issues found on the OWASP Juice Shop application during automated testing.

## Requirements

[![Node.js](https://img.shields.io/badge/Node.js-3C873A?logo=nodedotjs&logoColor=E5F2FC)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-1D63ED?logo=docker&logoColor=E5F2FC)](https://www.docker.com/)

## Installation

```bash
git clone https://github.com/joaquinpiedracueva/playwright-juiceshop.git
cd playwright-juiceshop
npm install
npx playwright install --with-deps
# Docker must be running at this point
npx playwright test
```
