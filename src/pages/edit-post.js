import EditPostInfor from '../components/post/edit-post';

export default function EditPost(content) {
  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <EditPostInfor content = {content}/>
      </div>
    </div>
  );
  }
