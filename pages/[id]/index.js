import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Note = ({ note }) => {
  const [editing, setEditing] = useState(false);
  const [form, setform] = useState({ title: '', description: '' });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSubmit) {
      createNote();
    }
    if (isDelete) {
      deletenote();
    }
  }, [isSubmit, isDelete]);

  const deletenote = async () => {
    try {
      const noteId = router.query.id;
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: 'DELETE',
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${note._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };
  const handelChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='container d-flex justify-content-around flex-md-nowrap flex-wrap pt-2'>
      <div
        className='card'
        style={{
          width: '18rem',
        }}>
        <div className='card-body'>
          <h5 className='card-title'>{note.title}</h5>
          <p className='card-text'>{note.description}</p>
          <button
            type='button'
            onClick={() => setEditing(!editing)}
            className='card-link btn btn-primary'>
            Edit
          </button>
          <button
            type='button'
            onClick={() => setIsDelete(true)}
            className='card-link btn btn-danger'>
            Delete
          </button>
        </div>
      </div>
      {editing && (
        <div className='container'>
          {isSubmit ? (
            <h2>loading...</h2>
          ) : isDelete ? (
            <h2>deleting..</h2>
          ) : (
            <form
              onSubmit={handelSubmit}
              style={{
                width: '100%',
              }}>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Title</label>
                <input
                  type='text'
                  value={form.title}
                  onChange={handelChange}
                  name='title'
                  className='form-control'
                  id='exampleInputEmail1'
                  placeholder='Enter Title'
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Description</label>
                <textarea
                  type='text'
                  value={form.description}
                  onChange={handelChange}
                  name='description'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Description'
                  required
                  rows='3'></textarea>
              </div>
              <button type='submit' className='btn btn-primary'>
                Update
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);

  const { data } = await res.json();
  return { note: data };
};

export default Note;
