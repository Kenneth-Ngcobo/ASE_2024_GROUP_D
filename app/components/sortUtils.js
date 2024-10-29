export const sortRecipes = (recipes, sortBy, sortOrder) => {
    if (!recipes || recipes.length === 0) return recipes;

    let sorted = [...recipes];

    switch (sortBy) {
        case 'newest':
            // Ensure proper date comparison with fallback
            sorted.sort((a, b) => {
                const dateA = new Date(a.published || 0);
                const dateB = new Date(b.published || 0);
                return dateB - dateA; // Newest first by default
            });
            break;
        case 'prepTime':
            sorted.sort((a, b) => {
                // Convert to numbers and handle invalid values
                const timeA = parseInt(a.prep) || 0;
                const timeB = parseInt(b.prep) || 0;
                const diff = timeA - timeB;
                return sortOrder === 'ascending' ? diff : -diff;
            });
            break;
        case 'cookTime':
            sorted.sort((a, b) => {
                const diff = parseInt(a.cook) - parseInt(b.cook);
                return sortOrder === 'ascending' ? diff : -diff;
            });
            break;
        case 'steps':
            sorted.sort((a, b) => {
                const diff = a.steps.length - b.steps.length;
                return sortOrder === 'ascending' ? diff : -diff;
            });
            break;
        default:
            return recipes;
    }

    return sorted;
};
