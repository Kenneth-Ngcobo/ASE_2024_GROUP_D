# Project Overview:

Kwamaimai is a dynamic recipe web application for designed users to discover, share, and interact with recipes. The application combines robust search and filtering capabilities with social features, allowing users to rate, review, and save their favorite recipes.

# Technology Stack

## Frontend:

- React:

## Database:

- MongoDB:

- NextJs:
- React:
- API

# Features:

- Search
- Filter
- Sign-up/ Log-in
- Favouriting
- Rate/review
- Edit description
- Image Carousel

# Demo

# Installation Instructions

# Environmental Variables setup

Environment variables are crucial for configuring the app for local development. Here's a step-by-step guide to set up and manage them effectively:

1. In the root directory of your project, look for a file named .env or .env.local
2. If no .env file exists, create one:
3. In the .env.local file, write key-value with pairs. Each line represents one environment variable:

# Server Configuration

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Google OAuth

TH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Database Configuration

MONGODB_URI=

# Project Structure

|- .next/
|- app/
|- api/
| |- auth/
| |_ nextauth/route.js
| |- checkuser/route.js
| |- login/route.js
|- components/
| |- ui
| |_ alert.js
| |_ button.js
|- BackButton.js
|- Carousel.js
|- CategoryList.js
|- CollapsibleSection.js
|- EditableRecipeDetails.js
|- FavoriteButton.js
|- FilterButton.js
|- footer.js
|- Header.js
|- ImageGallery.js
|- IngredientList.js
|- loadingSpinner.js
|- pagination.js
|- RecipeCarousel.js
|- recipeGrid.js
|- recipes.js
|- ReviewsSection.js
|- searchBar.js
|- SortControl.js
|- sortUtils.js
|- StepsDropDown.js
|- TagList.js
|- ThemeButton.js
|- UserModal.js
|- editdetails/
| |_ page.js
|- fonts/
|- hook/
|- images/
|- Recipe/[id]/
|- styles/
|- api.js
|- error.js

# API Documentation

This section outlines the key API endpoints available in the application, their purpose, how to use them, and what responses to expect.

## BASE URL

http://localhost:3000

API Endpoints Documentation
This section outlines the key API endpoints available in the application, their purpose, how to use them, and what responses to expect. Each endpoint is hosted on /api/ under the Next.js framework, utilizing serverless functions.

# Base URL
In development:

http://localhost:3000

1. Authentication Endpoints
2. Recipe Endpoints
3. Profile Endpoints

# Contact Information

<!--
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
 -->
