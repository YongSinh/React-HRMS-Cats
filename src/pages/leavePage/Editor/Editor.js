import { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
// import ImageResize from 'quill-image-resize-module-react';
import "./editor.css";

// Quill.register('modules/imageResize', ImageResize);

/*
 * Simple editor component that takes placeholder text as a prop
 */
class Editor extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { editorHtml: "" };
  //   this.handleChange = this.handleChange.bind(this);
  // }


  // componentDidUpdate(prevProps) {
  //   if (prevProps.value !== this.props.value && this.props.value !== this.state.editorHtml) {
  //     this.setState({ editorHtml: this.props.value || "" });
  //   }
  // }


  // handleChange(html) {
  //   this.setState({ editorHtml: html });
  //   const div = document.createElement("div");

  //   div.innerHTML = html;

  //   const plainText = div.textContent || div.innerText || "";

  //   console.log(plainText); // Log the plain text

  //   if (this.props.onChange) {
  //     this.props.onChange(plainText);
  //   }
  // }


  constructor(props) {
    super(props);
    this.state = { editorHtml: this.props.value || "" };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Update the editor's state only if the props have changed and the new value is different from the current state
    if (prevProps.value !== this.props.value && this.props.value !== this.state.editorHtml) {
      this.setState({ editorHtml: this.props.value || "" });
    }
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    const div = document.createElement("div");

    div.innerHTML = html;

    const plainText = div.textContent || div.innerText || "";
    // Pass the updated content (html) back to the parent via onChange prop
    if (this.props.onChange) {
      this.props.onChange(html); // Pass HTML, not plain text
    }
  }





  render() {
    return (
      <ReactQuill
        theme={this.state.theme}
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={"#root"}
        placeholder={this.props.placeholder}
      />
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  //   imageResize: {
  //     parchment: Quill.import('parchment'),
  //     modules: ['Resize', 'DisplaySize']
  //   }
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
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
  "video",
];

export default Editor;
