import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config()


const app = express()
const PORT = 8080


app.use(express.json())
app.use(cors())


const createCustomer = async (params) => {
  const url = 'https://api.paystack.co/customer';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data
  } catch (error) {
    console.error(error);
  }
};

const initializeTransaction = async ( params ) => {
  const url = 'https://api.paystack.co/transaction/initialize';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const {data} = await response.json();
    console.log(data);
    return data.authorization_url

    } catch (error) {
      console.error(error);
    }
};

const getCustomerByEmailOrCode = async (emailOrCode) => {

  const url = `https://api.paystack.co/customer/${emailOrCode}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const {data} = await response.json();
    console.log(data.id);
    return data.id
  } catch (error) {
    console.error(error);
  }
};

const getTransactions = async (customerId) => {
  const url = `https://api.paystack.co/transaction?customer=${customerId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data
  } catch (error) {
    console.error(error);
  }
};



// const params = {
//   "email": "dev@gobskt.com",
//   "first_name": "Abdulwahab",
//   "last_name": "Salihu",
//   "phone": "+2348104723945",
// };
app.post('/api/createCustomer', async (req, res) => {
  const requestBody = req.body

  try {
    const createCust = await createCustomer(requestBody)

    res.json(createCust)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// const params = {
//   "email": "hey.gobskt@gmail.com",
// }
app.post('/api/getCustomerTransaction', async (req, res) => {
  const {email} = req.body;

  try {
    const customerId = await getCustomerByEmailOrCode(email)

    const transaction = await getTransactions(customerId)

    res.json(transaction)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


// const params = {
//   "email": "hey.gobskt@gmail.com",
//   "amount": "1000000",
//   "currency": "NGN",
// };
app.post('/api/initiateTransaction', async (req, res) => {
  const requestBody = req.body

  try {
    const initTransaction = await initializeTransaction(requestBody)

    res.json(initTransaction)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})



app.listen(PORT, () => console.log('server running on port: ' + PORT))



