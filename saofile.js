module.exports = {
  templateDir: 'starters/nuxt',
  prompts: [
    {
      name: 'framework',
      message: 'What framework would you like to scaffhold?',
      choices: [
        { name: 'Next.js', value: 'next' },
        { name: 'Nuxt.js', value: 'nuxt' }
      ]
    }
  ],
  actions() {
    const actions = [];

    console.log('RESULTS', this.results);

    actions.push({
      type: 'add',
      files: '**'
    });
    actions.push({
      type: 'move',
      patterns: {
        gitignore: '.gitignore'
      }
    });

    return actions;
  },

  async completed() {
    console.log('completed');
  }
};
