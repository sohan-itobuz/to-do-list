export function createTagsHtml(tags) {
  if (!tags || !Array.isArray(tags) || !tags.length) return '';
  const badges = tags
    .filter(tag => tag.trim())
    .map(tag => `<span class="badge fw-light rounded-pill tags-bg me-1">${tag.trim().toLowerCase()}</span>`)
    .join('');
  return `<div class="d-flex flex-wrap mb-1">${badges}</div>`;
}

// export function sortTasks(tasks) {
//   return [...tasks].sort((a, b) => {
//     if (a.completed !== b.completed) {
//       return a.completed ? 1 : -1;
//     }
//     return b.priority - a.priority;
//   });
// }