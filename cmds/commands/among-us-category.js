const amongUsCategorySchema = require('@schemas/among-us-category-schema')

module.exports = {
  name: 'aucat', // Optional
  commands: ['aucat'], // Optional
  description: 'Specifies the category to create Among Us voice channels in',
  requiredPermissions: ['MANAGE_ROLES'],


  callback: async (message, args) => {
    const categoryId = args
    if (!categoryId) {
      message.reply('Please specify a category ID')
      return
    }

    const guildId = message.guild.id

    await amongUsCategorySchema.findOneAndUpdate({
      _id: guildId,
    }, {
      _id: guildId,
      categoryId,
    }, {
      upsert: true,
    })

    message.reply('Among Us category set!')
  }
}