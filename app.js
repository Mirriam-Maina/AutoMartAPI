import bodyParser from 'body-parser';
import express from 'express';
import controllers from './controllers';

const app = express();

app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true
    })
  );
app.use(bodyParser.json());

// app.use('*', (req, res) => res.status(404).json({
//     message: 'Not Found. Use /api/v1 to access the Api'
//   }));

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

//use the same url for all routes with the same route and encompassing all routes
controllers(app);

export default app;