import { Editor } from '@tinymce/tinymce-react';

function InputEditor() {
  const toolbar = 'undo redo | casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify |  bullist numlist checklist outdent indent | removeformat | a11ycheck code table help';
  return (
    <Editor
      initialValue="<p>This is the initial content of the editor.</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
          'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
          'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
        ],
        toolbar,
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
}

export default InputEditor;
