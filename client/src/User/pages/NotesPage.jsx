import NoteCard from "../component/NotesCard";
import Layout from "../layout/Layout";

const NotesPage = () => {
  return (
    <Layout title="codewithmithlesh - Notes">
      <div className="px-16 py-12">
        <NoteCard />
      </div>
    </Layout>
  );
};

export default NotesPage;
