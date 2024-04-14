module.exports = (data) => {
  const categories = {};
  for (const job of data) {
    if (job?.Visibility == 0 && job?.StatusCode == 0) continue
    categories[job.Category] = true;
  }
  return Object.keys(categories).sort();
};
