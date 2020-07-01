import Link from 'next/link';

const Index = ({ notes }) => {
  return (
    <div className='container d-flex justify-content-start flex-wrap'>
      {notes.map((note) => (
        <div
          className='card m-2'
          style={{
            width: '18rem',
          }}>
          <div className='card-body'>
            <h1 key={note._id}>
              <Link href={`/${note._id}`}>
                <a
                  style={{
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}>
                  {note.title}
                </a>
              </Link>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');

  const { data } = await res.json();
  return { notes: data };
};

// export async function getServerSideProps(context) {
//   const notes = await Note.find({});
//   console.log(notes);
//   console.log(context);

//   return {
//     props: { notes },
//   };
// }

export default Index;
