export function addArticle(payload) {
    console.log("Action", payload)
    return { type: "ADD_ARTICLE", payload }
};