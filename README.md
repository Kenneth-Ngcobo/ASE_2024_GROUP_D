# Project Overview:

Kwamaimai is a dynamic recipe web application for designed users to discover, share, and interact with recipes. The application combines robust search and filtering capabilities with social features, allowing users to rate, review, and save their favorite recipes.

### Technology Stack

#### Frontend:

- React:

#### Database:

- MongoDB:

- NextJs:
- React:
- API

#### Features:

- Search
- Filter
- Sign-up/ Log-in
- Favouriting
- Rate/review
- Edit description
- Image Carousel
- Offline usage

# Demo

Link: [https://kwamaimai.vercel.app/]

# Installation Instructions

1. Clone the repository:
   git clone <repository_url>

2. Navigate to the project folder:
   ase_group-d

3. Install Dependencies:
   npm install

4. Run the development server
   npm run dev

# Environmental Variables setup

Environment variables are crucial for configuring the app for local development. Here's a step-by-step guide to set up and manage them effectively:

1. In the root directory of your project, look for a file named .env or .env.local
2. If no .env file exists, create one:
3. In the .env.local file, write key-value with pairs. Each line represents one environment variable:

#### Server Configuration

- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=your_secret_key

#### Google OAuth

- AUTH_GOOGLE_ID=your_google_client_id
- AUTH_GOOGLE_SECRET=your_google_client_secret

#### Database Configuration

- MONGODB_URI=

# Project Structure

root/
├── .next/
├── app/
├── api/
│ ├── auth/
│ │ └── nextauth/route.js
│ ├── checkuser/route.js
│ └── login/route.js
├── components/
│ ├── ui/
│ │ ├── alert.js
│ │ └── button.js
│ ├── BackButton.js
│ ├── Carousel.js
│ ├── CategoryList.js
│ ├── CollapsibleSection.js
│ ├── EditableRecipeDetails.js
│ ├── FavoriteButton.js
│ ├── FilterButton.js
│ ├── Footer.js
│ ├── Header.js
│ ├── ImageGallery.js
│ ├── IngredientList.js
│ ├── LoadingSpinner.js
│ ├── Pagination.js
│ ├── RecipeCarousel.js
│ ├── RecipeGrid.js
│ ├── Recipes.js
│ ├── ReviewsSection.js
│ ├── SearchBar.js
│ ├── SortControl.js
│ ├── SortUtils.js
│ ├── StepsDropdown.js
│ ├── TagList.js
│ ├── ThemeButton.js
│ ├── UserModal.js
│ └── editdetails/
│ └── page.js
├── fonts/
├── hook/
├── images/
├── Recipe/[id]/
├── styles/global.css
├── api.js
├── error.js
├── layout.js
├── loading.js
├── not-found.js
├── page.js
├── providers.js
├── review.js
├── lib/
│   ├── AuthMiddleware.js
│   ├── utils.js
├── components/
├── public/
├── auth.js
├── db.js
├── next.config.mjs
├── packgae-lock.json
├── package.json
├── postcss.config.mjs
├── ReadMe.md
├── tailwind.config.js
├── testConnection.js






# API Documentation

This section outlines the key API endpoints available in the application, their purpose, how to use them, and what responses to expect.

#### BASE URL

http://localhost:3000

##### API Endpoints

This section outlines the key API endpoints available in the application, their purpose, how to use them, and what responses to expect. Each endpoint is hosted on /api/ under the Next.js framework, utilizing serverless functions.

1. Authentication Endpoints:

- Route:
- Description:

2. Recipe Endpoints
3. Profile Endpoints
4. Favorites
5. Allergens
6. Manifest
7. Reviews
8. Update
9. Categories

- Route:api/recipes/categories
- Description:

10. Ingredients
11. Recommendations
12. Tags

# Contact Information

Email: [groupd.ase@gmail.com]

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
