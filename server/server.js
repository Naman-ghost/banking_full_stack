import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'college_1'
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JWT secret
const JWT_SECRET = "your_jwt_secret";

////

app.get('/mainpage/:userId', (req, res) => {
    const id = req.params.userId;
    if (!id) return res.status(400).json({ message: "Invalid user ID" });

    const sql = `
        SELECT c.id, c.username, c.email, c.last_login, c.bank_balance,
               ci.first_name, ci.last_name, ci.phone, ci.address, ci.city,
               ci.date_of_birth, ci.gender
        FROM customers c
        left JOIN customerinfo ci ON c.username = ci.username
        WHERE c.id = ?
    `;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error retrieving user" });
        if (result.length === 0) return res.status(404).json({ message: "User not found" });
        return res.json(result[0]);
    });
});

//    LOGIN PAGE 

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const sql = "SELECT * FROM customers WHERE username = ?";
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error("Error checking username:", err);
            return res.status(500).json({ message: "Error checking username" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Username not found" });
        }

        const user = result[0];

        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const updateLoginSql = "UPDATE customers SET last_login = NOW() WHERE id = ?";
        db.query(updateLoginSql, [user.id], (err) => {
            if (err) {
                console.error("Error updating last login:", err);
                return res.status(500).json({ message: "Error updating last login" });
            }
            return res.json({ message: "Login successful", userId: user.id, lastLogin: new Date() });
        });
    });
});


app.get('/read/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM alpha WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ Message: "Error inside server" });
        }
        if (result.length === 0) {
            return res.status(404).json({ Message: "No data found for this id" });
        }
        return res.json(result[0]);
    });
});
app.put('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ message: "Name and age are required" });
    }
    const sql = "UPDATE alpha SET name = ?, age = ? WHERE id = ?";
    db.query(sql, [name, age, id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ Message: "Error updating data in the database" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Message: "No data found to update for this id" });
        }
        return res.json({ message: "Data updated successfully", result });
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM alpha WHERE id = ?";  
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ Message: "Error deleting data from the database" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Message: "No data found to delete for this id" });
        }
        return res.json({ message: "Data deleted successfully", result });
    });
});

