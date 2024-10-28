export const sortRecipes = (recipes, sortBy, sortOrder) => {
    let sorted = [...recipes];

    switch (sortBy) {
        case 'newest':
            sorted.sort((a, b) => new Date(b.published) - new Date(a.published));
            break;
        case 'prepTime':
            sorted.sort((a, b) => {
                const diff = parseInt(a.prep) - parseInt(b.prep);
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
