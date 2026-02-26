# 🎭 Playwright - 🧃 Juice Shop

[![Playwright Tests](https://github.com/joaquinpiedracueva/playwright-juiceshop/actions/workflows/playwright.yml/badge.svg)](https://github.com/joaquinpiedracueva/playwright-juiceshop/actions/workflows/playwright.yml)
[![Playwright Report](https://img.shields.io/badge/🎭_Playwright_Report-2b3137)](https://joaquinpiedracueva.github.io/playwright-juiceshop/)

<img width="1280" alt="Image" src="https://github.com/user-attachments/assets/e79eea00-ba47-4299-8146-c2ba7d3fe65c" />

## Description

End-to-end test automation framework for [OWASP Juice Shop](https://demo.owasp-juice.shop/) built with [Playwright](https://playwright.dev/docs/intro) and [TypeScript](https://www.typescriptlang.org/docs/)

The [Issues](https://github.com/joaquinpiedracueva/playwright-juiceshop/issues) page documents known issues found on the OWASP Juice Shop application during automated testing.

## Requirements

[![Node.js](https://img.shields.io/badge/Node.js-3C873A?logo=nodedotjs&logoColor=E5F2FC)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-1D63ED?logo=docker&logoColor=E5F2FC)](https://www.docker.com/)

## Installation

```bash
git clone https://github.com/joaquinpiedracueva/playwright-juiceshop.git  # Clone the repository
cd playwright-juiceshop                                                   # Navigate to the project directory
npm install                                                               # Install project dependencies
npx playwright install --with-deps                                        # Install playwright browsers
```

## Usage

```bash
# Make sure Docker is running
npx playwright test
```

## Linting & Formatting

```bash
npm run lint     # Check for ESLint issues
npm run format   # Auto-fix formatting with Prettier
```