app.post('/alpha', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ message: "Name and age are required" });
    }
    const sql = "INSERT INTO alpha (name, age) VALUES (?, ?)";
    db.query(sql, [name, age], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: "Error inserting data into database", error: err });
        }
        return res.json({ message: "Data inserted successfully", result });
    });
});
app.get('/past-payments/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
      SELECT * FROM past_payments 
      WHERE sender_account_id = ? OR receiver_account_id = ?
      ORDER BY payment_date DESC
    `;
  
    db.query(query, [userId, userId], (err, results) => {
      if (err) {
        console.error('Error fetching past payments:', err);
        return res.status(500).json({ error: 'Error fetching past payments' });
      }
      res.json(results);
    });
  });


/////  MAKE PAYMENT

app.post('/make-payment/:id', (req, res) => {
    const { id: senderId } = req.params; // senderId from URL
    const { receiverId, amount, method, description, password } = req.body; // Extract the password from the body
  
    // Basic validation
    if (!receiverId || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Valid receiver ID and amount are required" });
    }
  
    if (receiverId === senderId) {
      return res.status(400).json({ message: "Sender and receiver cannot be the same user" });
    }
  
    // Use a JOIN query to fetch both sender and receiver information in a single query
    db.query(`
      SELECT 
        sender.id AS sender_id, sender.bank_balance AS sender_balance, sender.password AS sender_password,
        receiver.id AS receiver_id, receiver.username AS receiver_username
      FROM customers AS sender
      JOIN customers AS receiver ON receiver.id = ?
      WHERE sender.id = ?;
    `, [receiverId, senderId], (err, results) => {
      if (err) {
        console.error("Error with the query:", err);
        return res.status(500).json({ message: "Server error" });
      }
  
      if (results.length === 0) {
        return res.status(403).json({ message: "Sender or receiver not found" });
      }
  
      const { sender_balance, sender_password, receiver_username } = results[0];
  
      // Compare entered password with stored password
      if (password !== sender_password) {
        return res.status(403).json({ message: "Incorrect password" });
      }
  
      // Check if sender has enough balance
      if (sender_balance < amount) {
        return res.status(403).json({ message: "Insufficient balance" });
      }
  
      // Start a database transaction
      db.beginTransaction((err) => {
        if (err) {
          console.error("Transaction error:", err);
          return res.status(500).json({ message: "Transaction initiation failed" });
        }
  
        // Deduct from sender's account
        db.query("UPDATE customers SET bank_balance = bank_balance - ? WHERE id = ?", [amount, senderId], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error deducting sender balance:", err);
              res.status(500).json({ message: "Error deducting sender balance" });
            });
          }
  
          // Add to receiver's account
          db.query("UPDATE customers SET bank_balance = bank_balance + ? WHERE id = ?", [amount, receiverId], (err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Error adding receiver balance:", err);
                res.status(500).json({ message: "Error adding receiver balance" });
              });
            }
  
            // Record the payment in the past_payments table
            const insertQuery = `
              INSERT INTO past_payments 
                (sender_account_id, receiver_account_id, payment_amount, payment_date, payment_status, payment_method, description) 
              VALUES (?, ?, ?, NOW(), 'Completed', ?, ?)
            `;
  
            db.query(insertQuery, [senderId, receiverId, amount, method, description], (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error("Error recording payment:", err);
                  res.status(500).json({ message: "Error recording payment" });
                });
              }
  
              // Commit the transaction
              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error("Transaction commit failed:", err);
                    res.status(500).json({ message: "Transaction commit failed" });
                  });
                }
  
                // ✅ Fix: use backticks for template literal response
                res.json({
                  message: `₹${amount} successfully transferred from your account to ${receiver_username}`,
                });
              });
            });
          });
        });
      });
    });
  });


// fixed-deposits



app.post('/fixed-deposits', (req, res) => {
    const { userId, amount, interestRate, maturityDate } = req.body;

    if (!userId || !amount || !interestRate || !maturityDate) {
        return res.status(400).json({ error: 'All fields (userId, amount, interestRate, maturityDate) are required' });
    }

    const checkQuery = `
        SELECT bank_balance
        FROM customers WHERE id = ?;
    `;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Transaction error:', err);
            return res.status(500).json({ error: 'Transaction initiation failed' });
        }

        db.query(checkQuery, [userId], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    console.error('Error checking bank balance:', err);
                    res.status(500).json({ error: 'Internal Server Error', details: err });
                });
            }
            if (result.length === 0) {
                return db.rollback(() => {
                    return res.status(400).json({ error: 'User not found' });
                });
            }

            const bankBalance = result[0].bank_balance;

            // Check if FD amount exceeds bank balance
            if (amount > bankBalance) {
                return db.rollback(() => {
                    return res.status(400).json({ error: 'FD amount exceeds bank balance' });
                });
            }

            // Step 2: Create FD
            const createFDQuery = `
                INSERT INTO fixed_deposits (user_id, amount, interest_rate, maturity_date, status) 
                VALUES (?, ?, ?, ?, 'Active')
            `;

            db.query(createFDQuery, [userId, amount, interestRate, maturityDate], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Error creating FD:', err);
                        res.status(500).json({ error: 'Error creating FD', details: err });
                    });
                }

                const fdId = result.insertId;

                // Step 3: Deduct FD amount from bank balance
                const updateBalanceQuery = `
                    UPDATE customers SET bank_balance = bank_balance - ? WHERE id = ?;
                `;
                db.query(updateBalanceQuery, [amount, userId], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Error updating balance:', err);
                            res.status(500).json({ error: 'Error updating balance', details: err });
                        });
                    }

                    // Commit transaction
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                console.error('Transaction commit failed:', err);
                                res.status(500).json({ error: 'Transaction commit failed', details: err });
                            });
                        }
                        res.json({ message: 'FD created successfully', fdId });
                    });
                });
            });
        });
    });
});



// FD Details Route (Fix for query params)
app.get('/fds/:userId', (req, res) => {
    const userId = req.params.userId;
  
    const query = `
      SELECT fd_id, amount, interest_rate, start_date, maturity_date, status
      FROM fixed_deposits
      WHERE user_id = ?;
    `;
    db.query(query, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
    });
  });
  



// Backend: Express.js route to break FD
app.post('/fds/break/:userId/:fdId', (req, res) => {
    const { userId, fdId } = req.params;
  
    const fdQuery = `
      SELECT amount, interest_rate, status
      FROM fixed_deposits
      WHERE user_id = ? AND fd_id = ? AND status = 'Active';
    `;
  
    db.query(fdQuery, [userId, fdId], (err, fdResult) => {
      if (err || fdResult.length === 0) {
        return res.status(400).json({ error: 'FD not found or already closed' });
      }
  
      const fd = fdResult[0];
      const penaltyRate = fd.amount <= 500000 ? 0.005 : 0.01;
      const penaltyAmount = fd.amount * penaltyRate;
      const refundAmount = fd.amount - penaltyAmount;
  
      const updateFDQuery = `
        UPDATE fixed_deposits
        SET status = 'Closed', maturity_date = NOW()
        WHERE fd_id = ?;
      `;
  
      db.query(updateFDQuery, [fdId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to close FD' });
  
        const updateBalanceQuery = `
          UPDATE customers SET bank_balance = bank_balance + ? WHERE id = ?;
        `;
        db.query(updateBalanceQuery, [refundAmount, userId], (err) => {
          if (err) return res.status(500).json({ error: 'Failed to update bank balance' });
  
          res.json({
            message: `FD closed successfully. Penalty: ₹${penaltyAmount.toFixed(2)}, Refunded: ₹${refundAmount.toFixed(2)}`,
            penaltyAmount,
            refundAmount
          });
        });
      });
    });
  });
  




  



// VISVJIT 

//authentication
app.post('/admin-login', (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM admins WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const admin = results[0];

        try {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = jwt.sign(
                { id: admin.id, email: admin.email, name: admin.name },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({
                token,
                message: "Login successful!",
                admin: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                }
            });

        } catch (err) {
            console.error("Bcrypt error:", err);
            res.status(500).json({ message: "Server error" });
        }
    });
});


app.post('/create-admin', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error("Hashing error:", err);
            return res.status(500).json({ message: "Error creating admin" });
        }

        db.query(
            "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error("DB Insert Error:", err);
                    return res.status(500).json({ message: "Error creating admin" });
                }

                res.json({ message: "Admin created successfully" });
            }
        );
    });
});


//admin work

app.post('/add-customer', (req, res) => {
    const {
      username, password, email,
      first_name, last_name, phone, address,
      city, date_of_birth, gender
    } = req.body;
  
    // Future date check for DOB
    const today = new Date();
    const dob = new Date(date_of_birth);
    if (dob > today) {
      return res.status(400).json({ success: false, message: "Date of birth cannot be in the future." });
    }
  
    db.beginTransaction(err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
      }
  
    db.query(
        `INSERT INTO customers (username, password, email, bank_balance) VALUES (?, ?, ?, 0)`,
        [username, password, email],
        (err, result) => {
          if (err) {
            return db.rollback(() => {
              console.error(err);
              res.status(500).json({ success: false, error: err.message });
            });
          }
  
          const insertedCustomerId = result.insertId; // Auto-incremented ID
  
          db.query(
            `INSERT INTO customerinfo 
              (username, first_name, last_name, phone, address, city, date_of_birth, gender) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [username, first_name, last_name, phone, address, city, date_of_birth, gender],
            (err, result) => {
              if (err) {
                return db.rollback(() => {
                  console.error(err);
                  res.status(500).json({ success: false, error: err.message });
                });
              }
  
              db.commit(err => {
                if (err) {
                  return db.rollback(() => {
                    console.error(err);
                    res.status(500).json({ success: false, error: err.message });
                  });
                }
  
                res.json({ success: true, message: "Customer and info added!", customerId: insertedCustomerId });
              });
            }
          );
        }
      );
    });
  });
  

