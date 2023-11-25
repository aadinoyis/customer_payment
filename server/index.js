import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'


dotenv.config()


const app = express()
const PORT = 8080


app.use(express.json())
app.use(cors())

// create a new customer
const createCustomer = async (params) => {
  const url = 'https://api.paystack.co/customer';

  try {
    const response = await axios.post(url, params, {
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// create a new payment
const initializeTransaction = async (params) => {
  const url = 'https://api.paystack.co/transaction/initialize';

  try {
    const response = await axios.post(url, params, {
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = response;
    console.log(data);
    return data.data.authorization_url;
  } catch (error) {
    console.error(error);
  }
};

// get the customer using customer email
const getCustomerByEmailOrCode = async (emailOrCode) => {

  const url = `https://api.paystack.co/customer/${emailOrCode}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const {data} = response;
    console.log(data.data.id);
    return data.data.id;
  } catch (error) {
    console.error(error);
  }
};

// get transactions using customer id
const getTransactions = async (customerId) => {
  const url = `https://api.paystack.co/transaction?customer=${customerId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};



// const params = {
//   "email": "email@gmail.com",
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
//   "email": "email@gmail.com",
// }
app.post('/api/getCustomerTransaction', async (req, res) => {
  const {email} = req.body;

  try {
    const customerId = await getCustomerByEmailOrCode(email)
    // get the customer Id from the email provided

    const transaction = await getTransactions(customerId)
    // get the customer transactions using the Id

    res.json(transaction)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


// const params = {
//   "email": "email@gmail.com",
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

app.get('/api/hello', async (req, res) => {
  res.json('hello')
})


app.listen(PORT, () => console.log('server running on port: ' + PORT))

