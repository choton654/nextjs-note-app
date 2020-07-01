const express = require('express');
const next = require('next');
const dbConnect = require('./utils/dbConnect');
const Note = require('./models/Note');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

dbConnect();

app.prepare().then(() => {
  const server = express();

  // body parser
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());

  server.get('/api/notes', async (req, res) => {
    try {
      const notes = await Note.find({});
      // app.render(req, res, '/index', { data: notes });
      res.status(200).json({ success: true, data: notes });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

  server.post('/api/notes', async (req, res) => {
    try {
      const note = await Note.create(req.body);
      await note.save();
      res.status(200).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

  server.get('/api/notes/:id', async (req, res) => {
    try {
      const note = await Note.findOne({ _id: req.params.id });

      if (!note) {
        res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

  server.put('/api/notes/:id', async (req, res) => {
    try {
      const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!note) {
        res.status(400).json({ success: false });
      }

      res.status(200).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

  server.delete('/api/notes/:id', async (req, res) => {
    try {
      const deleteNote = await Note.findByIdAndDelete(req.params.id);

      if (!deleteNote) {
        res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

  server.get('/', (req, res) => {
    return app.render(req, res, '/index', req.query);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('server is running on port 3000');
  });
});
