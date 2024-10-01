const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));


const mongodbConnection = 'mongodb://127.0.0.1:27017/MemePage';

const fileSchema = new mongoose.Schema({
  filename: String,
  uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

mongoose.connect(mongodbConnection)
  .then(() => {
    console.log('Connected to MongoDB');

    const gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads',
    });

    const storage = multer.memoryStorage();

    const fileFilter = (req, file, cb) => {
      if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF and DOC files are allowed'), false);
      }
    };
    const upload = multer({ storage, fileFilter });

    app.post('/upload', upload.single('video'), async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).send('No file uploaded');
        }

        const video = req.file;

        const uploadStream = gridfsBucket.openUploadStream(video.originalname);
        uploadStream.end(video.buffer);

        uploadStream.on('error', () => {
          return res.status(500).send('Error at uploading file');
        });

        uploadStream.on('finish', async () => {
          const fileRecord = new File({
            filename: video.originalname,
          });
          await fileRecord.save();

          return res.status(201).send('File uploaded');
        });
      } catch (error) {
        console.error('Error during file upload:', error);
        return res.send('Internal Server Error');
      }
    });


    app.get('/file/:filename', async (req, res) => {
      try {
        const file = await gridfsBucket.openDownloadStreamByName(req.params.filename);
        file.pipe(res);
      } catch (error) {
        console.error('Error retrieving file:', error);
        return res.send('File not found');
      }
    });


    app.get('/files', async (req, res) => {
      try {
        const files = await File.find();
        res.json(files);
      } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    const userSchema = new mongoose.Schema({
      loginmail: {
        type: String,
        required: true,
        unique: true,
      },
      loginpassword: {
        type: String,
        required: true,
      },
      resetToken: String,
      resetTokenExpiry: Date,
    });
    
    const User = mongoose.model("User", userSchema);
    
    const generateAuthToken = (user, isReset) => {
      const payload = {
        loginmail: user.loginmail,
        isReset,
      };
      return jwt.sign(payload, 'surya', { expiresIn: '1h' });
    };
    
    const handleForgottenPassword = async (loginmail) => {
      try {
        const user = await User.findOne({ loginmail });
        if (!user) return { message: 'User not found' };
    
        const resetToken = jwt.sign({ loginmail: user.loginmail }, 'surya', { expiresIn: '1h' });
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000;
        await user.save();
    
        const resetLink = `http://localhost:3000/resetpassword/${resetToken}`;
        const mailOptions = {
          from: 'thotas381@gmail.com',
          to: loginmail,
          subject: 'Password Reset',
          text: `Click the following link to reset your password: ${resetLink}`,
        };
    
        const transporter = nodemailer.createTransport({
          host: 'smtp.googlemail.com',
          port: 465,
          secure: true,
          auth: { user: 'thotas381@gmail.com', pass: 'qrdi ktut seom sses' },
        });
    
        await transporter.sendMail(mailOptions);
    
        return { message: 'Reset email sent successfully', token: resetToken };
      } catch (error) {
        console.log('Error sending email:', error.message);
        return { message: 'Failed to send email', error: error.message };
      }
    };
    
    app.post('/signin', async (req, res) => {
      try {
        const { loginmail, loginpassword, forgottenpassword } = req.body;
    
        if (forgottenpassword) {
          return res.json(await handleForgottenPassword(loginmail));
        }
    
        let user = await User.findOne({ loginmail });
    
        if (user) {
          const isPasswordMatch = await bcrypt.compare(loginpassword, user.loginpassword);
          if (isPasswordMatch) {
            const authToken = generateAuthToken(user, false);
            return res.json({ message: 'Log In successful', authToken });
          }
          return res.json({ message: 'Incorrect password' });
        }
    
        const hashedPassword = await bcrypt.hash(loginpassword, 10);
        user = new User({ loginmail, loginpassword: hashedPassword });
        await user.save();
    
        const authToken = generateAuthToken(user, false);
        res.json({ message: 'User created and logged in successfully', authToken });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
      }
    });
    
    app.post('/resetpassword/:token', async (req, res) => {
      try {
        const { token } = req.params;
        const { newpassword } = req.body;
    
        const decodedToken = jwt.verify(token, 'surya');
        const user = await User.findOne({ loginmail: decodedToken.loginmail });
    
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (Date.now() > user.resetTokenExpiry) return res.status(400).json({ message: 'Reset token has expired' });
    
        user.loginpassword = await bcrypt.hash(newpassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();
    
        const authToken = generateAuthToken(user, true);
        res.json({ message: 'Password reset successfully', authToken });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
      }
    });


    const userDetailsSchema = new mongoose.Schema({
      date: {
        type: Date,
        required: false,
      },
      recruiter: {
        type: String,
        default: "Active",
        required: true,
      },
      domain: {
        type: String,
        default: "HTML/css",
        required: true,
      },
      candidate: {
        type: String,
        required: true
      },
      mobile: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      experience: {
        type: String,
        default: "0",
      },
      ctc: {
        type: String,
        default: "2-3L.P.A",
      },
      ectc: {
        type: String,
        default: "2-3L.P.A",
      },
      noticePeriod: {
        type: String,
        default: "Immediate",
      },
      remarks: {
        type: String,
        required: true
      },
    });

    const userDetailsModel = mongoose.model("UserDetails", userDetailsSchema);

    const userDetailsSubmission = async (req, res) => {
      try {
        const data = { ...req.body };
        console.log(data);

        await new userDetailsModel(data).save();

        res.json({ msg: "Successfully submitted" });
      } catch (error) {
        console.error(error);

        res.status(500).json({ error: `please fill all the fields and reupload Resume,${error.message}` });
      }
    };

    const getAllUserDetails = async (req, res) => {
      try {
        const allUserDetails = await userDetailsModel.find();

        res.json(allUserDetails);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    };

    app.post('/form', userDetailsSubmission);
    app.get('/all', getAllUserDetails);

    const employeeSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      address: {
        type: String,
        required: true,
      },
      salary: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      password:{
        type:String,
        required:true
      },
      image: {
        data: Buffer,
        contentType: String,
      },
    });
    
    const Employee = mongoose.model('Employee', employeeSchema);
    
    const storage1 = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads');
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split("/")[1]);
      },
    });
    
    const upload1 = multer({
      storage: storage1,
      limits: { fileSize: 1000000 },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload an image'));
        }
        cb(null, true);
      },
    });
    
    app.post('/employee', upload1.single('image'), async (req, res) => {
      try {
       
        if (!req.file) {
          return res.status(400).send('No file uploaded');
        }
        let checking=Employee.find({"email":req.body.email})
        const employeeData = {
          name: req.body.name,
          email: req.body.email,
          password:req.body.password,
          address: req.body.address,
          salary: req.body.salary,
          category: req.body.category,
          image: req.file.filename, 
        };
    
        const employee = new Employee(employeeData);
    
        await employee.save();
        await Employee.updateOne({
          email: employee.email 
        }, 
        {
          $set: {
            image: req.file.filename  
          }
        });
        res.send({ message: 'Employee saved' });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error' });
      }
    });
    
    
    
    app.get('/employees', async (req, res) => {

      try {
        let employees = await Employee.find()
          // .select('name email address salary category image');
    
        employees = employees.map(employee => {
          employee.imageUrl = `${req.protocol}://${req.headers.host}/uploads/${employee.image}`;
          return employee;
        });
    
        res.json(employees);
    
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server error' }); 
      }
    });
    
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });