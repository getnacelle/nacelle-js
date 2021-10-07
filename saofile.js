module.exports = {
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
    if (this.answers.framework === 'next') {
      actions.push({
        type: 'add',
        files: '**',
        templateDir: 'starters/nuxt'
      });
    }
    if (this.answers.framework === 'next') {
      actions.push({
        type: 'add',
        files: '**',
        templateDir: 'packages'
      });
    }
  },

  async completed() {
    console.log('completed');
  }
};
