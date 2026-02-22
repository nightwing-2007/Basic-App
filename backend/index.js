const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// ----------------------------------------------------------------------------------------------------
const nodemailer = require("nodemailer");           // Mailer
// ----------------------------------------------------------------------------------------------------




const app = express();

// Middlewares
app.use(cors());



app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://mandalsoumyadip09_db_user:OjcK5r3i6wGJNygr@cluster0.55tkzfg.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));



// ----------------------------------------------------------------------------------------------------
// Mailer
// ----------------------------------------------------------------------------------------------------


// --Gmail Transporter--
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mandalsoumyadip09@gmail.com",
    pass: "pksb lcyl ferp amdu"  // use app password here
  }
});


//-----------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------
// User Side
// ----------------------------------------------------------------------------------------------------


// --User Schema & Model--
const UserSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  phone: String,
  place: String
});

const User = mongoose.model("cards", UserSchema);


// ----------------------------------------------------------------------------------------------------


// Signup Route

app.post("/user/signup", async (req, res) => {
  try {
    const { fname, lname, email, password, phone, place } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save new user (password not hashed for simplicity)
    const newUser = new User({ fname, lname, email, password, phone, place });
    await newUser.save();


    // ----------------------------------------------------------------------------------------------------


    // --Email message--
    const mailOptions = {
      from: "mandalsoumyadip09@gmail.com",
      to: email,
      subject: "Signup Successful ✔",
      html: `
        <h2>Welcome ${fname} ${lname}!</h2>
        <p>Your account has been created successfully.</p>
        <h3>Your Credentials:</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Place:</strong> ${place}</p>
        <br/>
        <p>Thank you for signing up! 😊</p>
      `
    };

    // Send email

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Email error:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(200).json({ message: "Signup successful & email sent!", user: newUser });
  }
  
  catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ----------------------------------------------------------------------------------------------------


// User Login Route

app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and password (plain text check)
    const user = await User.findOne({ email, password});
  
    if (!user) {
      
      return res.status(401).json({ message: "Invalid email or password" });

    }
    else {
      res.status(200).json({ message: "Login successful", user,
        status:200
       });
    }
  } 
  
  catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ----------------------------------------------------------------------------------------------------


// User Details Edit Route

app.put("/edit", async (req, res) => {
  try {
    const { fname, lname, email, password, phone, place } = req.body;

    // Update user based on email
    const updatedUser = await User.findOneAndUpdate(
      { email }, 
      { fname, lname, password, phone, place }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});








const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Items" },
  name: String,
  price: Number,
  qty: Number,
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    status: {
      type: String,
      enum: ["Order Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"],
      default: "Order Confirmed",
    },

    estimatedDelivery: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);






app.post("/order/place-order", async (req, res) => {
  try {
    const { email, name, address, items, total, paymentMethod } = req.body;

    if (!email || !name || !address || !items || !total) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generate Order ID
    const orderId = "ORD" + Date.now();

    // Estimated delivery: 5 days from now
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    const newOrder = new Order({
      orderId,
      email,
      name,
      address,
      items,
      total,
      paymentMethod: paymentMethod || "Cash on Delivery",
      estimatedDelivery,
    });

    await newOrder.save();

    res.status(200).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});




app.get("/user/my-orders", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const orders = await Order.find({ email })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});









// Get all orders (Admin)
app.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }); // ✅ latest first (professional)

    res.status(200).json({
      message: "All orders fetched successfully",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});




app.put("/admin/update-order-status/:orderId", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});








// ----------------------------------------------------------------------------------------------------
// Admin Side
// ----------------------------------------------------------------------------------------------------


// Admin Schema & Model
const AdminSchema = new mongoose.Schema({
  userid: String,
  password: String
});

const Admin = mongoose.model("admin-cards", AdminSchema);


// Admin Login Route

