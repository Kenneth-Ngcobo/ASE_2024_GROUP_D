export const sortRecipes = (recipes, sortBy, sortOrder) => {
    // Return original recipes array if empty or undefined
    if (!recipes?.length) return recipes;

    const sorted = [...recipes];

    // Helper function to compare values based on sort order
    const compareValues = (a, b, order = 'ascending') => {
        const multiplier = order === 'ascending' ? 1 : -1;
        return (a - b) * multiplier;
    };

    // Define sorting strategies based on sortBy options
    const sortingStrategies = {
        createdAt: (a, b) => {
            const dateA = new Date(a.published || 0).getTime();
            const dateB = new Date(b.published || 0).getTime();
            return compareValues(dateB, dateA, 'descending'); // Newest first by default
        },
        prepTime: (a, b) => {
            const timeA = parseInt(a.prep) || 0;
            const timeB = parseInt(b.prep) || 0;
            return compareValues(timeA, timeB, sortOrder);
        },
        cookTime: (a, b) => {
            const timeA = parseInt(a.cook) || 0;
            const timeB = parseInt(b.cook) || 0;
            return compareValues(timeA, timeB, sortOrder);
        },
        instructions: (a, b) => {
            const lenA = Array.isArray(a.instructions) ? a.instructions.length : 0;
            const lenB = Array.isArray(b.instructions) ? b.instructions.length : 0;
            return compareValues(lenA, lenB, sortOrder);
        }
    };

    // Use the appropriate sorting strategy or a no-op if none is matched
    return sorted.sort(sortingStrategies[sortBy] || (() => 0));
};
