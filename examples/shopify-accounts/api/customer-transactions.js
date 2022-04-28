// Expected request body:
//
//  { orderID: "the-order-id" }

const axios = require('axios')

module.exports = async (req, res) => {
  const { orderID } = JSON.parse(req.body)

  const endpoint = `https://${process.env.VITE_MYSHOPIFY_DOMAIN}/admin/api/2022-01/orders/${orderID}/transactions.json`

  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.VITE_SHOPIFY_ADMIN_PASSWORD,
      },
    })

    res.status(200).json(response.data.transactions)
  } catch (error) {
    res.status(500).send(error)
  }
}
