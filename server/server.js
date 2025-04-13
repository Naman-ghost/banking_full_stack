import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
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

app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     const sql = "SELECT * FROM alpha";
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             return res.status(500).json({ Message: "Error inside server" });
//         }
//         return res.json(result);
//     });
// });
// app.post('/make-payment/:id', (req, res) => {
//     const { id } = req.params; 
//     const { receiverId, amount, method, description } = req.body;

//     if (!receiverId || !amount || isNaN(amount) || amount <= 0) {
//         return res.status(400).json({ message: "Valid receiver ID and amount are required" });
//     }
//     db.beginTransaction((err) => {
//         if (err) {
//             console.error("Transaction error:", err);
//             return res.status(500).json({ message: "Transaction initiation failed" });
//         }

//         db.query("SELECT bank_balance FROM customers WHERE id = ?", [id], (err, senderResult) => {
//             if (err) {
//                 return db.rollback(() => {
//                     console.error("Error fetching sender balance:", err);
//                     res.status(500).json({ message: "Error retrieving sender balance" });
//                 });
//             }
//             if (senderResult.length === 0 || senderResult[0].bank_balance < amount) {
//                 return db.rollback(() => {
//                     res.status(400).json({ message: "Insufficient balance or sender not found" });
//                 });
//             }
//             db.query("UPDATE customers SET bank_balance = bank_balance - ? WHERE id = ?", [amount, id], (err) => {
//                 if (err) {
//                     return db.rollback(() => {
//                         console.error("Error deducting sender balance:", err);
//                         res.status(500).json({ message: "Error deducting sender balance" });
//                     });
//                 }
//                 db.query("UPDATE customers SET bank_balance = bank_balance + ? WHERE id = ?", [amount, receiverId], (err) => {
//                     if (err) {
//                         return db.rollback(() => {
//                             console.error("Error adding receiver balance:", err);
//                             res.status(500).json({ message: "Error adding receiver balance" });
//                         });
//                     }
//                     const paymentSql = `INSERT INTO Past_Payments 
//                         (sender_account_id, receiver_account_id, payment_amount, payment_date, payment_status, payment_method, description) 
//                         VALUES (?, ?, ?, NOW(), 'Completed', ?, ?)`;

//                     db.query(paymentSql, [id, receiverId, amount, method, description], (err) => {
//                         if (err) {
//                             return db.rollback(() => {
//                                 console.error("Error recording payment:", err);
//                                 res.status(500).json({ message: "Error recording payment" });
//                             });
//                         }
//                         db.commit((err) => {
//                             if (err) {
//                                 return db.rollback(() => {
//                                     console.error("Transaction commit failed:", err);
//                                     res.status(500).json({ message: "Transaction commit failed" });
//                                 });
//                             }
//                             res.json({ message: `Payment of ₹${amount} sent successfully from Customer ${id} to ${receiverId}` });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });
// app.post('/make-payment/:id', (req, res) => {
//     const { id } = req.params;
//     const { receiverId, amount, method, description } = req.body;
//     if (!receiverId || !amount || isNaN(amount) || amount <= 0) {
//         return res.status(400).json({ message: "Valid receiver ID and amount are required" });
//     }
//     db.beginTransaction((err) => {
//         if (err) {
//             console.error("Transaction error:", err);
//             return res.status(500).json({ message: "Transaction initiation failed" });
//         }

