import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Create = () => {
  const [form, setform] = useState({ title: '', description: '' });
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSubmit) {
      createNote();
    }
  }, [isSubmit]);

  const createNote = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
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
    <div className='container'>
      <h1>Create Note</h1>
      {isSubmit ? (
        <h2>submitting...</h2>
      ) : (
        <form onSubmit={handelSubmit}>
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
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Create;