app.post("/admin/login", async (req, res) => {
  try {
    const { userid, password } = req.body;

    // Find admin by userid and password (plain text check)
    console.log(req.body);
    
    const admin = await Admin.findOne({ userid, password});
  
  
    if (!admin) {
      
      return res.status(401).json({ 
        message: `Access denied.
        Invalid user id or password.` });
      // res.json({ message: "Login unsuccessful", user });
    }
    else {
      res.status(200).json({ message: "Login successful", admin,
        status:200
       });
    }
  } 
  
  catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ----------------------------------------------------------------------------------------------------


// Products

// Product Schema & Model
const ItemSchema = new mongoose.Schema({
  category: String,
  name: String,
  image: String,
  price: Number,
  desc: String,
  stock: Number
});

const Item = mongoose.model("Items", ItemSchema);





// Route: Add new item
app.post("/admin/add-new-products", async (req, res) => {
  try {
    const { category, name, image, price, desc, stock } = req.body;
    const newItem = new Item({ category, name, image, price, desc, stock });
    await newItem.save();
    res.status(200).json({ message: "Item added successfully", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



// Fetching all items from backend
app.get("/admin/add-new-products", async (req, res) => {
  try {
    const items = await Item.find(); // fetch all products
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});






// // Route: Update item quantity
// app.put("/items/:id", async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     const updated = await Item.findByIdAndUpdate(
//       req.params.id,
//       { quantity },
//       { new: true }
//     );
//     res.json({ message: "Item updated", item: updated });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // Route: Delete item
// app.delete("/items/:id", async (req, res) => {
//   try {
//     await Item.findByIdAndDelete(req.params.id);
//     res.json({ message: "Item deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });


// ----------------------------------------------------------------------------------------------------


// Employee


// Employee Schema & Model
const EmplSchema = new mongoose.Schema({
  // category: String,
  name: String,
  image: String,
  eduqual: String,
  expr: String,
  adrs: String
});

const Empl = mongoose.model("Employee Details", EmplSchema);





// Route: Add new Employee
app.post("/admin/add-new-employee", async (req, res) => {
  try {
    const { name, image, eduqual, expr, adrs } = req.body;
    const newEmpl = new Empl({ name, image, eduqual, expr, adrs });
    await newEmpl.save();
    res.status(200).json({ message: "Employee added successfully", item: newEmpl });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



// Fetching Employee Details from backend
app.get("/admin/add-new-employee", async (req, res) => {
  try {
    const empl = await Empl.find(); // fetch all products
    res.status(200).json(empl);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});






// // Route: Update item quantity
// app.put("/items/:id", async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     const updated = await Item.findByIdAndUpdate(
//       req.params.id,
//       { quantity },
//       { new: true }
//     );
//     res.json({ message: "Item updated", item: updated });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // Route: Delete item
// app.delete("/items/:id", async (req, res) => {
//   try {
//     await Item.findByIdAndDelete(req.params.id);
//     res.json({ message: "Item deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });


// ----------------------------------------------------------------------------------------------------



// OTP Schema & Model
const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // expires in 5 minutes
});

const Otp = mongoose.model("Otp Codes", OtpSchema);




// Generate a random 6 digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}



// --Sending OTP--
app.post("/user/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user){
      return res.status(401).json({ message: "Email ID is not registered with us" });
    }

    

    const otp = generateOtp();

    await Otp.create({ email, otp });

    
    // --Email message & Send mail--
    await transporter.sendMail({
      from: "mandalsoumyadip09@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
    });

    res.status(200).json({ success: true, message: "OTP sent successfully!" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
});




// Verifying OTP
app.post("/user/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  // Find user by email and password (plain text check)

  const check = await Otp.findOne({ email, otp });
  const user = await User.findOne({ email })

  if (!check) {
    return res.status(401).json({ success: false, message: "Invalid OTP!" });
  }

  return res.status(200).json({ success: true, message: "OTP Verified!", user });

  
});




// Password edit (if password forgot)
app.put("/changepass", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Update user based on email
    const updatedUser = await User.findOneAndUpdate(
      { email }, 
      { password }, 
      { new: true }
    );
    console.log(User);
    console.log(User.email);
    
    
    console.log(updatedUser);
    
    if (!updatedUser) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Password updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});




app.listen(5000, () => console.log("Server running on port 5000"));