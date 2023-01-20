import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    files: "",
  });

  //handle input
  const handleInput = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  //handle textarea content
  const handleContent = (newValue) => {
    setFormData({ ...formData, content: newValue });
  };

  //handle input files
  const handleFiles = (e) => {
    const { files } = e.target;
    setFormData({ ...formData, files: files[0] });
  };

  //handle sumbit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="title"
        placeholder="Title"
        id="title"
        value={formData.title}
        onChange={handleInput}
      />
      <input
        type="summary"
        placeholder="Summary"
        id="summary"
        value={formData.summary}
        onChange={handleInput}
      />
      <input
        type="file"
        id="files"
        // value={formData.files}
        onChange={handleFiles}
      />
      <ReactQuill
        value={formData.content}
        modules={modules}
        formats={formats}
        onChange={handleContent}
      />
      <button>Create Post</button>
    </form>
  );
};

export default CreatePost;
