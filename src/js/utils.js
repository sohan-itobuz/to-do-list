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

export function OTPInput(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keydown', function (event) {
      if (event.key === "Backspace") {
        inputs[i].value = ''; if (i !== 0) inputs[i - 1].focus();
      } else {
        if (i === inputs.length - 1 && inputs[i].value !== '') {
          return true;
        } else if (event.keyCode > 47 && event.keyCode < 58) {
          inputs[i].value = event.key;
          if (i !== inputs.length - 1)
            inputs[i + 1].focus();
          event.preventDefault();
        } else if (event.keyCode > 64 && event.keyCode < 91) {
          inputs[i].value = String.fromCharCode(event.keyCode);
          if (i !== inputs.length - 1) inputs[i + 1].focus();
          event.preventDefault();
        }
      }
    });
  }
}