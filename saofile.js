module.exports = {
  prompts: [
    {
      name: 'framework',
      message: 'What framework woul you like to use:',
      choices: [
        { name: 'Next.js', value: 'next' },
        { name: 'Nuxt.js', value: 'nuxt' }
      ],
      type: 'list',
      default: 'nuxt'
    }
  ],
  actions() {
    const actions = [];

    console.log('RESULTS', this._answers);

    actions.push({
      type: 'add',
      files: '**',
      templateDir: 'starters/nuxt'
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