//         const balanceCheckQuery = `
//             SELECT s.bank_balance AS sender_balance, r.bank_balance AS receiver_balance
//             FROM customers s
//             JOIN customers r ON r.id = ?
//             WHERE s.id = ?;
//         `;
//         db.query(balanceCheckQuery, [receiverId, id], (err, results) => {
//             if (err) {
//                 return db.rollback(() => {
//                     console.error("Error fetching balances:", err);
//                     res.status(500).json({ message: "Error retrieving balances" });
//                 });
//             }
//             if (results.length === 0 || results[0].sender_balance < amount) {
//                 return db.rollback(() => {
//                     res.status(400).json({ message: "Insufficient balance or invalid sender/receiver" });
//                 });
//             }
//             const updateSender = "UPDATE customers SET bank_balance = bank_balance - ? WHERE id = ?";
//             db.query(updateSender, [amount, id], (err) => {
//                 if (err) {
//                     return db.rollback(() => {
//                         console.error("Error deducting sender balance:", err);
//                         res.status(500).json({ message: "Error deducting sender balance" });
//                     });
//                 }
//                 const updateReceiver = "UPDATE customers SET bank_balance = bank_balance + ? WHERE id = ?";
//                 db.query(updateReceiver, [amount, receiverId], (err) => {
//                     if (err) {
//                         return db.rollback(() => {
//                             console.error("Error adding receiver balance:", err);
//                             res.status(500).json({ message: "Error adding receiver balance" });
//                         });
//                     }
//                     const paymentSql = `
//                         INSERT INTO past_payments 
//                         (sender_account_id, receiver_account_id, payment_amount, payment_date, payment_status, payment_method, description)
//                         VALUES (?, ?, ?, NOW(), 'Completed', ?, ?);
//                     `;
//                     db.query(paymentSql, [id, receiverId, amount, method, description], (err) => {
//                         if (err) {
//                             return db.rollback(() => {
//                                 console.error("Error recording payment:", err);
//                                 res.status(500).json({ message: "Error recording payment" });
//                             });
//                         }
//                         db.commit((err) => {
//                             if (err) {
//                                 return db.rollback(() => {
//                                     console.error("Transaction commit failed:", err);
//                                     res.status(500).json({ message: "Transaction commit failed" });
//                                 });
//                             }
//                             res.json({ message: `Payment of ₹${amount} sent successfully from Customer ${id} to ${receiverId}` });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });


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


  

  
  app.post('/make-payment/:id', (req, res) => {
    const { id } = req.params; 
    const { receiverId, amount, method, description } = req.body;
  
    if (!receiverId || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Valid receiver ID and amount are required" });
    }
  
    db.beginTransaction((err) => {
      if (err) {
        console.error("Transaction error:", err);
        return res.status(500).json({ message: "Transaction initiation failed" });
      }
  
      // JOIN to get both sender and receiver info
      const balanceQuery = `
        SELECT 
          sender.id AS sender_id, sender.bank_balance AS sender_balance, sender.username AS sender_name,
          receiver.id AS receiver_id, receiver.bank_balance AS receiver_balance, receiver.username AS receiver_name
        FROM customers AS sender
        JOIN customers AS receiver ON receiver.id = ?
        WHERE sender.id = ?
      `;
  
      db.query(balanceQuery, [receiverId, id], (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error fetching balances:", err);
            res.status(500).json({ message: "Error retrieving balances" });
          });
        }
  
        if (result.length === 0 || result[0].sender_balance < amount) {
          return db.rollback(() => {
            res.status(400).json({ message: "Insufficient balance or invalid user(s)" });
          });
        }
  
        // Deduct from sender
        db.query("UPDATE customers SET bank_balance = bank_balance - ? WHERE id = ?", [amount, id], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error deducting sender balance:", err);
              res.status(500).json({ message: "Error deducting sender balance" });
            });
          }
  
          // Add to receiver
          db.query("UPDATE customers SET bank_balance = bank_balance + ? WHERE id = ?", [amount, receiverId], (err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Error adding receiver balance:", err);
                res.status(500).json({ message: "Error adding receiver balance" });
              });
            }
  
            // Record the payment
            const insertQuery = `
              INSERT INTO past_payments 
                (sender_account_id, receiver_account_id, payment_amount, payment_date, payment_status, payment_method, description) 
              VALUES (?, ?, ?, NOW(), 'Completed', ?, ?)
            `;
  
            db.query(insertQuery, [id, receiverId, amount, method, description], (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error("Error recording payment:", err);
                  res.status(500).json({ message: "Error recording payment" });
                });
              }
  
              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error("Transaction commit failed:", err);
                    res.status(500).json({ message: "Transaction commit failed" });
                  });
                }
  
                const sender = result[0].sender_name;
                const receiver = result[0].receiver_name;
  
                res.json({
                  message: `₹${amount} successfully transferred from ${sender} to ${receiver}`
                });
              });
            });
          });
        });
      });
    });
  });
  


// app.post('/fixed-deposits', (req, res) => {
//     const { userId, amount, interestRate, duration } = req.body;
  
//     // Add logic to handle FD creation here
  
//     res.status(200).json({ message: 'Fixed Deposit created successfully!' });
//   });

// Fix for /create-fd route
app.post('/fixed-deposits', (req, res) => {
    const { userId, amount, interestRate, maturityDate } = req.body;

    if (!userId || !amount || !interestRate || !maturityDate) {
        return res.status(400).json({ error: 'All fields (userId, amount, interestRate, maturityDate) are required' });
    }

    const checkQuery = `
        SELECT bank_balance, 
               (SELECT COUNT(*) FROM fixed_deposits WHERE user_id = ? AND status = 'Active') AS active_fd_count
        FROM customers WHERE id = ?;
    `;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Transaction error:', err);
            return res.status(500).json({ error: 'Transaction initiation failed' });
        }

        db.query(checkQuery, [userId, userId], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    console.error('Error checking FD:', err);
                    res.status(500).json({ error: 'Internal Server Error', details: err });
                });
            }
            if (result.length === 0) {
                return db.rollback(() => {
                    return res.status(400).json({ error: 'User not found' });
                });
            }

            const bankBalance = result[0].bank_balance;
            const activeFdCount = result[0].active_fd_count;

            if (activeFdCount > 0) {
                return db.rollback(() => {
                    return res.status(400).json({ error: 'An active FD already exists' });
                });
            }
            if (amount > bankBalance) {
                return db.rollback(() => {
                    return res.status(400).json({ error: 'FD amount exceeds bank balance' });
                });
            }

            // Step 2: Create FD & Deduct Balance
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
        SELECT 
            fd.fd_id, 
            fd.amount, 
            fd.interest_rate, 
            fd.start_date, 
            fd.maturity_date,  
            c.username 
        FROM fixed_deposits fd
        JOIN customers c ON fd.user_id = c.id
        WHERE fd.user_id = ?;
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching FDs:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});








app.listen(8081, () => {
    console.log("Server started on port 8081");
});
