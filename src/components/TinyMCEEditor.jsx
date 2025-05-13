import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = ({ initialValue, onChange }) => {
  return (
    <Editor
    apiKey="w0fw55foestjhytbmg31d87s9gijhh14mf5o30pdtb97l9p6"
      initialValue={initialValue}
      init={{
        height: 300,
        menubar: false,
        plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      }}
      onEditorChange={onChange}
    />
  );
};

export default TinyMCEEditor;
