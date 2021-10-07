module.exports = {
  templateDir: 'starters/nuxt',
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
    console.log('');
  }
};