// Deposit money
app.post('/deposit', (req, res) => {
    const { customerId, amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ success: false, message: "Amount must be greater than 0" });
    }

    db.query(`SELECT * FROM customers WHERE id = ?`, [customerId], (err, customer) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }

        if (customer.length === 0) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        db.query(
            `UPDATE customers SET bank_balance = bank_balance + ? WHERE id = ?`,
            [amount, customerId],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, error: err.message });
                }

                db.query(
                    `INSERT INTO past_payments 
                     (sender_account_id, receiver_account_id, payment_amount, payment_date, payment_status, payment_method, description)
                     VALUES (?, NULL, ?, NOW(), 'Completed', 'Deposit', 'Deposit transaction')`,
                    [customerId, amount],
                    (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ success: false, error: err.message });
                        }

                        res.json({ success: true, message: "Deposit successful!", paymentId: result.insertId });
                    }
                );
            }
        );
    });
});

// Get customer info by ID
app.get('/admin_customer/:id', (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM customers WHERE id = ?`, [id], (err, customer) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }

        if (customer.length === 0) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        db.query(
            `SELECT * FROM past_payments WHERE sender_account_id = ? OR receiver_account_id = ? ORDER BY payment_date DESC`,
            [id, id],
            (err, transactions) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, error: err.message });
                }

                res.json({ success: true, customer: customer[0], transactions });
            }
        );
    });
});

// Get all customers
app.get('/admin_customers', (req, res) => {
    db.query("SELECT * FROM customers", (err, customers) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }

        res.json(customers);
    });
});

// Delete customer
app.delete('/admin_customers/:id', (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM customers WHERE id = ?`, [id], (err, customer) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }

        if (customer.length === 0) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        db.query(`DELETE FROM customers WHERE id = ?`, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: err.message });
            }

            res.json({ success: true, message: "Customer deleted successfully!" });
        });
    });
});

