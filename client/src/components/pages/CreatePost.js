import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";

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
    file: "",
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
    setFormData({ ...formData, file: files[0] });
  };

  //handle sumbit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/v1/posts/create",
      formData
    );

    console.log(res.data);
    // console.log(formData);
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
      <input type="file" id="file" onChange={handleFiles} />
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
