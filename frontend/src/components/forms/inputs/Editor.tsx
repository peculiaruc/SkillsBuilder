/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editor as TinyMCEEditor } from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';
import { editorApiKey } from '../../../configs/app';
import { MuiInputProps } from './InputType';

function EditorInput({ onChange, value, name } :MuiInputProps) {
  const onEditorChange = (_value: string, _editor: TinyMCEEditor) => {
    const data = {
      target: {
        name,
        value: _value,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    if (onChange) {
      onChange(data);
    }
  };

  const toolbar = 'undo redo | casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify |  bullist numlist checklist outdent indent | removeformat | a11ycheck code table help';
  return (
    <Editor
      apiKey={editorApiKey}
      initialValue="<p>Type the content here</p>"
      value={value as string}
      onEditorChange={onEditorChange}
      init={{
        height: 300,
        menubar: true,
        plugins: [
          'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
          'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
          'powerpaste', 'formatpainter', 'insertdatetime', 'table', 'help', 'wordcount',
        ],
        toolbar,
        content_style: 'body { font-family: Inter, sans-serif; font-size:14px }',
      }}
    />
  );
}

export default EditorInput;
