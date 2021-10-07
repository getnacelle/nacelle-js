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
  templateDir() {
    if (this.answer.framework === 'next') {
      return 'starters/nuxt';
    }
    if (this.answer.framework === 'next') {
      return 'packages';
    }
  },
  actions: [
    {
      type: 'add',
      // Copy and transform all files in `starters/nuxt` folder into output directory
      files: '**'
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore'
      }
    }
  ],

  async completed() {
    console.log('completed');
  }
};