// Get total number of customers
app.get('/total-customers', (req, res) => {
    db.query("SELECT COUNT(*) AS totalCustomers FROM customers", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching customer count" });
        }

        res.json({ totalCustomers: result[0].totalCustomers });
    });
});

// Get all transactions
app.get('/admin_transactions', (req, res) => {
    db.query(`
        SELECT p.payment_id, 
               c1.username AS sender, 
               c2.username AS receiver,
               p.payment_amount, 
               p.payment_date, 
               p.payment_method, 
               p.description
        FROM past_payments p
        LEFT JOIN customers c1 ON p.sender_account_id = c1.id
        LEFT JOIN customers c2 ON p.receiver_account_id = c2.id
        ORDER BY p.payment_date DESC
    `, (err, transactions) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }

        res.json({ success: true, transactions });
    });
});


// Total number of transactions
app.get('/total-transactions', (req, res) => {
    db.query("SELECT COUNT(*) AS totalTransactions FROM past_payments", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching transaction count" });
        }

        res.json({ totalTransactions: result[0].totalTransactions });
    });
});

// Today's total transaction amount
app.get('/today-transactions-amount', (req, res) => {
    db.query(`
        SELECT IFNULL(SUM(payment_amount), 0) AS totalToday
        FROM past_payments
        WHERE DATE(payment_date) = CURDATE()
    `, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching today's transaction amount" });
        }

        res.json({ totalToday: result[0].totalToday });
    });
});



app.listen(8081, () => {
    console.log("Server started on port 8081");
});